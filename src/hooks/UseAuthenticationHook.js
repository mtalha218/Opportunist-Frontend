import { useEffect, useState } from "react";

const UseAuthentication = () => {
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem("auth_token") ? true : false;
  });
  const [user, setUser] = useState(() => {
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
  });

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setAuthenticated(false);
  };

  const setAuthToken = (token) => {
    localStorage.setItem("auth_token", token);
    setAuthenticated(token);
  };

  const getAuthToken = () => {
    return localStorage.getItem("auth_token");
  };

  const storeUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const getUser = () => {
    return user;
  };

  return {
    authenticated,
    setAuthToken,
    getAuthToken,
    getUser,
    storeUser,
    logout,
  };
};

export default UseAuthentication;
