import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  User as FirebaseUser,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebaseConfig";

export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
} | null;

type CurrentUserContextProps = {
  currentUser: User;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const CurrentUserContext = createContext<CurrentUserContextProps>(
  {} as CurrentUserContextProps,
);

type CurrentUserProviderProps = {
  children: ReactNode;
};

function mapFirebaseUser(user: FirebaseUser | null): User {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
}

export function CurrentUserProvider({ children }: CurrentUserProviderProps) {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const mappedUser = mapFirebaseUser(user);
      setCurrentUser(mappedUser);
      setLoading(false);

      if (mappedUser) {
      } else {
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function login(email: string, password: string) {
    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will update currentUser
      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      throw error;
    }
  }

  async function logout() {
    try {
      await auth.signOut();
    } catch (error) {}
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

export const useCurrentUser = () => useContext(CurrentUserContext);
