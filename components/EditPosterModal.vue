<template>
  <UModal>
    <div class="bg-[#0D0A0E] p-6 rounded-lg shadow-lg w-full h-full mx-auto">
      <h1 class="text-2xl font-bold text-white text-center mb-6">Upload Poster</h1>
      <!-- Description Field -->
      <div class="mb-4">
        <label for="poster" class="block mb-2">Poster Image</label>
        <input @change="onFileChange" id="poster" type="file" accept="image/jpeg,image/png"
          class="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]">
        <div v-if="movie.posterPreview" class="mt-4">
          <img :src="movie.posterPreview" alt="Poster Preview" class="w-[20%] object-cover h-[30%] rounded-lg">
        </div>
      </div>

      <!-- Save Changes Button -->
      <button class="w-full bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        @click="save">
        Save Changes
      </button>
    </div>
  </UModal>
</template>

<script setup>
// Import the ReviewCard component to display the review after submission
import { uploadMoviePoster} from '~/composable/POST/uploadMoviePoster'

const props = defineProps({
  movieid: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['success', 'fail', 'close'])
// Method to set the rating based on the clicked star


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

const movie = ref({
  poster: null,
  posterPreview: null,
})


// Method to submit the review
const save = async () => {

  let Result = await uploadMoviePoster(props.movieid, movie.value.poster)
  if (Result && Result.status == 401) {
    localStorage.clear()
    alert('Your session has expired. Please log in again.')
    emit('close')
    return
  }
  if (Result && Result.status == 400) {
    alert('Invalid poster')
    emit('close')
    return
  }
  if (Result && Result.status == 200) {
    emit('success')
  }
}
</script>

<style scoped>
/* You can keep this empty or define any additional custom styles if needed */
</style>
