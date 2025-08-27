import { useEffect, useState } from "react";
import InputField from "./InputField";
import { useDispatch } from "react-redux";
import { getCurrentUser, registerUser } from "../redux/authSlice";
import { account } from "../appwrite/config";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Dispatch thunk
      const user = await dispatch(
        registerUser({
          email: form.email,
          password: form.password,
          name: form.name,
        })
      ).unwrap();

      setSuccess(
        "✅ Registration successful! Please check your email to verify your account."
      );
      setForm({ name: "", email: "", password: "" });
      console.log("New user created:", user);
    } catch (err) {
      // err is already a string from rejectWithValue
      setError(err || "Signup failed");
      console.error("Signup Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      dispatch(getCurrentUser());
    }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-dark)]">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-8 bg-[var(--color-blackish)] rounded-2xl shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center text-[var(--color-orange)] mb-4">
          Create Account
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <InputField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 bg-[var(--color-orange)] text-white rounded-lg font-semibold hover:opacity-90 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[var(--color-orange)] hover:underline"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
