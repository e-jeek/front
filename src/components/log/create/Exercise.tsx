"use client"
import React, {useState} from "react";

export default function Exercise({type, setType}) {
    
    return (
        <div>
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