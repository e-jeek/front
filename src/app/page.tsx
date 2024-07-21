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
          router.push("/login");
        })
        .catch((err) => {
          router.push("/login");
        });

  }, []);

  return (
    <div></div>
  );
}
