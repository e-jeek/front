"use client"
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format, addMonths, subMonths } from 'date-fns';
import {useEffect, useState} from "react";

export default function MonthContent() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [dataMap, setDataMap] = useState(new Map());

    useEffect(() => {
            const data = [
                "2024-09-01": {
                    "WAKEUP": {
                        "average": 4,
                        "data": [
                            // 데이터 List
                        ]
                    },
                    "DIET": {
                        "average": 4,
                        "data": [
                            // 데이터 List
                        ]
                    },
                    "EXERCISE": {
                        "average": 4,
                        "data": [
                            // 데이터 List
                        ]
                    }
                },

                "2024-09-02": {
                    "WAKEUP": {
                        "average": 4,
                        "data": [
                            // 데이터 List
                        ]
                    },
                    "DIET": {
                        "average": 4,
                        "data": [
                            // 데이터 List
                        ]
                    },
                    "EXERCISE": {
                        "average": 4,
                        "data": [
                            // 데이터 List
                        ]
                    }
                }
            ];

            setDataMap(new Map(Object.entries(data)));

        }, [currentMonth]);


    const renderHeader = () => {
        return (
            <div className="flex justify-between items-center py-2 mb-4">
                <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                    〈
                </button>
                <span className="text-lg font-bold">
                  {format(currentMonth, 'yyyy년 MM월')}
                </span>
                <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                    〉
                </button>
            </div>
        );
    };

    const renderDays = () => {
        const days = [];
        const startDate = startOfWeek(startOfMonth(currentMonth));
        const endDate = endOfWeek(endOfMonth(currentMonth));

        let day = startDate;
        while (day <= endDate) {
            days.push(day);
            day = addDays(day, 1);
        }

        return days.map((day, index) => (
            <div key={index} className={`w-1/7 h-14 flex justify-center ${isSameDate(day, selectedDay) ? "border-2 border-red-600" : ""}`} onClick={() => setSelectedDay(day)}>
                <span className={`${day.getMonth() !== currentMonth.getMonth() ? 'text-gray-400' : ''}`}>
                    {format(day, 'd')}
                </span>
            </div>
        ));
    };

    const isSameDate = (date1: Date, date2: Date) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    const renderCells = () => {
        const days = renderDays();
        return <div className="grid grid-cols-7 gap-1">{days}</div>;
    };

    return (
        <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            {renderHeader()}
            <div className="grid grid-cols-7 gap-1 border-b-2 mb-2 pb-1">
                <div className="text-center font-bold">일</div>
                <div className="text-center font-bold">월</div>
                <div className="text-center font-bold">화</div>
                <div className="text-center font-bold">수</div>
                <div className="text-center font-bold">목</div>
                <div className="text-center font-bold">금</div>
                <div className="text-center font-bold">토</div>
            </div>
            {renderCells()}

            {dataMap}
        </div>
    );
}