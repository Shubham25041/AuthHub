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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    // Frontend validation
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

    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      // SUCCESS
      setSuccess("User created successfully 🎉");

      // Redirect to login after short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Create your AuthHub account
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full mb-3 border px-3 py-2 rounded"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-3 border px-3 py-2 rounded"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-3 border px-3 py-2 rounded"
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          className="w-full mb-3 border px-3 py-2 rounded"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          onClick={handleSignup}
          className="w-full bg-indigo-600 text-white py-2 rounded mt-4"
        >
          Create account
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;
