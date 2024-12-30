// stores/ordersStore.ts

import { create } from "zustand";
import {
  Order,
  OrderStatus,
  createOrderForTable,
  fetchOrdersByTable,
} from "@/services/ordersService";

type OrdersStoreState = {
  tableOrders: Order[] | null;
  orderId: number | null;
  fetchTableOrders: (tableId: number) => Promise<void>;
  initOrder: (tableId: number) => Promise<void>;
};

const useOrdersStore = create<OrdersStoreState>((set, get) => ({
  tableOrders: null,
  orderId: null,

  fetchTableOrders: async (tableId: number) => {
    try {
      const data = await fetchOrdersByTable(tableId);
      set({ tableOrders: data });
    } catch (error) {
      console.error("Error fetching table orders:", error);
    }
  },

  initOrder: async (tableId: number) => {
    try {
      // 1) Fetch all orders for that table
      const existingOrders = await fetchOrdersByTable(tableId);

      // 2) Check if there's an 'Open' order
      const openOrder = existingOrders.find((o) => o.status === "Open");

      if (openOrder) {
        set({ orderId: openOrder.order_id, tableOrders: existingOrders });
      } else {
        const newOrder = await createOrderForTable(tableId, 1, "Open");
        set({
          orderId: newOrder.order_id,
          tableOrders: [...existingOrders, newOrder],
        });
      }
    } catch (error) {
      console.error("Error initializing order:", error);
    }
  },
}));

export default useOrdersStore;
