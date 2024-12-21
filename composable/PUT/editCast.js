async function editCast(movieId, cast) {
    const runtimeConfig = useRuntimeConfig()

    const url = runtimeConfig.public.API_URL + "movies/" + movieId
    const Token = localStorage.getItem("Token")


    // Ensure Token exists before proceeding
    if (!Token) {
        console.error('No token found')
        return null
    }

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}`, // Add Bearer token to the header
            },
            body: JSON.stringify({
                cast: JSON.stringify(cast),
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

export { editCast }
