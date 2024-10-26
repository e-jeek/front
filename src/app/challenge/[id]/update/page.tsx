"use client"; // 클라이언트 컴포넌트로 설정
interface params {
  params: {
    id: number;
  };
  searchParams: {};
}

export default function UpdateChallenge(props: params) {
  return (
    <div className="cursor-pointer">
      ChallengId : {props.params.id}
      여기는 챌린지 마감버튼과 이미 만든 챌린지에 대해 조건을 변경하는 기능을
      만들 예정입니다.
    </div>
  );
}
