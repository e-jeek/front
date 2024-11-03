"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Challenge } from "@/types/Challenge";

interface Params {
  id: Number;
}

export default function ViewChallenge(props: Params) {
  const [challengeData, setChallengeData] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const id = props.id;

  useEffect(() => {
    const fetchChallengeData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/challenges/${id}`
        );
        setChallengeData(response.data);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallengeData();
  }, [id]);

  // 버튼 클릭 시 동작하는 함수
  const handleButtonClick = () => {
    if (challengeData?.member.role === "ADMIN") {
      // 모집 마감 기능
      console.log("모집 마감 처리 중...");
      // 모집 마감 요청
    } else if (challengeData?.member.status === "ACTIVE") {
      console.log("참여 취소 처리 중...");
      // 참여 취소 요청
    } else {
      console.log("참여하기 처리 중...");
      // 참여하기 요청 추가
    }
  };

  // 버튼 텍스트 결정
  const buttonText =
    challengeData?.member.role === "ADMIN"
      ? "모집마감"
      : challengeData?.member.status === "ACTIVE"
      ? "참여취소"
      : "참여하기";

  return (
    <div className="max-w-md mx-auto h-screen overflow-auto bg-white text-black">
      {/* Header with Image */}
      <header className="relative h-48">
        <Image
          src={
            challengeData?.imageUrl ||
            "https://as1.ftcdn.net/v2/jpg/02/37/56/54/1000_F_237565435_uF2nl7l3KV1pCvibQjv3hQ2z3YZQhb9R.jpg"
          }
          alt="챌린지 이미지"
          className="object-cover w-full h-full"
          fill
        />
        {/* Back Button and Title Overlay */}
        <div className="absolute top-0 left-0 w-full flex items-start p-4 z-10">
          <button className="text-white text-lg" onClick={() => router.back()}>
            {"🔙"}
          </button>
          <h1 className="text-lg font-bold pl-6">챌린지</h1>
          <div></div> {/* This empty div is used for spacing */}
        </div>
      </header>

      <div id="wrapper" className="mx-3">
        <div className="flex items-center justify-between mt-4">
          <input
            type="text"
            disabled
            value={challengeData?.name || "테스트 데이터"}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-2xl "
          />
          <input
            className="border rounded-md px-4 py-2 ml-4 cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
            type="button"
            value={buttonText} // 버튼 텍스트 설정
            onClick={handleButtonClick} // 클릭 핸들러 설정
          />
        </div>

        {/* Category */}
        <div className="flex items-center mt-4">
          <label className="block text-sm font-medium text-gray-700 mr-2">
            카테고리
          </label>
          <button
            type="button"
            disabled
            className="px-4 py-2 rounded-md border"
          >
            {challengeData?.type || "운동"}
          </button>
        </div>

        {/* Participants Capacity */}
        <div className="mb-4 flex items-center mt-4">
          <label className="text-sm font-medium text-gray-700 mr-2">
            참여인원
          </label>
          <button type="button" className="px-4 py-2 rounded-md border">
            {challengeData?.capacity || "5명"}
          </button>
        </div>

        <div className="mb-4 flex items-center mt-4">
          <label className="block text-sm font-medium text-gray-700 mr-2">
            기간
          </label>
          <div className="flex space-x-2">
            {challengeData?.startDate || "2024.01.01"} ~
            {challengeData?.endDate || "2024.01.31"}
          </div>
        </div>

        {/* Rule */}
        <div className="mb-4 flex items-center mt-4">
          <label className="block text-sm font-medium text-gray-700 mr-2">
            규칙
          </label>
          {challengeData?.rule || "주 3회"}
        </div>

        {/* Content */}
        <div className="mb-4 border-2 rounded-md h-52 p-1">
          {challengeData?.content || "내용입니다."}
        </div>

        {/* Hashtags */}
        <div className="mb-4">
          <p>{challengeData?.hashtags?.join(", ") || ""}</p>
        </div>
      </div>
    </div>
  );
}
