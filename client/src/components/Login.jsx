import { useState, useEffect } from "react";
import InputField from "./InputField";
import { client } from "../appwrite/config";
import { Account } from "appwrite";

const account = new Account(client);

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check if a user session already exists
  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get(); // Throws error if no active session
        if (user.emailVerification) {
          // Redirect to home if session exists and email is verified
          window.location.href = "/home";
        }
      } catch (err) {
        // No active session; stay on login page
        console.log("No active session:", err.message);
      }
    };

    checkSession();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Create session
      await account.createEmailPasswordSession(form.email, form.password);

      // Get user info
      const user = await account.get();

      // Check verification
      if (!user.emailVerification) {
        await account.deleteSession("current");
        throw new Error("Please verify your email before logging in.");
      }

      // Redirect to home
      window.location.href = "/home";
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-dark)]">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-8 bg-[var(--color-blackish)] rounded-2xl shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center text-[var(--color-orange)] mb-4">
          Log In
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <InputField
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 bg-[var(--color-orange)] text-white rounded-lg font-semibold hover:opacity-90 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <a href="/register" className="text-[var(--color-orange)] hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
