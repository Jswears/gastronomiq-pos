import React, { FC } from "react";
import OrderButton from "../Buttons/OrderButton";
import { Category } from "@/services/categoriesService";

interface CategoriesSidebarProps {
    categories: Category[];
    currentCategoryId: number;
    onCategoryChange: (categoryId: number, categoryName: string) => void;
}

const CategoriesSidebar: FC<CategoriesSidebarProps> = ({
    categories,
    currentCategoryId,
    onCategoryChange,
}) => {
    return (
        <div className="bg-background-sidebar-gray w-1/4 p-[10px] border bg-warn border-text-divider-gray shadow-section-shadow">
            <div className="p-4 flex flex-wrap content-start gap-4">
                {categories.map((cat) => (
                    <OrderButton
                        key={cat.category_id}
                        size="lg"
                        color={
                            cat.name === "Meals"
                                ? "muted-red"
                                : cat.name === "Specials"
                                    ? "muted-green"
                                    : "muted-blue"
                        }
                        text={cat.name}
                        onCategoryChange={() => onCategoryChange(cat.category_id, cat.name)}
                        type="category"
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoriesSidebar;
