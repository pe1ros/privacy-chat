import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { notFound } from "./pages/notFound";

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/chat" exact>
          <ChatPage isExsistChat={false} />
        </Route>
        <Route path="/chat/:id" exact>
          <ChatPage isExsistChat={true} />
        </Route>
        <Redirect to={"/chat"} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <LoginPage />
      </Route>
      <Route path="/registration" exact>
        <RegisterPage />
      </Route>
      <Redirect to={"/"} />
    </Switch>
  );
};
