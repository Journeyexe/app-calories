import { useState } from "react";
import api from "../../service/api";

type AddIngredientFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export function AddIngredientForm({ onSuccess, onCancel }: AddIngredientFormProps) {
  const [name, setName] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [carbohydrate, setCarbohydrate] = useState<string>("");
  const [protein, setProtein] = useState<string>("");
  const [totalFat, setTotalFat] = useState<string>("");
  const [saturatedFat, setSaturatedFat] = useState<string>("");
  const [fiber, setFiber] = useState<string>("");
  const [sodium, setSodium] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      await api.post(
        "/ingredients",
        {
          name,
          calories: parseFloat(calories),
          carbohydrate: parseFloat(carbohydrate),
          protein: parseFloat(protein),
          totalFat: parseFloat(totalFat),
          saturatedFat: parseFloat(saturatedFat),
          fiber: parseFloat(fiber),
          sodium: parseFloat(sodium),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSuccess();
      
    } catch (error) {
      console.error("Erro ao adicionar ingrediente:", error);
      setError("Não foi possível adicionar o ingrediente. Verifique os dados e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="relative z-10 inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white p-8 text-left shadow-xl transition-all">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Adicionar Novo Ingrediente
            </h3>
            <button
              type="button"
              onClick={onCancel}
              className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Fechar</span>
              <svg
                className="h-6 w-6"
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
          </div>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome do Ingrediente
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="calories"
                  className="block text-sm font-medium text-gray-700"
                >
                  Calorias
                </label>
                <input
                  type="number"
                  id="calories"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="carbohydrate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Carboidratos (g)
                </label>
                <input
                  type="number"
                  id="carbohydrate"
                  value={carbohydrate}
                  onChange={(e) => setCarbohydrate(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="protein"
                  className="block text-sm font-medium text-gray-700"
                >
                  Proteínas (g)
                </label>
                <input
                  type="number"
                  id="protein"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="totalFat"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gorduras Totais (g)
                </label>
                <input
                  type="number"
                  id="totalFat"
                  value={totalFat}
                  onChange={(e) => setTotalFat(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="saturatedFat"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gorduras Saturadas (g)
                </label>
                <input
                  type="number"
                  id="saturatedFat"
                  value={saturatedFat}
                  onChange={(e) => setSaturatedFat(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="fiber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fibras (g)
                </label>
                <input
                  type="number"
                  id="fiber"
                  value={fiber}
                  onChange={(e) => setFiber(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="sodium"
                className="block text-sm font-medium text-gray-700"
              >
                Sódio (mg)
              </label>
              <input
                type="number"
                id="sodium"
                value={sodium}
                onChange={(e) => setSodium(e.target.value)}
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400"
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
                    Salvando...
                  </span>
                ) : (
                  "Salvar Ingrediente"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}