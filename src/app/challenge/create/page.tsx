"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
//TODO: 날짜검증에 문제가 있음. 모집일만 선택하면 등록이 활성화 됨.
export default function CreateChallenge() {
  const [name, setName] = useState("");
  const [type, setType] = useState("wakeup");
  const [capacity, setCapacity] = useState(10);
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rule, setRule] = useState("1");
  const [hidden, setHidden] = useState(false); // 기본값 false
  const [secretKey, setSecretKey] = useState(""); // 용도 모룸 물어봐야함
  const [status, setStatus] = useState(""); // 용도 모룸 물어봐야함
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  //TODO : 이미지 백엔드 쪽 기본 이미지로 변경 필요
  const [imagePreview, setImagePreview] = useState<string>(
    "https://as1.ftcdn.net/v2/jpg/02/37/56/54/1000_F_237565435_uF2nl7l3KV1pCvibQjv3hQ2z3YZQhb9R.jpg"
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [hasDueDateInteracted, setHasDueDateInteracted] = useState(false); // 마감일 상호작용 체크
  const router = useRouter();

  // 이미지 변경시 서버로 보낼 파일 설정 후 프리뷰 이미지 변경
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setSelectedFile(file); // 파일을 selectedFile 상태로 저장
    }
  };
  const validateDates = (due: string, start: string, end: string) => {
    // 모든 날짜가 입력되지 않았으면 false 반환 (버튼 비활성화)
    if (!due || !start || !end) return false;

    // 시작일이 마감일과 같거나 이후여야 함
    if (new Date(start) < new Date(due)) {
      setErrorMessage("시작일은 마감일 이후여야 합니다.");
      return false;
    }

    // 종료일이 시작일 이후여야 하고, 종료일이 마감일 이후여야 함
    if (new Date(end) <= new Date(start)) {
      setErrorMessage("종료일은 시작일 이후여야 합니다.");
      return false;
    }

    if (new Date(end) <= new Date(due)) {
      setErrorMessage("종료일은 마감일 이후여야 합니다.");
      return false;
    }

    // 모든 조건을 만족하면 true 반환
    return true;
  };

  const validateAndToggleSubmit = (due: string, start: string, end: string) => {
    // 모든 날짜가 입력되지 않았을 때 에러 메시지를 표시하지 않고 등록 버튼만 비활성화
    if (!due || !start || !end) {
      setErrorMessage(null);
      setIsSubmitDisabled(true);
      return;
    }

    // 날짜 검증 통과 여부에 따라 버튼 활성화 및 에러 메시지 설정
    if (!validateDates(due, start, end)) {
      setIsSubmitDisabled(true);
    } else {
      setErrorMessage(null);
      setIsSubmitDisabled(false);
    }
  };
  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDueDate = e.target.value;
    setDueDate(newDueDate);
    setHasDueDateInteracted(true);

    // 에러 메시지를 설정하지 않고 검증 함수만 호출
    validateAndToggleSubmit(newDueDate, startDate, endDate);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);

    validateAndToggleSubmit(dueDate, newStartDate, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);

    validateAndToggleSubmit(dueDate, startDate, newEndDate);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const backHistory = () => {
    // router.back();
    router.push("/challenge");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("챌린지 이름을 입력해주세요.");
      return;
    }

    // 해시태그 문자열을 배열로 변환
    const hashtagsArray = hashtags.split(",").map((tag) => tag.trim());

    // FormData 객체 생성
    const formData = new FormData();
    formData.append(
      "request",
      JSON.stringify({
        name,
        type,
        capacity,
        dueDate,
        startDate,
        endDate,
        rule,
        hidden,
        secretKey,
        status,
        content,
        hashtags: hashtagsArray,
      })
    );

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      // 서버로 요청 보내기
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/challenges`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      // 요청 성공 시 받은 주소로 이동
      if (response.status === 201 && response.data) {
        const redirectUrl = response.data.url; // 서버가 리턴한 URL (예시로 URL 사용)
        router.push(redirectUrl); // 해당 URL로 이동
      }
    } catch (error) {
      console.error("Error creating challenge:", error);
      // 요청 실패 시 처리
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen overflow-auto bg-white text-black">
      {/* Header with Image */}
      <header className="relative h-48">
        <Image
          src={imagePreview}
          alt="챌린지 이미지"
          className="object-cover w-full h-full"
          fill
        />
        {/* Back Button and Title Overlay */}
        <div className="absolute top-0 left-0 w-full flex items-start p-4 z-10">
          <button className="text-white text-lg" onClick={backHistory}>
            {"🔙"}
          </button>
          <h1 className="text-lg font-bold pl-6">챌린지 등록</h1>
          <div></div> {/* This empty div is used for spacing */}
        </div>
        {/* Cover Change Button */}
        <div className="absolute bottom-2 right-2 z-10">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-white p-1 rounded-full shadow-md text-black"
          >
            📷 커버 변경
          </button>
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </header>

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 flex flex-col space-y-4">
        {/* Challenge Name */}
        <div>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="챌린지 이름"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-2xl "
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            카테고리
          </label>
          <div className="flex space-x-2 mt-1">
            <button
              type="button"
              onClick={() => setType("wakeup")}
              className={`px-4 py-2 rounded-md ${
                type === "wakeup" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              기상
            </button>
            <button
              type="button"
              onClick={() => setType("diet")}
              className={`px-4 py-2 rounded-md ${
                type === "diet" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              식단
            </button>
            <button
              type="button"
              onClick={() => setType("exercise")}
              className={`px-4 py-2 rounded-md ${
                type === "exercise" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              운동
            </button>
          </div>
        </div>

        {/* Participants Capacity */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            참여인원
          </label>
          <div className="flex space-x-2 mt-1">
            <button
              type="button"
              onClick={() => setCapacity(5)}
              className={`px-4 py-2 rounded-md ${
                capacity === 5 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              5명
            </button>
            <button
              type="button"
              onClick={() => setCapacity(10)}
              className={`px-4 py-2 rounded-md ${
                capacity === 10 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              10명
            </button>
            <button
              type="button"
              onClick={() => setCapacity(20)}
              className={`px-4 py-2 rounded-md ${
                capacity === 20 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              20명
            </button>
          </div>
        </div>

        {/* Date Range */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            모집 마감일
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={handleDueDateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            기간 (시작일 - 종료일)
          </label>
          <div className="flex space-x-2 mt-1">
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            ~
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Rule */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            규칙 (빈도)
          </label>
          <select
            value={rule}
            onChange={(e) => setRule(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="1">주 1회</option>
            <option value="2">주 2회</option>
            <option value="3">주 3회</option>
            <option value="4">주 4회</option>
            <option value="5">주 5회</option>
            <option value="6">주 6회</option>
            <option value="7">주 7회</option>
          </select>
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            내용
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={4}
          />
        </div>

        {/* Hashtags */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            해시태그
          </label>
          <input
            type="text"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            placeholder="해시태그 (쉼표로 구분)"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div></div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-500 sticky bottom-0"
          disabled={isSubmitDisabled}
        >
          등록
        </button>
      </form>
    </div>
  );
}
