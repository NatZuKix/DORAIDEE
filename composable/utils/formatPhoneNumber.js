function formatPhoneNumber(phoneNumber) {
    // Remove any non-numeric characters
    
    phoneNumber = phoneNumber.replace(/\D/g, '')

    // Format the phone number into xxx-xxx-xxxx
    if (phoneNumber.length === 10) {
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    }
    return phoneNumber // Return original if it's not a valid 10-digit number
}


export { formatPhoneNumber}