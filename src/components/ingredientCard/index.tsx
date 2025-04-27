import { Ingredient } from "../../service/ingredientService";

type IngredientCardProps = {
  ingredient: Ingredient;
};

export function IngredientCard({ ingredient }: IngredientCardProps) {
  return (
    <div className="mb-6 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-6 py-4">
        <h2 className="mb-2 text-xl font-bold text-gray-800">
          {ingredient.name}
        </h2>

        <h3 className="mb-2 text-md font-semibold text-gray-700">
          Informações Nutricionais:
        </h3>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <div className="rounded bg-blue-50 p-2">
            <span className="block text-sm font-medium text-gray-500">
              Calorias
            </span>
            <span className="text-lg font-bold text-blue-600">
              {ingredient.calories}
            </span>
          </div>

          <div className="rounded bg-green-50 p-2">
            <span className="block text-sm font-medium text-gray-500">
              Carboidratos
            </span>
            <span className="text-lg font-bold text-green-600">
              {ingredient.carbohydrate}g
            </span>
          </div>

          <div className="rounded bg-purple-50 p-2">
            <span className="block text-sm font-medium text-gray-500">
              Proteínas
            </span>
            <span className="text-lg font-bold text-purple-600">
              {ingredient.protein}g
            </span>
          </div>

          <div className="rounded bg-yellow-50 p-2">
            <span className="block text-sm font-medium text-gray-500">
              Gorduras
            </span>
            <span className="text-lg font-bold text-yellow-600">
              {ingredient.totalFat}g
            </span>
          </div>
        </div>

        <div className="mt-4">
          <details className="cursor-pointer">
            <summary className="text-sm font-medium text-indigo-600">
              Mais detalhes nutricionais
            </summary>
            <ul className="mt-2 space-y-1 pl-5 text-sm">
              <li>
                Gorduras saturadas:{" "}
                <span className="font-medium">{ingredient.saturatedFat}g</span>
              </li>
              <li>
                Fibras: <span className="font-medium">{ingredient.fiber}g</span>
              </li>
              <li>
                Sódio:{" "}
                <span className="font-medium">{ingredient.sodium}mg</span>
              </li>
              <li>
                Calorias de gordura:{" "}
                <span className="font-medium">
                  {ingredient.caloriesFromFat}
                </span>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
}
