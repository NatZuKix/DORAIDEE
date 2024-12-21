<template>
    <div :class="props.select ? 'select':'link'" @click="doSomething(props)">
        <div class="w-[3%] h-[20px] bg-white rounded-xl " :class="props.select ? '':'hidden'"></div>
        <a>
            <p class="bg-red-700 "></p>
            <UIcon v-if="props.icon" :name="props.icon" class="w-6 h-6" :class="props.select?'text-red-700':''"/>
            <span>{{ props.name }}</span>
        </a>
    </div>
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
    },
    variant: {
        type: String
    },
    event: {
        type: String
    },
    route: {
        type: String
    },
    select:{
        type:Boolean
    }
})

const doSomething = (link) => {
    if (link.route) {
        router.push(link.route)
    }
}

</script>

<style scoped>
.link {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.8rem;
    cursor: pointer;
    border-radius: 0.75rem;
    color: #65768d;
    transition-duration: 150ms;
}

.link:hover {
    background-color: #ff0000;
    color: white
}

.link a {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.25rem;
    user-select: none;
}

.link a span {
    font-weight: 400;
    font-size: 15px;
}

.select {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.8rem;
    cursor: pointer;
    border-radius: 0.75rem;
    color: white;
    transition-duration: 150ms;
}

  

.select a {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.25rem;
    user-select: none;
}

.select a span {
    font-weight: 400;
    font-size: 15px;
}
</style>
