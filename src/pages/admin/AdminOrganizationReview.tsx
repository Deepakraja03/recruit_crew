import React, { useEffect, useState } from "react";
import AdminNavbar from "../../Components/admin/AdminNavbar";

interface Organization {
  _id: string;
  name: string;
  email: string;
  organizationDetails: {
    description: string;
    contactEmail: string;
    website: string;
  };
  isApproved: boolean;
}

const AdminOrganizationReview: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [openOrgId, setOpenOrgId] = useState<string | null>(null);
  const [modalInfo, setModalInfo] = useState<{
    id: string;
    approve: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/organizations");
        const data = await response.json();
        setOrganizations(data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleApproval = async () => {
    if (!modalInfo) return;

    const { id, approve } = modalInfo;

    try {
      const response = await fetch(`http://localhost:3000/organizations/${id}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approve }),
      });

      if (response.ok) {
        console.log("data for approval", response);
        
        setOrganizations((prev) =>
          prev.map((org) =>
            org._id === id ? { ...org, isApproved: approve } : org
          )
        );
        setModalInfo(null);
      } else {
        alert("Action failed.");
      }
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };

  const toggleOrgDetails = (id: string) => {
    setOpenOrgId((prev) => (prev === id ? null : id));
  };

  const pendingOrgs = organizations.filter((org) => !org.isApproved);
  const approvedOrgs = organizations.filter((org) => org.isApproved);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <AdminNavbar />
      <h2 className="text-3xl font-bold mt-10 mb-6 text-center">Organization Review Panel</h2>

      {/* Pending Approvals */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Pending Requests</h3>
        {pendingOrgs.length === 0 ? (
          <p className="text-gray-600">No pending organization requests.</p>
        ) : (
          <div className="space-y-4">
            {pendingOrgs.map((org) => (
              <div key={org._id} className="bg-white p-4 border rounded shadow-md">
                <button
                  onClick={() => toggleOrgDetails(org._id)}
                  className="text-xl font-semibold text-left w-full text-blue-700 hover:underline"
                >
                  {org.name}
                </button>

                {openOrgId === org._id && (
                  <div className="mt-3 text-gray-700 space-y-1">
                    <p><strong>Email:</strong> {org.email}</p>
                    <p><strong>Contact Email:</strong> {org.organizationDetails.contactEmail}</p>
                    <p><strong>Description:</strong> {org.organizationDetails.description}</p>
                    <p>
                      <strong>Website:</strong>{" "}
                      <a
                        href={org.organizationDetails.website}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {org.organizationDetails.website}
                      </a>
                    </p>
                    <div className="mt-4 flex gap-4">
                      <button
                        onClick={() => setModalInfo({ id: org._id, approve: true })}
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setModalInfo({ id: org._id, approve: false })}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved Organizations */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Approved Organizations</h3>
        {approvedOrgs.length === 0 ? (
          <p className="text-gray-600">No approved organizations yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {approvedOrgs.map((org) => (
              <div key={org._id} className="bg-green-100 border border-green-400 rounded p-4 shadow-sm">
                <h4 className="text-lg font-bold text-green-800">{org.name}</h4>
                <p className="text-sm text-green-700">{org.organizationDetails.contactEmail}</p>
                <p className="text-xs mt-1">Status: <span className="font-medium">Approved ✅</span></p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalInfo && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
            <h4 className="text-xl font-semibold mb-4">
              {modalInfo.approve ? "Approve" : "Reject"} Organization?
            </h4>
            <p className="mb-6 text-gray-600">
              Are you sure you want to {modalInfo.approve ? "approve" : "reject"} this organization?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleApproval}
                className={`px-4 py-2 text-white rounded ${
                  modalInfo.approve ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Confirm
              </button>
              <button
                onClick={() => setModalInfo(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrganizationReview;