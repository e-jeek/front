import example from "../../../assets/images/img.png";
import Image from "next/image";
import {useRouter} from "next/navigation";

interface Exercise {
    actionId: number,
    type: string,
    score: number,
    name: string,
    duration: number,
    calories: number,
    content: string,
    imgUrl: string,
    createdAt: string,
    updateAt: string
}

interface ExerciseLogProps {
    value: Exercise
}

export default function DailyExerciseLog(props: ExerciseLogProps) {
    const exercise: Exercise = props.value;

    const router = useRouter();

    return (
        <div
            className="bg-blue-200 my-4 p-4 rounded-lg items-center"
            onClick={() => router.push(`/log/${exercise.actionId}`)}
        >
            <div className="text-xl font-semibold mb-2">운동</div>
            <div className="flex">
                <Image src={example} alt="example" className="w-24 h-24 rounded-lg mr-4"/>
                <div>
                    <div className="flex items-center mb-2">
                        {Array(exercise.score).fill("").map((index) => (
                            <div key={index} className="h-4 w-4 bg-blue-400 rounded-full mr-1"></div>
                        ))}
                    </div>
                    <div className="text-xs mb-4 flex">
                        <div className="w-28">
                            {exercise.name}
                        </div>
                        <div>
                            {exercise.duration}({exercise.calories}kcal)
                        </div>
                    </div>
                    <div>
                        {exercise.content}
                    </div>
                </div>
            </div>

        </div>
    );
}