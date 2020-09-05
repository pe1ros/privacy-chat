import { createContext } from "react";

function noon() {}
export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noon,
  logOut: noon,
  isAuth: false,
});
