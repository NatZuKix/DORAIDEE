export const usePageStore = defineStore('Page', {
    state: () => ({
        currentPage: "index",
        description: "page index"
    }),
    actions: {
        setCurrentPage(page, description) {
            this.currentPage = page
            this.description = description
        }
    },
    getters: {
        getCurrentPage() {
            return this.currentPage
        },
        getDescription() {
            return this.description
        }
    }
})