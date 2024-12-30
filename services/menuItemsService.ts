import apiClient from "./api";

export interface MenuItem {
  menu_item_id: number;
  name: string;
  description?: string;
  price: number;
  category_id: number;
}

export async function fetchMenuItemsAPI(): Promise<MenuItem[]> {
  // GET /menu-items
  return apiClient.get("/menu-items");
}
