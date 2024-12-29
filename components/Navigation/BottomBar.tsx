'use client';
import { Bell, LogOut, Table } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { FC } from "react";

const BottomBar: FC = () => {

    const router = useRouter();
    const navigateToTables = (): void => {
        router.push("/pos/tables/");
    };

    return (
        <div className="h-[72px] p-4 flex justify-end items-center gap-4 bg-background-panel-gray border-t border-text-divider-gray text-button-primary font-bold text-text-light-gray font-nunitoSans">
            <button onClick={navigateToTables} className="p-[10px] gap-2 text-center flex items-center rounded-[4px] bg-primary-secondary-blue">
                <Table />Tables
            </button>
            <button className="p-[10px] gap-2 text-center flex items-center rounded-[4px] bg-muted-red">
                <LogOut />Logout
            </button>
        </div>
    );
}

export default BottomBar;