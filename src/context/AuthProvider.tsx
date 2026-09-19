
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  AuthContext,
  type User,
} from "./AuthContext";

type StoredUser = User & {
  password: string;
};

function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(
    () => {
      const savedUser = localStorage.getItem(
        "geniusx-current-user"
      );

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    }
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "geniusx-current-user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem(
        "geniusx-current-user"
      );
    }
  }, [user]);

  function register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    const existingUsers: StoredUser[] =
      JSON.parse(
        localStorage.getItem(
          "geniusx-users"
        ) || "[]"
      );

    const existingUser = existingUsers.find(
      (item) =>
        item.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (existingUser) {
      throw new Error(
        "An account with this email already exists."
      );
    }

    const newUser: StoredUser = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      password,
      role: "customer",
    };

    existingUsers.push(newUser);

    localStorage.setItem(
      "geniusx-users",
      JSON.stringify(existingUsers)
    );

    const loggedInUser: User = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
    };

    setUser(loggedInUser);
  }

  function login(
    email: string,
    password: string
  ) {
    const existingUsers: StoredUser[] =
      JSON.parse(
        localStorage.getItem(
          "geniusx-users"
        ) || "[]"
      );

    const foundUser = existingUsers.find(
      (item) =>
        item.email.toLowerCase() ===
          email.toLowerCase() &&
        item.password === password
    );

    if (!foundUser) {
      throw new Error(
        "Invalid email or password."
      );
    }

    const loggedInUser: User = {
      id: foundUser.id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
      role: foundUser.role,
    };

    setUser(loggedInUser);
  }

  function logout() {
    setUser(null);
  }


useEffect(() => {
  const existingUsers: StoredUser[] =
    JSON.parse(
      localStorage.getItem(
        "geniusx-users"
      ) || "[]"
    );

  const adminExists = existingUsers.some(
    (item) => item.email === "admin@geniusx.com"
  );

  if (!adminExists) {
    const adminUser: StoredUser = {
      id: 1,
      firstName: "Geniusx",
      lastName: "Admin",
      email: "admin@geniusx.com",
      password: "admin123",
      role: "admin",
    };

    existingUsers.push(adminUser);

    localStorage.setItem(
      "geniusx-users",
      JSON.stringify(existingUsers)
    );
  }
}, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
