import { BrowserRouter, Routes } from 'react-router-dom';
import { rutas } from './routes/indexRoutes';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
      checkAuth();
      const interval = setInterval(() => {
          checkAuth();
      }, 1000);
      return () => clearInterval(interval); 
  }, []);
  
  return (
    <>
    <BrowserRouter>
              <Routes>
                {rutas}
              </Routes>
        </BrowserRouter>
    </>
  )
}

export default App