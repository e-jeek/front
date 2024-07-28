import apiInstance from "../instance";

export interface SignUpProps {
    email: string,
    password: string,
    name: string,
    nickname: string,
    birth: string,
    gender:string,
    height: number,
    weight: number,
    marketing: boolean,
    agreement: boolean
}

export default async function signUp(member: SignUpProps) {
    const res = await apiInstance.post("api/members/signup", {
        email : member.email,
        password: member.password,
        name: member.name,
        nickname: member.nickname,
        birth: member.birth,
        gender: member.gender,
        height: member.height,
        weight: member.weight,
        marketing: member.marketing,
        agreement: member.agreement
    });
    // const res = await apiInstance.get("/api/test");
    return res;
};