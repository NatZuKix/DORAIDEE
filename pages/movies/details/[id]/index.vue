<script setup>
import { useMovieStore } from '~/stores/Movie'
import { getMovieById } from '~/composable/GET/getMovieById'
import { formatOnlyDate } from '~/composable/utils/formatDate'
import { CreateReviewModal } from '#components'
import { EditDescriptionModal } from '#components'
import { EditWriterModal } from '#components'
import { EditDirectorModal } from '#components'
import { EditCastModal } from '#components'
import { EditStreamingModal } from '#components'
import { EditTrailerModal } from '#components'
import { EditDurationModal } from '#components'
import { EditReleaseDateModal } from '#components'
import { EditMovieCategoryModal } from '#components'
import { EditPosterModal } from '#components'


const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()
const movie = ref({})
const runtimeConfig = useRuntimeConfig()
const posterUrl = runtimeConfig.public.API_URL + "movies/" + route.params.id + "/poster"

const category = ref('')
const director = ref('')
const actor = ref('')
const writer = ref('')
const steamingLogo = ref('')

const reviewCount = ref(0)
const role = ref('GUEST')
onBeforeMount(async () => {
    setPageLayout('details')
    fetchMovie()
    let roleUser = localStorage.getItem("UserRole")
    if (roleUser) {
        role.value = roleUser
    }
})

async function fetchMovie() {
    movie.value = await getMovieById(route.params.id)
    // console.log(movie.value)
    category.value = getCategories(movie.value.categories)
    director.value = getJsonArray(movie.value.director)
    actor.value = getJsonArray(movie.value.cast)
    writer.value = getJsonArray(movie.value.writer)
    steamingLogo.value = getStreamingPlatform(movie.value.streaming)
    movieStore.setTitle(movie.value.title)
    reviewCount.value = movie.value.reviews.length
}

function getCategories(category) {
    if (category.length == 0) return '-'

    let result = category[0].name
    if (category.length > 1) {
        category.slice(1).forEach(category => {
            result = result + ", " + category.name
        })
    }
    return result
}


function getJsonArray(arr) {
    // 1. แปลง String ให้เป็น Array ด้วย JSON.parse
    let array = JSON.parse(arr)

    // 2. แปลง Array เป็น String โดยใช้ join(", ")
    let result = array.join(", ")

    return result
}


function getStreamingPlatform(platform) {
    switch (platform) {
        case 'cinema':
            return "/images/CINEMA.png"
        case 'netflix':
            return '/images/NETFLIX.png'
        case 'disney+hostar':
            return '/images/DISNEY.png'
        case 'hbomax':
            return '/images/HBO.png'
        case 'amazonprime':
            return '/images/AMAZON.png'
        default:
            return '/images/CINEMA.png'
    }
}

function convertMinutesToHours(minutes) {
    const hours = Math.floor(minutes / 60) // Get the integer part (hours)
    const remainingMinutes = minutes % 60 // Get the remaining minutes
    if (hours == 0) {
        return `${remainingMinutes} minutes`
    }
    return `${hours} hours and ${remainingMinutes} minutes`
}



