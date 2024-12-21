async function getUserById (id) {
    const runtimeConfig = useRuntimeConfig()
    const url = runtimeConfig.public.API_URL + "users/"+id
    const Token = localStorage.getItem("Token")

    // Ensure Token exists before proceeding
    if (!Token) {
        console.error('No token found')
        return null
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}`, // Add Bearer token to the header
            }
        })

        // Check if the response status is not 200
        if (response.status !== 200) {
            console.error('Error fetching data:', response.status)
            return null
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error('Error fetching data:', error)
        return null
    }
}

export {getUserById }
