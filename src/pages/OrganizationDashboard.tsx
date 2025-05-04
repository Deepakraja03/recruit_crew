import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrganizationNavbar from "../Components/organization/OrganizationNavbar";

const OrganizationDashboard: React.FC = () => {
  interface Organization {
    name: string;
    email: string;
    isApproved: boolean;
    eventsCount: number;
    selectedCandidatesCount: number;
  }

  const [organization, setOrganization] = useState<Organization | null>(null);
  const userData = localStorage.getItem("user");
  const userEmail = userData ? JSON.parse(userData).email : null;

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        console.log("email", userEmail);
        
        const response = await fetch(`http://localhost:3000/organization/${userEmail}`);
        const data = await response.json();
        console.log("data", data);
        
        setOrganization(data);
      } catch (error) {
        console.error("Error fetching organization dashboard:", error);
      }
    };

    fetchOrganizationData();
  }, []);

  if (!organization) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <OrganizationNavbar />
      <h2 className="text-3xl font-bold mt-10 text-center">Organization Dashboard</h2>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Organization Overview</h3>
          <p className="mt-2">Name: {organization.name}</p>
          <p>Email: {organization.email}</p>
          <p>Status: {organization.isApproved ? "Approved ✅" : "Pending"}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Statistics</h3>
          <p className="mt-2">Total Events: {organization.eventsCount}</p>
          <p>Total Candidates Selected: {organization.selectedCandidatesCount}</p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link to="/organization/profile" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default OrganizationDashboard;