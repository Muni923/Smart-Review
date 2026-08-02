import { Navigate } from "react-router-dom";
import { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";
export const MyContext = createContext();

function Auth({ children }) {

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [firstLetter, setfirstLetter] = useState('');
  useEffect(() => {
    const checkAuth = async () => {
      let isAuthenticated = false;

      try {
        const res = await axios.get("http://localhost:3333/auth", {
          withCredentials: true,
        });

        isAuthenticated = res.data.success;
        
        if (isAuthenticated) {
          const f_letter=res.data.name.charAt(0).toUpperCase();
          setfirstLetter(f_letter);

        }

      } catch (err) {
        isAuthenticated = false;
      } finally {
        setAuthenticated(isAuthenticated);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <MyContext.Provider value={{ firstLetter }}>
      {children}
    </MyContext.Provider>
  )
}

export default Auth;