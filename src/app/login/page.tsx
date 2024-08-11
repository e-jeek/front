"use client"
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import google from "../../assets/images/google.svg";
import naver from "../../assets/images/naver.svg";
import kakao from "../../assets/images/kakao.svg";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import signUpWithSocial from "@/api/signUp/signUpWithSocial";

export default function Page() {
    const router = useRouter();
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [closing, setClosing] = useState(false);
    const signUpRef = useRef<HTMLDivElement>(null);

    const handleSignUpClick = () => {
        setShowSignUp(true);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (signUpRef.current && !signUpRef.current.contains(event.target as Node)) {
            setClosing(true);
            setTimeout(() => {
                setShowSignUp(false);
                setClosing(false);
            }, 500);
        }
    };

    const handleSignUpPage = (method: string): void => {
        if (method === "email") {
            router.push("/signup");
        } else {
            console.log("social login");
        }
    };

    useEffect(() => {
        if (showSignUp) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSignUp]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="w-80 p-6">
                <div className="relative mb-8">
                    <label
                        htmlFor="username"
                        className={"absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out text-base"}
                    >
                        이메일
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full border-b-2 focus:border-black outline-none py-2 pl-16"
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
                    <button onClick={() => handleSignUpPage("email")} className="text-sm">회원가입</button>
                </div>

                {showSignUp && (
                    <div ref={signUpRef} className={`fixed inset-x-0 bottom-0 flex justify-center p-4 bg-gray-300 border-t 
                                                    border-gray-300 rounded-t-lg transform 
                                                    transition-transform duration-500 
                                                    ${closing ? 'animate-slide-down' : 'animate-slide-up'}
                    `}>
                        <div className="w-80 bg-gray-300 p-4">
                            <h2 className="text-center mb-4">간편 회원가입</h2>
                            <button
                                className="w-full mb-4 p-2 bg-blue-400 rounded"
                            >
                                카카오로 회원가입
                            </button>
                            <a
                                href="http://localhost:8080/oauth2/authorization/naver"
                                className="block w-full text-center py-2 px-4 mb-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                            >
                                asdf
                            </a>
                            <button
                                className="w-full mb-4 p-2 bg-blue-400 rounded"
                            >
                                구글로 회원가입
                            </button>
                            <button
                                className="w-full mb-8 p-2 bg-blue-400 rounded"
                                onClick={() => signUpWithSocial("naver")}
                            >
                                네이버로 회원가입
                            </button>
                            <button
                                className="w-full mb-4 p-2 bg-blue-400 rounded"
                                onClick={() => handleSignUpPage("email")}
                            >
                                이메일로 회원가입
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex justify-around mt-9">
                    <a
                        href="http://localhost:8080/oauth2/authorization/naver"
                        className="bg-white w-12 h-12 flex justify-center items-center rounded-full overflow-hidden"
                    >
                        <Image src={google} alt="Google" width={30} height={30}/>
                    </a>
                    <a
                        href="http://localhost:8080/oauth2/authorization/kakao"
                        className="bg-yellow-400 w-12 h-12 flex justify-center items-center rounded-full overflow-hidden"
                    >
                        <Image src={kakao} alt="Kakao" width={25} height={25}/>
                    </a>
                    <a
                        href="http://localhost:8080/oauth2/authorization/naver"
                        className="bg-green-600 w-12 h-12 flex justify-center items-center rounded-full overflow-hidden"
                    >
                        <Image src={naver} alt="Naver" width={25} height={25}/>
                    </a>
                </div>
            </div>
        </div>
    );
}
