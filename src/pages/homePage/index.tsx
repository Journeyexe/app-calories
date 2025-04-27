import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../service/api";

type UserData = {
  _id: string;
  name: string;
  email: string;
  role: string;
  updatedAt: string;
  createdAt: string;
};

export function HomePage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("Usuário");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Verifica se o token existe no localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          // Se não tiver token, redireciona para login
          navigate('/login');
          return;
        }
        
        // Adiciona o token ao cabeçalho de autorização
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        
        // Busca os dados do usuário
        const response = await api.get("/auth/me");
        const userData: UserData = response.data.data;
        
        if (userData && userData.name) {
          setUserName(userData.name);
        }
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
        setError("Não foi possível carregar seus dados.");
        // Se houver um erro de autenticação, redireciona para o login
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (err instanceof Error && (err as any).response && (err as any).response.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  }

  function navigateToRecipes() {
    navigate('/recipes');
  }

  function navigateToIngredients() {
    navigate('/ingredients');
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-indigo-50">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center space-x-3">
            <svg className="h-8 w-8 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg font-medium text-gray-700">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-indigo-900 md:text-5xl">
            Bem-vindo ao NutriApp
          </h1>
          <p className="text-xl text-gray-600">
            Seu assistente de nutrição personalizado
          </p>
        </header>

        <div className="flex flex-col items-center justify-center">
          {error && (
            <div className="mb-6 w-full max-w-md rounded-md bg-red-50 p-4 text-center">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="mb-8 w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-indigo-100 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-full w-full text-indigo-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Olá, {userName}!</h2>
              <p className="mt-2 text-gray-600">O que você gostaria de fazer hoje?</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <button
                onClick={navigateToRecipes}
                className="flex flex-col items-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-6 text-white shadow-md transition hover:from-green-600 hover:to-emerald-700 hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-2 h-8 w-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-lg font-medium">Ver Receitas</span>
                <span className="text-sm text-green-100">Explore receitas saudáveis</span>
              </button>

              <button
                onClick={navigateToIngredients}
                className="flex flex-col items-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-6 text-white shadow-md transition hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-2 h-8 w-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span className="text-lg font-medium">Ver Ingredientes</span>
                <span className="text-sm text-blue-100">Conheça valores nutricionais</span>
              </button>
            </div>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-purple-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-800">Controle sua dieta</h3>
              <p className="text-gray-600">Acompanhe seus macronutrientes e calorias diárias para atingir seus objetivos.</p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-orange-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-800">Economize tempo</h3>
              <p className="text-gray-600">Receitas rápidas e nutritivas para o seu dia a dia agitado.</p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-800">Melhore sua saúde</h3>
              <p className="text-gray-600">Informações nutricionais confiáveis para um estilo de vida saudável.</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}