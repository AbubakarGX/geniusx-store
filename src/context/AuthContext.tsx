
import { createContext } from "react";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type AuthContextType = {
  user: User | null;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
  login: (
    email: string,
    password: string
  ) => void;
  logout: () => void;
};

export const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );
