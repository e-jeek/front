"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Challenge } from "@/types/Challnege";
import "./challenge.css";
import Footer from "@/components/footer/Footer";

export default function ViewChallenges() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("popular");
  const [category, setCategory] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>(""); // 검색어 상태 추가
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  // 중복 데이터를 피하기 위해 로드된 챌린지 ID를 추적하기 위한 Set
  const loadedChallengeIds = useRef<Set<number>>(new Set());

  // 챌린지를 가져오는 함수
  const fetchChallenges = useCallback(async () => {
    if (loading || !hasMore) return; // 로딩 중이거나 데이터가 없으면 중복 요청 방지
    setLoading(true);

    try {
      const response = await axios.get<{
        challenges: Challenge[];
        pageInfo: any;
      }>(`${process.env.NEXT_PUBLIC_API_URL}/api/challenges`, {
        params: {
          pageNum: currentPage, // page를 pageNum으로 수정
          pageSize: 10, // size를 pageSize로 수정
          filter: activeTab, // tab을 filter로 수정
          category, // category는 그대로
          frequency, // frequency도 그대로
          q: keyword, // keyword를 q로 수정
        },
      });
      console.log(category);
      if (response.data) {
        const newChallenges = response.data.challenges.filter(
          (challenge: Challenge) =>
            !loadedChallengeIds.current.has(challenge.id)
        );

        newChallenges.forEach((challenge: Challenge) =>
          loadedChallengeIds.current.add(challenge.id)
        );

        setChallenges((prevChallenges) => [
          ...prevChallenges,
          ...newChallenges,
        ]);

        setHasMore(newChallenges.length === 10); // 10개를 반환했는지 확인
      } else {
        setHasMore(false); // 데이터가 없을 경우 hasMore를 false로 설정
      }
    } catch (error) {
      console.error("Error fetching challenges:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, activeTab, category, frequency, keyword]);

  // 페이지 변경 시에만 `fetchChallenges` 호출
  useEffect(() => {
    fetchChallenges();
  }, [currentPage, activeTab, category, frequency]);

  // Intersection Observer를 설정하여 마지막 요소를 감지
  const lastChallengeRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            setCurrentPage((prevPage) => prevPage + 1);
          }
        },
        {
          root: document.getElementById("scroll-container"),
          rootMargin: "0px 0px 80px 0px",
          threshold: 0.1,
        }
      );

      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  const viewChallenge = (id: number) => {
    router.push(`/challenge/${id}`);
  };

  const createChallenge = () => {
    router.push("/challenge/create");
  };

  // 검색어 변경 시 상태만 업데이트
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  // 검색 버튼 클릭 시 서버 요청 수행
  const handleSearchClick = () => {
    setCurrentPage(1); // 검색어 변경 시 페이지 초기화
    setChallenges([]); // 검색어 변경 시 기존 데이터 초기화
    setHasMore(true);
    loadedChallengeIds.current.clear();
    fetchChallenges();
  };

  return (
    <div id="scroll-container" className="h-full overflow-y-auto bg-white">
      <header>
        <h1>어플이름</h1>
        <div className="header-icons">
          <input
            type="text"
            placeholder="Search challenges..."
            value={keyword}
            onChange={handleSearchInput}
          />
          <button onClick={handleSearchClick}>🔍</button>
          <button>⭐</button>
          <button onClick={createChallenge}>➕</button>
        </div>
      </header>
      <div className="tabs">
        <button
          className={activeTab === "popular" ? "active" : ""}
          onClick={() => setActiveTab("popular")}
        >
          인기
        </button>
        <button
          className={activeTab === "new" ? "active" : ""}
          onClick={() => setActiveTab("new")}
        >
          신규
        </button>
      </div>
      <div className="filter-bar">
        <button onClick={() => setCategory(null)}>전체</button>
        <button onClick={() => setCategory("wakeup")}>기상</button>
        <button onClick={() => setCategory("diet")}>식단</button>
        <button onClick={() => setCategory("exercise")}>운동</button>
        <select onChange={(e) => setFrequency(e.target.value)}>
          <option value="">빈도</option>
          <option value="WEEKLY_1">주 1회</option>
          <option value="WEEKLY_3_4">주 3~4회</option>
          <option value="WEEKLY_5">주 5회</option>
        </select>
        <select>
          <option>기한 선택</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mx-auto p-4 justify-between">
        {challenges.map((challenge, index) => (
          <div
            key={challenge.id}
            ref={challenges.length === index + 1 ? lastChallengeRef : null}
            className="card"
            onClick={() => viewChallenge(challenge.id)}
          >
            <div className="card-image-container">
              <Image
                className="w-full"
                src={challenge.imageUrl}
                alt="challengeImage"
                layout="fill"
              />
              {/* 카드에 타입 배지 추가 */}
              <div className="card-type-badge">{challenge.type}</div>
            </div>
            <div className="px-6 py-4 mb-auto">
              <a className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                {challenge.name}
              </a>
              <p>빈도 등등.. 추가 필요/ 제목도 좀 줄이고</p>
              <p className="text-gray-500 text-sm">{challenge.content}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
