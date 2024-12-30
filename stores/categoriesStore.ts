import { create } from "zustand";
import { Category, fetchCategoriesAPI } from "@/services/categoriesService";

type CategoriesStore = {
  categories: Category[];
  selectedCategory: Category | null;
  fetchCategories: () => Promise<void>;
  setSelectedCategory: (category: Category) => void;
};

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  selectedCategory: null,

  fetchCategories: async () => {
    try {
      const data = await fetchCategoriesAPI();
      set({ categories: data });
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Display user-friendly error or toast if needed
    }
  },

  setSelectedCategory: (category: Category) => {
    set({ selectedCategory: category });
  },
}));
