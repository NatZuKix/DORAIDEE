async function createMovie(title, description, director, writer, cast, movieRate, streaming) {
    const runtimeConfig = useRuntimeConfig()
    const url = runtimeConfig.public.API_URL + "movies/"
    const Token = localStorage.getItem("Token")

    // Ensure Token exists before proceeding
    if (!Token) {
        console.error('No token found')
        return null
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}`, // Add Bearer token to the header
            },
            body: JSON.stringify({
                title: title,
                description: description,
                director: JSON.stringify(director),
                writer: JSON.stringify(writer),
                cast: JSON.stringify(cast),
                movierate: movieRate,
                streaming: streaming
            }),
        })

        // Check if the response status is not 200
        if (response.status == 200) {
            const data = await response.json()
            return { status: 200, data: data }
        }
        if (response.status == 400) {
            const data = await response.json()
            return { status: 400, data: data }
        }
        if (response.status == 401) {
            return { status: 401}
        }
        else {
            return null
        }
    } catch (error) {
        console.error('Error fetching data:', error)
        return null
    }
}

export { createMovie }
