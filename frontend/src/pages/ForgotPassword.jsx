import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-6">
          Forgot your password?
        </h1>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Send reset link */}
        <button className="w-full bg-indigo-600 text-white py-2.5 rounded-full font-semibold hover:bg-indigo-500 transition">
          Send reset link
        </button>

        {/* Back to login */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;
