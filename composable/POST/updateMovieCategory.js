async function UpdateMovieCategory(movieID, categories) {
    const runtimeConfig = useRuntimeConfig()
    const url = runtimeConfig.public.API_URL + "movies/" + movieID + "/categories"
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
                data:categories
            }),
        })

        // Check if the response status is not 200
        if (response.status == 200) {
            return { status: 200 }
        }
        if (response.status == 400) {
            return { status: 400 }
        }
        else {
            return null
        }
    } catch (error) {
        console.error('Error fetching data:', error)
        return null
    }
}

export { UpdateMovieCategory }
