import { useEffect, useState } from "react";
import OrganizationNavbar from "../Components/organization/OrganizationNavbar";

interface Event {
  _id: string;
  email: string;
  title: string;
  description: string;
  location: string;
  date: string;
  categories: string[];
  grade: string;
}

const OrganizationEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const userData = localStorage.getItem("user");
  const userEmail = userData ? JSON.parse(userData).email : "";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/events?email=${userEmail}`);
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [userEmail]);

  return (
    <div className="min-h-screen bg-gray-100">
      <OrganizationNavbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Your Organized Events
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500">No events found for this organization.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 mb-3 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Location:</strong> {event.location}
                    </p>
                    <p>
                      <strong>Categories:</strong> {event.categories.join(", ")}
                    </p>
                    <p>
                      <strong>Grade:</strong> {event.grade}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationEvents;