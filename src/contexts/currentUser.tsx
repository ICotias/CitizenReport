import { createContext, useContext, useState } from "react";

type CurrentUserContextProps = {
  currentUser: Boolean | null;
  login: () => void;
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

  return (
    <CurrentUserContext.Provider value={{ currentUser, login }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
export const useCurrentUser = () => useContext(CurrentUserContext);
