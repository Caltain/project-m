export const validateEmail = (email) =>{
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return valid
}

export const validatePassword = (password) =>{
    if (password.length < 3 || password.length >20) {
        return false
    }else{
        return true
    }
}

export const validateRepeatedPassword = (password, repeatPassword) =>{
    if (password !==repeatPassword) {
        return true
    }
}

export const validateString = (string) => {
    if (string.length < 3 || string.length > 20) {
        return false
    }else{
        return true
    }
}
export const validateLongString = (string) => {
    if (string.length < 3 || string.length > 50) {
        return false
    }else{
        return true
    }
}

export const validateNumber = (number) =>{
    if (Number(number)) {
        return true
    }
}

export const validateImageUrl = (imageUrl) =>{
const valid = /^(ftp|http|https|data):\/\/[^ "]+$/.test(imageUrl);
    return valid
}