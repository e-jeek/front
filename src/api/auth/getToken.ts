import apiInstance from "../instance";

export default async (refreshToken: string) => {
    const res = await apiInstance.post("/auth/token/issue", {
        headers: { Authorization: `Bearer ${refreshToken}` },
    });
    return res;
};