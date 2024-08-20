"use client"
import React, {useState} from "react";

export default function WakeUp() {
    const [time, setTime] = useState("");

    return (
        <div>
            <div className="relative mb-5">
                <label
                    htmlFor="time"
                    className={"absolute left-0 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out text-sm"}
                >
                    시간
                </label>
                <input
                    type="text"
                    id="time"
                    name="time"
                    className="w-full border-b-2 focus:border-black outline-none py-2 pl-16"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            </div>
        </div>
    );
}