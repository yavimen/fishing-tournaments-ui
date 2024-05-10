import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { addLogin, addRegister } from "../services/authService";
import axios from "axios";
import { jwtService } from "../services";

const TOKEN_KEY = "jwt_token";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("store token: ", token);

      if (token) {
        var tokenExpired = jwtService.isTokenExpired(token);
        console.log("tokenExpired: ", tokenExpired);

        if (tokenExpired) {
          await SecureStore.deleteItemAsync(TOKEN_KEY);
          console.log("token deleted from local storage", tokenExpired);
          return;
        }

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        setAuthState({
          token,
          authenticated: true,
        });
        console.log("Token set from local storage")
      }
    };

    loadToken();
  }, []);

  const login = async (email, password) => {
    const result = await addLogin(email, password);

    if (result && result.success) {
      setAuthState({
        token: result.token,
        authenticated: true,
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${result.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.token);

      console.info("AuthContext. set jwt success: ", result)
    }
    return result;
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync("user_id");

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const register = async (email, password, confirmPassword) => {
    return await addRegister(email, password, confirmPassword);
  };

  const value = {
    login,
    register,
    logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
