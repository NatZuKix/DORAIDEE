<template>
  <UModal>
    <div class="bg-[#0D0A0E] p-6 rounded-lg shadow-lg w-full h-full mx-auto">
      <h1 class="text-2xl font-bold text-white text-center mb-6">Edit Trailer</h1>
      <!-- Description Field -->
      <div class="mb-4">
        <label for="duration" class="block mb-2">Duration (minutes)</label>
        <input v-model="form.duration" id="duration" type="number" placeholder="Duration"
          class="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]">
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
import { editDuration } from '~/composable/PUT/editDuration'

const props = defineProps({
  movieid: {
    type: Number,
    required: true
  }
})


const emit = defineEmits(['success', 'fail', 'close'])
// Method to set the rating based on the clicked star


const form = ref({
  duration:0, // Only the description field
})

// Method to submit the review
const save = async () => {
  if(form.value.duration==0){
    alert('duration is required')
    emit('close')
    return
  }
  let Result = await  editDuration(props.movieid, form.value.duration)
  if (Result && Result.status == 401) {
    localStorage.clear()
    alert('Your session has expired. Please log in again.')
    emit('close')
    return
  }
  if (Result && Result.status == 400) {
    alert('Invalid duration time')
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
