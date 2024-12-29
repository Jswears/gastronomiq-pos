import { Item, OrdersStore } from "@/types";
import { create } from "zustand";

export const useOrdersStore = create<OrdersStore>((set) => ({
  orderItems: [],

  // Add an item to the order
  addItem: (item: Item) =>
    set((state) => {
      const existingItem = state.orderItems.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          orderItems: state.orderItems.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity ? i.quantity + 1 : 1 }
              : i
          ),
        };
      }
      console.log();
      return { orderItems: [...state.orderItems, { ...item, quantity: 1 }] };
    }),

  updateTotalPrice: (
    item: Item,

    id: number,

    price: string | number,

    quantity: number
  ): number => {
    const parsedPrice =
      typeof price === "string"
        ? parseFloat(price.replace(/[^0-9.]/g, ""))
        : price;

    if (isNaN(parsedPrice)) {
      throw new Error("Invalid price format");
    }

    // Calculate the total price

    const totalPrice = parsedPrice * quantity;

    // Update the state

    set((state) => {
      // Check if the item already exists in the state

      const existingItem = state.orderItems.find((i) => i.id === id);

      if (existingItem) {
        // Update the existing item's price and quantity

        return {
          orderItems: state.orderItems.map((i) =>
            i.id === id ? { ...i, price: parsedPrice, quantity: quantity } : i
          ),
        };
      }

      // Add a new item if it doesn't exist

      return {
        orderItems: [
          ...state.orderItems,

          { ...item, price: parsedPrice, quantity },
        ],
      };
    });

    return totalPrice;
  },

  // Clear order
  clearOrder: () => set(() => ({ orderItems: [] })),
}));
