<script setup>
import { getUserById } from '~/composable/GET/getUserById'
import { usePageStore } from '~/stores/Page'
import { formatDate } from '~/composable/utils/formatDate'
import { toggleAdmin } from '~/composable/PUT/toggleAdmin'
 import { RemoveUserModal } from '#components'
import { UserChangeCategoryModal } from '#components'

const PageStore = usePageStore()
const route = useRoute()
const router = useRouter()
const user = ref({})
const toast = useToast()
const modal = useModal()
const role = ref('GUEST')
const categoryList = ref('-')
const fetchUserData = async () => {
    try {
        // Fetch employee data only once and store it in a variable
        const userData = await getUserById(route.params.id)
        if (userData == null) {
            toast.add({
                icon: "ic:round-error",
                title: 'Oops!',
                color: "red",
                description: 'Something went wrong. Please try again.',
                id: 'getEmp-fail',
                type: 'error'
            })
            if (localStorage.getItem("UserRole") == 'ADMIN') {
                router.push(`/users`)
            } else {
                router.push(`/movies`)
            }

            return// Exit if employee data is not found
        }
        // Assign employee data to the reactive variable
        user.value = userData
    } catch (error) {
        // Handle any other errors that might occur
        toast.add({
            icon: "ic:round-error",
            title: 'Error!',
            color: "red",
            description: 'Unable to fetch employee data. Please try again.',
            id: 'getEmp-error',
            type: 'error'
        })
        // console.error("Error fetching employee data:", error)
    }
}

onBeforeMount(async () => {
    PageStore.setCurrentPage('MangeUsers', `User Detail : ${route.params.id}`)
    await fetchUserData()
    let roleUser = localStorage.getItem("UserRole")
    if (roleUser) {
        role.value = roleUser
    }
    // console.log(user.value.favoritecategories)

    categoryList.value = getCategories(user.value.favoritecategories)
})

function openModal() {
    modal.open(UserChangeCategoryModal, {
        userId: route.params.id,
        onSuccess() {
            modal.close()
            toast.add({
                icon: "i-heroicons-check-badge",
                title: 'Change category successful',
                id: 'Changecategory-success'
            })
            window.location.reload(true)
        },
        onFail() {
            toast.add({
            icon: "ic:round-error",
            title: 'Oops!',
            color: "red",
            description: 'Something went wrong. Please try again.',
            id: 'Changecategory-fail',
            type: 'error'
        })
            modal.close()
        },
        onClose() {
            modal.close()
        }
    })
}

function openUserRemoveModal() {
    modal.open(RemoveUserModal, {
        userId: route.params.id,
        username:user.value.fullname,
        onSuccess() {
            modal.close()
            toast.add({
                icon: "i-heroicons-check-badge",
                title: 'Remove user successful',
                id: 'Remove-user-success'
            })
            if(role.value=="ADMIN"){
                router.push('/users')
            }else{
                localStorage.clear()
                router.push('/movies')
            }
            window.location.reload(true)

        },
        onFail() {
            toast.add({
            icon: "ic:round-error",
            title: 'Oops!',
            color: "red",
            description: 'Something went wrong. Please try again.',
            id: 'Changecategory-fail',
            type: 'error'
        })
            modal.close()
        },
        onClose() {
            modal.close()
        }
    })
}


async function grantAdmin() {

    let result = await toggleAdmin(parseInt(route.params.id), "grant")
    if (result == 401) {
        localStorage.clear()
        alert('Your session has expired. Please log in again.')
        window.location.reload(true)
        return
    }
    if (result == 404) {
        alert('Not found User')
        return
    }

    if (result != null) {
        window.location.reload(true)
    } else {
        toast.add({
            icon: "ic:round-error",
            title: 'Oops!',
            color: "red",
            description: 'Something went wrong. Please try again.',
            id: 'getEmp-fail',
            type: 'error'
        })
    }
}


async function removeAdmin() {
    let result = await toggleAdmin(parseInt(route.params.id), "remove")
    if (result == 401) {
        localStorage.clear()
        alert('Your session has expired. Please log in again.')
        window.location.reload(true)
        return
    }
    if (result == 404) {
        alert('Not found User')
        return
    }

    if (result != null) {
        window.location.reload(true)
    } else {
        toast.add({
            icon: "ic:round-error",
            title: 'Oops!',
            color: "red",
            description: 'Something went wrong. Please try again.',
            id: 'getEmp-fail',
            type: 'error'
        })
    }
}

function getCategories(categorySting) {

    const categoriesArray = JSON.parse(categorySting)// Convert to an array
    if(categoriesArray.length==0)return'-'
    const formattedString = categoriesArray.join(', ')// Join array elements with ", "
    return formattedString
}

</script>

<template>
    <div class="employee-container bg-[#0D0A0E]">
        <Back />
        <div class="employee-sample">
            <img src="/images/userprofile.png" quality="100" alt="Profile Image" />
            <div class="employee-sample-data">
                <p class="employee-sample-name">{{ user.fullname }} </p>
                <p class="employee-sample-role">{{ user.role }}</p>
            </div>
            <div class="employee-actions">
                <UButton @click="openModal" icon="i-heroicons-pencil-square-20-solid" color="indigo" variant="soft"
                    label="Choose Category" size="md" />
                <UButton @click="grantAdmin" icon="eos-icons:admin" color="blue" variant="soft" label="Make Admin"
                    size="md" v-if="role == 'ADMIN' && user.role == 'USER'" />
                <UButton @click="removeAdmin" icon="eos-icons:admin" color="red" variant="soft" label="Remove Admin"
                    size="md" v-if="role == 'ADMIN' && user.role == 'ADMIN'" />
                <UButton @click="openUserRemoveModal" icon="i-heroicons-trash-20-solid" color="red" variant="soft" label="Delete"
                    size="md" />

            </div>
        </div>
        <div class="employee-personal-information section-outline">
            <h2 class="text-2xl text-white font-bold">Personal Information</h2>
            <div class="information-group">
                <PersonalInformation :label="'Fullname'" :information="user.fullname" />
                <PersonalInformation :label="'Username'" :information="user.username" />
                <PersonalInformation :label="'Role'" :information="user.role" />
                <PersonalInformation :label="'Favorite Category'" :information="categoryList" />
                <PersonalInformation :label="'Created On'" :information="formatDate(user.createdAt)" />
                <PersonalInformation :label="'Last Updated'" :information="formatDate(user.updatedAt)" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.employee-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 3rem 2rem;
    gap: 1rem;
}

.section-outline {
    border: 1px solid rgba(100, 116, 139, 0.3);
    border-radius: 1.5rem;
    padding: 2rem;
}

.employee-sample {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
}

.employee-sample img {
    width: 10rem;
    height: 10rem;
    border-radius: 100%;
    object-fit: cover;

    @media (min-width: 820px) {
        width: 12rem;
        height: 12rem;
    }
}

.employee-sample .employee-sample-data {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.employee-sample .employee-sample-name {
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
}

.employee-sample .employee-sample-role {
    color: #ff0000;
    font-weight: bold;
    font-size: 0.9rem;
}

.employee-sample .employee-actions {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 0.75rem;

    @media (min-width: 820px) {
        justify-content: flex-end;
    }
}

.employee-personal-information {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
}

.information-group {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>