// src/pages/ApplyEvent.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VolunteerNavBar from "../Components/Volunteer/VolunteerNavbar";

const ApplyEvent: React.FC = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  interface Event {
    _id: string;
    title: string;
    location: string;
    date: string;
    description: string;
  }

  const [event, setEvent] = useState<Event | null>(null);
  const [message, setMessage] = useState("");

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/events/${eventId}`);
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  const handleSubmit = async () => {
    if (!user || !user.email) {
      alert("User not found. Please log in again.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          eventId: event?._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Successfully applied! Redirecting...");
        setTimeout(() => navigate("/my-applications"), 2000);
      } else {
        setMessage(data.message || "Failed to apply.");
      }
    } catch (error) {
      console.error("Apply error:", error);
    }
  };

  if (!event) return <div className="p-6">Loading event...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
        <VolunteerNavBar />
        <div className="mt-10">
            <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            <p className="text-gray-700 mb-2">📍 {event.location}</p>
            <p className="text-gray-700 mb-2">📅 {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Apply for this Event
            </button>
            {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
            </div>
        </div>
    </div>
  );
};

export default ApplyEvent;