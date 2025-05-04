// src/pages/EventDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VolunteerNavBar from "../Components/Volunteer/VolunteerNavbar";

const EventDetail: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();  // Get eventId from the URL
  interface Event {
    title: string;
    description: string;
    location: string;
    date: string;
  }

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return;

      try {
        const res = await fetch(`http://localhost:3000/api/events/${eventId}`);
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch event details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading)
    return (
      <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
        <span className="text-xl font-semibold">Loading event details...</span>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen">
      <VolunteerNavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-center mb-8 text-blue-600">{event?.title}</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">
            <strong>Description:</strong> {event?.description}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Location:</strong> {event?.location}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Date:</strong> {event?.date ? new Date(event.date).toLocaleString() : "Date not available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;