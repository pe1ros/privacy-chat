import { useState, useCallback, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  const data = JSON.parse(localStorage.getItem("userData"));
  const [token, setToken] = useState(data ? data.jwtToken : null);
  const [userId, setUserId] = useState(data ? data.id : null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem("userData", JSON.stringify({ jwtToken, id }));
    auth.isAuth = true;
  }, []);

  const logOut = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (data) {
      setToken(data.jwtToken);
      setUserId(data.id);
    }
  }, []);

  return { token, userId, login, logOut };
};
