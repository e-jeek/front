import apiInstance from "@/api/instance";
import {SignUpProps} from "@/api/signUp/signUp";

export default async function signUpWithSocial(provider: String) {
    const res = await apiInstance.get("oauth2/authorization/" + provider);
    console.log(res);
    return res;
};