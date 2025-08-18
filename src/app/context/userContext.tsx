"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  region: string;
  role: string;
  // avatar: string;
};

type UserContextType = {
  user: User;
  setUser: (data: User) => void;
  updateUser: (updates: Partial<User>) => void;
};

const defaultUser: User = {
  username: "admin",
  name: "Sukma Giri Pratama",
  email: "admin@example.com",
  phone: "+62 812 3456 7890",
  address: "Jl. Merdeka No. 123",
  region: "Jakarta, Indonesia",
  role: "Frontend Developer",
  // avatar: "/avatar.png",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);

  const updateUser = (updates: Partial<User>) =>
    setUser((prev) => ({ ...prev, ...updates }));

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
