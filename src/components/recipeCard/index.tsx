import { Recipe } from "../../service/recipeService";

type RecipeCardProps = {
  recipe: Recipe;
};

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-6 py-4">
        <h2 className="mb-2 text-xl font-bold text-gray-800">{recipe.name}</h2>
        <p className="mb-4 text-gray-600">{recipe.description}</p>

        <div className="mb-4 flex flex-wrap gap-3">
          <div className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
            {recipe.calories} calorias
          </div>
          <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            {recipe.recipeWeight}g
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-gray-700">
            Informações Nutricionais:
          </h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            <div className="rounded bg-green-50 p-2 text-center">
              <span className="block text-xs text-gray-500">Carboidratos</span>
              <span className="text-lg font-bold text-green-600">
                {parseFloat(recipe.carbohydrate.toFixed(2))}g
              </span>
            </div>
            <div className="rounded bg-purple-50 p-2 text-center">
              <span className="block text-xs text-gray-500">Proteínas</span>
              <span className="text-lg font-bold text-purple-600">
                {parseFloat(recipe.protein.toFixed(2))}g
              </span>
            </div>
            <div className="rounded bg-yellow-50 p-2 text-center">
              <span className="block text-xs text-gray-500">Gorduras</span>
              <span className="text-lg font-bold text-yellow-600">
                {parseFloat(recipe.totalFat.toFixed(2))}g
              </span>
            </div>
            <div className="rounded bg-red-50 p-2 text-center">
              <span className="block text-xs text-gray-500">Gorduras Sat.</span>
              <span className="text-lg font-bold text-red-600">
                {parseFloat(recipe.saturatedFat.toFixed(2))}g
              </span>
            </div>
            <div className="rounded bg-teal-50 p-2 text-center">
              <span className="block text-xs text-gray-500">Fibras</span>
              <span className="text-lg font-bold text-teal-600">
                {recipe.fiber}g
              </span>
            </div>
            <div className="rounded bg-blue-50 p-2 text-center">
              <span className="block text-xs text-gray-500">Sódio</span>
              <span className="text-lg font-bold text-blue-600">
                {recipe.sodium}mg
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-700">Ingredientes:</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient) => (
              <li
                key={ingredient._id}
                className="flex justify-between rounded-md bg-gray-50 px-3 py-2"
              >
                <span className="font-medium">
                  {ingredient.ingredientId.name}
                </span>
                <span className="text-gray-600">{ingredient.measure}g</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
