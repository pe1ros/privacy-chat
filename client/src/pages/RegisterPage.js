import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const RegisterPage = () => {
  const history = useHistory();
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/registration", "POST", { ...form });
      history.push("/");
    } catch (error) {}
  };
  useEffect(() => {
    message(error);
    clearError();
  }, [message, error, clearError]);

  return (
    <div className="registerPage">
      <div className="col s3 offset-s3">
        <div>
          <input
            placeholder="Enter your Name"
            id="name"
            type="text"
            name="name"
            onChange={changeHandler}
            required
          />
          <label htmlFor="name"> Name</label>
        </div>
        <div>
          <input
            placeholder="Enter your Email"
            id="email"
            type="email"
            name="email"
            onChange={changeHandler}
            required
          />
          <label htmlFor="email">Email</label>
        </div>
        <div>
          <input
            placeholder="Enter your Password"
            id="password"
            type="password"
            name="password"
            onChange={changeHandler}
            required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="registrationBlock card-action">
          <button
            onClick={registerHandler}
            disabled={loading}
            className="btn blue darken-4"
          >
            Registration
          </button>
        </div>
      </div>
    </div>
  );
};
