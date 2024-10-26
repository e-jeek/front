"use client"; // 클라이언트 컴포넌트로 설정
interface params {
  params: {
    id: number;
  };
  searchParams: {};
}

export default function ViewChallenge(props: params) {
  let hello = () => {
    console.log("hello?");
    console.log(props);
  };
  return (
    <div onClick={() => hello()} className="cursor-pointer">
      ChallengId : {props.params.id}
      여기는 챌린지의 상태에 따라서 참가하거나, 인증/대화 같은 기능이 만들어질
      페이지 입니다. 부기능으로는 챌린지 참여자 명단을 본다거나, 대화하기 기능이
      만들어져야 합니다.
    </div>
  );
}
