import apiInstance from "../instance";

export default async function sendCheckMail(email: string) {
    const res = await apiInstance.post("/api/emails?email=" + email);
    return res;
};