<script setup>
import { useMovieStore } from '@/stores/Movie'
const movieStore = useMovieStore()
const router = useRouter()

</script>
<template>
  <div>
    <div class="content">
      <h4 class="text-[#ff0000] hover:text-white cursor-pointer" @click="router.back()"><span><UIcon name="material-symbols-light:arrow-back-2-rounded" class="w-3 h-3"/></span>Back</h4>
    <h1>{{ movieStore.getTitle }}</h1>
    <h3>Movie details</h3>
  </div>
  </div>
</template>



<style scoped>
div .content{
  position: sticky;
  top: 0%;
  padding: 20px 10px;
  margin-left: 256px;
  background-color: #0D0A0E;
}

div h1 {
  font-size: 24px;
  font-weight: bold;
  color: whitesmoke;

  @media (min-width: 426px) {
    font-size: 32px;
  }
}

div h3 {
  font-size: 0.875rem;
  color: rgb(100, 116, 139);
}
</style>
