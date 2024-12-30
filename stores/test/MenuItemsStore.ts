import menuItems from "@/mockData/menuItems";
import { create } from "zustand";

type MenuItem = {
  menu_item_id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
};

type MenuItemsStoreState = {
  menuItems: MenuItem[];
  fetchMenuItems: () => Promise<void>;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const useMenuItemsStore = create<MenuItemsStoreState>((set) => ({
  menuItems: [],
  fetchMenuItems: async () => {
    try {
      // API endpoint not implemented yet
      // const response = await axios.get(`${BASE_URL}/menu-items`);
      // set({ menuItems: response.data });

      // Mock data:
      const data = menuItems;
      set({ menuItems: data });
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  },
}));

export default useMenuItemsStore;
