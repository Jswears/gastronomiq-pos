import apiClient from "./api";

export type OrderStatus = "Open" | "Closed" | "Cancelled";

export interface Order {
  order_id: number;
  table_id?: number;
  employee_id?: number;
  order_date_time?: string;
  status?: OrderStatus;
}

// Fetch all orders for a table
// Typically: GET /tables/:tableId/orders (adapt as needed)
export async function fetchOrdersByTable(tableId: number): Promise<Order[]> {
  return apiClient.get(`/tables/${tableId}/orders`);
}

// Create a new order for a table
// Typically: POST /tables/:tableId/orders
export async function createOrderForTable(
  tableId: number,
  employeeId: number,
  status: OrderStatus
): Promise<Order> {
  return apiClient.post(`/tables/${tableId}/orders`, {
    employee_id: employeeId,
    status,
  });
}
