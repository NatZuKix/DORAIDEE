<template>
  <UModal>
    <div class="bg-[#0D0A0E] p-6 rounded-lg shadow-lg w-full h-full mx-auto">
      <h1 class="text-2xl font-bold text-white text-center mb-6">Edit Writer</h1>
      <!-- Description Field -->
      <div class="mb-4">
        <label for="description" class="block text-sm text-white mb-2">Writer</label>
        <textarea id="description" v-model="form.writer"
          class="w-full h-24 p-3 text-white bg-[#1a171b] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="writer1,writer2,..."></textarea>
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
import { editWriter } from '~/composable/PUT/editWriter'

const props = defineProps({
  movieid: {
    type: Number,
    required: true
  }
})

function createArray(input) {
  let arr = input.split(',').map(item => item.trim()).filter(item => item !== "")
  return arr

}
const emit = defineEmits(['success', 'fail', 'close'])
// Method to set the rating based on the clicked star


const form = ref({
  writer: "",
})

// Method to submit the review
const save = async () => {
  if (!createArray(form.value.writer).length) {
     alert("ValidateFail: Required writer")
     emit('close')
     return
    }

  let Result = await editWriter(props.movieid, createArray(form.value.writer))
  if (Result && Result.status == 401) {
    localStorage.clear()
    alert('Your session has expired. Please log in again.')
    emit('close')
    return
  }
  if (Result && Result.status == 400) {
    alert('Invalid writer')
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
