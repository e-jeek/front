import apiInstance from "../instance";

export default async function confirmCertiNum(email: string, code: string) {
    const res = await apiInstance.post("/api/emails/confirm", {
        email : email,
        code: code
    });
    return res;
};