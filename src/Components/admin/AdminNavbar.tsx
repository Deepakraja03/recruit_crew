import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  picture: string;
}

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);

    // Listen for changes in localStorage (user login/logout)
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const profileImage = user?.picture || "/default-profile.png";

  return (
    <div className="bg-gray-100">
      <nav className="relative z-10 container mx-auto px-6 py-4 bg-white shadow-lg rounded-xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-900 text-2xl font-extrabold">Admin Panel</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-8">
            <a href="/admin-dashboard" className="text-gray-700 hover:text-blue-500 transition duration-300">Dashboard</a>
            <a href="/admin-addEvent" className="text-gray-700 hover:text-blue-500 transition duration-300">Add Event</a>
            <a href="/admin-organization-review" className="text-gray-700 hover:text-blue-500 transition duration-300">Organization</a>
          </div>

          {/* Profile & Logout */}
          <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
              {user ? (
                <img
                  src={profileImage}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm"
                />
              ) : (
                <FaUserCircle className="text-gray-700 text-3xl cursor-pointer hover:text-blue-500 transition duration-300" />
              )}
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-3 w-48 bg-white shadow-md rounded-lg py-2"
                >
                  <div className="px-4 py-2 text-gray-800 font-semibold">{user?.name || "John Doe"}</div>
                  <div className="border-t border-gray-200"></div>
                  <button
                    className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-100 transition duration-300"
                    onClick={handleLogout}
                  >
                    <IoMdLogOut className="mr-2" /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;