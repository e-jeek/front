import example from "../../../assets/images/img.png";
import Image from "next/image";
import {useRouter} from "next/navigation";

interface Diet {
    actionId: number,
    type: string,
    score: number,
    dietType: string,
    foodName: string,
    calories: number,
    content: string,
    imgUrl: string,
    createdAt: string,
    updateAt: string
}

interface DietLogProps {
    value: Diet
}

export default function DailyDietLog(props: DietLogProps) {
    const diet: Diet = props.value;
    const router = useRouter();

    function getMealType(value: string) {
        switch (value) {
            case "BREAKFAST":
                return "아침";
            case "LUNCH":
                return "점심";
            case "DINNER":
                return "저녁";
        }
    }

    return (
        <div
            className="bg-pink-100 my-4 p-4 rounded-lg items-center"
            onClick={() => router.push(`/log/${diet.actionId}`)}
        >
            <div className="text-xl font-semibold mb-2">식사 - {getMealType(diet.dietType)}</div>
            <div className="flex">
                <Image src={example} alt="example" className="w-24 h-24 rounded-lg mr-4"/>
                <div>
                    <div className="flex items-center mb-2">
                        {Array(diet.score).fill("").map((index) => (
                            <div key={index} className="h-4 w-4 bg-red-400 rounded-full mr-1"></div>
                        ))}
                    </div>
                    <div className="text-xs mb-4 flex">
                        <div className="w-28">
                            {/*{diet.createdAt}*/}
                            AM 7:00
                        </div>
                        <div>
                            {diet.foodName}({diet.calories}kcal)
                        </div>
                    </div>
                    <div>
                        {diet.content}
                    </div>
                </div>
            </div>

        </div>
    );
}