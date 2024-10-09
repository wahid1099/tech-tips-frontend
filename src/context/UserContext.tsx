import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { User } from "@/src/types/index";
import { getCurrentUser } from "@/src/services/UserServices/AuthServices";

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

interface IUserProviderValues {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  isSetLoading: Dispatch<SetStateAction<boolean>>;
}
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, isSetLoading] = useState(true);

  const handleUser = async () => {
    const currentUser = await getCurrentUser();

    setUser(currentUser);
    isSetLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, isSetLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export default UserProvider;
