import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Auth({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      let isAuthenticated = false;

      try {
        const res = await axios.get("http://localhost:3333/auth", {
          withCredentials: true,
        });

        isAuthenticated = res.data.success;

        console.log(res.data);
        
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

  return children;
}

export default Auth;