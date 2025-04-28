import api from "./api";

export interface Ingredient {
  ingredientId: {
    _id: string;
    name: string;
    calories: number;
  };
  measure: number;
  _id: string;
}

export interface Recipe {
  _id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  updatedAt: string;
  createdAt: string;
  recipeWeight: number;
  calories: number;
  carbohydrate: number;
  protein: number;
  totalFat: number;
  saturatedFat: number;
  fiber: number;
  sodium: number;
  __v: number;
}

export interface RecipesResponse {
  success: boolean;
  count: number;
  data: Recipe[];
}

export const getRecipes = async (): Promise<RecipesResponse> => {
  const token = localStorage.getItem("token");
  const response = await api.get("/recipes/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};