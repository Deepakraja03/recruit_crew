import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VolunteerNavBar from "../Components/Volunteer/VolunteerNavbar";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<number | null>(null);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(false);
  const userEmail = localStorage.getItem("user");

  // Fetch user onboarding status from backend
  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/get-user/${userEmail}`);
        const data = await response.json();
        if (data.userId) {
          // If the user is found, you can check onboarding status here
          const user = await fetch(`http://localhost:3000/api/get-user/${userEmail}`);
          const userData = await user.json();
          setIsOnboardingComplete(userData.onboardingComplete);
        }
      } catch (error) {
        console.error("Error fetching onboarding status:", error);
      }
    };

    if (userEmail) {
      fetchOnboardingStatus();
    }
  }, [userEmail]);

  const volunteerOpportunities = [
    { id: 1, title: "Beach Cleanup", description: "Join us in keeping our beaches clean and safe.", location: "Miami, FL", date: "July 20, 2024" },
    { id: 2, title: "Food Drive", description: "Help distribute food to families in need.", location: "New York, NY", date: "August 5, 2024" },
    { id: 3, title: "Animal Shelter Help", description: "Assist with taking care of rescued animals.", location: "Los Angeles, CA", date: "July 30, 2024" },
  ];

  const handleJoinClick = (id: number) => {
    if (isOnboardingComplete) {
      navigate(`/apply/${id}`);
    } else {
      setSelectedOpportunity(id);
      setShowPopup(true);
    }
  };

  const continueOnboarding = () => {
    navigate("/questions");
  };

  const handleViewMore = () => {
    navigate("/events");
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <VolunteerNavBar />
      <h1 className="text-3xl font-bold text-gray-800 mt-10 mb-6">Volunteer Opportunities</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {volunteerOpportunities.map((opportunity) => (
          <div key={opportunity.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900">{opportunity.title}</h2>
            <p className="text-gray-700 mt-2">{opportunity.description}</p>
            <p className="text-gray-500 mt-2">📍 {opportunity.location} | 📅 {opportunity.date}</p>
            <button 
              onClick={() => handleJoinClick(opportunity.id)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Join
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button 
          onClick={handleViewMore}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          View More Events
        </button>
      </div>

      {/* Popup for onboarding */}
      {showPopup && selectedOpportunity !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold text-gray-900">Complete Onboarding</h2>
            <p className="text-gray-700 mt-2">
                You need to complete the onboarding process before applying for{" "}
                <span className="font-bold">{volunteerOpportunities.find(opportunity => opportunity.id === selectedOpportunity)?.title}.</span>
            </p>
            <button
                onClick={continueOnboarding}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
                Continue Onboarding
            </button>
            <button
                onClick={() => setShowPopup(false)}
                className="mt-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
                Cancel
            </button>
            </div>
        </div>
        )}
    </div>
  );
};

export default Dashboard;