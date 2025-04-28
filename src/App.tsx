import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/homePage";
import { LoginPage } from "./pages/loginPage";
import { RecipesPage } from "./pages/recipesPage";
import { IngredientsPage } from "./pages/ingredientsPage";
import { PrivateRoute } from "./routes/privateRoute";
import { NotFoundPage } from "./pages/notFoundPage";
import { RegisterPage } from "./pages/registerPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
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
        <Route
          path="*"
          element={
            <PrivateRoute>
              <NotFoundPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
