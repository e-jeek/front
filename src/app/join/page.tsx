"use client"
import { useState } from "react";
import Image from "next/image";
import google from "../../assets/images/google.svg";
import naver from "../../assets/images/naver.svg";
import kakao from "../../assets/images/kakao.svg";

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

                <button type="submit" className="w-full mb-4 p-2 bg-blue-400 rounded">
                    로 그 인
                </button>

                <div className="flex justify-between mb-7 pl-5 pr-8">
                    <a href="#" className="text-sm">아이디/비밀번호 찾기</a>
                    <a href="#" className="text-sm">회원가입</a>
                </div>

                <div className="flex justify-around mt-9">
                    <button
                        className="bg-white w-12 h-12 flex justify-center items-center rounded-full overflow-hidden">
                        <Image src={google} alt="Google" width={30} height={30}/>
                    </button>
                    <button
                        className="bg-yellow-400 w-12 h-12 flex justify-center items-center rounded-full overflow-hidden">
                        <Image src={kakao} alt="Google" width={25} height={25}/>
                    </button>
                    <button
                        className="bg-green-600 w-12 h-12 flex justify-center items-center rounded-full overflow-hidden">
                        <Image src={naver} alt="Google" width={25} height={25}/>
                    </button>
                </div>
            </div>
        </div>
    );
}
