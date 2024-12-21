<script setup>
import { usePageStore } from '~/stores/Page'
import { getAllMovies } from '~/composable/GET/getAllMovies'
import { RemoveMovieModal } from '#components'
const PageStore = usePageStore()
const router = useRouter()
const movies = ref([])
const meta = ref({})
const page = ref(1)
const modal = useModal()
const toast = useToast()
definePageMeta({
    middleware: "auth", // Use the 'auth' middleware
})

onBeforeMount(async () => {
    setPageLayout('default')
    PageStore.setCurrentPage('MangeMovies', `managment movie in duraidee`)
    let fetchData = await getAllMovies(1, 5)
    movies.value = fetchData.data
    meta.value = fetchData.meta

})

async function pageChange() {
    let fetchData = await getAllMovies(page.value, 5)
    movies.value = fetchData.data
    meta.value = fetchData.meta
    if (movies.value.length == 0 && page.value > 1) {
        page.value = page.value - 1
        let fetchData = await getAllMovies(page.value, 5)
        movies.value = fetchData.data
        meta.value = fetchData.meta
    }
}

const movieColumn = [
    {
        key: 'id',
        label: 'ID'
    },
    {
        key: 'title',
        label: 'Title'
    }, {
        key: 'movierate',
        label: 'Rate'
    }, {
        key: 'duration',
        label: 'Duration'
    }, {
        key: 'avgRating',
        label: 'Star'
    }, {
        key: 'reviewCount',
        label: 'Review'
    }, {
        key: 'actions'
    }]

const items = row => [
    [
        {
            label: 'View',
            icon: 'heroicons:eye-16-solid',
            click: () => { router.push(`/movies/details/${row.id}`) }
        },
        {
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
            click: () => { openRemoveModal(row.id, row.title) }
        }
    ]
]

function openRemoveModal(movieId, title) {
    modal.open(RemoveMovieModal, {
        movieId: movieId,
        title: title,
        onSuccess() {
            modal.close()
            pageChange()
            toast.add({
                icon: "i-heroicons-check-badge",
                title: 'Remove movie successful',
                id: 'Remove-movie-success'
            })

        },
        onFail() {
            toast.add({
                icon: "ic:round-error",
                title: 'Oops!',
                color: "red",
                description: 'Something went wrong. Please try again.',
                id: 'Changecategory-fail',
                type: 'error'
            })
            modal.close()
        },
        onClose() {
            modal.close()
        }
    })
}
</script>

<template>
    <div class="absolute right-10 bottom-3 ">
        <button class="w-32 bg-emerald-500 text-white rounded-2xl py-2 hover:bg-emerald-800"
            @click="router.push('/managemovie/create')">
            <UIcon name="material-symbols:add-2-rounded" class="mr-3"></UIcon>
            <h1>ADD MOVIE</h1>
        </button>
    </div>
    <div class="w-full h-full bg-[#0D0A0E] overflow-y-auto " v-if="movies.length != 0">
        <UPagination v-model="page" :page-count="meta.perPage" :total="meta.total"
            :active-button="{ variant: 'none', class: 'text-white bg-[#ff0000]' }" class="mb-3"
            @update:modelValue="pageChange" />
        <UTable :columns="movieColumn" :rows="movies" :ui="{
            th: {
                base: 'text-left bg-[#ff0000]',
                padding: 'px-4 py-3.5',
                color: 'text-white',
                font: 'font-semibold',
                size: 'text-md',
            }, td: {
                base: 'text-left',
                padding: 'px-4 py-3.5',
                color: 'text-white',
                font: 'font-thin',
                size: 'text-sm',
            }
        }" class=" rounded-2xl">
            <template #empty-state>
                <div class="flex flex-col items-center justify-center py-6 gap-3">
                    <img src="/icons/empty.png" class="w-24 h-24" />
                    <span class="text-2xl text-black">No Movie!</span>
                </div>
            </template>
            <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                    <UButton color="white" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>

    </div>
    <div v-else class="w-full h-full bg-[#0D0A0E] flex justify-center items-center">
        <div class="flex flex-col justify-center items-center">
            <img src="/images/movie.png" class="h-[50%] w-[50%]" />
            <h1 class="text-center text-xl">Dont have any Movie</h1>
        </div>
    </div>
</template>



<style scoped></style>
