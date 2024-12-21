<script setup>
import { register } from "~/composable/POST/register"
onBeforeMount(() => {
    setPageLayout('register')
})

const toast = useToast()
const router = useRouter()
const fullname = ref("")
const username = ref("")
const password = ref("")
const confirmPassword = ref("")
const error = ref(null)

async function goRegister() {
    if(fullname.value.trim()==""){
        error.value = "Fullname is required!"
        return
    }

    if(username.value.trim()==""){
        error.value = "Username is required!"
        return
    }

    if (password.value !== confirmPassword.value) {
        error.value = "Passwords do not match!"
        return
    }

    const result = await register(username.value.trim(),fullname.value.trim(),  password.value.trim(),confirmPassword.value.trim())
    if (result) {
        toast.add({ title: "Registration Successful" })
        router.push("/login")
    } else {
        error.value = "Registration failed. Please try again."
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#ff0000] to-[#0D0A0E] font-noto">
        <div class="bg-[#0D0A0E] p-8 rounded-lg shadow-lg max-w-sm w-full relative">
            <button class="text-2xl absolute top-3 right-3 hover:text-white text-gray-700 transition"
                @click="router.back()">
                <UIcon name="material-symbols-light:cancel" class="w-10 h-10" />
            </button>

            <!-- Title -->
            <h2 class="text-2xl font-bold text-center text-white mb-6">Register</h2>

            <!-- Fullname Field -->
            <div class="mb-4">
                <label for="fullname" class="block text-gray-200 mb-1">Fullname</label>
                <input id="fullname" placeholder="Enter your full name" v-model="fullname" class="w-full px-3 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black" required />
            </div>

            <!-- Username Field -->
            <div class="mb-4">
                <label for="username" class="block text-gray-200 mb-1">Username</label>
                <input id="username" placeholder="Enter your username" v-model="username" class="w-full px-3 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black" required />
            </div>

            <!-- Password Field -->
            <div class="mb-4">
                <label for="password" class="block text-gray-200 mb-1">Password <span class="text-xs text-gray-400">(At least 6 characters)</span></label>
                <input type="password" id="password" placeholder="Enter your password" v-model="password" class="w-full px-3 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black" required />
            </div>

            <!-- Confirm Password Field -->
            <div class="mb-4">
                <label for="confirmPassword" class="block text-gray-200 mb-1">Confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm your password" v-model="confirmPassword" class="w-full px-3 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black" required />
            </div>

            <!-- Error Message -->
            <p v-if="error" class="text-red-500 text-sm mb-4 font-semibold">{{ error }}</p>

            <!-- Submit Button -->
            <button type="submit" class="w-full bg-[#ff0000] text-white py-2 rounded-lg hover:bg-[#000000] transition duration-75" @click="goRegister">
                Register
            </button>

            <!-- Login Link -->
            <p class="text-gray-400 text-center text-sm mt-4 cursor-default">
                Already have an account?
                <span class="text-[#ff0000] hover:underline cursor-pointer" @click="router.push('/login')">Login</span>
            </p>
        </div>
    </div>
</template>

<style scoped>
/* Optional: Add more custom styles here if needed */
</style>