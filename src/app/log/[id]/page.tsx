"use client"
import React, {useEffect, useState} from "react";
import example from "@/assets/images/img.png";
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function Page({params}) {
    const id = params.id;
    const router = useRouter();

    const [category, setCategory] = useState("WAKEUP");

    const [action, setAction] = useState({
        actionId: 0,
        type: "",
        score: 0,
        wakeupTime: "",
        content: "",
        imgUrl: "",
        createdAt: "",
        updateAt: ""
    });

    useEffect(() => {
        // id 값을 가지고 action을 조회하여 처리해준다.
        setAction({
            actionId: 4,
            type: "WAKEUP",
            score: 4,
            wakeupTime: "AM 7:00",
            content: "정말 힘든 기상이었다...",
            imgUrl: "",
            createdAt: "2024-08-14",
            updateAt: "2024-08-14"
        });

        setCategory("WAKEUP");
    }, []);



    return (
        <div className="min-h-screen bg-white flex justify-center items-center">
            <div className="min-h-screen w-80 max-w-md bg-white absolute pt-4">
                <div className="flex items-center mb-6">
                    <button className="mr-4" onClick={() => router.back()}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <h1 className="text-2xl font-semibold">가계부 상세</h1>
                </div>

                <div className="relative mb-5">
                    <label
                        htmlFor="date"
                        className={"absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out text-sm"}
                    >
                        날짜
                    </label>
                    <input
                        type="text"
                        id="date"
                        name="date"
                        className="w-full border-b-2 focus:border-black outline-none py-2 pl-16"
                        value={action.createdAt}
                        readOnly
                    />

                </div>

                <div className="flex mb-5 border-b-2 pb-2">
                    <div className="left-0 text-sm w-16 pt-1">
                        카테고리
                    </div>
                    <div>
                        <button
                            className={`border-2 rounded w-20 mr-2 ${category === "WAKEUP" ? "border-blue-400" : "border-gray-300"}`}
                            onClick={() => setCategory("WAKEUP")}
                        >
                            기상
                        </button>
                    </div>
                </div>

                <div className="flex items-center border-b-2 pb-2 mb-4">
                    <div className="left-0 text-sm w-16 pt-1">
                        점수
                    </div>

                    {Array(action.score).fill("").map((index) => (
                        <div key={index} className="h-4 w-4 bg-blue-600 rounded-full mr-1"></div>
                    ))}

                </div>

                <Image src={example} alt="example" className="w-full h-60 rounded-lg mr-4"/>

                <div className="mt-8 w-full border-2 rounded p-3">
                    {action.content}
                </div>
            </div>
        </div>
    );
}