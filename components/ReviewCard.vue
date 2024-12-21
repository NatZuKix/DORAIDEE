<script setup>
import { RemoveReviewModal } from '#components'

const props = defineProps({
  review: {
    type: Object,
    required: true
  },
  showRemove: {
    type: Boolean,
    required: true
  },
  movieId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['fetch'])

const modal = useModal()
const toast = useToast()
const owner = ref(false)
onBeforeMount(async () => {
  let userId = parseInt(localStorage.getItem("UserID") ?? 0)
  if (userId == props.review.userId) {
    owner.value = true
  }
})



function openModal() {

  modal.open(RemoveReviewModal, {
    movieId: props.movieId,
    username: props.review.user.fullname,
    userId: props.review.user.id,
    onSuccess() {
      toast.add({
        icon: "i-heroicons-check-badge",
        title: 'Success!',
        id: 'modal-success'
      })
      modal.close()
      emit('fetch')
    },
    onFail() {
      toast.add({
        icon: "ic:round-error",
        title: 'Fail!',
        id: 'modal-success'
      })
      modal.close()
    },
    onClose() {
      modal.close()
    }
  })
}

// Function to handle delete action
const deleteReview = () => {
  openModal()
}

</script>

<template>

    <!-- Card Container -->
    <div class=" max-w-md rounded-2xl shadow-lg bg-[#1d1b1b] p-6 flex items-center gap-4 relative">
      <!-- Image Section
      <div>
        <img src="/images/userprofile.png" alt="Profile" class="w-24 h-24 rounded-full object-cover" />
      </div> -->

      <!-- Content Section -->
      <div class="flex-1">
        <!-- Name -->
        <h3 class="text-lg font-bold text-white">{{ props.review.user.fullname }}</h3>
        <!-- Stars Rating -->
        <div class="flex items-center mb-2">
          <!-- Loop to display stars -->
          <span v-for="n in 5" :key="n" :class="{
            'text-[#ff0000]': n <= props.review.star, // Red color for filled stars
            'text-gray-500': n > props.review.star  // Gray color for unfilled stars
          }" class="text-xl cursor-pointer">
            &#9733; <!-- Unicode for filled star -->
          </span>
        </div>
        <!-- Description -->
        <div class="w-[350px]">
          <p class=" text-gray-300 text-sm  break-words scroll-container">
            {{ props.review.comment }}
          </p>
        </div>

      </div>

      <!-- Delete Button -->
      <button class="absolute top-2 right-2 text-white hover:text-red-700 rounded-full " @click="deleteReview"
        v-if="props.showRemove || owner">
        <UIcon name="i-heroicons-trash-20-solid"></UIcon> <!-- Trash Icon -->
      </button>
    </div>
</template>



<style scoped>
.scroll-container {
    height: 80px;
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

</style>
