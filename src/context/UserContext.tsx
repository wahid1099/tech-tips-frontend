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
  refetchUser: () => Promise<void>;
}

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, isSetLoading] = useState(true);

  const handleUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error fetching current user:", error);
    } finally {
      isSetLoading(false);
    }
  };

  const refetchUser = async () => {
    isSetLoading(true);
    await handleUser();
  };

  useEffect(() => {
    handleUser(); // Fetch user on mount
  }, []); // Run only once on component mount

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoading, isSetLoading, refetchUser }}
    >
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
