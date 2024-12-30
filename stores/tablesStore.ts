import { create } from "zustand";

import { fetchTablesApi, Table } from "@/services/tablesService";

type TablesStore = {
  tables: Table[];
  fetchTables: () => Promise<void>;
};

export const useTablesStore = create<TablesStore>((set) => ({
  tables: [],

  fetchTables: async () => {
    try {
      const data = await fetchTablesApi();
      set({ tables: data });
    } catch (error) {
      console.error("Error fetching tables:", error);
      // Display user-friendly error or toast if needed
    }
  },
}));
