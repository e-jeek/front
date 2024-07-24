"use client"
import {usePathname, useRouter} from "next/navigation";
import PageLink from "@/components/footer/PageLink";

export default function Footer() {
    const router = useRouter();
    const pathName = usePathname();

    return (
        <footer className="p-2 fixed bottom-0 w-full h-20 border-t-2 border-gray-400 bg-white">
            <div className="flex justify-around py-1">
                <PageLink label="가계부" destination="/log" path={pathName} />
                <PageLink label="챌린지" destination="/challenge" path={pathName} />
                <PageLink label="운동정보" destination="/info" path={pathName} />
                <PageLink label="마이페이지" destination="/mypage" path={pathName} />
            </div>
        </footer>
    );
}