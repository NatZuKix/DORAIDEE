<script setup>
import { usePageStore } from '~/stores/Page'
import { getMovieByCategory } from '~/composable/GET/getMovieByCategory'
const route = useRoute()
const router = useRouter()
const PageStore = usePageStore()
const description = {
    Action: "Action-packed movies full of excitement",
    Comedy: 'Movies intended to make you laugh',
    Drama: 'Movies focused on realistic storytelling',
    Romance: 'Movies about love and relationships',
    Horror: 'Movies designed to scare or disturb',
    SciFi: 'Science fiction movies exploring futuristic themes',
    Fantasy: 'Movies based on magical or mythical worlds',
    Thriller: 'Movies that are intense and suspenseful',
    Documentary: 'Non-fictional movies that explore real-world events'
}




const movies = ref([])
const meta = ref({})
const page = ref(1)
PageStore.setCurrentPage('All Movies', `All Movies`)

onBeforeMount(async () => {
    setPageLayout('default')
    PageStore.setCurrentPage(`${route.params.category}`, `${description[route.params.category]}`)
    let fetchData = await getMovieByCategory(route.params.category, 1, 8)
    movies.value = fetchData.data
    meta.value = fetchData.meta
})

async function pageChange() {
    let fetchData = await getMovieByCategory(route.params.category, page.value, 8)
    movies.value = fetchData.data
    meta.value = fetchData.meta
}


</script>

<template>
    <div class="w-full h-full bg-[#0D0A0E] overflow-y-auto " v-if="movies.length != 0">
        <UPagination v-model="page" :page-count="meta.perPage" :total="meta.total"
            :active-button="{ variant: 'none', class: 'text-white bg-[#ff0000]' }" class="mb-3"
            @update:modelValue="pageChange" />

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        </div>

    </div>
    <div v-else class="w-full h-full bg-[#0D0A0E] flex justify-center items-center">
        <div class="flex flex-col justify-center items-center">
            <img src="/images/movie.png" class="h-[50%] w-[50%]" />
            <h1 class="text-center text-xl">Dont Have Movie in Category</h1>
        </div>

    </div>

</template>



<style scoped></style>
