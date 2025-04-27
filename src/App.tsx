import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { LoginPage } from "./pages/loginPage";
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
              <Home />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
