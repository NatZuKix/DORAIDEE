<script setup>
const router = useRouter()
</script>

<template>
    <div @click="router.back()">
        <UIcon name="material-symbols-light:arrow-back-2-rounded" class="w-5 h-5"/>
        <p>Back</p>
    </div>
</template>

<style scoped>
div {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #ff0000;
    cursor: pointer;
    top: 1.5%;
    left: 1%;
}

div p {
    font-weight: bold;
}

div:hover {
    color: whitesmoke
}
</style>