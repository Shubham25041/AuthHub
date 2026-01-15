import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Used to show validation / backend error messages
  const [error, setError] = useState("");

  // Used to show success message for 3 seconds
  const [success, setSuccess] = useState("");

  // Used to redirect user after successful signup
  const navigate = useNavigate();

  // Signup handler
  const handleSignup = async () => {

    // ---------- FRONTEND VALIDATION ----------
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Invalid email address");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Clear previous errors
    setError("");

    // ---------- BACKEND API CALL ----------
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Backend only needs email & password
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      // If backend sends error (user exists, validation fail)
      if (!response.ok) {
        setError(data.message || "Signup failed");
        setSuccess("");
        return;
      }

      // ---------- SUCCESS ----------
      setSuccess("User created successfully 🎉");
      setError("");

      // Reset form after successful signup
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Hide success message after 3 seconds
      // and redirect user to login page
      setTimeout(() => {
        setSuccess("");
        navigate("/login");
      }, 3000);

    } catch (err) {
      // Server / network error
      setError("Server error. Please try again later.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Create your AuthHub account
        </h1>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-600 mt-2">
            {error}
          </p>
        )}

        {/* Success message (auto hides after 3 sec) */}
        {success && (
          <p className="text-sm text-green-600 mt-2">
            {success}
          </p>
        )}

        {/* Signup button */}
        <button
          onClick={handleSignup}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-full font-semibold hover:bg-indigo-500 transition mt-4"
        >
          Create account
        </button>

        {/* Login link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;
