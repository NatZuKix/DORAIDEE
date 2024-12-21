<template>
  <UModal>
    <div class="flex flex-col bg-[#0D0A0E] p-4 rounded-lg text-white">
      <h1 class="text-center text-2xl font-bold mb-10 text-white">Choose your favorite <span class="text-[#ff0000]">categories</span></h1>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div v-for="category in categoriesList" :key="category" class="flex items-center cursor-pointer">
          <button @click="toggleCategory(category)" :class="{
            'bg-[#ff0000] text-white': selectedCategories.includes(category),
            'bg-gray-700 text-gray-300': !selectedCategories.includes(category)
          }" class="w-full px-4 py-2 rounded-lg transition-colors text-center">
            {{ category }}
          </button>
        </div>

      </div>
      <div class="w-full flex justify-center">
        <UButton @click="save" icon="i-heroicons-pencil-square-20-solid" color="green" variant="soft" label="Save"
          size="md" class="mt-10 w-[30%]" />

      </div>
    </div>

  </UModal>
</template>

<script setup>
import {changUserFavoriteCategory} from '~/composable/PUT/changUserFavoriteCategory'
import { ref } from 'vue'

const toast = useToast()
const props =defineProps({
  userId: {
    type: Number,
    required:true
  }
})

const selectedCategories = ref([])
const categoriesList = [
  "Action",
  "Comedy",
  "Drama",
  "Romance",
  "Horror",
  "SciFi",
  "Fantasy",
  "Thriller",
  "Documentary"
]

const toggleCategory = (category) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter(item => item !== category)
  } else {
    selectedCategories.value.push(category)
  }
}
const emit = defineEmits(['success', 'fail', 'close'])

const save = async() => {
  let Result = await changUserFavoriteCategory(props.userId,selectedCategories.value)
  if(Result == 401){
    localStorage.clear()
    alert('Your session has expired. Please log in again.')
    window.location.reload(true)
    return
  }
  if(Result == 400){
    toast.add({
            icon: "ic:round-error",
            title: 'Oops!',
            color: "red",
            description: 'Invalid Category. Please try again.',
            id: 'Changecategory-fail',
            type: 'error'
        })
        emit('close')
    return
  }

  if(Result == 404){
    toast.add({
            icon: "ic:round-error",
            title: 'Oops!',
            color: "red",
            description: 'Not Found User. Please try again.',
            id: 'Changecategory-fail',
            type: 'error'
        })
        emit('close')
    return
  }
  // console.log(Result)
  

  if (Result != null) {
    
        emit('success')
  } else {
    
        emit('fail')
  }
}
</script>

<style scoped>
/* No additional styles are necessary as Tailwind CSS handles the styling. */
</style>