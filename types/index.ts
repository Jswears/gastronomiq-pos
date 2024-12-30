// Type definitions for the entire application

export type RestaurantTable = {
  table_id: number;
  table_number: number;
  seats: number;
  location: string;
  is_active: boolean;
};

export type Order = {
  order_id: number;
  table_id?: number;
  employee_id?: number;
  order_date_time?: string;
  status?: "Open" | "Closed" | "Cancelled";
};

export type OrderItem = {
  order_item_id: number;
  order_id: number | null;
  menu_item_id: number;
  quantity: number;
  status: "NotFired" | "Fired" | "Completed";
  unit_price: number;
};

export type Category = {
  category_id: number;
  name: string;
  description: string;
};

export type MenuItem = {
  menu_item_id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
};

// -------------------------------------------
export type Table = {
  id: number;
  name: string;
  isActive: boolean;
  order: storeItem[];
};

export type Item = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export type storeItem = {
  id: number;
  name: string;
  price: string | number;
  category: string;
  quantity: number;
};

export type OrderButtonProps = {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  color: "muted-green" | "muted-red" | "muted-blue" | "feedback-warning-amber";
  size: "sm" | "md" | "lg";
  onCategoryChange?: (categoryId: number, categoryName: string) => void;
  type: "action" | "category";
  action?: "clear" | "hold" | "send";
};

export type OrdersStore = {
  orderItems: storeItem[];
  addItem: (item: Item, tableId: string) => void;
  // logTable: () => void;
  // updateQuantity: (id: string, quantity: number) => void;
  // removeItem: (id: string) => void;
  clearOrder: () => void;
};
