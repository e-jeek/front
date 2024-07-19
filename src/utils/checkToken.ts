import { getCookie, setCookie } from "cookies-next";
import { AxiosError } from "axios";
import { getToken } from "@/api/auth";

export default async function checkToken() {
    try {
        const accessToken = getCookie("workoutwith_access_token");
        if (!accessToken) {
            const refreshToken = getCookie("workoutwith_refresh_token") as string;
            const res = await getToken(refreshToken);
            const data = res.data;
            setCookie("workoutwith_access_token", data.token, {
                expires: new Date(data.expiredAt),
            });
        }
        return {
            code: 1,
            message: "Success",
        };
    } catch (err) {
        if (err instanceof AxiosError) {
            return err?.response?.data;
        }
    }
}
