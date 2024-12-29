'use client';
import { Item } from "@/types";
import { Fragment, useState } from "react";

const ItemsList = ({ items, onAddToOrder, table }: { items: Item[], onAddToOrder: (item: Item, tableId: string) => void, table: string }) => {

    return (
        <Fragment>
            {items.map((item: Item) => (
                <button onClick={() => onAddToOrder(item, table)} key={item.id} className="bg-text-divider-gray text-heading-h2 font-oswald font-semibold w-44 h-40 rounded-lg flex flex-col justify-center items-center place-self-center gap-[10px]">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                </button>
            ))}
        </Fragment>

    );
}

export default ItemsList;