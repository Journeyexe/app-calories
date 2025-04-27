import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/homePage";
import { LoginPage } from "./pages/loginPage";
import { RecipesPage } from "./pages/recipes";
import { IngredientsPage } from "./pages/ingredientsPage";
import { PrivateRoute } from "./routes/privateRoute";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/recipes" 
          element={
            <PrivateRoute>
              <RecipesPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/ingredients" 
          element={
            <PrivateRoute>
              <IngredientsPage />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}