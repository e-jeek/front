import {useEffect, useState} from "react";

export default function Timer() {

    const [time, setTime] = useState(300); // 5 minutes in seconds

    useEffect(() => {
        if (time > 0) {
            const interval = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [time]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <p>{formatTime(time)}</p>
    );
}