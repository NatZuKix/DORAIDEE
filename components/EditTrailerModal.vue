<template>
  <UModal>
    <div class="bg-[#0D0A0E] p-6 rounded-lg shadow-lg w-full h-full mx-auto">
      <h1 class="text-2xl font-bold text-white text-center mb-6">Edit Trailer</h1>
      <!-- Description Field -->
      <div class="mb-4">
        <label for="description" class="block text-sm text-white mb-2">trailer URL</label>
        <textarea id="description" v-model="form.trailer"
          class="w-full h-24 p-3 text-white bg-[#1a171b] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Enter the trailer URL"></textarea>
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
import { editTrailer } from '~/composable/PUT/editTrailer'

const props = defineProps({
  movieid: {
    type: Number,
    required: true
  }
})


const emit = defineEmits(['success', 'fail', 'close'])
// Method to set the rating based on the clicked star


const form = ref({
  trailer: "", // Only the description field
})

// Method to submit the review
const save = async () => {
  if(form.value.trailer.trim().length==0){
    alert('trailer is required')
    emit('close')
    return
  }
  let Result = await  editTrailer(props.movieid, form.value.trailer)
  if (Result && Result.status == 401) {
    localStorage.clear()
    alert('Your session has expired. Please log in again.')
    emit('close')
    return
  }
  if (Result && Result.status == 400) {
    alert('Invalid trailer url')
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
