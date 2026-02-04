import { createContext, useContext, useState } from "react";

type CurrentUserContextProps = {
  currentUser: Boolean | null;
  login: () => void;
  logout: () => void;
};

const CurrentUserContext = createContext<CurrentUserContextProps>(
  {} as CurrentUserContextProps
);

type CurrentUserProviderProps = {
  children: React.ReactNode;
};

export function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const [currentUser, setCurrentUser] = useState<Boolean | null>(null);
  function login() {
    setCurrentUser(true);
  }
  function logout() {
    setCurrentUser(false);
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
export const useCurrentUser = () => useContext(CurrentUserContext);
