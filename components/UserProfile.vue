<script setup>
const router = useRouter()
const toast = useToast()
const role = ref('GUEST')
const username = ref('')
const fullname = ref('')
let userId = 0
const toggleClass=ref(false)
const toggleAdminmode = ref(true)
onBeforeMount(async () => {
    let roleUser = localStorage.getItem("UserRole")
    fullname.value = localStorage.getItem("Fullname")
    username.value = localStorage.getItem("Username")
    userId = localStorage.getItem("UserID")
    if (roleUser) {
        role.value = roleUser
        toggleAdminmode.value=localStorage.getItem("UserRole")=='ADMIN'
    }
    toggleClass.value=role=='GUEST'


})

// State to toggle dropdown
const isDropdownOpen = ref(false)

// Function to toggle dropdown
const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
}

const logout = () => {
    localStorage.clear()
    window.location.reload(true)
}

const godetail = () => {
    isDropdownOpen.value = false
    router.push(`/users/${userId}`)
}


const toggleRole = () => {
    // console.log("sss")
    
    if(toggleAdminmode.value){
        localStorage.setItem("UserRole","USER_IMPERSONATE")
        window.location.reload(true)
        toggleAdminmode.value=false
    }else{
        localStorage.setItem("UserRole","ADMIN")
        window.location.reload(true)
        toggleAdminmode.value=true
    }
    
}
</script>
<template>
    <div class=" w-80 flex flex-row gap-6 absolute right-3 top-3 items-center justify-center" v-if="role != 'GUEST'">
        <div class="flex items-center space-x-3 p-3 bg-black rounded-2xl shadow-md z-20">
            <!-- Profile Image -->
            <img class="w-10 h-10 rounded-full" src="/images/userprofile.png" alt="Profile Picture" />

            <!-- User Info -->
            <div class="flex flex-col">
                <span class="text-lg font-semibold text-gray-100">{{ fullname }}</span>
                <span class="text-sm text-gray-400">@{{ username }}</span>
                <div class="flex text-xs gap-2 items-center mt-2" v-if="role!='USER' && role!='GUEST'">
                    <UToggle size="md" color="emerald" on-icon="i-heroicons-check-20-solid"
                        off-icon="i-heroicons-x-mark-20-solid" :model-value="toggleAdminmode"
                        @update:model-value="toggleRole" />
                    <span class="">ADMIN MODE</span>
                </div>

            </div>

            <button class="text-gray-200" @click="toggleDropdown">
                <UIcon
                    :name="isDropdownOpen ? 'material-symbols:arrow-drop-up-rounded' : 'material-symbols:arrow-drop-down-rounded'"
                    class="w-6 h-6" />
            </button>
        </div>
    </div>
    <div  v-if="role != 'GUEST' && isDropdownOpen" 
        class="absolute right-[4.0rem]  w-48 bg-black  rounded-md shadow-lg z-30" :class="toggleClass ? 'mt-[85px]':'mt-[112px]'">
        <ul class="py-2">
            <li>
                <p @click="godetail" class="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff0000] hover:text-white cursor-default">
                    Profile
            </p>
            </li>
            <li>
                <p @click="logout" class="block px-4 py-2 text-sm text-gray-200 hover:bg-[#ff0000] hover:text-white cursor-default">
                    Logout
                </p>
            </li>
        </ul>
    </div>
    <!-- <div class=" w-80 flex flex-row gap-6 absolute right-3 top-12 items-center justify-center" v-else>

                <Button :name="'LOGIN'" :icon="'material-symbols:login'" />
      
</div> -->
    <div class=" w-80 flex flex-row gap-6 absolute right-3 top-3 items-center justify-center" v-else>
        <div class="flex items-center space-x-3 p-3 bg-black rounded-2xl shadow-md text-center">
            <!-- Profile Image -->
            <!-- <img class="w-10 h-10 rounded-full" src="/images/userprofile.png" alt="Profile Picture" /> -->

            <!-- User Info -->
            <div class="flex flex-col">
                <span class="text-lg font-semibold text-gray-100">GUEST</span>
                <Button :name="'LOGIN'" :icon="'material-symbols:login'" @click="router.push('/login')" />
            </div>
        </div>
    </div>



</template>

<style scoped>
[v-cloak] {
    display: none;
}
</style>