import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VolunteerNavBar from "../Components/Volunteer/VolunteerNavbar";

const MyApplications: React.FC = () => {
  interface Application {
    eventId: string;
    dateApplied: string;
    approvalStatus: string;
  }

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState<{ [key: string]: string }>({});
  const [fetchedEventIds, setFetchedEventIds] = useState<Set<string>>(new Set());

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user || !user.email) return;
      try {
        const res = await fetch(`http://localhost:3000/api/applications/${user.email}`);
        const data = await res.json();
        setApplications(data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  useEffect(() => {
    const fetchEventName = async (eventId: string) => {
      if (fetchedEventIds.has(eventId)) return;

      try {
        const res = await fetch(`http://localhost:3000/api/events/detail/${eventId}`);
        const event = await res.json();
        setEventDetails((prevState) => ({
          ...prevState,
          [eventId]: event.title,
        }));
        setFetchedEventIds((prev) => new Set(prev).add(eventId));
      } catch (error) {
        console.error("Failed to fetch event details:", error);
      }
    };

    applications.forEach((app) => {
      if (app.eventId) {
        fetchEventName(app.eventId);
      }
    });
  }, [applications, fetchedEventIds]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return `${date.toLocaleDateString("en-GB")} ${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  };

  const handleViewDetails = (eventId: string) => {
    navigate(`/event-details/${eventId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <VolunteerNavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-center mb-8 text-blue-600">My Applications</h1>

        {loading ? (
          <div className="text-center text-xl text-gray-500">Loading applications...</div>
        ) : applications.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-xl">You haven't applied to any events yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">S.No</th>
                  <th className="px-4 py-2 text-left">Event Name</th>
                  <th className="px-4 py-2 text-left">Applied At</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="px-4 py-2 text-gray-600">{index + 1}</td>
                    <td className="px-4 py-2 text-gray-600">
                      {eventDetails[app.eventId] || "Loading..."}
                    </td>
                    <td className="px-4 py-2 text-gray-600">{formatDate(app.dateApplied)}</td>
                    <td className="px-4 py-2 text-gray-600">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                          app.approvalStatus
                        )}`}
                      >
                        {app.approvalStatus}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">
                      <button
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 ease-in-out"
                        onClick={() => handleViewDetails(app.eventId)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "text-green-600 bg-green-100";
    case "rejected":
      return "text-red-600 bg-red-100";
    case "pending":
    default:
      return "text-yellow-600 bg-yellow-100";
  }
};