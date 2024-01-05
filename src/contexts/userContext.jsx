import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(
    (Cookies.get("user") && JSON.parse(Cookies.get("user"))) || null
  );

  const setOrUpdateUser = (user) => {
    if (user) {
      setUser(user);
      Cookies.set("user", JSON.stringify(user));
    } else {
      setUser(null);
      Cookies.remove("user");
    }
  };

  const value = { user, setOrUpdateUser };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
