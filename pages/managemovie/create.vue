<script setup>
import { usePageStore } from '~/stores/Page'
import { createMovie } from '~/composable/POST/createMovie'
import { UpdateMovieCategory } from '~/composable/POST/updateMovieCategory'
import { additionalMovieDetails } from '~/composable/PUT/additionalMovieDetails'
import { removeMovie } from '~/composable/DELETE/removeMovie'
import { uploadMoviePoster } from '~/composable/POST/uploadMoviePoster'
const PageStore = usePageStore()
const router = useRouter()

const currentStage = ref(1)
const movie = ref({
  title: '',
  description: '',
  director: '',
  writer: '',
  movierate: '',
  streaming: '',
  cast: '',
  duration: null,
  trailer: '',
  releaseDate: '',
  poster: null,
  posterPreview: null,
})

function nextStage() {
  if (currentStage.value < 5) currentStage.value++
}

function prevStage() {
  if (currentStage.value > 1) currentStage.value--
}

function onFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    movie.value.poster = file
    const reader = new FileReader()
    reader.onload = (e) => {
      movie.value.posterPreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}



const selectedCategories = ref([])
const categoriesList = [
  "Action",
  "Comedy",
  "Drama",
  "Romance",
  "Horror",
  "SciFi",
  "Fantasy",
  "Thriller",
  "Documentary"
]

const toggleCategory = (category) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter(item => item !== category)
  } else {
    selectedCategories.value.push(category)
  }
}



const processMovie = ref(false)
const processSuccess = ref(false)
const processFail = ref(false)
async function submitMovie() {
  // console.log('Movie Data:', movie.value)
  processMovie.value = true
  currentStage.value = 0
  delay(async () => {
    let procress = await processingMovie()
    if (procress) {
      processMovie.value = false
      processSuccess.value = true
    } else {
      processMovie.value = false
      processFail.value = true
    }
    delay(() => {
      router.push('/managemovie')
    })
  })

}


function createArray(input) {
  let arr = input.split(',').map(item => item.trim()).filter(item => item !== "")
  return arr

}


async function processingMovie() {
  try {
    const { title, description, director, writer, cast, streaming, movierate, releaseDate, trailer, duration } = movie.value

    // Validate inputs
    validateInputs({ title, description, director, writer, cast, streaming, movierate })

    const directorArray = createArray(director)
    const writerArray = createArray(writer)
    const castArray = createArray(cast)

    // Step 1: Create the movie
    const createResult = await createMovie(title, description, directorArray, writerArray, castArray, movierate, streaming)
    if (!isSuccessful(createResult)) {
      // console.log("Failed to create movie.")
      return false
    }
    const movieId = createResult.data.movie.id

    // Step 2: Add additional details
    const resultStage2 = await additionalMovieDetails(movieId, duration, trailer?.trim() || null, releaseDate?.trim() || null)
    if (!isSuccessful(resultStage2)) {
      await handleFailure(movieId, "Failed to add additional movie details.")
      return false
    }

    // Step 3: Update movie category
    const resultStage3 = await UpdateMovieCategory(movieId, selectedCategories.value)
    if (!isSuccessful(resultStage3)) {
      await handleFailure(movieId, "Failed to update movie category.")
      return false
    }

    if (movie.value.poster) {
      const resultStage4 = await uploadMoviePoster(movieId, movie.value.poster)
      if (!isSuccessful(resultStage4)) {
        await handleFailure(movieId, "Failed to upload movie poster.")
        return false
      }
    }

    // console.log("Movie processing completed successfully.")
    return true
  } catch (error) {
    alert("An unexpected error occurred:" + error)
  }
}

// Helper Functions

function validateInputs({ title, description, director, writer, cast, streaming, movierate }) {
  if (!title.trim()) throw new Error("ValidateFail: Invalid title")
  if (!description.trim()) throw new Error("ValidateFail: Invalid synopsis")
  if (!createArray(director).length) throw new Error("ValidateFail: Invalid director")
  if (!createArray(writer).length) throw new Error("ValidateFail: Invalid writer")
  if (!createArray(cast).length) throw new Error("ValidateFail: Invalid cast")
  if (!streaming.trim()) throw new Error("ValidateFail: Select streaming")
  if (!movierate.trim()) throw new Error("ValidateFail: Select movie rate")
}


function getCategories() {

  if (selectedCategories.value.length == 0) return '-'

  let result = selectedCategories.value[0]
  if (selectedCategories.value.length > 1) {
    selectedCategories.value.slice(1).forEach(category => {
      result = result + ", " + category
    })
  }
  return result
}

function isSuccessful(response) {
  return response && response.status === 200
}

async function handleFailure(movieId, message) {
  console.log(message)

  const removalResult = await removeMovie(movieId)
  if (removalResult === 401) {
    localStorage.clear()
    alert("Your session has expired. Please log in again.")
    window.location.reload(true)
  } else if (removalResult === 404) {
    //not found
  } else {
    console.log("Failed to clean up movie.")  }
}

