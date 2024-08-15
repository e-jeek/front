import example from "../../../assets/images/img.png";
import Image from "next/image";

interface WakeUp {
    actionId: number,
    type: string,
    score: number,
    wakeupTime: string,
    content: string
    imgUrl: string,
    createdAt: string,
    updateAt: string
}

interface WakeUpLogProps {
    value: WakeUp
}

export default function DailyWakeUpLog(props: WakeUpLogProps) {
    const wakeUp: WakeUp = props.value;

    return (
        <div className="bg-yellow-200 my-4 p-4 rounded-lg items-center">
            <div className="text-xl font-semibold mb-2">기상</div>
            <div className="flex">
                <Image src={example} alt="example" className="w-24 h-24 rounded-lg mr-4"/>
                <div>
                    <div className="flex items-center mb-2">
                        {Array(wakeUp.score).fill("").map((index) => (
                            <div key={index} className="h-4 w-4 bg-yellow-600 rounded-full mr-1"></div>
                        ))}
                    </div>
                    <div className="text-xs mb-4 flex">
                        {/*{diet.createdAt}*/}
                        AM 7:00
                    </div>
                    <div>
                        {wakeUp.content}
                    </div>
                </div>
            </div>

        </div>
    );
}