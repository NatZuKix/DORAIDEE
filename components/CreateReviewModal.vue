<template>
  <UModal>
    <div class="review-form bg-[#0D0A0E] p-6 rounded-lg border border-gray-700 ">
      <h2 class="text-white text-xl mb-4 font-bold">Create a Review</h2>

      <!-- Rating Section with clickable stars -->
      <div class="form-group mb-4">
        <label for="stars" class="text-white text-sm">Rating (1-5 stars):</label>
        <div class="stars flex items-center space-x-2 mt-2">
          <!-- Loop to create 5 stars -->
          <span v-for="n in 5" :key="n" @click="setRating(n)" :class="{
            'text-[#ff0000]': n <= rating, // Red color if the star is selected
            'text-gray-500': n > rating  // Gray color if the star is not selected
          }" class="cursor-pointer text-2xl">
            &#9733; <!-- Unicode Star -->
          </span>
        </div>
      </div>

      <div class="form-group mb-4">
        <label for="comment" class="text-white text-sm">Your Comment:</label>
        <textarea v-model="comment" id="comment" required placeholder="Write your comment here"
          class="w-full p-2 rounded-md border border-gray-600 bg-[#0D0A0E] text-white focus:outline-none focus:border-[#ff0000]"></textarea>
      </div>

      <button @click="submitReview"
        class="w-full py-2 bg-[#ff0000] text-white rounded-md hover:bg-red-600 focus:outline-none">
        Submit Review
      </button>

    </div>
  </UModal>
</template>

<script setup>
// Import the ReviewCard component to display the review after submission
import { createReview } from '~/composable/POST/createReview'

const props =defineProps({
  movieid: {
    type: Number,
    required:true
  }
})


// Reactive properties for rating and comment
const rating = ref(0)
const comment = ref('')
const submitted = ref(false)
const emit = defineEmits(['success', 'fail','close'])
// Method to set the rating based on the clicked star
const setRating = (star) => {
  rating.value = star
}

// Method to submit the review
const submitReview = async () => {
  // Check if the rating is between 1 and 5
  if (rating.value < 1 || rating.value > 5) {
    alert('Please provide a rating between 1 and 5 stars.')
    return
  }
  if (comment.value.trim().length == 0) {
    alert('Please comment something for this movie')
    return
  }

  let Result = await createReview(rating.value, comment.value, props.movieid)
  if(Result == 401){
    localStorage.clear()
    alert('Your session has expired. Please log in again.')
    emit('close')
    window.location.reload(true)
    return
  }
  if(Result == 409){
    alert('You alredy Revies this movie')
    emit('close')
    return
  }

  if (Result != null) {
    emit('success')
  } else {
    emit('fail')
  }
}
</script>

<style scoped>
/* You can keep this empty or define any additional custom styles if needed */
</style>
