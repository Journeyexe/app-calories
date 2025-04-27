import api from "./api";

export interface Ingredient {
  _id: string;
  name: string;
  calories: number;
  carbohydrate: number;
  protein: number;
  totalFat: number;
  saturatedFat: number;
  fiber: number;
  sodium: number;
  user?: string;
  updatedAt: string;
  createdAt: string;
  caloriesFromFat: number;
  id: string;
  nutritionSummary: string;
}

export interface IngredientsResponse {
  success: boolean;
  count: number;
  data: Ingredient[];
}

export const getIngredients = async (): Promise<IngredientsResponse> => {
  const token = localStorage.getItem("token");
  const response = await api.get("/ingredients", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};