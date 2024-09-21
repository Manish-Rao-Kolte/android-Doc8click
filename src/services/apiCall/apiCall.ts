// import axios from "axios";
// import {API_BASE_URL} from "@env"
// import { authSelector } from "../../redux/reducers/authSlice/authSlice";
// import { useSelector } from "react-redux";

// // make API to make axios api call with base url with headers content type(json and multipart form data) and authorization
// const {userData} = useSelector(authSelector)
// console.log("userData", userData);

// axios.defaults.headers.common['Authorization'] = `Bearer ${userData?.token}`;

// type headers = {
//     'Content-Type': string,
// }

// export const api = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     }
// });

// export const formApi = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//         'Content-Type': 'multipart/form-data',
//     }
// });