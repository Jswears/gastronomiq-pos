import React, { FC } from "react";
import OrderButton from "../Buttons/OrderButton";
import { calculateTotalPrice } from "@/utils/calculateTotalPrice";
import { MenuItem } from "@/services/menuItemsService";
import { OrderItem } from "@/services/orderItemsService";

interface OrderSidebarProps {
    tableId: number;
    orderId: number | null;
    orderItems: OrderItem[];
    menuItems: MenuItem[];
    onSend: () => void;
    onPay: () => void;
}

const OrderSidebar: FC<OrderSidebarProps> = ({
    tableId,
    orderId,
    orderItems,
    menuItems,
    onSend,
    onPay,
}) => {
    // 1) Filter the orderItems to only those matching the current orderId
    const itemsForThisOrder = orderItems
        .filter((oi) => oi.order_id === orderId)
        .map((oi) => {
            const menuItem = menuItems.find((m) => m.menu_item_id === oi.menu_item_id);
            return {
                ...oi,
                name: menuItem?.name,
                price: menuItem?.price,
            };
        });

    // 2) Compute total price
    const totalPrice = itemsForThisOrder.reduce((acc, item) => {
        return acc + (item.price || 0) * (item.quantity || 0);
    }, 0);
    const tax = totalPrice * 0.19;
    const totalPriceWithTax = totalPrice + tax;

    return (
        <div className="w-1/4 flex flex-col gap-[10px] h-full ">
            {/* Header */}
            <div className="bg-background-panel-gray flex justify-center gap-4 h-fit text-regular font-nunitoSans p-4 shadow-section-shadow border border-text-divider-gray">
                <h1 className="font-oswald text-heading-h2 font-semibold">
                    Table {tableId} Order
                </h1>
            </div>

            {/* Order Items + Send Button */}
            <div className="h-full flex flex-col gap-4 bg-background-sidebar-gray shadow-section-shadow border border-text-divider-gray p-[10px] overflow-y-scroll   [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 px-2">
                <div className="flex justify-center w-full gap-[10px] border-b pb-4 border-text-muted-dark-gray shadow-md">
                    <OrderButton
                        size="lg"
                        color="muted-green"
                        text="Send"
                        type="action"
                        onClick={onSend}
                    />
                </div>
                {itemsForThisOrder.map((item) => (
                    <div
                        key={item.order_item_id}
                        className="bg-text-divider-gray p-4 rounded-lg flex justify-between gap-4"
                    >
                        <span>{item.quantity}</span>
                        <span>{item.name}</span>
                        <span>${calculateTotalPrice(item.price || 0, item.quantity)}</span>
                    </div>
                ))}
            </div>

            {/* Totals + Pay Button */}
            <div className="text-light-grey h-fit bg-background-sidebar-gray shadow-section-shadow border border-text-divider-gray">
                <div className="p-[10px] flex flex-col gap-[10px]">
                    <div className="flex justify-between">
                        <span>Total:</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Including MwSt 19%</span>
                        <span>${totalPriceWithTax.toFixed(2)}</span>
                    </div>
                </div>
                <div
                    onClick={onPay}
                    className="bg-muted-green w-full p-4 text-center cursor-pointer"
                >
                    <button className="text-heading-h2 font-oswald">Pay</button>
                </div>
            </div>
        </div>
    );
};

export default OrderSidebar;
