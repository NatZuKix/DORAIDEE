<template>
  <UModal>
    <div class="bg-[#0D0A0E] p-6 rounded-lg shadow-lg w-full h-full mx-auto">
      <h1 class="text-2xl font-bold text-white text-center mb-6">Edit Cast</h1>
      <!-- Description Field -->
      <div class="mb-4">
        <label for="description" class="block text-sm text-white mb-2">Cast</label>
        <textarea id="description" v-model="form.cast"
          class="w-full h-24 p-3 text-white bg-[#1a171b] border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="cast1,cast2,..."></textarea>
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
import { editCast } from '~/composable/PUT/editCast'

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
  cast: "",
})

// Method to submit the review
const save = async () => {
  if (!createArray(form.value.cast).length) {
     alert("ValidateFail: Required cast")
     emit('close')
     return
    }

  let Result = await editCast(props.movieid, createArray(form.value.cast))
  if (Result && Result.status == 401) {
    localStorage.clear()
    alert('Your session has expired. Please log in again.')
    emit('close')
    return
  }
  if (Result && Result.status == 400) {
    alert('Invalid cast')
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
