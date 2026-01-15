import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // Used to block UI until backend verifies token
  const [loading, setLoading] = useState(true);

  /**
   * 🔐 AUTH VERIFICATION (Frontend → Backend)
   * - Checks if token exists
   * - Sends token to backend (/me)
   * - Backend confirms whether token is valid
   */
  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token at all, user is not logged in
    if (!token) {
      navigate("/login");
      return;
    }

    // Verify token with backend
    const verifyUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // If token is invalid / expired
        if (!response.ok) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        // Token is valid → allow dashboard
        setLoading(false);
      } catch (error) {
        // Network / server error
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    verifyUser();
  }, [navigate]);

  /**
   * ⏳ While backend is verifying token,
   * block dashboard UI to prevent flicker
   */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">
          Checking authentication...
        </p>
      </div>
    );
  }

  /**
   * 🚪 LOGOUT
   * - Remove JWT from localStorage
   * - Redirect user to login page
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-semibold text-indigo-600">
          AuthHub
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-400 transition"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center h-[calc(100vh-80px)]">
        <h2 className="text-2xl font-bold">
          Welcome to AuthHub Dashboard 🎉
        </h2>
      </main>

    </div>
  );
}

export default Dashboard;
