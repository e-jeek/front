import apiInstance from "../instance";

export default async function getDailyLog(date: string) {
    const res = await apiInstance.get("/api/actions?date=" + date);
    return res;
};