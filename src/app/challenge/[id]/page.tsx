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
    </div>
  );
}
