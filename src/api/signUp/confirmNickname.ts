import apiInstance from "../instance";

export default async function confirmNickname(nickname: string) {
    const res = await apiInstance.get("/member/nickname?nickname=" + nickname);
    return res;
};