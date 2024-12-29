'use client'

import tables from "@/mockData/tables";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TablesOverviewPage = () => {
    const [tablesData, setTablesData] = useState<any[]>([]);


    const router = useRouter();


    // const fetchTables = async () => {
    //     try {
    //         const response = await axios.get("https://udfo12new7.execute-api.eu-central-1.amazonaws.com/dev/tables");
    //         setTablesData(response.data);
    //         console.log('Tables fetched:', response.data);
    //     } catch (error) {
    //         console.error('Error fetching tables:', error);
    //     }
    // };


    useEffect(() => {
        setTablesData(tables)
    }, [tablesData]);
    const handleTableClick = (tableId: number) => {
        console.log(`Table ${tableId} clicked`);
        router.push(`/pos/tables/${tableId}`);
    };

    return (
        <section className="text-softer-grey flex gap-[10px] p-[10px] h-full overflow-hidden">
            <div className="w-[300px] flex flex-col gap-[10px] h-full">
                <div className="bg-background-sidebar-gray flex justify-end gap-4 h-fit text-regular font-nunitoSans p-4 shadow-section-shadow border border-text-divider-gray">
                    <button className="w-fit h-fit border border-text-divider-gray text-text-light-gray bg-state-disabled-gray focus:bg-primary-secondary-blue px-2 py-1 rounded">Active</button>
                    <button className="w-fit h-fit border border-text-divider-gray text-text-light-gray bg-state-disabled-gray focus:bg-primary-secondary-blue px-2 py-1 rounded">All</button>
                </div>
                <div className="bg-background-sidebar-gray flex-1 flex flex-col gap-4 overflow-auto p-4 text-body-large font-nunitoSans text-softer-grey shadow-section-shadow border border-text-divider-gray">
                    {tablesData.map((table) => (
                        <button key={table.id} onClick={() => handleTableClick(table.id)} className={` ${table.isActive ? "bg-[#4A90E2]" : "bg-text-divider-gray"} text-sof w-64 h-16 flex justify-between items-center  px-4 shadow-button-shadow border border-text-divider-gray rounded-md`}>
                            Table {table.id}
                        </button>
                    ))}


                </div>
            </div>
            <div className="bg-background-main-dark w-full h-full shadow-section-shadow border border-text-divider-gray flex justify-center items-center text-heading-h1 text-test font-oswald font-semibold">
                <div className="flex container gap-x-4 gap-y-6 items-center justify-center flex-wrap">
                    {tablesData.map((table) => (
                        <button key={table.id} onClick={() => handleTableClick(table.id)} className={` ${table.isActive ? "bg-[#4A90E2]" : "bg-text-divider-gray"} border border-text-divider-gray  rounded-md shadow-button-shadow w-32 h-32 flex justify-center items-center text-softer-grey`}>
                            {table.id}
                        </button>
                    ))}

                </div>
            </div>
        </section>
    );
}

export default TablesOverviewPage;
