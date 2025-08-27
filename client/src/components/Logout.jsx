import { Account } from "appwrite";
import { client } from "../appwrite/config";
import { useNavigate } from "react-router-dom";

const account = new Account(client);

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current"); // remove only current session
      // or use account.deleteSessions() to log out from all devices
      navigate("/login"); // redirect to login
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
