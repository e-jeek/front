import apiInstance from "../instance";

export default async function signUp(email: string) {
    const res = await apiInstance.post("/api/email", {
        email : email,
    });
    return res;
};