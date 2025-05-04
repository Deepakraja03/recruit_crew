import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VolunteerNavBar from "../Components/Volunteer/VolunteerNavbar";

interface Event {
  _id: number;
  title: string;
  description: string;
  location: string;
  date: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [userApplications, setUserApplications] = useState<Set<number>>(new Set());

  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const userEmail = userData ? JSON.parse(userData).email : null;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/events");
        const data = await response.json();
        console.log("Data", data);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${userEmail}`);
        const data = await response.json();
        setIsOnboardingComplete(data.onboardingComplete);
      } catch (error) {
        console.error("Error fetching onboarding status:", error);
      }
    };

    if (userEmail) {
      fetchOnboardingStatus();
    }
  }, [userEmail]);

  useEffect(() => {
    const fetchUserApplications = async () => {
      if (userEmail) {
        try {
          const res = await fetch(`http://localhost:3000/api/applications/${userEmail}`);
          const data = await res.json();
          // Collect eventIds the user has applied to
          const appliedEventIds = new Set<number>(data.map((app: { eventId: number }) => app.eventId));
          setUserApplications(appliedEventIds);
        } catch (error) {
          console.error("Error fetching user applications:", error);
        }
      }
    };

    fetchUserApplications();
  }, [userEmail]);

  useEffect(() => {
    const filtered = events.filter((event) => {
      const matchesSearchTerm =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = selectedLocation
        ? event.location.toLowerCase().includes(selectedLocation.toLowerCase())
        : true;

      return matchesSearchTerm && matchesLocation;
    });
    setFilteredEvents(filtered);
  }, [searchTerm, selectedLocation, events]);

  const handleApplyClick = (event: Event) => {
    if (isOnboardingComplete) {
      navigate(`/apply/${event._id}`);
    } else {
      setSelectedEvent(event);
      setShowPopup(true);
    }
  };

  const continueOnboarding = () => {
    navigate("/questions");
  };

  const handleViewApplications = () => {
    navigate("/my-applications");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <VolunteerNavBar />
      <h1 className="text-4xl font-bold text-center text-gray-800 mt-10 mb-8">
        Upcoming Volunteer Events
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="🔍 Search events..."
          className="w-full md:w-1/3 px-4 py-3 rounded-xl shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full md:w-1/4 px-4 py-3 rounded-xl shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">🌍 All Locations</option>
          <option value="Miami">Miami</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Virtual">Virtual</option>
        </select>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg border-t-4 border-blue-400"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{event.title}</h2>
              <p className="text-gray-700 text-sm mb-3 line-clamp-3">{event.description}</p>
              <div className="text-sm text-gray-500 mt-4 flex flex-col sm:flex-row sm:justify-between">
                <span>📍 {event.location}</span>
                <span>📅 {new Date(event.date).toLocaleDateString()}</span>
              </div>
              {userApplications.has(event._id) ? (
                <button
                  onClick={handleViewApplications}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  View My Application
                </button>
              ) : (
                <button
                  onClick={() => handleApplyClick(event)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Apply
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 mt-10">
            No events found matching your criteria.
          </p>
        )}
      </div>

      {/* Popup */}
      {showPopup && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-md w-full">
            <h2 className="text-lg font-semibold text-gray-900">Complete Onboarding</h2>
            <p className="text-gray-700 mt-2">
              You need to complete the onboarding process before applying for{" "}
              <span className="font-bold">{selectedEvent.title}</span>.
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

export default Events;