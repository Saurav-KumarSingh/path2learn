import { useEffect, useState } from "react";
import { client } from "../appwrite/config";
import { Account } from "appwrite";

const account = new Account(client);

const VerifyEmail = () => {
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");
    const secret = params.get("secret");

    if (userId && secret) {
      account.updateVerification(userId, secret)
        .then(() => {
          setStatus("✅ Email verified successfully! You can now log in.");
        })
        .catch(() => {
          setStatus("❌ Verification failed. Please try again.");
        });
    } else {
      setStatus("Invalid verification link.");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-dark)]">
      <div className="p-6 bg-[var(--color-blackish)] rounded-lg shadow-md text-center">
        <p className="text-lg font-semibold text-white">{status}</p>
        {status.includes("successfully") && (
          <a
            href="/home"
            className="mt-4 inline-block bg-[var(--color-orange)] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90"
          >
            Go to Login
          </a>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
