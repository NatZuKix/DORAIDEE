<template>
  <UModal>
    <div class="bg-[#0D0A0E] p-6 rounded-lg shadow-lg w-full h-full mx-auto">
      <h1 class="text-2xl font-bold text-white text-center mb-6">Edit Category</h1>
      <!-- Description Field -->
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
import { ref } from 'vue'
import { UpdateMovieCategory} from '~/composable/POST/updateMovieCategory'

const props = defineProps({
  movieid: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['success', 'fail', 'close'])
// Method to set the rating based on the clicked star


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

// Method to submit the review
const save = async () => {

  let Result = await UpdateMovieCategory(props.movieid, selectedCategories.value)
  if (Result && Result.status == 401) {
    localStorage.clear()
    alert('Your session has expired. Please log in again.')
    emit('close')
    return
  }
  if (Result && Result.status == 400) {
    alert('Invalid category')
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
