import apiClient from "./api";

export interface Table {
  table_id: number;
  table_number: number;
  seats: number;
  location: string;
  is_active: boolean;
  // add other category fields if needed
}

export async function fetchTablesApi(): Promise<Table[]> {
  // GET /categories
  return apiClient.get("/tables");
}
