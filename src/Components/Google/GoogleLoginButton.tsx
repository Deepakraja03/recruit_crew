import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const clientId = import.meta.env.VITE_CLIENT_ID as string;

interface User {
  name: string;
  email: string;
  picture: string;
}

interface DecodedToken {
  name: string;
  email: string;
  picture: string;
}

const GoogleLoginButton: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  }, []);

  const handleLoginSuccess = async (response: CredentialResponse) => {
    try {
      const decoded = jwtDecode<DecodedToken>(response.credential!);
      const userData: User = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      // Send user details to backend to create or fetch the profile
      const profileResponse = await fetch("http://localhost:3000/api/create-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await profileResponse.json();

      if (result?.user?.role === "admin") {
        navigate("/admin-dashboard");
      } else if (result?.user?.role === "organization") {
        if (result.user.isApproved) {
          navigate("/organization-dashboard");
        } else {
          navigate("/organization/pending", { state: { details: result.user.organizationDetails } });
        }
      } else {
        navigate("/dashboard");
      }      
    } catch (error) {
      console.error("Error decoding token or creating profile:", error);
    }
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {user ? (
        <div className="flex items-center space-x-4">
          <img src={user.picture} alt="Profile" className="w-10 h-10 rounded-full" />
          <span className="text-white">{user.name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log("Login Failed")} />
      )}
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;