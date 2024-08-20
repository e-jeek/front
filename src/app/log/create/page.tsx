"use client"
import React, {forwardRef, useState} from "react";
import {useRouter} from "next/navigation";
import {format} from "date-fns";
import DatePicker from "react-datepicker";
import Rating from "@/components/log/day/Rating";
import Diet from "@/components/log/create/Diet";
import Exercise from "@/components/log/create/Exercise";
import WakeUp from "@/components/log/create/WakeUp";

export default function Page() {
    const router = useRouter();

    const [date, setDate] = useState(new Date());
    const [category, setCategory] = useState("WAKEUP");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        // Logic to handle form submission
        console.log('Form submitted');
    };

    function getInputByCategory() {
        switch (category) {
            case "DIET":
                return <Diet />
            case "EXERCISE":
                return <Exercise />
            case "WAKEUP":
                return <WakeUp />
        }
    }


    // 커스텀 입력 컴포넌트
    const CustomInput = forwardRef<HTMLDivElement, { onClick: () => void }>(({ onClick }, ref) => (
        <div onClick={onClick} ref={ref} className="cursor-pointer mt-2">
            <svg width="28" height="28" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.125 11.2813C6.57083 11.2813 6.10243 11.116 5.71979 10.7856C5.33715 10.4551 5.14583 10.0506 5.14583 9.57198C5.14583 9.09338 5.33715 8.68885 5.71979 8.35839C6.10243 8.02793 6.57083 7.8627 7.125 7.8627C7.67917 7.8627 8.14757 8.02793 8.53021 8.35839C8.91285 8.68885 9.10417 9.09338 9.10417 9.57198C9.10417 10.0506 8.91285 10.4551 8.53021 10.7856C8.14757 11.116 7.67917 11.2813 7.125 11.2813ZM3.95833 15.0417C3.52292 15.0417 3.15017 14.9078 2.8401 14.64C2.53003 14.3722 2.375 14.0503 2.375 13.6742V4.10228C2.375 3.72624 2.53003 3.40432 2.8401 3.13654C3.15017 2.86875 3.52292 2.73486 3.95833 2.73486H4.75V1.36743H6.33333V2.73486H12.6667V1.36743H14.25V2.73486H15.0417C15.4771 2.73486 15.8498 2.86875 16.1599 3.13654C16.47 3.40432 16.625 3.72624 16.625 4.10228V13.6742C16.625 14.0503 16.47 14.3722 16.1599 14.64C15.8498 14.9078 15.4771 15.0417 15.0417 15.0417H3.95833ZM3.95833 13.6742H15.0417V6.83713H3.95833V13.6742Z"
                    fill="#1D1B20"/>
            </svg>
        </div>
    ));
    CustomInput.displayName = 'CustomInput';

    return (
        <div className="min-h-screen bg-white flex justify-center items-center">
            <div className="min-h-screen w-80 max-w-md bg-white absolute pt-4">
                <div className="flex items-center mb-6">
                    <button className="mr-4">
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
                    <h1 className="text-2xl font-semibold">가계부 등록</h1>
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
                        value={date ? format(date, "yyyy-MM-dd") : ""}
                        readOnly
                    />
                    <div className="absolute right-0 top-0 h-full flex items-center">
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            dateFormat="yyyy-MM-dd"
                            customInput={<CustomInput onClick={() => {
                            }}/>}
                            wrapperClassName="absolute right-0"
                            popperClassName="z-10"
                        />
                    </div>
                </div>

                <div className="flex mb-5 border-b-2 py-2">
                    <div className="left-0 text-sm w-16">
                        카테고리
                    </div>
                    <div>
                        <button
                            className={`border-2 rounded w-20 mr-2 ${category === "WAKEUP" ? "border-blue-400" : "border-gray-300"}`}
                            onClick={() => setCategory("WAKEUP")}
                        >
                            기상
                        </button>
                        <button
                            className={`border-2 rounded w-20 mr-2 ${category === "DIET" ? "border-blue-400" : "border-gray-300"}`}
                            onClick={() => setCategory("DIET")}
                        >
                            식단
                        </button>
                        <button
                            className={`border-2 rounded w-20 ${category === "EXERCISE" ? "border-blue-400" : "border-gray-300"}`}
                            onClick={() => setCategory("EXERCISE")}
                        >
                            운동
                        </button>
                    </div>
                </div>
                <div className="flex mb-5 border-b-2 py-2">
                    <div className="left-0 text-sm w-16">
                        점수
                    </div>
                    <Rating/>
                </div>

                {getInputByCategory()}

                <div className="mb-4">

                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                </div>

                {preview && (
                    <div className="mb-4">
                        <img src={preview} alt="Image Preview" className="w-full h-auto"/>
                    </div>
                )}

                <textarea
                    className="w-full p-2 mb-4 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="내용을 입력해주세요."
                ></textarea>

                <button
                    onClick={handleSubmit}
                    className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                    저장
                </button>

            </div>
        </div>
    );
}
