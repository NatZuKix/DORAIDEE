<template>
  <div>
      <p>{{ props.label }}</p>
      <p>{{ props.information }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
      type: String,
      require: true
  },
  information: {
      type: String,
      require: true
  }
})
</script>

<style scoped>

div {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  margin-top: 20px;

  @media (min-width: 820px) {
      width: 50%;
  }
}

div p:nth-child(1) {
  font-weight: bold;
  color: #ff0000;
  font-size: 0.9rem;
}

div p:nth-child(2) {
  font-weight: bold;
  color: white;
  font-size: 1rem;
}
</style>
