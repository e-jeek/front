"use client"
import React, {useState} from "react";

export default function Diet() {
    const [time, setTime] =  useState("BREAKFAST");
    const [type, setType] = useState("");

    return (
        <div>
            <div className="flex mb-5 border-b-2 py-2">
                <div className="left-0 text-sm w-16">
                    시간
                </div>
                <div>
                    <button
                        className={`border-2 rounded w-20 mr-2 ${time === "BREAKFAST" ? "border-blue-400" : "border-gray-300"}`}
                        onClick={() => setTime("BREAKFAST")}
                    >
                        아침
                    </button>
                    <button
                        className={`border-2 rounded w-20 mr-2 ${time === "LUNCH" ? "border-blue-400" : "border-gray-300"}`}
                        onClick={() => setTime("LUNCH")}
                    >
                        점심
                    </button>
                    <button
                        className={`border-2 rounded w-20 ${time === "DINNER" ? "border-blue-400" : "border-gray-300"}`}
                        onClick={() => setTime("DINNER")}
                    >
                        저녁
                    </button>
                </div>
            </div>
            <div className="relative mb-5">
                <label
                    htmlFor="type"
                    className={"absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out text-sm"}
                >
                    종류
                </label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    className="w-full border-b-2 focus:border-black outline-none py-2 pl-16"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                />
            </div>
        </div>
    );
}