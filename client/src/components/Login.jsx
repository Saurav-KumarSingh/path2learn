import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, getCurrentUser } from "../redux/authSlice";
import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.emailVerification) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        loginUser({ email: form.email, password: form.password })
      ).unwrap();

      // Email verification check
      if (!user?.emailVerification) {
        throw new Error("Please verify your email before logging in.");
      }

      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
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
          {" Don’t have an account? "}
          <Link
            to="/register"
            className="text-[var(--color-orange)] hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
