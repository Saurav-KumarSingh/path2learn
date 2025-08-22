import { useState } from "react";
import InputField from "./InputField";
import { account } from "../appwrite/config";
import db from "../appwrite/db";
import { ID, Permission, Role } from "appwrite";

const RegisterForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // 1️⃣ Create the user in Appwrite Auth
      const user = await account.create(ID.unique(), form.email, form.password, form.name);

      // 2️⃣ Immediately log in the user
      await account.createEmailPasswordSession(form.email, form.password);

    //   console.log(user);
      // 3️⃣ Save user profile in DB with permissions for the logged-in user
      
      await db.userProfile.create(
        {
          userId: user.$id,
          name: form.name,
          email: form.email,
          avatar: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
          bio: "",
          createdAt: new Date().toISOString(),
        },
       [
    Permission.read(Role.user(user.$id)),   // Only this user can read
    Permission.update(Role.user(user.$id)), // Only this user can update
    Permission.delete(Role.user(user.$id))  // Only this user can delete
  ]
      );

      // 4️⃣ Send verification email
      await account.createVerification(import.meta.env.VITE_APPWRITE_VERIFICATION_URL);

      setSuccess("✅ Registration successful! Please check your email to verify your account.");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.message || "Signup failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-dark)]">
      <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-[var(--color-blackish)] rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-[var(--color-orange)] mb-4">Create Account</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} required autoComplete="name" />
        <InputField label="Email" type="email" name="email" value={form.email} onChange={handleChange} required autoComplete="email" />
        <InputField label="Password" type="password" name="password" value={form.password} onChange={handleChange} required autoComplete="new-password" />

        <button type="submit" disabled={loading} className={`w-full py-3 bg-[var(--color-orange)] text-white rounded-lg font-semibold hover:opacity-90 transition ${loading ? "opacity-60 cursor-not-allowed" : ""}`}>
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-[var(--color-orange)] hover:underline">Log In</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
