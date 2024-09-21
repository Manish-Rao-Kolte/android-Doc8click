
export const validateOtp = (otp: number[]) => {
    if (otp.length !== 6) {
        return "Enter valid OTP"
    }
    return "valid"
}

//validateName function to validate name field if it is empty or invalid for eg. name should have atleast 3 char and max 20 char
export const validateName = (name: string) => {
    if (!name) {
        return "Please enter name"
    }
    if (!/^[a-zA-Z]{3,20}$/.test(name)) {
        return "Name should contain atleast 3 characters"
    }
    return "valid"
}

// function to validate email field if it is empty or invalid for eg. email should have valid email format
export const validateEmail = (email: string) => {
    if (!email) {
        return "Please enter email"
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return "Please enter valid email"
    }
    return "valid"
}

// function to validate phone number field if it is empty or invalid for eg. phone number should have valid phone number format
export const validatePhone = (phone: string) => {
    if (!phone) {
        return "Please enter phone number"
    }
    if (!/^[0-9]{10,10}$/.test(phone)) {
        return "Please enter valid phone number"
    }
    return "valid"
}

//validatePassword function to validate password field if it is empty or invalid for eg. password(with min 6 char to max 20 char) and should have atleast one uppercase, one lowercase, ond number and one special character like @, #, $, etc.
export const validatePassword = (password: string) => {
    if (!password) {
        return "Please enter password"
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,20}$/.test(password)) {
        return "Password must be of length between 6-20 characters and must contain at least one uppercase(A-Z), one lowercase(a-z), one number(0-9) and one special character"
    }
    return "valid"
}