<template>
  <div class="max-w-xs bg-black rounded-2xl  cursor-pointer relative" @click="gotodetails"
    @mouseenter="mousehover = true" @mouseleave="mousehover = false">
    <img :src="posterUrl" alt="Poster" class="w-full h-56 object-cover rounded-t-2xl"
      :class="mousehover ? 'opacity-50' : ''">
    <div class="p-1" v-if="!mousehover">
      <p class="text-sm text-gray-500 uppercase font-semibold mb-2">{{ movie.categories.length != 0 ?
        `${movie.categories[0]}` : 'No category' }}</p>
      <h3 class="text-lg font-bold text-white truncate">{{ movie.title }}</h3>
      <p class="text-sm text-gray-600">{{ movie.movierate }}</p>
      <div class="absolute right-3 bottom-3 bg-white rounded-full w-[14%] h-[14%] flex justify-center items-center">
        <span class="text-[#ffa723] font-black">{{ movie.avgRating != 0 ? `${movie.avgRating}` : '-' }} </span>
      </div>
      <span class="text-[#ff0000] font-bold">{{ movie.reviewCount != 0 ? `${movie.reviewCount}` : 'No' }} Reviews</span>
    </div>
    <div class="p-1 h-[6.5rem] bg-white rounded-b-2xl w-full flex justify-center items-center" v-else>
      <h1 class="text-[#ff0000] font-extrabold font-noto">See movie details >>></h1>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const posterUrl = runtimeConfig.public.API_URL + "movies/" + props.movie.id + "/poster"
const mousehover = ref(false)
function gotodetails() {
  router.push('/movies/details/' + props.movie.id)
}



</script>
