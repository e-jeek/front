import {useRouter} from "next/navigation";

interface PageLinkProps {
    destination: string,
    path: string,
    label: string

}

export default function PageLink(props: PageLinkProps) {
    const router = useRouter();

    let isPresentPage = false;
    if (props.path === props.destination) {
        isPresentPage = true;
    }

    return (
        <div
            className="w-20 flex flex-col items-center"
            onClick={() => router.push(props.destination)}
        >
            <div className={`${isPresentPage ? "bg-red-300" : "bg-gray-300"} rounded-full w-8 h-8 flex items-center justify-center mb-1`}></div>
            <span className={`text-gray-600 text-sm ${isPresentPage ? "font-bold" : ""}`}>{props.label}</span>
        </div>
    );
}