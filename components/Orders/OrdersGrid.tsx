"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Store hooks
import useOrdersStore from "@/stores/ordersStore";
import useMenuItemsStore from "@/stores/menuItemsStore";
import { useCategoriesStore } from "@/stores/categoriesStore";
import useOrderItemsStore from "@/stores/orderItemsStore";

// Child components
import OrderSidebar from "./OrderSidebar";
import CategoriesSidebar from "./CategoriesSidebar";
import MenuItemsGrid from "./MenuItemsGrid";

// Types
import { MenuItem } from "@/services/menuItemsService";

const OrdersGrid = ({ tableId }: { tableId: number }) => {
    const router = useRouter();

    // Local state for category filtering
    const [currentCategoryId, setCurrentCategoryId] = useState<number>(1);
    const [currentCategory, setCurrentCategory] = useState("Meals");

    // Zustand store hooks
    const { menuItems, fetchMenuItems } = useMenuItemsStore();
    const { orderItems, addOrderItem, fireAllNotFiredItems } = useOrderItemsStore();
    const { categories, fetchCategories } = useCategoriesStore();
    const { orderId, initOrder } = useOrdersStore();

    // --- Lifecycle ---
    useEffect(() => {
        // Load categories and menu items
        fetchCategories();
        fetchMenuItems();
    }, [fetchCategories, fetchMenuItems]);

    useEffect(() => {
        // Init or fetch an open order for this table
        if (tableId) {
            initOrder(tableId);
        }
    }, [tableId, initOrder]);

    // --- Handlers ---
    const handleCategoryChange = (categoryId: number, categoryName: string) => {
        setCurrentCategoryId(categoryId);
        setCurrentCategory(categoryName);
    };

    const handleAddToOrder = (menuItem: MenuItem) => {
        if (orderId) {
            addOrderItem(menuItem, orderId);
        } else {
            console.error("No active order ID. Please initialize the order first.");
        }
    };

    const handleSendClick = async () => {
        if (!orderId) return;
        await fireAllNotFiredItems(orderId);
        // Optionally show a notification or toast
    };

    const handlePayClick = () => {
        router.push(`/pos/tables/${tableId}/payment`);
    };

    // --- Layout ---
    return (
        <Fragment>
            {/* Using CSS flex or some layout approach */}
            <div className="flex w-full h-full gap-[10px]">
                {/* Left Sidebar: OrderSidebar */}
                <OrderSidebar
                    tableId={tableId}
                    orderId={orderId}
                    orderItems={orderItems}
                    menuItems={menuItems}
                    onSend={handleSendClick}
                    onPay={handlePayClick}
                />

                {/* Middle Bar: CategoriesSidebar */}
                <CategoriesSidebar
                    categories={categories}
                    currentCategoryId={currentCategoryId}
                    onCategoryChange={handleCategoryChange}
                />

                {/* Right Bar: MenuItemsGrid */}
                <MenuItemsGrid
                    menuItems={menuItems}
                    currentCategoryId={currentCategoryId}
                    currentCategory={currentCategory}
                    onAddToOrder={handleAddToOrder}
                />
            </div>
        </Fragment>
    );
};

export default OrdersGrid;
