import categories from "@/mockData/categories";
import { Category } from "@/types";
import { create } from "zustand";

type CategoriesStore = {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category) => void;
  setCategories: (categories: Category[]) => void;
};

export const useCategoriesStore = create<CategoriesStore>((set) => ({
  categories: [],
  fetchCategories: async () => {
    try {
      set({ categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
  selectedCategory: null,
  setSelectedCategory: (category: Category) =>
    set({ selectedCategory: category }),
  setCategories: (categories: Category[]) => set({ categories }),
}));
