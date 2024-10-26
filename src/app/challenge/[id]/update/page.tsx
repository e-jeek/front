"use client"; // 클라이언트 컴포넌트로 설정
interface params {
  params: {
    id: number;
  };
  searchParams: {};
}

export default function UpdateChallenge(props: params) {
  return <div className="cursor-pointer">ChallengId : {props.params.id}</div>;
}
