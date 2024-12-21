export const useMovieStore = defineStore('Movie', {
    state: () => ({
        title: "index"
    }),
    actions: {
        setTitle(title) {
            this.title= title
        }
    },
    getters: {
        getTitle() {
            return this.title
        }
    }
})