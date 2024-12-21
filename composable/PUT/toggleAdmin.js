async function toggleAdmin(userId,action) {
    const runtimeConfig = useRuntimeConfig()
   
    const url = runtimeConfig.public.API_URL + "users/" + userId + "/grant"
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
                action: action
            }),
        })

        // Check if the response status is not 200
        if (response.status !== 200) {
            console.error('Error fetching data:', response.status)
            return response.status
        }

        return response

    } catch (error) {
        console.error('Error fetching data:', error)
        return null
    }
}

export { toggleAdmin }