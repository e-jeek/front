import {useState} from "react";

export default function Rating() {
    const [rating, setRating] = useState(0);

    return (
        <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
                <button
                    key={value}
                    onClick={() => setRating(value)}
                    className={`w-6 h-6 rounded-full border-2 ${rating >= value ? 'bg-blue-500 border-transparent' : 'bg-white border-black'}`}
                />
            ))}
        </div>
);
}