import axios from "axios";
import {getCookie} from "cookies-next";
import {headers} from "next/headers";

const apiInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL?? "",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getCookie("workoutwith_access_token")??""
    },
    withCredentials: true,
});

export default apiInstance;