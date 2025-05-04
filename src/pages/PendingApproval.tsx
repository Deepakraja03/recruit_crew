// PendingApproval.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PendingApproval: React.FC = () => {
  const location = useLocation();
  const { details } = location.state || {};
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold mb-4">Organization Approval Pending</h1>
      <p className="mb-6 text-gray-600">Your application is under review. We’ll notify you once it is approved.</p>
      {details && (
        <div className="border rounded p-4 shadow bg-white text-left max-w-md w-full">
          <p><strong>Name:</strong> {details.name}</p>
          <p><strong>Description:</strong> {details.description}</p>
          <p><strong>Contact Email:</strong> {details.contactEmail}</p>
          <p><strong>Website:</strong> {details.website}</p>
        </div>
      )}
      <p className="mt-4 text-gray-500">Thank you for your patience!</p>

      <button
        onClick={handleReturnHome}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Return to Home Page
      </button>
      
    </div>
  );
};

export default PendingApproval;