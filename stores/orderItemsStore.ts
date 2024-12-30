import { create } from "zustand";
import {
  OrderItem,
  OrderItemStatus,
  addOrderItemAPI,
  updateOrderItemStatusAPI,
} from "@/services/orderItemsService";
import { MenuItem } from "@/services/menuItemsService";

type OrderItemsStoreState = {
  orderItems: OrderItem[];
  addOrderItem: (menuItem: MenuItem, orderId: number) => Promise<void>;
  removeOrderItem: (orderItemId: number) => void; // if you have a remove endpoint
  clearOrderItems: () => void;
  fireAllNotFiredItems: (orderId: number) => Promise<void>;
};

const useOrderItemsStore = create<OrderItemsStoreState>((set, get) => ({
  orderItems: [],

  // Add item to order
  addOrderItem: async (menuItem, orderId) => {
    try {
      const existingOrderItem = get().orderItems.find(
        (oi) =>
          oi.menu_item_id === menuItem.menu_item_id && oi.order_id === orderId
      );

      if (existingOrderItem) {
        // For the MVP, we can just increment quantity locally,
        // or call a "PATCH" endpoint if the backend supports it.
        const updatedQuantity = existingOrderItem.quantity + 1;
        // (Optional) do an API call here, e.g.:
        // await updateOrderItemAPI(orderId, existingOrderItem.order_item_id, { quantity: updatedQuantity });
        set((state) => ({
          orderItems: state.orderItems.map((oi) =>
            oi.order_item_id === existingOrderItem.order_item_id
              ? { ...oi, quantity: updatedQuantity }
              : oi
          ),
        }));
      } else {
        // If not in local state, do a POST to create the new item
        const newOrderItemResponse = await addOrderItemAPI(
          orderId,
          menuItem.menu_item_id,
          1,
          menuItem.price
        );

        const { order_item } = newOrderItemResponse;
        set((state) => ({
          orderItems: [...state.orderItems, order_item],
        }));
      }
    } catch (error) {
      console.error("Error adding order item:", error);
    }
  },

  removeOrderItem: (orderItemId) => {
    try {
      // If you have a DELETE endpoint, call it here
      // e.g. await apiClient.delete(`/orders/${orderId}/items/${orderItemId}`);
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

  // "Send" functionality to fire items not yet fired
  fireAllNotFiredItems: async (orderId) => {
    try {
      const { orderItems } = get();
      const notFiredItems = orderItems.filter(
        (oi) => oi.order_id === orderId && oi.status === "NotFired"
      );

      // Fire them in parallel
      const updatedItems = await Promise.all(
        notFiredItems.map((item) =>
          updateOrderItemStatusAPI(orderId, item.order_item_id, "Fired")
        )
      );

      // Merge updated items back into local state
      set((state) => {
        const newOrderItems = state.orderItems.map((oi) => {
          const updated = updatedItems.find(
            (u) => u.order_item_id === oi.order_item_id
          );
          return updated ? updated : oi;
        });
        return { orderItems: newOrderItems };
      });
    } catch (error) {
      console.error("Error firing order items:", error);
    }
  },
}));

export default useOrderItemsStore;
