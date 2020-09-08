import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useHistory } from "react-router-dom";

export const LoginPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (error) {}
  };
  useEffect(() => {
    message(error);
    clearError();
  }, [message, error, clearError]);

  return (
    <div className="loginPage">
      <div>
        <div className="input-field col s12">
          <input
            id="email"
            type="email"
            name="email"
            className="validate"
            onChange={changeHandler}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="input-field col s12">
          <input
            id="password"
            type="password"
            className="validate"
            name="password"
            onChange={changeHandler}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="col card-action registrationBlock">
          <button
            className="btn green darken-4"
            onClick={loginHandler}
            disabled={loading}
          >
            LogIn
          </button>
          <div>
            <div className="registrationBlock">
              <label>You dont have an account?</label>{" "}
              <NavLink
                to="/registration"
                className="btn blue darken-4"
                disabled={loading}
              >
                Registration
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
