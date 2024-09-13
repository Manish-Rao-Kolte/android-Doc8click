// validate login and register form, in login validate identifier, password and otp, in register validate name, email, password, confirm password, phone number, address, city, state, country, pincode, in both validate if any field is empty or invalid

//validateLogin function to validate identifier, password or otp field if they are empty or invalid for eg. for email(with regesx expression), phone number(with min and maximum limit of digits), password(with min 6 char to max 20 char), otp(for 6 digit) etc.

export const validateIdentifier = (identifier: string | number, type: string) => {
    if (!identifier) {
        return type === "mobile" ? "Please enter phone number" : "Please enter email"
    }
    if (typeof identifier === 'string' && !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(identifier)) {
        return "Please enter valid email"
    }
    if (typeof identifier === 'number' && !/^[0-9]{10,10}$/.test(String(identifier))) {
        return "Please enter valid phone number"
    }
    return "valid"
}

export const validatePassword = (password: string) => {
    if (!password) {
        return "Please enter password"
    }
    if (password.length < 6 || password.length > 20) {
        return "Password should be 6-20 characters long"
    }
    return "valid"
}

export const validateOtp = (otp: number[]) => {
    if (otp.length !== 6) {
        return "Enter valid OTP"
    }
    return "valid"
}