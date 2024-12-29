import TopBar from "@/components/Navigation/TopBar";
import React from "react";
import BottomBar from "@/components/Navigation/BottomBar";

const POSLayout = ({
    children,
}: { children: React.ReactNode }) => {
    return (
        <section className="bg-background-base h-screen flex flex-col">
            {/* <TopBar /> */}
            <main className="flex-1 overflow-hidden">
                {children}
            </main>
            <BottomBar />
        </section>
    );
}

export default POSLayout;
