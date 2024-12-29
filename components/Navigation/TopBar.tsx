'use client';
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TopBar = () => {
    const pathname = usePathname();

    useEffect(() => {
        console.log(pathname);
    }, []);

    return (
        <div className="h-[68px] bg-background-panel-gray p-4 flex justify-between  items-center text-heading-h1 font-oswald text-text-light-gray border border-b border-text-divider-gray">
            <div></div>
            <h1>Tables</h1>
            <Bell />
        </div>
    );
}

export default TopBar;