// OrganizationRegister.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrganizationRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    contactEmail: "",
    website: "",
    // Add other fields as needed
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/organization-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration submitted. Awaiting admin approval.");
        navigate("/organization/pending");
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      console.error("Error registering organization:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Organization Registration</h2>
        <input
          type="text"
          name="name"
          placeholder="Organization Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Organization Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="email"
          name="contactEmail"
          placeholder="Contact Email"
          value={formData.contactEmail}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="url"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
        {/* Add other fields as necessary */}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default OrganizationRegister;