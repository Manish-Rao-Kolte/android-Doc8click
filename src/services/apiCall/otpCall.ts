import axios from "axios"

export const OTP = axios.create({
    baseURL: "https://otp.dev/api/verify/",
    headers: {
        "Content-Type": "application/json"
    }
})