import {useEffect, useState} from "react";
import DailyLog from "@/components/log/DailyLog";

export default function DayContent() {
    const [date, setDate] = useState(new Date());
    const [logs, setLogs] = useState<any[]>();

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더합니다.
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}년 ${month}월 ${day}일`;
    }

    useEffect(() => {
        setLogs([
            {
                type: "MEAL",
                image: "adsf",
                score: 4,
                content: formatDate(date)
            },
            {
                type: "MEAL",
                image: "adsf",
                score: 4,
                content: formatDate(date)
            },
            {
                type: "MEAL",
                image: "adsf",
                score: 4,
                content: formatDate(date)
            }
        ]);

    }, [date]);

    return (
        <div>
            <div className="flex items-center justify-center space-x-4 my-4">
                <button onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))} className="text-lg">{'<'}</button>
                <span className="text-lg">{formatDate(date)}</span>
                <button onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))} className="text-lg">{'>'}</button>
            </div>
            {logs?.map((value) =>
                <DailyLog type={value.type} image={value.image} score={value.score} content={value.content} />
            )}
        </div>
    );
}