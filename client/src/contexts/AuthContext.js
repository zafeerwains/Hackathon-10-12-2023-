import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';  // Don't forget to import axios
import { message } from 'antd';  // Assuming you are using Ant Design for messages

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const initState = { isAuth: false, user: {} };
  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "SET_LOGGED_IN":
        return { isAuth: true, user: payload.response };
      case "SET_LOGGED_OUT":
        return initState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initState);

  const readUser = async (user) => {
    if (user.loginData.role === "doctor") {
      console.log("readUser", user);
      axios.post(`http://localhost:8000/doctor/${user.id}`,user.loginData)
        .then((response) => {
          dispatch({ type: "SET_LOGGED_IN", payload: { response } });
          message.success("Logged in successfully");
          console.log(state.isAuth);
        })
        .catch((error) => {
            console.error("Error fetching doctor data:", error);
        });
    }
    console.log(user.loginData.role);
    if (user.loginData.role === "patient") {
        axios.post(`http://localhost:8000/patient/${user.id}`,user.loginData)
        .then((response) => {
            dispatch({ type: "SET_LOGGED_IN", payload: { response } });
            message.success("Logged in successfully");
            console.log(state.isAuth);
        })
        .catch((error) => {
          console.error("Error fetching patient data:", error);
        });
    }
  };

  useEffect(() => {
    // You can add any additional setup or cleanup logic here
  }, [/* Add dependencies like axios, message if needed */]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, readUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
