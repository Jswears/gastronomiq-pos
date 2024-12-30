"use client";

import { Fragment, useEffect, useState } from "react";
import OrderButton from "../Buttons/OrderButton";
import ItemsList from "./ItemsList"; // if you have such a file
import { Item } from "@/types";      // if you have a `types` file
import items from "@/mockData/items"; // if you have local mock data
import { calculateTotalPrice } from "@/utils/calculateTotalPrice";
import { useRouter } from "next/navigation";
// Store that manages the "order items" specifically:
import { useOrdersStore as useOrderItemsStore } from "@/stores/test/OrderItemsStore";
// The store we created above for Orders
import useOrdersStore from "@/stores/test/OrdersStore";
import useMenuItemsStore from "@/stores/test/MenuItemsStore";
import { useCategoriesStore } from "@/stores/test/CategoriesStore";

interface OrdersGridProps {
    tableId: number;
}

const OrdersGrid = ({ tableId }: OrdersGridProps) => {
    const router = useRouter();

    // Category for filtering items
    const [currentCategoryId, setCurrentCategoryId] = useState(1);
    const [currentCategory, setCurrentCategory] = useState("Meals");

    // MenuItems Store
    const { menuItems, fetchMenuItems } = useMenuItemsStore();

    // This store presumably manages "orderItems" in a separate store
    // if you have a separate store for line items. 
    // Adjust as needed for your actual code:
    const { orderItems, addItem } = useOrderItemsStore();


    // From the OrdersStore we created above
    const { orders, fetchTableOrders, initOrder, orderId } = useOrdersStore();
    const { categories, fetchCategories } = useCategoriesStore();

    // Fetch table orders once
    // useEffect(() => {
    //     if (tableId) {
    //         fetchTableOrders(tableId);
    //         initOrder(tableId);
    //         fetchMenuItems();
    //     }
    // }, [tableId, fetchTableOrders, initOrder]);


    // Switch categories
    const handleCategoryChange = (categoryId: number, categoryName: string) => {
        setCurrentCategoryId(categoryId);
        setCurrentCategory(categoryName);
    };

    // Example pay button
    // const handlePayClick = () => {
    //     console.log(`Table ${tableId} pay click, current orderId = ${orderId}`);
    //     router.push(`/pos/tables/payment/${tableId}`);
    // };

    // Filter items by category
    const filteredMenuItems = menuItems.filter((item) => item.category_id === currentCategoryId);


    useEffect(() => {
        fetchTableOrders(tableId);
        initOrder(tableId);
        fetchCategories();
        fetchMenuItems();
        console.log(orderId);
    }, [tableId]);

    const handleLogOrders = () => {
        console.log(orders);
    };
    return (
        <Fragment>
            {/* Sidebar */}
            <button onClick={handleLogOrders}>Log</button>
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
                        {/* <button onClick={() => handlePayClick()} className="text-heading-h2 cursor-pointer  font-oswald">Pay</button> */}
                    </div>
                </div>
            </div>

            {/* Middlebar */}
            <div className="bg-background-sidebar-gray w-1/4  p-[10px] border bg-warn border-text-divider-gray shadow-section-shadow">
                <div className="p-4 flex flex-wrap  content-start gap-4">
                    {categories.map((category) => (
                        <OrderButton key={category.category_id} size="lg" color={category.name === "Meals" ? 'muted-red' : category.name === "Specials" ? "muted-green" : "muted-blue"} text={category.name} onCategoryChange={() => handleCategoryChange(category.category_id, category.name)} type="category" />
                    ))}
                    {/* <OrderButton size="lg" color="muted-red" text="Meals" onCategoryChange={handleCategoryChange} type="category" />
                    <OrderButton size="lg" color="muted-green" text="Specials" onCategoryChange={handleCategoryChange} type="category" />
                    <OrderButton size="lg" color="muted-blue" text="Drinks" onCategoryChange={handleCategoryChange} type="category" /> */}
                </div>
            </div>

            {/* Rightbar */}
            <div className="w-2/4 h-full flex flex-col gap-[10px]">
                <div className="bg-background-panel-gray h-[62px] flex justify-center items-center border border-text-divider-gray shadow-section-shadow"><h2 className=" font-oswald font-semibold text-heading-h2">{currentCategory}</h2></div>
                <div className="bg-background-sidebar-gray h-full p-4 grid grid-cols-3 gap-4 content-start border border-text-divider-gray shadow-section-shadow">
                    {/* <ItemsList items={filteredItems} onAddToOrder={addItem} table={tableId} /> */}

                    {/* Use the menuItems from the store */}
                    {filteredMenuItems.map((item) => (
                        <button key={item.menu_item_id} className="bg-text-divider-gray text-heading-h2 font-oswald font-semibold w-44 h-40 rounded-lg flex flex-col justify-center items-center place-self-center gap-[10px]">
                            <span>{item.name}</span>
                            <span>${item.price}</span>
                        </button>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}

export default OrdersGrid;