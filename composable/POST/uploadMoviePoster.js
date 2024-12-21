async function uploadMoviePoster(movieId, file) {
    const runtimeConfig = useRuntimeConfig()
    const url = `${runtimeConfig.public.API_URL}movies/${movieId}`
    const Token = localStorage.getItem("Token")

    // Ensure Token exists before proceeding
    if (!Token) {
        console.error('No token found')
        return null
    }

    // Ensure file exists before proceeding
    if (!file) {
        console.error('No file provided')
        return null
    }

    try {
        const formData = new FormData()
        formData.append('poster', file)

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Token}`, // Add Bearer token to the header
            },
            body: formData,
        })

        // Handle response
        if (response.status === 200) {
            const data = await response.json()
            return { status: 200, data: data }
        }
        if (response.status === 400) {
            const data = await response.json()
            return { status: 400, data: data }
        } else {
            return null
        }
    } catch (error) {
        console.error('Error uploading poster:', error)
        return null
    }
}

export { uploadMoviePoster }
