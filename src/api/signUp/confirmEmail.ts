import apiInstance from "../instance";

export default async function confirmEmail(email: string) {
    const res = await apiInstance.get("/member/email?email=" + email);
    return res;
};