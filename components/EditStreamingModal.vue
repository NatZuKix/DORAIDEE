<template>
  <UModal>
    <div class="bg-[#0D0A0E] p-6 rounded-lg shadow-lg w-full h-full mx-auto">
      <h1 class="text-2xl font-bold text-white text-center mb-6">Edit Streaming Platform</h1>
      <!-- Description Field -->
      <div class="mb-4">
        <label for="streaming" class="block mb-2">Streaming Platform</label>
        <select v-model="form.streaming" id="streaming"
          class="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff0000]">
          <option disabled value="">Select Platform</option>
          <option>cinema</option>
          <option>netflix</option>
          <option>disney+hostar</option>
          <option>hbomax</option>
          <option>amazonprime</option>
        </select>
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
import { editSteaming} from '~/composable/PUT/editSteaming'

const props = defineProps({
  movieid: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['success', 'fail', 'close'])
// Method to set the rating based on the clicked star


const form = ref({
  streaming: "",
})

// Method to submit the review
const save = async () => {
  if (form.value.streaming.trim().length==0) {
     alert("ValidateFail: Required streaming type")
     emit('close')
     return
    }

  let Result = await editSteaming(props.movieid, form.value.streaming)
  if (Result && Result.status == 401) {
    localStorage.clear()
    alert('Your session has expired. Please log in again.')
    emit('close')
    return
  }
  if (Result && Result.status == 400) {
    alert('Invalid streaming')
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
