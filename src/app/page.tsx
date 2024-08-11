"use client"
import Image from "next/image";
import checkToken from "@/utils/checkToken";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = checkToken()
        .then((data) => {
            console.log(data.message);
            if (!data.message) {
                router.push("/login");
            } else {
                router.push("/log");
            }

        })
        .catch((err) => {
          router.push("/login");
        });

  }, []);

  return (
    <div></div>
  );
}
