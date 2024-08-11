"use client"
import {useRouter, useSearchParams} from "next/navigation";
import {getCookie, setCookie} from "cookies-next";

export default function Page() {
    const router = useRouter();
    const params = useSearchParams()
    const accessToken = params.get("ACCESS_TOKEN")?? "";
    const refreshToken = params.get("REFRESH_TOKEN")?? "";
    const isGranted = params.get("GRANTED")?? "";

    setCookie("workoutwith_access_token", accessToken, {
        secure: process.env.NODE_ENV === "production",
        path:"/",
        maxAge: 24 * 60 * 60
    });

    setCookie("workoutwith_refresh_token", refreshToken, {
        secure: process.env.NODE_ENV === "production",
        path:"/",
        maxAge: 24 * 60 * 60
    });


    if (isGranted) {
        return router.push("/");
    }

    return router.push("/social/info");
}