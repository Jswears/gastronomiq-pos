'use client';


import { OrderButtonProps } from "@/types";
import { colorStyles, sizeStyles } from "./buttonStyles";
import useOrderItemsStore from "@/stores/test/OrderItemsStore";

const OrderButton = ({ color, text, size, onCategoryChange, type, action }: OrderButtonProps) => {

    const { clearOrderItems } = useOrderItemsStore();

    const actionsMap: Record<string, (() => void) | undefined> = {
        clear: clearOrderItems
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
        <button className={`${buttonSize} ${buttonColor} font-oswald w-full h-full  text-softer-grey shadow-button-shadow`}
            onClick={handleClick}>{text}</button>
    );
}

export default OrderButton;