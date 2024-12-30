import { create } from "zustand";
import { MenuItem, fetchMenuItemsAPI } from "@/services/menuItemsService";

type MenuItemsStoreState = {
  menuItems: MenuItem[];
  fetchMenuItems: () => Promise<void>;
};

const useMenuItemsStore = create<MenuItemsStoreState>((set) => ({
  menuItems: [],

  fetchMenuItems: async () => {
    try {
      const data = await fetchMenuItemsAPI();
      set({ menuItems: data });
    } catch (error) {
      console.error("Error fetching menu items:", error);
      // Display user-friendly error or toast if needed
    }
  },
}));

export default useMenuItemsStore;
