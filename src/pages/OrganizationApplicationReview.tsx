import { useEffect, useState } from "react";
import OrganizationNavbar from "../Components/organization/OrganizationNavbar";

interface Application {
  _id: string;
  user?: {
    name?: string;
    email?: string;
  };
  eventId?: {
    title?: string;
  };
  approvalStatus: "pending" | "approved" | "rejected";
}

interface FullUser {
  name?: string;
  email?: string;
  picture?: string;
  onboardingComplete?: boolean;
  overallGrade?: string;
  questionAnswers?: { [question: string]: string };
}

const OrganizationReview = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<FullUser | null>(null);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const userData = localStorage.getItem("user");
  const userEmail = userData ? JSON.parse(userData).email : null;

  useEffect(() => {
    const fetchOrgId = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${userEmail}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch user");
        setOrganizationId(data._id);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    if (userEmail) fetchOrgId();
  }, [userEmail]);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!userEmail) return;

      try {
        const response = await fetch(`http://localhost:3000/api/organizations/email/${userEmail}/applications`);
        const data: Application[] = await response.json();
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [organizationId]);

  const handleApprove = async (applicationId: string, approve: boolean) => {
    try {
      const response = await fetch(`http://localhost:3000/api/applications/${applicationId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approve }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setApplications((prevApps) =>
          prevApps.map((app) =>
            app._id === applicationId ? { ...app, approvalStatus: approve ? "approved" : "rejected" } : app
          )
        );
      } else {
        alert("Error updating application status");
      }
    } catch {
      alert("Error approving application");
    }
  };

  const handleUserClick = async (email: string | undefined) => {
    if (!email) return;

    try {
      const res = await fetch(`http://localhost:3000/api/user/${email}`);
      const data: FullUser = await res.json();
      console.log("data", data);
      
      setSelectedUser(data);
      setShowUserDetails(true);
    } catch (err) {
      console.error("Failed to fetch user details", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <OrganizationNavbar />
      <div className="max-w-5xl mx-auto bg-white rounded-lg mt-10 shadow-md p-6">
        <h3 className="text-3xl font-bold mb-6 text-blue-600 text-center">Review Applications</h3>

        {loading ? (
          <p className="text-center text-lg text-gray-500">Loading applications...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">User</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Event</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application._id}>
                    <td
                      className="px-6 py-4 text-blue-600 cursor-pointer underline"
                      onClick={() => handleUserClick(application.user?.email)}
                    >
                      {application.user?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{application.eventId?.title || "Untitled"}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          application.approvalStatus === "approved"
                            ? "bg-green-100 text-green-600"
                            : application.approvalStatus === "rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {application.approvalStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {application.approvalStatus === "pending" && (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                            onClick={() => handleApprove(application._id, true)}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                            onClick={() => handleApprove(application._id, false)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {applications.length === 0 && (
              <p className="text-center text-gray-500 mt-6 text-lg">No applications to review yet.</p>
            )}
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setShowUserDetails(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">User Details</h2>
            <div className="space-y-2">
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Grade:</strong> {selectedUser.overallGrade || "Not available"}</p>
              <p><strong>Onboarding:</strong> {selectedUser.onboardingComplete ? "Complete" : "Incomplete"}</p>
              {selectedUser.questionAnswers && (
                <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2 text-blue-600">Questionnaire Responses</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {Object.entries(selectedUser.questionAnswers).map(([question, answer]) => (
                    <div key={question}>
                        <p className="text-gray-700 font-bold">{question}</p>
                        <p className="text-gray-600 mb-2">{answer}</p>
                    </div>
                    ))}
                </div>
                </div>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationReview;