import apiClient from "./api";

export interface Category {
  category_id: number;
  name: string;
  // add other category fields if needed
}

export async function fetchCategoriesAPI(): Promise<Category[]> {
  // GET /categories
  return apiClient.get("/categories");
}
