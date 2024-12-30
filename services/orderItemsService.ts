import apiClient from "./api";

export type OrderItemStatus = "NotFired" | "Fired" | "Completed";

export interface OrderItem {
  order_item_id: number;
  order_id: number;
  menu_item_id: number;
  quantity: number;
  status: OrderItemStatus;
  unit_price: number;
}

// Create (Add) a new item to an order
// Typically: POST /orders/:orderId/items
export async function addOrderItemAPI(
  orderId: number,
  menu_item_id: number,
  quantity: number,
  unit_price: number
): Promise<OrderItem> {
  return apiClient.post(`/orders/${orderId}/items`, {
    menu_item_id,
    quantity,
    unit_price,
  });
}

// Update the item’s status (e.g., "Fired" when user clicks "Send")
export async function updateOrderItemStatusAPI(
  orderId: number,
  orderItemId: number,
  status: OrderItemStatus
): Promise<OrderItem> {
  // Typically: PATCH /orders/:orderId/items/:orderItemId
  return apiClient.patch(`/orders/${orderId}/items/${orderItemId}`, {
    status,
  });
}

// Optionally, if you need to fetch existing order items
// GET /orders/:orderId/items
export async function fetchOrderItemsForOrder(
  orderId: number
): Promise<OrderItem[]> {
  return apiClient.get(`/orders/${orderId}/items`);
}
