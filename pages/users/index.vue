<script setup>
import { usePageStore } from '~/stores/Page'
import { getUsers } from '~/composable/GET/getUsers'
import { RemoveUserModal } from '#components'
const PageStore = usePageStore()
const router = useRouter()
const users = ref([])
const meta = ref({})
const page = ref(1)
const modal = useModal()
const toast = useToast()
definePageMeta({
    middleware: "auth", // Use the 'auth' middleware
})

onBeforeMount(async () => {
    setPageLayout('default')
    PageStore.setCurrentPage('MangeUsers', `managment user of duraidee`)
    let fetchData = await getUsers(1, 5)
    users.value = fetchData.data
    meta.value = fetchData.meta
})

async function pageChange() {
    let fetchData = await getUsers(page.value, 5)
    users.value = fetchData.data
    meta.value = fetchData.meta
}

const UserColumn = [
    {
        key: 'id',
        label: 'ID'
    },
    {
        key: 'fullname',
        label: 'Fullname'
    }, {
        key: 'role',
        label: 'Role'
    }, {
        key: 'username',
        label: 'Username'
    }, {
        key: 'actions'
    }]

const items = row => [
    [
        {
            label: 'View',
            icon: 'heroicons:eye-16-solid',
            click: () => { router.push(`/users/${row.id}`) }
        },
        {
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
            click: () => { openUserRemoveModal(row.id,row.fullname) }
        }
    ]
]

function openUserRemoveModal(userid,fullname) {
    modal.open(RemoveUserModal, {
        userId: userid,
        username:fullname ,
        onSuccess() {
            modal.close()
            toast.add({
                icon: "i-heroicons-check-badge",
                title: 'Remove user successful',
                id: 'Remove-user-success'
            })
            pageChange()
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
            // console.log("emit close")
            
            modal.close()
        }
    })
}
</script>

<template>
    <div class="w-full h-full bg-[#0D0A0E] overflow-y-auto " v-if="users.length != 0">
        <UPagination v-model="page" :page-count="meta.perPage" :total="meta.total"
            :active-button="{ variant: 'none', class: 'text-white bg-[#ff0000]' }" class="mb-3"
            @update:modelValue="pageChange" />

        <UTable :columns="UserColumn" :rows="users" :ui="{
            th: {
                base: 'text-left bg-[#ff0000]',
                padding: 'px-4 py-3.5',
                color: 'text-white',
                font: 'font-semibold',
                size: 'text-md',
            }, td: {
                base: 'text-left',
                padding: 'px-4 py-3.5',
                color: 'text-white',
                font: 'font-thin',
                size: 'text-sm',
            }
        }" class=" rounded-2xl">
            <template #empty-state>
                <div class="flex flex-col items-center justify-center py-6 gap-3">
                    <img src="/icons/empty.png" class="w-24 h-24" />
                    <span class="text-2xl text-black">No User!</span>
                </div>
            </template>
            <template #actions-data="{ row }">
                <UDropdown :items="items(row)">
                    <UButton color="white" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                </UDropdown>
            </template>
        </UTable>

    </div>
    <div v-else class="w-full h-full bg-[#0D0A0E] flex justify-center items-center">
        <div class="flex flex-col justify-center items-center">
            <img src="/images/userprofile.png" class="h-[50%] w-[50%]" />
            <h1 class="text-center text-xl">Dont have any users</h1>
        </div>
    </div>
</template>



<style scoped></style>