const modal = useModal()
const toast = useToast()
function openModal() {

    modal.open(CreateReviewModal, {
        movieid: route.params.id,
        onSuccess() {
            toast.add({
                icon: "i-heroicons-check-badge",
                title: 'Success !',
                id: 'modal-success'
            })
            modal.close()
            fetchMovie()
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


function openEditDetailModal() {

    modal.open(EditDescriptionModal, {
        movieid: route.params.id,
        onSuccess() {
            toast.add({
                icon: "i-heroicons-check-badge",
                title: 'Success !',
                id: 'modal-success'
            })
            modal.close()
            fetchMovie()
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


function openEditDirectorModal() {

    modal.open(EditDirectorModal, {
        movieid: route.params.id,
        onSuccess() {
            toast.add({
                icon: "i-heroicons-check-badge",
                title: 'Success !',
                id: 'modal-success'
            })
            modal.close()
            fetchMovie()
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


function openEditWriterModal() {

    modal.open(EditWriterModal, {
        movieid: route.params.id,
        onSuccess() {
            toast.add({
                icon: "i-heroicons-check-badge",
                title: 'Success !',
                id: 'modal-success'
            })
            modal.close()
            fetchMovie()
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


function openEditCastModal() {

    modal.open(EditCastModal, {
        movieid: route.params.id,
        onSuccess() {
            toast.add({
                icon: "i-heroicons-check-badge",
                title: 'Success !',
                id: 'modal-success'
            })
            modal.close()
            fetchMovie()
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


function openEditStreamingModal() {

    modal.open(EditStreamingModal, {
        movieid: route.params.id,
        onSuccess() {
            toast.add({
                icon: "i-heroicons-check-badge",
                title: 'Success !',
                id: 'modal-success'
            })
            modal.close()
            fetchMovie()
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


function openEditTrailerModal() {

    modal.open(EditTrailerModal, {
        movieid: route.params.id,
        onSuccess() {
            toast.add({
                icon: "i-heroicons-check-badge",
                title: 'Success !',
                id: 'modal-success'
            })
            modal.close()
            fetchMovie()
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


function openEditDurationModal() {

    modal.open(EditDurationModal, {
        movieid: route.params.id,
        onSuccess() {
            toast.add({
                icon: "i-heroicons-check-badge",
                title: 'Success !',
                id: 'modal-success'
            })
            modal.close()
            fetchMovie()
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

function openEditReleaseDateModal() {

    modal.open(EditReleaseDateModal, {
        movieid: route.params.id,
        onSuccess() {
            toast.add({
                icon: "i-heroicons-check-badge",
                title: 'Success !',
                id: 'modal-success'
            })
            modal.close()
            fetchMovie()
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


function openEditMovieCategoryModal() {

    modal.open(EditMovieCategoryModal, {
        movieid: route.params.id,
        onSuccess() {
            toast.add({
                icon: "i-heroicons-check-badge",
                title: 'Success !',
                id: 'modal-success'
            })
            modal.close()
            fetchMovie()
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


function openEditPosterModal() {

modal.open(EditPosterModal, {
    movieid: route.params.id,
    onSuccess() {
        toast.add({
            icon: "i-heroicons-check-badge",
            title: 'Success !',
            id: 'modal-success'
        })
        modal.close()
        fetchMovie()
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
</script>

<template>
    <div class="w-full h-full bg-[#0D0A0E] overflow-y-auto relative flex ">
        <div class="h-full w-[25%] flex-col">
            <div class="w-full h-[55%] flex items-start justify-center">
                <img :src="posterUrl" alt="Poster" class="w-[70%] h-[100%] object-cover rounded-xl ">
            </div>
            <div class="w-full flex justify-center flex-col text-center mt-4 gap-2">
                <h1>Average Score</h1>
                <h1 class="text-5xl font-black"><span class="text-[#ff0000] mr-4">&#9733</span>{{ movie.avgRating != 0 ?
                    `${movie.avgRating}` : '-' }}</h1>
            </div>
            <div class="w-full flex justify-center flex-col text-center mt-4 gap-2">

                <div class="">
                    <h1 class="text-orange-600 font-semibold">Duration <br><span class="text-white font-normal">{{
                        movie.duration != null ?
                            convertMinutesToHours(movie.duration) : '-' }}</span></h1>
                    <h1 class="text-orange-600 font-semibold">Release Date <br><span class="text-white font-normal">{{
                        movie.releaseDate != null ? formatOnlyDate(movie.releaseDate) : '-' }}</span></h1>
                    <h1 class="text-orange-600  font-semibold">Categories<br><span class="text-white font-normal">{{
                        category }}
                        </span></h1>
                </div>
            </div>
            <div class="w-full flex justify-center mt-5 " v-if="role != 'GUEST'">
                <Button :name="'Review'" :icon="'material-symbols:reviews-rounded'" @click="openModal" />
            </div>
        </div>



        <div class="h-full w-[45%] overflow-auto ">
            <iframe :src="movie.trailer" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" class="w-full h-[55%]" allowfullscreen></iframe>

            <div class="mt-5 gap-3 scroll-container ">
                <h3 class="text-2xl mt-5 font-bold">Synopsis</h3>
                <div class="w-[55%] bg-gradient-to-r from-[#ff0000] to-[#0D0A0E] h-[3px] mt-2 mb-3"></div>
                <div class="">
                    <h1 class="text-white font-normal">{{ movie.description }}</h1>
                </div>
                <h3 class="text-xl mt-5 font-bold text-orange-600">Director <span
                        class="text-white font-normal">{{ director }} </span>
                </h3>
                <h3 class="text-xl mt-5 font-bold text-orange-600">Writer <span class="text-white font-normal">{{
                        writer}} </span></h3>


                <h3 class="text-xl mt-5 font-bold text-orange-600">Actor <span class="text-white font-normal">{{ actor
                        }}</span></h3>

                <h3 class="text-xl mt-5 font-bold text-orange-600">Rate <span
                        class="text-white font-normal">{{ movie.movierate }} </span></h3>

                <div class="flex gap-4 mt-2">
                    <h3 class="text-2xl mt-5 font-bold ">See Movie : </h3>
                    <img :src="steamingLogo" alt="Poster" class="w-[8%] h-[8%] object-cover rounded-xl "
                        v-if="movie.streaming != 'disney+hostar' && movie.streaming != 'cinema'">
                    <img :src="steamingLogo" alt="Poster" class="w-[10%] h-[10%] object-cover rounded-xl " v-else>
                </div>
            </div>


        </div>
        <div class=" w-[30%] flex-col ">
            <div class="w-full text-center flex justify-center gap-1 text-xl">
                <UIcon name="ic:round-reviews" class="mt-1 text-[#ff0000]"></UIcon>
                <h1>Reviews <span v-if="reviewCount != 0">({{ reviewCount }})</span></h1>
            </div>

            <div v-if="reviewCount == 0" class="w-full flex justify-center  ">
                <h1>No Review</h1>
            </div>
            <div v-else class="review-container w-[100%]  flex flex-col  items-center gap-2">
                <ReviewCard v-for="reviewTarget in movie.reviews" :review="reviewTarget" :showRemove="role == 'ADMIN'"
                    :movieId="parseInt(route.params.id)" @fetch="fetchMovie()" class=" h-[35%]" />
            </div>
            <div class=" h-[200px] w-[30%]  absolute bottom-4 right-3 flex items-end justify-center"
                v-if="role == 'ADMIN'">
                <div class="grid grid-cols-3 w-[90%]  gap-3 h-[70%] ">
                    <button class="flex hover:bg-blue-400 rounded-2xl  gap-2 justify-center items-center bg-blue-900"
                        @click="openEditDetailModal">
                        <UIcon name="material-symbols:info-outline" class=""> </UIcon>Edit Synopsis
                    </button>
                    <button class="flex hover:bg-blue-400 rounded-2xl  gap-2 justify-center items-center bg-blue-900"
                        @click="openEditDirectorModal">
                        <UIcon name="material-symbols:info-outline" class=""> </UIcon>Edit Director
                    </button>
                    <button class="flex hover:bg-blue-400 rounded-2xl  gap-2 justify-center items-center bg-blue-900"
                        @click="openEditWriterModal">
                        <UIcon name="material-symbols:info-outline" class=""> </UIcon>Edit Writer
                    </button>
                    <button class="flex hover:bg-blue-400 rounded-2xl  gap-2 justify-center items-center bg-blue-900"
                        @click="openEditCastModal">
                        <UIcon name="material-symbols:info-outline" class=""> </UIcon>Edit Actor
                    </button>
                    <button class="flex hover:bg-blue-400 rounded-2xl  gap-2 justify-center items-center bg-blue-900"
                        @click="openEditStreamingModal">
                        <UIcon name="material-symbols:info-outline" class=""> </UIcon>Edit Steaming
                    </button>
                    <button class="flex hover:bg-blue-400 rounded-2xl  gap-2 justify-center items-center bg-blue-900"
                        @click="openEditTrailerModal">
                        <UIcon name="material-symbols:info-outline" class=""> </UIcon>Edit Trailer
                    </button>
                    <button class="flex hover:bg-blue-400 rounded-2xl  gap-2 justify-center items-center bg-blue-900"
                        @click="openEditDurationModal">
                        <UIcon name="material-symbols:info-outline" class=""> </UIcon>Edit Duration
                    </button>
                    <button class="flex hover:bg-blue-400 rounded-2xl  gap-2 justify-center items-center bg-blue-900"
                        @click="openEditReleaseDateModal">
                        <UIcon name="material-symbols:info-outline" class=""> </UIcon>Edit Release
                    </button>
                    <button class="flex hover:bg-blue-400 rounded-2xl  gap-2 justify-center items-center bg-blue-900"
                        @click="openEditMovieCategoryModal">
                        <UIcon name="material-symbols:info-outline" class=""> </UIcon>Edit Category
                    </button>
                    <button class="flex hover:bg-blue-400 rounded-2xl  gap-2 justify-center items-center bg-blue-900"
                        @click="openEditPosterModal">
                        <UIcon name="material-symbols:info-outline" class=""> </UIcon>Edit Poster
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.scroll-container {
    height: 300px;
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



.review-container {
    height: 500px;
    /* Example: fixed height */
    overflow-y: scroll;
    /* Allow scrolling */
}

/* Hide scrollbar for WebKit browsers */
.review-container::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for Firefox */
.review-container {
    scrollbar-width: none;
}
</style>