import React, { FC } from "react";
import { MenuItem } from "@/services/menuItemsService";

interface MenuItemsGridProps {
    menuItems: MenuItem[];
    currentCategoryId: number;
    currentCategory: string;
    onAddToOrder: (item: MenuItem) => void;
}

const MenuItemsGrid: FC<MenuItemsGridProps> = ({
    menuItems,
    currentCategoryId,
    currentCategory,
    onAddToOrder,
}) => {
    // Filter by current category
    const filteredMenuItems = menuItems.filter(
        (item) => item.category_id === currentCategoryId
    );

    return (
        <div className="w-2/4 h-full flex flex-col gap-[10px]">
            {/* Header */}
            <div className="bg-background-panel-gray h-[62px] flex justify-center items-center border border-text-divider-gray shadow-section-shadow">
                <h2 className="font-oswald font-semibold text-heading-h2">{currentCategory}</h2>
            </div>

            {/* Grid of Menu Items */}
            <div className="bg-background-sidebar-gray h-full p-4 grid grid-cols-3 gap-4 content-start border border-text-divider-gray shadow-section-shadow">
                {filteredMenuItems.map((item) => (
                    <button
                        key={item.menu_item_id}
                        onClick={() => onAddToOrder(item)}
                        className="bg-text-divider-gray text-heading-h2 font-oswald font-semibold w-44 h-40 rounded-lg flex flex-col justify-center items-center place-self-center gap-[10px]"
                    >
                        <span>{item.name}</span>
                        <span>${item.price}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MenuItemsGrid;
