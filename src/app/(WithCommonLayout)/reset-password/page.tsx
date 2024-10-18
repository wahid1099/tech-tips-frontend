"use client"; // This marks the component as a Client Component

import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import { useState, useEffect } from "react";
import { resetPassword } from "@/src/services/UserServices/AuthServices";
import { toast } from "sonner";

const ResetPasswordPage = () => {
  const router = useRouter(); // from next/navigation, for navigation in Client Components
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Extract token and email from the URL
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get("token");
    const emailParam = params.get("email");

    if (tokenParam && emailParam) {
      setToken(tokenParam);
      setEmail(emailParam);
    } else {
      setError("Invalid or expired reset token.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !email) {
      setError("Invalid or expired reset token.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call the API to reset the password
      await resetPassword(token as string, newPassword, email as string);
      toast.success("Password has been successfully reset");
      setSuccess("Password has been successfully reset");
      setTimeout(() => {
        router.push("/auth"); // Redirect to login page after a delay
      }, 2000);
    } catch (error: any) {
      toast.error("Failed to reset password");
      setError(error.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-10 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center">
          Reset Your Password
        </h1>

        {success ? (
          <p className="text-green-400 text-center">{success}</p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-gray-200 rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-gray-200 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
