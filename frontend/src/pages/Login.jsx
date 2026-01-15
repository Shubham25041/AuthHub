import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    // Frontend validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // SUCCESS
      setSuccess("Login successful 🎉");

      // Store JWT token
      localStorage.setItem("token", data.token);

      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);

    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Welcome back to AuthHub
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 pr-10"
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

        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        {success && <p className="text-sm text-green-600 mt-2">{success}</p>}

        <div className="text-right mt-2 mb-6">
          <Link to="/forgot-password" className="text-sm text-indigo-600">
            Forgot password?
          </Link>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-full font-semibold"
        >
          Log in
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-medium">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
