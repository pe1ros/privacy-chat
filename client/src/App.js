import React from "react";
import "materialize-css";
import { useRoutes } from "./routes";
import { Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

function App() {
  const { token, login, logOut, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{ token, login, logOut, userId, isAuthenticated }}
    >
      <Router history={history}>
        <div className="App">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
