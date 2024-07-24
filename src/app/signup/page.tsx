"use client"
import React, {forwardRef, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {format} from "date-fns";
import google from "../../assets/images/google.svg";
import {confirmEmail, confirmNickname, sendCheckMail, signUp} from "@/api/signUp";
import Timer from "@/components/Timer";

export default function Page() {
    const router = useRouter();

    // required
    const [email, setEmail] = useState('');
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [certiNum, setCertiNum] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [nicknameConfirmed, setNicknameConfirmed] = useState(false);
    const [agreement, setAgreement] = useState(false);
    const [marketing, setMarketing] = useState(false);
    const [performedFirst, setPerformedFirst] = useState(false);

    // optional
    const [birth, setBirth] = useState<Date | null>(new Date());
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [gender, setGender] = useState("MALE");

    const isValidEmail = (email: string): boolean => {
        if (!email) {
            return true;
        }
        // 이메일 정규 표현식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPassword = (password: string): boolean => {
        if (!password) {
            return true;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!emailConfirmed || !emailChecked || !isValidPassword(password)
            || password != passwordConfirm || !nicknameConfirmed || !name || !agreement) {
            alert("다음 단계로 넘어갈 수 없습니다.");
            return;
        }

        console.log("next");

        setPerformedFirst(true);
    };

    const handleSignUp = () => {
        console.log("handleSignUp");
        // const res = signUp();
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


    if (!performedFirst) {
        return (
            <div className="min-h-screen bg-white flex justify-center items-center">
                <div className="min-h-screen w-80 max-w-md bg-white absolute pt-4">
                    <div className="flex items-center mb-6">
                        <button onClick={() => router.back()} className="mr-4">
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
                        <h1 className="text-2xl font-semibold">회원가입</h1>
                    </div>

                    <h2 className="text-lg font-medium mb-4">필수 정보 입력</h2>


                    <div className={`relative ${isValidEmail(email) ? "mb-5" : "mb-0.5"}`}>
                        <label
                            htmlFor="username"
                            className={"absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out text-sm"}
                        >
                            이메일
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full border-b-2 focus:border-black outline-none py-2 pl-20"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {!emailConfirmed &&
                        <button
                            className={"absolute right-0 bg-blue-500 text-white mt-2 text-xs p-1 rounded"}
                            onClick={() => confirmEmail(email)
                                .then((d) => {setEmailConfirmed(true)})
                                .catch((e) => {
                                    alert("error");
                                    setEmailConfirmed(true);
                                })}
                        >
                            중복 확인
                        </button>
                        }
                        {emailConfirmed &&
                            <button
                                className={"absolute right-0 bg-blue-500 text-white mt-2 text-xs p-1 rounded"}
                                onClick={() => sendCheckMail(email)
                                    .then((d) => {
                                        setEmailSent(true);

                                    })
                                    .catch((e) => {
                                        alert("error");
                                        setEmailSent(true);
                                    })}
                            >
                                인증번호 발송
                            </button>
                        }
                    </div>
                    {!isValidEmail(email) && <p className="text-xs mb-0.5 text-red-600">이메일 형식이 아닙니다.</p>}

                    {emailSent &&
                        <div className={"relative mb-5"}>
                            <label
                                htmlFor="certiNum"
                                className={"absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out text-sm"}
                            >
                                인증번호
                            </label>
                            <input
                                type="text"
                                id="certiNum"
                                name="certiNum"
                                className="w-full border-b-2 focus:border-black outline-none py-2 pl-20"
                                value={certiNum}
                                onChange={(e) => setCertiNum(e.target.value)}
                                required
                            />

                            <span className={"absolute right-10 mt-3 text-xs"}>
                                <Timer />
                            </span>

                            <button
                                className={"absolute right-0 bg-blue-500 text-white mt-2 text-xs p-1 rounded"}
                                onClick={() => confirmEmail(email)
                                    .then((d) => {
                                        setEmailChecked(true);
                                    })
                                    .catch((e) => {
                                        alert("error");
                                        setEmailChecked(true);
                                    })}
                            >
                                확인
                            </button>
                        </div>
                    }

                    <div className={`relative ${isValidPassword(password) ? "mb-5" : "mb-0.5"}`}>
                        <label
                            htmlFor="password"
                            className={"absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out text-sm"}
                        >
                            비밀번호
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full border-b-2 focus:border-black outline-none py-2 pl-20"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {!isValidPassword(password) &&
                        <p className="text-xs mb-0.5 text-red-600">대소문자, 숫자를 포함한 8자리 이상이어야합니다.</p>}

                    <div
                        className={`relative mb-5 ${passwordConfirm && password == passwordConfirm ? "mb-5" : "mb-0.5"}`}>
                        <label
                            htmlFor="passworkConfirm"
                            className={"absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out text-xs"}
                        >
                            비밀번호 확인
                        </label>
                        <input
                            type="password"
                            id="passworkConfirm"
                            name="passwordConfirm"
                            className="w-full border-b-2 focus:border-black outline-none py-2 p-20"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                        />
                    </div>
                    {passwordConfirm && password != passwordConfirm && <p className="text-xs mb-0.5 text-red-600">비밀번호가 일치하지 않습니다.</p>}

                    <div className="relative mb-5">
                        <label
                            htmlFor="name"
                            className={"absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out text-sm"}
                        >
                            이름
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full border-b-2 focus:border-black outline-none py-2 pl-20"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative mb-5">
                        <label
                            htmlFor="nickname"
                            className={"absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out text-sm"}
                        >
                            닉네임
                        </label>
                        <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            className="w-full border-b-2 focus:border-black outline-none py-2 pl-20"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            required
                        />
                        <button
                            onClick={() => confirmNickname(email).then((d) => {
                                setNicknameConfirmed(true);
                            }).catch((e) => {
                                alert("error");
                                setNicknameConfirmed(true);
                            })}
                            className={"absolute right-0 bg-blue-500 text-white mt-2 text-xs p-1 rounded "}

                        >
                            중복 확인
                        </button>
                    </div>


                    <div className="mb-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={agreement}
                                onChange={(e) => setAgreement(e.target.checked)}
                                required
                            />
                            <span className="ml-2">약관 동의</span>
                        </label>
                    </div>
                    <div className="mb-6">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={marketing}
                                onChange={(e) => setMarketing(e.target.checked)}
                            />
                            <span className="ml-2">마케팅 정보 동의 (선택)</span>
                        </label>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        다음
                    </button>
                </div>
            </div>
        );
    } else if (performedFirst) {
        return (
            <div className="min-h-screen bg-white flex justify-center items-center">
                <div className="min-h-screen w-80 max-w-md bg-white absolute pt-4">
                    <div className="flex items-center mb-6">
                        <button onClick={() => setPerformedFirst(false)} className="mr-4">
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
                        <h1 className="text-2xl font-semibold">회원가입</h1>
                    </div>

                    <h2 className="text-lg font-medium mb-4">추가 정보 입력</h2>
                    <div className="relative mb-5">
                        <label
                            htmlFor="birth"
                            className={"absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out text-sm"}
                        >
                            생년월일
                        </label>
                        <input
                            type="text"
                            id="birth"
                            name="birth"
                            className="w-full border-b-2 focus:border-black outline-none py-2 pl-20"
                            value={birth ? format(birth, "yyyy-MM-dd") : ""}
                            readOnly
                        />
                        <DatePicker
                            selected={birth}
                            onChange={(date) => setBirth(date)}
                            dateFormat="yyyy-MM-dd"
                            customInput={<CustomInput  onClick={() => {}}/>}
                            wrapperClassName="absolute right-0"
                            popperClassName="z-10"
                        />
                    </div>

                    <div className="relative mb-5">
                        <label
                            htmlFor="height"
                            className={"absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out text-sm"}
                        >
                            키
                        </label>
                        <input
                            type="text"
                            id="height"
                            name="height"
                            className="w-full border-b-2 focus:border-black outline-none py-2 pl-20"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>

                    <div className="relative mb-5">
                        <label
                            htmlFor="weight"
                            className={"absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out text-sm"}
                        >
                            몸무게
                        </label>
                        <input
                            type="text"
                            id="weight"
                            name="weight"
                            className="w-full border-b-2 focus:border-black outline-none py-2 p-20"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>

                    <div className="flex mb-5 border-b-2 py-2">
                        <div className="left-0 text-sm w-20">
                            성별
                        </div>
                        <div>
                            <button
                                className={`border-2 rounded w-28 mr-2 ${gender === "MALE" ? "border-blue-400" : "border-gray-300"}`}
                                onClick={() => setGender("MALE")}
                            >
                                남성
                            </button>
                            <button
                                className={`border-2 rounded w-28 ${gender === "FEMALE" ? "border-pink-400" : "border-gray-300"}`}
                                onClick={() => setGender("FEMALE")}
                            >
                                여성
                            </button>
                        </div>
                    </div>

                    <button
                        className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={handleSignUp}
                    >
                        회원가입하기
                    </button>
                </div>
            </div>
        );
    }

}