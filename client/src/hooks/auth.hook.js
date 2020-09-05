import { useState, useCallback, useEffect } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem("userData", JSON.stringify({ jwtToken, id }));
  }, []);

  const logOut = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) {
      setToken(data.jwtToken);
      setUserId(data.id);
    }
  }, []);

  return { token, userId, login, logOut };
};
