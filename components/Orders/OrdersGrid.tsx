'use client'
import { Fragment, useEffect, useState } from "react";
import OrderButton from "../Buttons/OrderButton";
import ItemsList from "./ItemsList";
import { Item } from "@/types";
import { useOrdersStore } from "@/stores/OrdersStore";
import items from "@/mockData/items";
import { calculateTotalPrice } from "@/utils/calculateTotalPrice";
import { useRouter } from "next/navigation";

const OrdersGrid = ({ tableId }: { tableId: string }) => {
    const router = useRouter();
    const [currentCategory, setCurrentCategory] = useState("Meals");

    const { orderItems, addItem } = useOrdersStore();

    const handleCategoryChange = (category: string) => {
        setCurrentCategory(category);
    };

    const handlePayClick = (tableId: string) => {
        console.log(`Table ${tableId} clicked`);
        router.push(`/pos/tables/payment/${tableId}`);
    };


    const filteredItems = items.filter((item) => item.category === currentCategory);


    return (
        <Fragment>
            {/* Sidebar */}
            <div className="w-1/4 flex flex-col gap-[10px] h-full">
                <div className="bg-background-panel-gray flex justify-center gap-4 h-fit text-regular font-nunitoSans p-4 shadow-section-shadow border border-text-divider-gray">
                    <h1 className=" font-oswald text-heading-h2 font-semibold">Table {tableId} Order</h1>
                </div>

                <div className="h-full flex flex-col gap-4 bg-background-sidebar-gray shadow-section-shadow border border-text-divider-gray p-[10px] overflow-y-scroll   [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                    <div className="flex justify-between w-full gap-[10px]">
                        <OrderButton size="md" color="muted-red" text="Clear Order" type="action" action="clear"></OrderButton>
                        <OrderButton size="md" color="feedback-warning-amber" text="On Hold" type="action"></OrderButton>
                        <OrderButton size="md" color="muted-green" text="Send" type="action"></OrderButton>
                    </div>
                    {orderItems.map((item, index) => (
                        <div key={index} className="bg-text-divider-gray p-4 rounded-lg flex justify-between gap-4">
                            <span>{item.quantity && item.quantity}</span>
                            <span>{item.name}</span>
                            <span>${calculateTotalPrice(item.price, item.quantity)}</span>
                        </div>
                    ))}
                </div>
                <div className="text-light-grey h-fit bg-background-sidebar-gray shadow-section-shadow border border-text-divider-gray">
                    <div className="p-[10px] flex flex-col gap-[10px]">
                        <div className="flex justify-between">
                            <span>Total:</span>
                            <span>$29.99</span>
                        </div>
                        <div className="flex justify-between"><span>Including MwSt 19%</span><span>$3</span></div>
                    </div>
                    <div className="bg-muted-green w-full p-4 text-center">
                        <button onClick={() => handlePayClick(tableId)} className="text-heading-h2 cursor-pointer  font-oswald">Pay</button>
                    </div>
                </div>
            </div>

            {/* Middlebar */}
            <div className="bg-background-sidebar-gray w-1/4  p-[10px] border bg-warn border-text-divider-gray shadow-section-shadow">
                <div className="p-4 flex flex-wrap  content-start gap-4">
                    <OrderButton size="lg" color="muted-red" text="Meals" onCategoryChange={handleCategoryChange} type="category" />
                    <OrderButton size="lg" color="muted-green" text="Specials" onCategoryChange={handleCategoryChange} type="category" />
                    <OrderButton size="lg" color="muted-blue" text="Drinks" onCategoryChange={handleCategoryChange} type="category" />
                </div>
            </div>

            {/* Rightbar */}
            <div className="w-2/4 h-full flex flex-col gap-[10px]">
                <div className="bg-background-panel-gray h-[62px] flex justify-center items-center border border-text-divider-gray shadow-section-shadow"><h2 className=" font-oswald font-semibold text-heading-h2">{currentCategory}</h2></div>
                <div className="bg-background-sidebar-gray h-full p-4 grid grid-cols-3 gap-4 content-start border border-text-divider-gray shadow-section-shadow">
                    <ItemsList items={filteredItems} onAddToOrder={addItem} table={tableId} />
                </div>
            </div>
        </Fragment>
    );
}

export default OrdersGrid;