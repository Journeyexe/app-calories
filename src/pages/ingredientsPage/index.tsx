import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getIngredients, Ingredient } from "../../service/ingredientService";
import { NavigationHeader } from "./navigationHeader";
import { IngredientCard } from "../../components/ingredientCard";

export function IngredientsPage() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await getIngredients();
        setIngredients(response.data);
      } catch (err) {
        console.error("Erro ao buscar ingredientes:", err);
        setError("Erro ao carregar ingredientes. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  }

  function navigateToHome() {
    navigate('/');
  }

  function navigateToRecipes() {
    navigate('/recipes');
  }

  const filteredIngredients = ingredients.filter(ingredient => 
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-md bg-white p-6 shadow-md">
          <div className="flex items-center space-x-3">
            <svg className="h-8 w-8 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg font-medium text-gray-700">Carregando ingredientes...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-md bg-red-50 p-6 text-center shadow-md">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="mt-3 text-lg font-medium text-gray-900">Erro</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto max-w-7xl px-4">
        <NavigationHeader 
          onNavigateHome={navigateToHome}
          onNavigateRecipes={navigateToRecipes}
          onLogout={handleLogout}
        />

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar ingredientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {filteredIngredients.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h2 className="mt-4 text-lg font-medium text-gray-900">Nenhum ingrediente encontrado</h2>
            <p className="mt-2 text-gray-600">
              {searchTerm 
                ? `Não encontramos resultados para "${searchTerm}". Tente outro termo.` 
                : "Nenhum ingrediente disponível no momento."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredIngredients.map((ingredient) => (
              <IngredientCard key={ingredient._id} ingredient={ingredient} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}