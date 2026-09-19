
import {
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

type LoginLocationState = {
  from?: string;
};

function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const state =
    location.state as LoginLocationState | null;

  const destination =
    state?.from || "/";

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        "Please enter your email and password."
      );

      return;
    }

    try {
      login(email, password);

      navigate(destination, {
        replace: true,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Login failed."
      );
    }
  }

  return (
    <main>
      <section className="auth-page">
        <div className="auth-card">
          <p className="section-label">
            WELCOME BACK
          </p>

          <h1>
            Login to Your Account
          </h1>

          <p className="auth-description">
            Login to manage your Geniusx
            account and orders.
          </p>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="login-email">
                Email
              </label>

              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password">
                Password
              </label>

              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <p className="form-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="auth-button"
            >
              Login
            </button>
          </form>

          <p className="auth-footer">
            Don't have an account?{" "}
            <Link to="/register">
              Create Account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
