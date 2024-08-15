import {useEffect, useState} from "react";
import DailyDietLog from "@/components/log/day/DailyDietLog";
import getDailyLog from "@/api/log/getDailyLog";
import DailyWakeUpLog from "@/components/log/day/DailyWakeUpLog";
import DailyExerciseLog from "@/components/log/day/DailyExerciseLog";

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
        const res = getDailyLog(formatDate(date))

        res
            .then((data) => console.log(data))
            .catch((err) => {
                setLogs([
                    {
                        actionId: 4,
                        type: "WAKEUP",
                        score: 4,
                        wakeupTime: "AM 7:00",
                        content: "정말 힘든 기상이었다...",
                        imgUrl: "",
                        createdAt: "2024-08-14",
                        updateAt: "2024-08-14"
                    },
                    {
                        actionId: 4,
                        type: "DIET",
                        score: 5,
                        dietType: "BREAKFAST",
                        foodName: "샐러드",
                        calories: 300,
                        content: "좋은 아침~",
                        imgUrl: "",
                        createdAt: "2024-08-14",
                        updateAt: "2024-08-14"
                    },
                    {
                        actionId: 4,
                        type: "DIET",
                        score: 5,
                        dietType: "LUNCH",
                        foodName: "샐러드",
                        calories: 300,
                        content: "좋은 아침~",
                        imgUrl: "",
                        createdAt: "2024-08-14",
                        updateAt: "2024-08-14"
                    },
                    {
                        actionId: 4,
                        type: "DIET",
                        score: 5,
                        dietType: "DINNER",
                        foodName: "샐러드",
                        calories: 300,
                        content: "좋은 아침~",
                        imgUrl: "",
                        createdAt: "2024-08-14",
                        updateAt: "2024-08-14"
                    },
                    {
                        actionId: 3,
                        type: "EXERCISE",
                        score: 3,
                        name: "헬스",
                        duration: 120,
                        calories: 200,
                        content: "빡세다..",
                        imgUrl: "",
                        createdAt: "2024-08-14",
                        updateAt: "2024-08-14"
                    }
                ]);
            });

    }, [date]);

    function getLogForType(value: any) {
        if (!value.type) {
            return null;
        }

        switch (value.type) {
            case "WAKEUP":
                return <DailyWakeUpLog value={value} />;
            case "EXERCISE":
                return <DailyExerciseLog value={value} />;
            case "DIET":
                return <DailyDietLog value={value} />;
        }
    }

    return (
        <div className="pb-20">
            <div className="flex items-center justify-center space-x-4 my-4">
                <button onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))} className="text-lg">{'<'}</button>
                <span className="text-lg">{formatDate(date)}</span>
                <button onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))} className="text-lg">{'>'}</button>
            </div>
            {logs?.map((value) =>
                getLogForType(value)
            )}
        </div>
    );
}