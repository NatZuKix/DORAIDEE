<script setup>
import { removeMovie} from '~/composable/DELETE/removeMovie'

const props = defineProps({
    movieId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})



const emit = defineEmits(['success', 'fail', 'close'])

async function remove() {
  let result  = await removeMovie(props. movieId)
  if(result == 401){
    localStorage.clear()
    alert('Your session has expired. Please log in again.')
    emit('close')
    window.location.reload(true)
    return
  }
  if(result == 404){
    alert('Not found Movie')
    emit('close')
    return
  }
 
  if (result != null) {
    emit('success')
  } else {
    emit('fail')
  }
}

function cancel() {
    emit('close')
}
</script>

<template>
    <UModal class="bg-[#0D0A0E] font-noto">
            <div class="flex flex-col gap-3 p-6 bg-[#0D0A0E] rounded-xl w-full h-full">
                <!-- Icon -->
                <div class="flex justify-center">
                    <img src="/icons/alerts.png" alt="Alert Icon" class="w-20 h-20" />
                </div>

                <!-- Modal Detail -->
                <div class="flex flex-col items-center text-center gap-2">
                    <h1 class="text-lg font-bold text-white">Delete Movie</h1>
                    <p class="text-gray-400">You're going to delete <span class="bg-[#4d4e50] text-white  px-2 rounded-lg font-semibold">{{ title }}</span> <br>Are you sure?</p>
                </div>

                <!-- Actions -->
                <div class="flex justify-center mt-5 gap-5">
                    <UButton 
                        label="No, Keep It." 
                        @click="cancel" 
                        variant="soft" 
                        color="gray" 
                        size="lg" 
                        :ui="{ font: 'font-bold' }" 
                    />
                    <UButton 
                        label="Yes, Delete!" 
                        @click="remove" 
                        variant="solid" 
                        color="red" 
                        size="lg" 
                        :ui="{ font: 'font-bold' }" 
                    />
                </div>
            </div>
    </UModal>
</template>

<style scoped>
/* Optional: Additional custom styles */
</style>
