import { useEffect, useState } from "react";
import VolunteerNavBar from "../Components/Volunteer/VolunteerNavbar";

interface User {
  name: string;
  email: string;
  picture: string;
  onboardingComplete: boolean;
  overallGrade: string;
  role: "user" | "admin";
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;

      const { email } = JSON.parse(storedUser);
      try {
        const res = await fetch(`http://localhost:3000/api/user/${email}`);
        if (!res.ok) throw new Error("User not found");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading user profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center text-red-500">
        User not found or not logged in.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <VolunteerNavBar />
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-12">
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={user.picture || "/default-profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-md"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-lg text-gray-600">{user.email}</p>
            {user.role && (
              <span
                className={`text-sm font-medium ${
                  user.role === "admin" ? "text-red-500" : "text-blue-500"
                } mt-2 inline-block`}
              >
                {user.role.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500">Onboarding Complete</h3>
            <p className="text-lg font-medium text-gray-800">{user.onboardingComplete ? "Yes" : "No"}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-gray-500">Overall Grade</h3>
            <p className="text-lg font-medium text-gray-800">{user.overallGrade || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;