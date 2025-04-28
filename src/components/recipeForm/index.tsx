import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import { getIngredients, Ingredient } from "../../service/ingredientService";

type IngredientListItem = {
  ingredientId: string;
  name: string;
  measure: number;
};

export function RecipeForm() {
  const navigate = useNavigate();
  
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<IngredientListItem[]>([]);
  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedIngredient, setSelectedIngredient] = useState<string>("");
  const [selectedMeasure, setSelectedMeasure] = useState<number>(0);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState<boolean>(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await getIngredients();
        setAvailableIngredients(response.data);
      } catch (err) {
        console.error("Erro ao buscar ingredientes:", err);
        setError("Erro ao carregar ingredientes. Por favor, tente novamente.");
      } finally {
        setIsLoadingIngredients(false);
      }
    };

    fetchIngredients();
  }, []);

  const handleAddIngredient = () => {
    if (!selectedIngredient || selectedMeasure <= 0) {
      setError("Selecione um ingrediente e adicione uma quantidade válida.");
      return;
    }

    const ingredientToAdd = availableIngredients.find(
      (i) => i._id === selectedIngredient
    );

    if (!ingredientToAdd) {
      setError("Ingrediente não encontrado.");
      return;
    }

    setIngredients([
      ...ingredients,
      {
        ingredientId: ingredientToAdd._id,
        name: ingredientToAdd.name,
        measure: selectedMeasure,
      },
    ]);

    // Reset selection
    setSelectedIngredient("");
    setSelectedMeasure(0);
    setError("");
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleCreateRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || ingredients.length === 0) {
      setError("Por favor, preencha todos os campos e adicione pelo menos um ingrediente.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Transformar formato para o que a API espera
      const formattedIngredients = ingredients.map(item => ({
        ingredientId: item.ingredientId,
        measure: item.measure
      }));

      const response = await api.post(
        "/recipes",
        {
          name,
          description,
          ingredients: formattedIngredients
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        navigate("/recipes");
      } else {
        setError("Erro ao criar receita. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao criar receita:", err);
      setError("Falha ao criar receita. Verifique sua conexão e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingIngredients) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="flex items-center space-x-2">
          <svg
            className="h-6 w-6 animate-spin text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Carregando ingredientes...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Criar Nova Receita
      </h1>

      <form onSubmit={handleCreateRecipe} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nome da Receita
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            placeholder="Ex: Salada de Quinoa"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            placeholder="Uma breve descrição da receita"
          ></textarea>
        </div>

        <div className="rounded-md bg-gray-50 p-4">
          <h2 className="mb-4 text-lg font-medium text-gray-800">
            Ingredientes
          </h2>

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label
                htmlFor="ingredientSelect"
                className="block text-sm font-medium text-gray-700"
              >
                Selecionar Ingrediente
              </label>
              <select
                id="ingredientSelect"
                value={selectedIngredient}
                onChange={(e) => setSelectedIngredient(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              >
                <option value="">Selecione um ingrediente</option>
                {availableIngredients.map((ingredient) => (
                  <option key={ingredient._id} value={ingredient._id}>
                    {ingredient.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="measure"
                className="block text-sm font-medium text-gray-700"
              >
                Quantidade (g)
              </label>
              <input
                type="number"
                id="measure"
                value={selectedMeasure || ""}
                onChange={(e) => setSelectedMeasure(Number(e.target.value))}
                min="1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                placeholder="100"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddIngredient}
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Adicionar Ingrediente
          </button>

          {ingredients.length > 0 && (
            <div className="mt-4">
              <h3 className="mb-2 text-sm font-medium text-gray-700">
                Ingredientes adicionados:
              </h3>
              <ul className="space-y-2">
                {ingredients.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between rounded-md bg-white p-2"
                  >
                    <div className="flex items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="ml-2 text-gray-500">{item.measure}g</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/recipes")}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="mr-2 h-4 w-4 animate-spin text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Criando...
              </span>
            ) : (
              "Criar Receita"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}