function delay(callback) {
  setTimeout(callback, 2000) // Delay for 2000 milliseconds (2seconds)
}

onBeforeMount(async () => {
  setPageLayout('createmovie')
  PageStore.setCurrentPage('MangeMovies', `managment movie in duraidee`)
})
</script>


<template>
  <div class="w-full h-full flex flex-col items-center text-white font-noto overflow-auto bg-[#0D0A0E]">
    <!-- Stage 1: Add Movie Details -->
    <div v-if="currentStage === 1" class="w-full h-full p-6 bg-[#0D0A0E] rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">Add New Movie</h2>
      <div class="mb-4">
        <label for="title" class="block mb-2">Title</label>
        <input v-model="movie.title" id="title" type="text" placeholder="Movie Title"
          class="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]">
      </div>
      <div class="mb-4">
        <label for="description" class="block mb-2">Synopsis</label>
        <textarea v-model="movie.description" id="description" placeholder="Movie Synopsis"
          class="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]"></textarea>
      </div>
      <div class="mb-4">
        <label for="director" class="block mb-2">Director</label>
        <input v-model="movie.director" id="director" type="text" placeholder="director1,director2,..."
          class="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]">
      </div>
      <div class="mb-4">
        <label for="writer" class="block mb-2">Writer</label>
        <input v-model="movie.writer" id="writer" type="text" placeholder="writer1,writer2,..."
          class="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]">
      </div>
      <div class="mb-4">
        <label for="movierate" class="block mb-2">Movie Rate</label>
        <select v-model="movie.movierate" id="movierate"
          class="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]">
          <option disabled value="">Select Rating</option>
          <option>G</option>
          <option>PG</option>
          <option>PG-13</option>
          <option>R</option>
          <option>NC-17</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="streaming" class="block mb-2">Streaming Platform</label>
        <select v-model="movie.streaming" id="streaming"
          class="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]">
          <option disabled value="">Select Platform</option>
          <option>cinema</option>
          <option>netflix</option>
          <option>disney+hostar</option>
          <option>hbomax</option>
          <option>amazonprime</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="cast" class="block mb-2">Cast</label>
        <input v-model="movie.cast" id="cast" type="text" placeholder="cast1,cast2,..."
          class="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]">
      </div>
      <button @click="nextStage"
        class="w-full py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#000000] transition duration-200">
        Next
      </button>
    </div>

    <!-- Stage 2: Additional Movie Details -->
    <div v-else-if="currentStage === 2" class="w-full h-full p-6 bg-[#0D0A0E] rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">Additional Movie Details</h2>
      <div class="mb-4">
        <label for="duration" class="block mb-2">Duration (minutes)</label>
        <input v-model="movie.duration" id="duration" type="number" placeholder="Duration"
          class="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]">
      </div>
      <div class="mb-4">
        <label for="trailer" class="block mb-2">Trailer URL</label>
        <input v-model="movie.trailer" id="trailer" type="url" placeholder="Trailer URL"
          class="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]">
      </div>
      <div class="mb-4">
        <label for="releaseDate" class="block mb-2">Release Date</label>
        <input v-model="movie.releaseDate" id="releaseDate" type="date"
          class="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]">
      </div>
      <button @click="nextStage"
        class="w-full py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#000000] transition duration-200">
        Next
      </button>
      <button @click="prevStage"
        class="w-full py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#000000] transition duration-200 mt-2">
        Back
      </button>
    </div>


    <!-- Stage 3: Add Categories -->
    <div v-else-if="currentStage === 3" class="w-full h-full p-6 bg-[#0D0A0E] rounded-lg shadow-lg">
      <h1 class="text-center text-2xl font-bold mb-10 text-white">Choose movie <span
          class="text-[#ff0000]">categories</span></h1>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
        <div v-for="category in categoriesList" :key="category" class="flex items-center cursor-pointer">
          <button @click="toggleCategory(category)" :class="{
            'bg-[#ff0000] text-white': selectedCategories.includes(category),
            'bg-gray-700 text-gray-300': !selectedCategories.includes(category)
          }" class="w-full px-4 py-2 rounded-lg transition-colors text-center">
            {{ category }}
          </button>
        </div>
      </div>
      <button @click="nextStage"
        class="w-full py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#000000] transition duration-200">
        Next
      </button>
      <button @click="prevStage"
        class="w-full py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#000000] transition duration-200 mt-2">
        Back
      </button>
    </div>

    <!-- Stage 4: Add Poster -->
    <div v-else-if="currentStage === 4" class="w-full h-full p-6 bg-[#0D0A0E] rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">Upload Poster</h2>
      <div class="mb-4">
        <label for="poster" class="block mb-2">Poster Image</label>
        <input @change="onFileChange" id="poster" type="file" accept="image/jpeg,image/png"
          class="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]">
        <div v-if="movie.posterPreview" class="mt-4">
          <img :src="movie.posterPreview" alt="Poster Preview" class="w-[20%] object-cover h-[30%] rounded-lg">
        </div>
      </div>
      <button @click="nextStage"
        class="w-full py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#000000] transition duration-200">
        Next
      </button>
      <button @click="prevStage"
        class="w-full py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#000000] transition duration-200 mt-2">
        Back
      </button>
    </div>
    <!-- Stage 5: Preview -->
    <div v-else-if="currentStage === 5" class="w-full  p-6 bg-[#0D0A0E] rounded-lg shadow-lg  scroll-container">
      <h2 class="text-2xl font-bold mb-4">Preview Movie Details</h2>
      <div class="mb-4 flex gap-2">
        <h3 class="text-lg font-semibold">Title:</h3>
        <p>{{ movie.title }}</p>
      </div>
      <div class="mb-4 flex gap-2">
        <h3 class="text-lg font-semibold">Synopsis:</h3>
        <p>{{ movie.description }}</p>
      </div>
      <div class="mb-4 flex gap-2">
        <h3 class="text-lg font-semibold">Director:</h3>
        <p>{{ movie.director }}</p>
      </div>
      <div class="mb-4 flex gap-2">
        <h3 class="text-lg font-semibold">Writer:</h3>
        <p>{{ movie.writer }}</p>
      </div>
      <div class="mb-4 flex gap-2">
        <h3 class="text-lg font-semibold">Rating:</h3>
        <p>{{ movie.movierate }}</p>
      </div>
      <div class="mb-4 flex gap-2">
        <h3 class="text-lg font-semibold">Streaming Platform:</h3>
        <p>{{ movie.streaming }}</p>
      </div>
      <div class="mb-4 flex gap-2">
        <h3 class="text-lg font-semibold">Cast:</h3>
        <p>{{ movie.cast }}</p>
      </div>
      <div class="mb-4 flex gap-2">
        <h3 class="text-lg font-semibold">Duration:</h3>
        <p>{{ movie.duration }} minutes</p>
      </div>
      <div class="mb-4 flex gap-2">
        <h3 class="text-lg font-semibold">Trailer:</h3>
        <p>{{ movie.trailer }}</p>
      </div>
      <div class="mb-4 flex gap-2">
        <h3 class="text-lg font-semibold">Categories:</h3>
        <p>{{ getCategories() }}</p>
      </div>
      <div class="mb-4 flex gap-2">
        <h3 class="text-lg font-semibold">Release Date:</h3>
        <p>{{ movie.releaseDate }}</p>
      </div>
      <div v-if="movie.posterPreview" class="mb-4">
        <h3 class="text-lg font-semibold">Poster:</h3>
        <img :src="movie.posterPreview" alt="Poster Preview" class="w-[20%] object-cover h-[30%] rounded-lg">
      </div>
      <button @click="submitMovie"
        class="w-full py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#000000] transition duration-200">
        Save
      </button>
      <button @click="prevStage"
        class="w-full py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#000000] transition duration-200 mt-2">
        Back
      </button>
    </div>
    <!-- Process -->
    <div v-if="processMovie"
      class="h-full w-full p-6 bg-[#0D0A0E] rounded-lg shadow-lg text-center flex justify-center items-center">
      <!-- Processing Animation -->
      <div class="fixed  flex items-center justify-center z-50">
        <div class="flex flex-col items-center">
          <div class="loader mb-4"></div>
          <p class="text-lg font-bold">Processing...</p>
        </div>
      </div>
    </div>

    <!-- Process success-->
    <div v-if="processSuccess"
      class="h-full w-full p-6 bg-[#0D0A0E] rounded-lg shadow-lg text-center flex justify-center items-center">
      <!-- Success Animation -->
      <div class="fixed flex items-center justify-center z-50">
        <div class="flex flex-col items-center">
          <div class="success-icon mb-4">
            <!-- Replace with an actual success icon/animation -->
            <UIcon name="clarity:success-standard-solid" class="text-6xl text-emerald-500"></UIcon>
          </div>
          <p class="text-lg font-bold text-white">Movie Created Successfully!</p>
        </div>
      </div>
    </div>

    <!-- Process fail-->
    <div v-if="processFail"
      class="h-full w-full p-6 bg-[#0D0A0E] rounded-lg shadow-lg text-center flex justify-center items-center">
      <div class="fixed flex items-center justify-center z-50">
        <div class="flex flex-col items-center">
          <div class="error-icon mb-4">
            <!-- Failure Icon -->
            <UIcon name="ix:namur-failure" class="text-6xl text-[#ff0000]"></UIcon>
          </div>
          <p class="text-lg font-bold text-white">Failed to Create Movie. Please Try Again!</p>
        </div>
      </div>
    </div>

  </div>
</template>


<style scoped>
.scroll-container {
  height: 980px;
  /* Example: fixed height */
  overflow-y: scroll;
  /* Allow scrolling */
}

/* Hide scrollbar for WebKit browsers */
.scroll-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for Firefox */
.scroll-container {
  scrollbar-width: none;
}


.loader {
  border: 8px solid rgba(255, 255, 255, 0.2);
  border-top: 8px solid #ff0000;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
