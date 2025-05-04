import { useEffect, useState } from 'react';
import AdminNavbar from '../../Components/admin/AdminNavbar';

type Event = {
  title: string;
  description: string;
  location: string;
  date: string;
};

const AdminDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [expandedEventIndex, setExpandedEventIndex] = useState<number | null>(null); // State to track which event description is expanded

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/AdminEvents');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        setError('Error fetching events');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleToggleDescription = (index: number) => {
    setExpandedEventIndex(expandedEventIndex === index ? null : index); // Toggle expansion
  };

  if (loading) {
    return <div className="text-center">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className="container mx-auto p-6">
        <AdminNavbar />
        <h1 className="text-3xl font-semibold text-center mt-10 mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Loop through events and display them in cards */}
          {events.map((event, index) => (
            <div key={index} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{event.location}</p>
              <p className="text-sm text-gray-400 mb-4">{new Date(event.date).toLocaleDateString()}</p>
              
              <div>
                <p className="text-sm text-gray-700">
                  {/* Show truncated description or full description depending on expanded state */}
                  {expandedEventIndex === index
                    ? event.description
                    : `${event.description.substring(0, 100)}...`}
                </p>
                <button
                  className="text-blue-500 mt-2"
                  onClick={() => handleToggleDescription(index)}
                >
                  {expandedEventIndex === index ? 'Show less' : 'Read more'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;