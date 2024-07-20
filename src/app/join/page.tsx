"use client"
import { useState } from "react";

export default function Page() {
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-80 p-6">
                <div className="relative mb-8">
                    <label
                        htmlFor="username"
                        className={"absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out text-base"}
                    >
                        아이디
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full border-b-2 border-gray-300 focus:border-black outline-none py-2 pl-16"
                        onFocus={() => setUsernameFocused(true)}
                        onBlur={() => setUsernameFocused(false)}
                    />
                </div>

                <div className="relative mb-8">
                    <label
                        htmlFor="password"
                        className={"absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out text-base"}
                    >
                        비밀번호
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full border-b-2 border-gray-300 focus:border-black outline-none py-2 pl-16"
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                    />
                </div>

                <button type="submit" className="w-full mb-4 p-2 bg-gray-300 rounded">
                    로 그 인
                </button>

                <div className="flex justify-between mb-4">
                    <a href="#" className="text-sm">비밀번호 찾기</a>
                    <a href="#" className="text-sm">회원가입</a>
                </div>

                <div className="flex justify-around">
                    <div className="w-12 h-12 flex justify-center items-center bg-gray-300 rounded-full">
                        구글
                    </div>
                    <div className="w-12 h-12 flex justify-center items-center bg-gray-300 rounded-full">
                        카카오
                    </div>
                    <div className="w-12 h-12 flex justify-center items-center bg-gray-300 rounded-full">
                        네이버
                    </div>
                </div>
            </div>
        </div>
    );
}
