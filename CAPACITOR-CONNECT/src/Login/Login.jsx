import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [role, setRole] = useState("Admin");
  const navigate = useNavigate();

  const schema = z.object({
    name: z.string().regex(/^123$/, "Login ID must be 123"),
    password: z.string().regex(/^123$/, "Password must be 123"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleLogin = () => {
    const routes = {
      Admin: "/admin/dashboard",
      Trainee: "/trainee",
      Trainer: "/trainer",
    };
    window.localStorage.setItem("userRole", role);
    if (role === "Trainee") window.localStorage.setItem("traineeId", "1");
    if (role === "Trainer") window.localStorage.setItem("trainerId", "203");
    navigate(routes[role]);
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        {/* Brand */}
        <div className="login-logo">
          <div className="login-logo-mark">CC</div>
          <div>
            <strong>Capacitor Connect</strong>
            <span>Training management platform</span>
          </div>
        </div>

        <h1>Welcome back</h1>
        <p className="login-subtitle">Sign in to your workspace to continue.</p>

        <form onSubmit={handleSubmit(handleLogin)}>
          {/* Role selector */}
          <div className="login-role-group">
            {[
              ["Admin", "Admin"],
              ["Trainee", "Trainee"],
              ["Trainer", "Trainer"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                className="login-role-btn"
                aria-pressed={role === value}
                onClick={() => setRole(value)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Login ID */}
          <div className="login-field">
            <label className="login-label" htmlFor="login-id">
              Login ID
            </label>
            <input
              id="login-id"
              className="login-input"
              placeholder="Enter your login ID"
              {...register("name", {
                required: "Login ID is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <span className="login-error-msg">{errors.name.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="login-field">
            <label className="login-label" htmlFor="login-pw">
              Password
            </label>
            <input
              id="login-pw"
              type="password"
              className="login-input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <span className="login-error-msg">{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className="login-submit">
            Sign in as {role}
          </button>
        </form>

        <p className="login-footer-note">
          Use login ID and password: <strong>123</strong>
        </p>
      </div>
    </div>
  );
}
