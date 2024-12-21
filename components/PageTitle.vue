<script setup>
import { usePageStore } from '@/stores/Page'
const PageStore =  usePageStore()
</script>
<template>
  <div>
      <h1>{{ PageStore.getCurrentPage }}</h1>
      <h3>{{ PageStore.getDescription }}</h3>
  </div>
</template>



<style scoped>

div {
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
