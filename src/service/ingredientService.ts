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

export interface IngredientCreateData {
  name: string;
  calories: number;
  carbohydrate: number;
  protein: number;
  totalFat: number;
  saturatedFat: number;
  fiber: number;
  sodium: number;
}

export interface IngredientsResponse {
  success: boolean;
  count: number;
  data: Ingredient[];
}

export interface IngredientResponse {
  success: boolean;
  data: Ingredient;
}

export const getIngredients = async (): Promise<IngredientsResponse> => {
  const token = localStorage.getItem("token");
  const response = await api.get("/ingredients/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createIngredient = async (ingredientData: IngredientCreateData): Promise<IngredientResponse> => {
  const token = localStorage.getItem("token");
  const response = await api.post("/ingredients", ingredientData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};