import tables from "@/mockData/tables";
import axios from "axios";
import { create } from "zustand";

type RestaurantTable = {
  table_id: number;
  table_number: number;
  seats: number;
  location: string;
  is_active: boolean;
};
type TablesStore = {
  tables: RestaurantTable[];
  fetchTables: () => Promise<void>;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const useTablesStore = create<TablesStore>((set) => ({
  tables: [],
  fetchTables: async () => {
    try {
      //   Use this line to fetch tables from the API
      //   const response = await axios.get(`${BASE_URL}/tables`);
      //   set({ tables: response.data });

      // Use this line to fetch tables from the mock data
      set({ tables });
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  },
}));

export default useTablesStore;
