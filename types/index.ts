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
  onCategoryChange?: (category: string) => void;
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
