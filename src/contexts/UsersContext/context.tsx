import { UsersContextType } from "@/types/user.type";
import { createContext } from "react";

export const UsersContext = createContext<UsersContextType | undefined>(
  undefined
);
