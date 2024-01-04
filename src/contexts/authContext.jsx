import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [user, setUser] = useState(
    (Cookies.get("user") && JSON.parse(Cookies.get("user"))) || null
  );

  const authUser = (user) => {
    if (user) {
      setUser(user);
      Cookies.set("user", JSON.stringify(user));
    } else {
      setUser(null);
      Cookies.remove("user");
    }
  };

  const value = { user, authUser };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
