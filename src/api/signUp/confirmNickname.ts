import apiInstance from "../instance";

export default async function confirmNickname(email: string) {
    const res = await apiInstance.post("/api/email", {
        email : email,
    });
    return res;
};