<script setup>
import { usePageStore } from '~/stores/Page'
const PageStore = usePageStore()

const route = useRoute()
const router = useRouter()
const role = ref('GUEST')

const page = ref(PageStore.getCurrentPage)



function changepage(currentPage) {
    page.value = currentPage
}

onBeforeMount(async () => {
    let roleUser = localStorage.getItem("UserRole")
    if (roleUser) {
        role.value = roleUser
    }
    if (route.fullPath.includes("/managemovie")) {
        // console.log("ssss")

        page.value = "MangeMovies"
    }
    else if (route.fullPath.includes("/users") && role.value == 'ADMIN') {
        page.value = "MangeUsers"
    }
    else if (route.params.category) {
        page.value = route.params.category
    }
    else {
        page.value = "All"
    }
})


</script>

<template>
    <aside class="bg-[#0D0A0E]">
        <div class="brand-section pl-5">
            <img src="/icons/icon.png" alt="brandIcon" class="w-[15%] h-[15%]">
            <h1>Do<span class="text-white">Raidee</span></h1>
        </div>
        <div v-if="role != 'GUEST'">
            <h2>Recommend</h2>
            <div class="menu-section">
                <SidebarLink :name="'Movie for you'" :icon="'material-symbols:recommend-sharp'"
                    :route="'/movies/recommend'" :select="page == 'recommend'" @click="changepage('recommend')" />
            </div>
        </div>
        <h2>Movie Categories</h2>
        <div class="menu-section">
            <SidebarLink :name="'All'" :icon="'material-symbols:sports-esports'" :route="'/movies/'"
                :select="page == 'All'" @click="changepage('All')" />
            <SidebarLink :name="'Action'" :icon="'material-symbols:sports-esports'" :route="'/movies/Action'"
                :select="page == 'Action'" @click="changepage('Action')" />
            <SidebarLink :name="'Comedy'" :icon="'fluent:emoji-laugh-16-filled'" :route="'/movies/Comedy'"
                :select="page == 'Comedy'" @click="changepage('Comedy')" />
            <SidebarLink :name="'Drama'" :icon="'hugeicons:crying'" :route="'/movies/Drama'" :select="page == 'Drama'"
                @click="changepage('Drama')" />
            <SidebarLink :name="'Romance'" :icon="'material-symbols:favorite'" :route="'/movies/Romance'"
                :select="page == 'Romance'" @click="changepage('Romance')" />
            <SidebarLink :name="'Horror'" :icon="'material-symbols:skull'" :route="'/movies/Horror'"
                :select="page == 'Horror'" @click="changepage('Horror')" />
            <SidebarLink :name="'SciFi'" :icon="'material-symbols:science'" :route="'/movies/SciFi'"
                :select="page == 'SciFi'" @click="changepage('SciFi')" />
            <SidebarLink :name="'Fantasy'" :icon="'material-symbols:stars'" :route="'/movies/Fantasy'"
                :select="page == 'Fantasy'" @click="changepage('Fantasy')" />
            <SidebarLink :name="'Thriller'" :icon="'material-symbols:warning'" :route="'/movies/Thriller'"
                :select="page == 'Thriller'" @click="changepage('Thriller')" />
            <SidebarLink :name="'Documentary'" :icon="'material-symbols:video-file-rounded'"
                :route="'/movies/Documentary'" :select="page == 'Documentary'" @click="changepage('Documentary')" />

        </div>
        <div v-if="role == 'ADMIN'">
            <h2>Manage</h2>
            <div class="menu-section">
                <SidebarLink :name="'Movies'" :icon="'icon-park-outline:movie'" :route="'/managemovie'"
                    :select="page == 'MangeMovies'" @click="changepage('MangeMovies')" />
                <SidebarLink :name="'Users'" :icon="'material-symbols:account-circle'" :route="'/users'"
                    :select="page == 'MangeUsers'" @click="changepage('MangeUsers')" />
            </div>
        </div>
    </aside>
</template>

<style scoped>
aside {
    height: 100%;
    width: 256px;
    position: fixed;
    z-index: 1;
    top: 0%;
    left: 0%;
    word-wrap: break-word;
    /* ตัดคำให้อัตโนมัติ */
    word-break: break-word;
    /* ตัดคำเมื่อเกินขอบ */
    overflow: hidden;
    /* ซ่อนข้อความที่เกินขอบ */
    text-overflow: ellipsis;
    /* เพิ่ม ... เมื่อข้อความถูกตัด */
    padding: 1.5rem 0;
}

.brand-section {
    display: flex;
    flex-direction: row;
    color: rgb(0 0 0);
    align-items: center;
}

.brand-section h1 {
    font-weight: 900;
    font-size: x-large;
    color: #ff0000;
    padding-left: 10px;
}

.menu-section {
    display: flex;
    flex-direction: column;
    padding: 0.3rem 0.5rem;
    gap: 0.08rem;
}

aside div h1 {
    color: #C65D2D;
    font-size: 16px;
    font-weight: 700;

    @media (max-width: 345px) {
        font-size: 12px;
    }
}

aside h2 {
    font-size: 16px;
    font-weight: 700;
    margin-top: 10%;
    margin-left: 7%;
    color: white;

    @media (max-width: 345px) {
        font-size: 12px;
    }
}
</style>