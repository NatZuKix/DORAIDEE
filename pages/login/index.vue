<script setup>
import { login } from "~/composable/POST/login"
import { getTokenPayload } from "~/composable/utils/jwtUtil"
onBeforeMount(() => {
    setPageLayout('login')
})
const toast = useToast()
const router = useRouter()
const username = ref()
const password = ref()
const error = ref(false)
async function goLogin() {
    const result = await login(username.value, password.value)
    // console.log(result)
    if (result) {
        localStorage.setItem("Token", result.token)
        let payload = getTokenPayload(result.token)
        localStorage.setItem("Fullname", payload.fullname)
        localStorage.setItem("UserID", payload.userId)
        localStorage.setItem("Username", payload.username)
        localStorage.setItem("UserRole", payload.role)
        toast.add({ title: 'Login Succressfuly' })
        router.push('/movies')
    } else {
        error.value = true
    }
}
onBeforeMount(async () => {
    let token = localStorage.getItem("Token")
    if (token) {
        router.push('/movies')
    }
})


</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#ff0000]  to-[#0D0A0E] font-noto">
        <div class="bg-[#0D0A0E] p-8 rounded-lg shadow-lg max-w-sm w-full relative">

            <button class="text-2xl absolute top-3 right-3  hover:text-white  text-gray-700 transition"
                @click="router.back()">
                <UIcon name="material-symbols-light:cancel" class="w-10 h-10" />
            </button>
            <!-- Title -->
            <h2 class="text-2xl font-bold text-center text-white mb-6">Login</h2>


            <!-- Email Field -->
            <div class="mb-4">
                <label for="username" class="block text-gray-200 mb-1">Username</label>
                <input id="username" placeholder="Enter your username" v-model="username" @input="error = false"
                    class="w-full px-3 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
                    required />
            </div>

            <!-- Password Field -->
            <div class="mb-4">
                <label for="password" class="block text-gray-200 mb-1">Password</label>
                <input type="password" id="password" placeholder="Enter your password" v-model="password"
                    @input="error = false"
                    class="w-full px-3 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
                    required />
            </div>

            <!-- Error Message -->
            <p v-if="error" class="text-red-500 text-sm mb-4 font-semibold">Username or Password Is Wrong!</p>

            <!-- Submit Button -->
            <button type="submit"
                class="w-full bg-[#ff0000] text-white py-2 rounded-lg hover:bg-[#000000] transition duration-75"
                @click="goLogin">
                Login
            </button>


            <!-- Register Link -->
            <p class="text-gray-400 text-center text-sm mt-4 cursor-default">
                Don't have an account?
                <span class="text-[#ff0000] hover:underline cursor-pointer" @click="router.push('/register')">Register</span>
            </p>
        </div>
    </div>
</template>

<style scoped>
/* Optional: Add more custom styles here if needed */
</style>
