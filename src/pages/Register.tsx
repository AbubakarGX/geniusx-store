
import {
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../hooks/UseAuth";

type RegisterLocationState = {
  from?: string;
};

function Register() {
  const { register } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const state =
    location.state as RegisterLocationState | null;

  const destination =
    state?.from || "/";

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

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
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        "Please fill in all fields."
      );

      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );

      return;
    }

    try {
      register(
        firstName,
        lastName,
        email,
        password
      );

      navigate(destination, {
        replace: true,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Registration failed."
      );
    }
  }

  return (
    <main>
      <section className="auth-page">
        <div className="auth-card">
          <p className="section-label">
            CREATE ACCOUNT
          </p>

          <h1>
            Create Your Account
          </h1>

          <p className="auth-description">
            Create an account to manage
            your Geniusx orders.
          </p>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="auth-name-fields">
              <div className="form-group">
                <label htmlFor="register-first-name">
                  First Name
                </label>

                <input
                  id="register-first-name"
                  type="text"
                  value={firstName}
                  onChange={(event) =>
                    setFirstName(
                      event.target.value
                    )
                  }
                  placeholder="First name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="register-last-name">
                  Last Name
                </label>

                <input
                  id="register-last-name"
                  type="text"
                  value={lastName}
                  onChange={(event) =>
                    setLastName(
                      event.target.value
                    )
                  }
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="register-email">
                Email
              </label>

              <input
                id="register-email"
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
              <label htmlFor="register-password">
                Password
              </label>

              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Create a password"
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
              Create Account
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link
              to="/login"
              state={{
                from: destination,
              }}
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
