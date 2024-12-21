<template>
      <button class="px-10 text-center py-1 rounded-2xl flex flex-row justify-center gap-2 bg-[#ff0000] text-white transition duration-100 hover:bg-[#f7613c] hover:text-white">
          <UIcon v-if="props.icon" :name="props.icon" class="w-6 h-6"/>
          <span>{{ props.name }}</span>
      </button>
</template>

<script setup>


const router = useRouter()

const props = defineProps({
  name: {
      type: String,
      require: true
  },
  icon: {
      type: String
  }
})


</script>

<style scoped>

</style>
