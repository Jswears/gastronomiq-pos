'use client'
import { Fragment, useState } from "react";
import OrderButton from "../Buttons/OrderButton";
import items from "@/mockData/items";
import { calculateTotalPrice } from "@/utils/calculateTotalPrice";
import { useRouter } from "next/navigation";
import { Banknote, CircleDollarSign, HandCoins, Printer, ReceiptEuro, ReceiptText } from "lucide-react";
import useOrderItemsStore from "@/stores/test/OrderItemsStore";
import useOrdersStore from "@/stores/test/OrdersStore";
import useMenuItemsStore from "@/stores/test/MenuItemsStore";

const OrdersGrid = ({ tableId }: { tableId: string }) => {
    const router = useRouter();

    const { orderItems, addOrderItem } = useOrderItemsStore();
    const { tableOrders, fetchTableOrders, initOrder, orderId } = useOrdersStore();
    const { menuItems } = useMenuItemsStore();


    const handlePayClick = (tableId: string) => {
        console.log(`Table ${tableId} clicked`);
        router.push(`/pos/tables/payment/${tableId}`);
    };


    const orderItemsWithDetails = orderItems
        .filter((orderItem) => orderItem.order_id === orderId) // Filter by active orderId
        .map((orderItem) => {
            const menuItem = menuItems.find(
                (item) => item.menu_item_id === orderItem.menu_item_id
            );
            return {
                ...orderItem,
                name: menuItem?.name,
                price: menuItem?.price,
            };
        });

    const totalPrice = orderItemsWithDetails.reduce((acc, item) => {
        const itemTotal = (item.price || 0) * (item.quantity || 0);
        return (acc + itemTotal);
    }, 0);

    const totalPriceWithTax = totalPrice * 1.19;

    return (
        <Fragment>
            {/* Sidebar */}
            <div className="w-1/4 flex flex-col gap-[10px] h-full">
                <div className="bg-background-panel-gray flex justify-center gap-4 h-fit text-regular font-nunitoSans p-4 shadow-section-shadow border border-text-divider-gray">
                    <h1 className=" font-oswald text-heading-h2 font-semibold">Table {tableId} Summary</h1>
                </div>

                <div className="h-full flex flex-col gap-4 bg-background-sidebar-gray shadow-section-shadow border border-text-divider-gray p-[10px] ">
                    {/* <div className="flex justify-start w-full gap-[10px]">
                        <OrderButton size="lg" color="muted-blue" text="Items" type="action" action="clear"></OrderButton>
                        <OrderButton size="lg" color="feedback-warning-amber" text="Covers" type="action"></OrderButton>
                    </div> */}
                    <div className="overflow-y-scroll   [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 flex flex-col gap-4 px-2">
                        {orderItemsWithDetails.map((item, index) => (
                            <div key={index} className="bg-text-divider-gray p-4 rounded-lg flex justify-between gap-4">
                                <span>{item.quantity && item.quantity}</span>
                                <span>{item.name}</span>
                                <span>${calculateTotalPrice(item.price || 0, item.quantity)}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-light-grey h-fit bg-background-sidebar-gray shadow-section-shadow border border-text-divider-gray">
                    <div className="p-[10px] flex flex-col gap-[10px]">
                        <div className="flex justify-between">
                            <span>Total:</span>
                            <span>${(totalPrice).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between"><span>Including MwSt 19%</span><span>${totalPriceWithTax.toFixed(2)}</span></div>
                    </div>
                </div>
            </div>

            {/* Middlebar */}
            <div className="bg-background-sidebar-gray w-1/4  p-[10px] border bg-warn border-text-divider-gray shadow-section-shadow">

            </div>

            {/* Rightbar */}
            <div className="w-2/4 h-full flex flex-col justify-between gap-[20px] ">
                <div className="bg-background-panel-gray h-1/5 border border-text-divider-gray shadow-section-shadow flex justify-between items-center p-[10px]">
                    <div className=" flex justify-center items-center gap-[10px]"><CircleDollarSign className="self-end" /><h2 className=" font-oswald font-semibold text-heading-h2">Payment Amount</h2></div>
                    <div><span className="font-oswald text-heading-h2">{totalPriceWithTax.toFixed(2)}</span></div>
                </div>
                <div className="bg-background-panel-gray h-2/5 border border-text-divider-gray shadow-section-shadow flex justify-between items-center p-[10px]">
                    <div className=" flex justify-center items-center gap-[10px]"><Banknote className="self-end" /><h2 className=" font-oswald font-semibold text-heading-h2">Received Amount</h2></div>
                    <div><span className="font-oswald text-heading-h2">0.00</span></div>
                </div>
                <div className="bg-background-panel-gray h-1/6 border border-text-divider-gray shadow-section-shadow flex justify-between items-center p-[10px]">
                    <div className=" flex justify-center items-center gap-[10px]"><HandCoins className="self-end" /><h2 className=" font-oswald font-semibold text-heading-h2">Add Tips</h2></div>
                    <div><span className="font-oswald text-heading-h2">0.00</span></div>
                </div>
                <div className="bg-background-panel-gray h-1/6 border border-text-divider-gray shadow-section-shadow flex justify-between items-center p-[10px]">
                    <div className=" flex justify-center items-center gap-[10px]"><ReceiptText className="self-end" /><h2 className=" font-oswald font-semibold text-heading-h2">Print Receipt</h2></div>
                    <div><Printer className="self-end" /></div>
                </div>
                <div className="bg-muted-green w-full p-4 text-center shadow-section-shadow border border-text-divider-gray">
                    <button onClick={() => handlePayClick(tableId)} className="text-heading-h2 cursor-pointer  font-oswald">Pay</button>
                </div>
            </div>
        </Fragment>
    );
}

export default OrdersGrid;