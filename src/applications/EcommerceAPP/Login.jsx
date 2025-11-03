import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// DummyJSON expects username + password for /auth/login.
// For demo, map a recognized email to a known username from docs.
function emailToUsername(email) {
  // Known test accounts in docs include 'kminchelle'/'0lelplR' and 'emilys'/'emilyspass'.
  // Map two common demo emails; otherwise, fallback to 'kminchelle'.
  if (email.trim().toLowerCase() === "emily.johnson@x.dummyjson.com")
    return "emilys";
  return "kminchelle";
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // HTML5 pattern for email validation
  const emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$";

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic guard; rely on HTML5 constraints too
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //credentials: "include", // include cookies per docs
        body: JSON.stringify({
          username: emailToUsername(email),
          password: password,
          expiresInMins: 30,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Login failed. Check credentials.");
        setLoading(false);
        return;
      }

      // Store token for guarded routes
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      // Navigate to product list
      navigate("/products", { replace: true });
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-md shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Login</h2>

      {error ? (
        <div className="mb-4 rounded border border-red-300 bg-red-50 text-red-700 p-3">
          {error}
        </div>
      ) : null}

      <form onSubmit={onSubmit} noValidate>
        <label className="block mb-4">
          <span className="block mb-1">Email</span>
          <input
            type="email"
            name="email"
            required
            pattern={emailPattern}
            placeholder="Enter email"
            className="peer w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="mt-1 hidden text-sm text-red-600 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Please enter a valid email address.
          </span>
        </label>

        <label className="block mb-6">
          <span className="block mb-1">Password</span>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              name="password"
              required
              minLength={6}
              placeholder="Enter password"
              className="peer w-full rounded border border-gray-300 px-3 py-2 pr-20 outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-700 hover:underline"
              aria-label="Toggle password visibility"
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
          <span className="mt-1 hidden text-sm text-red-600 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Password must be at least 6 characters.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded px-4 py-2 text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-xs text-gray-500 mt-3">
          Tip: Try email "emily.johnson@x.dummyjson.com" with any password
          "emilyspass" mapping to username "emilys", or leave default which maps
          to "kminchelle" with password "0lelplR".
        </p>
      </form>
    </div>
  );
}
