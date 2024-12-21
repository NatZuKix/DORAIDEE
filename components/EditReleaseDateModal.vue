<template>
  <UModal>
    <div class="bg-[#0D0A0E] p-6 rounded-lg shadow-lg w-full h-full mx-auto">
      <h1 class="text-2xl font-bold text-white text-center mb-6">Edit Release Date</h1>
      <!-- Description Field -->
      <div class="mb-4">
        <label for="releaseDate" class="block mb-2">Release Date</label>
        <input v-model="form.relesedate" id="releaseDate" type="date"
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
import { editReleaseDate } from '~/composable/PUT/editReleaseDate'

const props = defineProps({
  movieid: {
    type: Number,
    required: true
  }
})


const emit = defineEmits(['success', 'fail', 'close'])
// Method to set the rating based on the clicked star


const form = ref({
  relesedate:null, // Only the description field
})

// Method to submit the review
const save = async () => {
  // console.log(form.value.relesedate)
  
  if(form.value.relesedate==null){
    alert('Relese Date is required')
    emit('close')
    return
  }
  let Result = await editReleaseDate(props.movieid, form.value.relesedate)
  if (Result && Result.status == 401) {
    localStorage.clear()
    alert('Your session has expired. Please log in again.')
    emit('close')
    return
  }
  if (Result && Result.status == 400) {
    alert('Invalid Relese Date')
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
