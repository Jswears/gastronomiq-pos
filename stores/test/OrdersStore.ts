"use client";
import Orders from "@/mockData/orders";
import { create } from "zustand";

type OrderStatus = "Open" | "Closed" | "Cancelled";

type Order = {
  order_id: number;
  table_id?: number;
  employee_id?: number;
  order_date_time?: string;
  status?: OrderStatus;
};

type OrdersStoreState = {
  tableOrders: Order[] | null;
  orderId: number | null;
  fetchTableOrders: (tableId: number) => void;
  initOrder: (tableId: number) => void;
};

const useOrdersStore = create<OrdersStoreState>((set, get) => ({
  tableOrders: null,
  orderId: null,

  // Fetch tableOrders for a specific table
  fetchTableOrders: (tableId: number) => {
    try {
      const filteredTableOrders = Orders.filter((o) => o.table_id === tableId);
      set({ tableOrders: filteredTableOrders });
    } catch (error) {
      console.error("Error fetching table orders:", error);
    }
  },

  // Initialize an order for the table
  initOrder: (tableId: number) => {
    try {
      const existingOrders = Orders.filter((o) => o.table_id === tableId);
      const openOrder = existingOrders.find((o) => o.status === "Open");

      if (openOrder) {
        // If there's an open order, set the orderId
        set({ orderId: openOrder.order_id });
      } else {
        // Create a new order if no open order exists
        const newOrder: Order = {
          order_id: Orders.length + 1,
          table_id: tableId,
          employee_id: 1,
          order_date_time: new Date().toISOString(),
          status: "Open",
        };

        Orders.push(newOrder);
        set({ orderId: newOrder.order_id });
      }
    } catch (error) {
      console.error("Error initializing order:", error);
    }
  },
}));

export default useOrdersStore;
