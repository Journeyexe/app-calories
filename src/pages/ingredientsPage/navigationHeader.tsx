type NavigationHeaderProps = {
    onNavigateHome: () => void;
    onNavigateRecipes: () => void;
    onLogout: () => void;
  };
  
  export function NavigationHeader({ 
    onNavigateHome, 
    onNavigateRecipes, 
    onLogout 
  }: NavigationHeaderProps) {
    return (
      <header className="mb-6">
        <div className="flex flex-col items-center justify-between border-b border-gray-200 pb-4 md:flex-row">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 md:mb-0">Lista de Ingredientes</h1>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onNavigateHome}
              className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Home
            </button>
            
            <button
              onClick={onNavigateRecipes}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Ver Receitas
            </button>
            
            <button
              onClick={onLogout}
              className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    );
  }