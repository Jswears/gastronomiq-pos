'use client';

import { useOrdersStore } from "@/stores/OrdersStore";
import { OrderButtonProps } from "@/types";
import { colorStyles, sizeStyles } from "./buttonStyles";

const OrderButton = ({ color, text, size, onCategoryChange, type, action }: OrderButtonProps) => {

    const { clearOrder } = useOrdersStore();

    const actionsMap: Record<string, (() => void) | undefined> = {
        clear: clearOrder
    }

    const handleClick = () => {
        if (type === 'category' && onCategoryChange) {
            onCategoryChange(text);
        } else if (type === 'action' && action) {
            const actionFunction = actionsMap[action];
            if (actionFunction) {
                actionFunction()
            } else {
                console.warn(`Unhandled action: ${action}`)
            }
        }
    }

    const buttonSize = sizeStyles[size];
    const buttonColor = colorStyles[color];


    return (
        <button className={`${buttonSize} ${buttonColor} font-oswald  text-softer-grey shadow-button-shadow`}
            onClick={handleClick}>{text}</button>
    );
}

export default OrderButton;