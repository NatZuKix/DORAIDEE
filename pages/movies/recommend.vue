<script setup>
import { usePageStore } from '~/stores/Page'
import { getRecommendMovies } from '~/composable/GET/getRecommend'

const PageStore = usePageStore()
const router = useRouter()
const movies = ref([])
const meta = ref({})
const page = ref(1)

// definePageMeta({
//   middleware: "auth", // Use the 'auth' middleware
// })

onBeforeMount(async () => {
    setPageLayout('default')
    PageStore.setCurrentPage('Recommend Movies', 'Recommend Movies for you')
    let fetchData = await  getRecommendMovies(1, 8)
    movies.value = fetchData.data
    meta.value = fetchData.meta
})



</script>

<template>
    <div class="w-full h-full bg-[#0D0A0E] overflow-y-auto " v-if="movies.length != 0">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 ">
            <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        </div>

    </div>
    <div v-else class="w-full h-full bg-[#0D0A0E] flex justify-center items-center">
        <div class="flex flex-col justify-center items-center">
            <img src="/images/movie.png" class="h-[50%] w-[50%]" />
            <h1 class="text-center text-xl">Dont have any movie</h1>
        </div>
    </div>
</template>



<style scoped></style>
