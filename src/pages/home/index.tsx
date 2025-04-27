import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  function handleLogout() {
    
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    navigate('/login');
  }

  return (
    <div>
      <h1>Bem-vindo à Home!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

