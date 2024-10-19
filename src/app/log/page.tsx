"use client"
import Footer from "@/components/footer/Footer";
import {useState} from "react";
import DayContent from "@/components/log/day/DayContent";
import WeekContent from "@/components/log/week/WeekContent";
import MonthContent from "@/components/log/month/MonthConent";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [contentType, setContentType] = useState("DAY");

    const getContentBody = () => {
        switch (contentType) {
            case "DAY":
                return (<DayContent />);
            case "WEEK":
                return (<WeekContent />);
            case "MONTH":
                return (<MonthContent />);
        }
    }

    return (
        <div className="bg-white">
            <div className="flex justify-around h-14 border-b-2 border-gray-300">
                <div
                    className={`w-1/3 py-3 text-center ${contentType === "DAY" ? "border-b-4 border-red-300" :""}`}
                    onClick={() => setContentType("DAY")}
                >
                    일일
                </div>
                <div
                    className={`w-1/3 py-3 text-center ${contentType === "WEEK" ? "border-b-4 border-red-300" : ""}`}
                    onClick={() => setContentType("WEEK")}
                >
                    주간
                </div>
                <div
                    className={`w-1/3 py-3 text-center ${contentType === "MONTH" ? "border-b-4 border-red-300" : ""}`}
                    onClick={() => setContentType("MONTH")}
                >
                    달력
                </div>
            </div>

            <div>
                { getContentBody() }
            </div>

            <button
                className="fixed w-16 h-16 bottom-24 right-4 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                onClick={() => router.push("/log/create")}
            >
                <span className="text-4xl">+</span>
            </button>
            <Footer/>
        </div>
    );
}