import { create } from "zustand";
import { OrderItem, MenuItem } from "@/types";

type OrderItemsStoreState = {
  orderItems: OrderItem[];
  addOrderItem: (menuItem: MenuItem, orderId: number) => void;
  removeOrderItem: (orderItemId: number) => void;
  clearOrderItems: () => void;
  setOrderItemsForOrder: (orderId: number) => void;
};

const useOrderItemsStore = create<OrderItemsStoreState>((set, get) => ({
  orderItems: [],

  addOrderItem: (menuItem, orderId) => {
    try {
      set((state) => {
        const existingOrderItem = state.orderItems.find(
          (oi) =>
            oi.menu_item_id === menuItem.menu_item_id && oi.order_id === orderId
        );

        const updatedOrderItems = existingOrderItem
          ? state.orderItems.map((oi) =>
              oi.menu_item_id === menuItem.menu_item_id &&
              oi.order_id === orderId
                ? { ...oi, quantity: oi.quantity + 1 }
                : oi
            )
          : [
              ...state.orderItems,
              {
                order_item_id: Math.floor(Math.random() * 1000), // Generate a unique ID
                order_id: orderId,
                menu_item_id: menuItem.menu_item_id,
                quantity: 1,
                status: "NotFired" as "NotFired",
                unit_price: menuItem.price,
              },
            ];

        return { orderItems: updatedOrderItems };
      });
    } catch (error) {
      console.error("Error adding order item:", error);
    }
  },

  removeOrderItem: (orderItemId) => {
    try {
      set((state) => ({
        orderItems: state.orderItems.filter(
          (oi) => oi.order_item_id !== orderItemId
        ),
      }));
    } catch (error) {
      console.error("Error removing order item:", error);
    }
  },

  clearOrderItems: () => {
    try {
      set({ orderItems: [] });
    } catch (error) {
      console.error("Error clearing order items:", error);
    }
  },

  setOrderItemsForOrder: (orderId) => {
    try {
      const { orderItems } = get();
      const filteredOrderItems = orderItems.filter(
        (oi) => oi.order_id === orderId
      );
      set({ orderItems: filteredOrderItems });
    } catch (error) {
      console.error("Error setting order items for order:", error);
    }
  },
}));

export default useOrderItemsStore;
