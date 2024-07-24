import google from "../../assets/images/google.svg";

interface LogProps {
    type: string,
    image: string,
    score: number,
    content: string
}

export default function DailyLog(props: LogProps) {
    return (
        <div className="bg-pink-100 my-4 p-4 rounded-lg flex items-center">
            {/*<img src={google} alt={props.type} className="w-24 h-24 rounded-lg mr-4"/>*/}
            <div className="flex flex-col">
                <div className="text-xl font-semibold mb-2">{props.type}</div>
                <div className="flex items-center mb-2">
                    {Array(props.score).fill().map((_, i) => (
                        <div key={i} className="h-4 w-4 bg-red-400 rounded-full mr-1"></div>
                    ))}
                </div>
                <div>
                    {props.content}
                </div>
            </div>
        </div>
    );
}