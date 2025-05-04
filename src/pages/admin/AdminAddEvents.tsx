import { useState } from "react";
import AdminNavbar from "../../Components/admin/AdminNavbar";

type Message = {
  type: 'success' | 'error';
  text: string;
};

const AdminAddEvents = () => {
  // State variables to store form data and error messages
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState<Message | string>("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create event data
    const eventData = {
      title,
      description,
      location,
      date,
      email: "deepakrajaweb3@gmail.com",
    };

    try {
      const response = await fetch("http://localhost:3000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const data = await response.json();
      
      // Show success message
      setMessage({ type: "success", text: data.message });

      // Clear form fields after success
      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage({ type: 'error', text: error.message || "Failed to create event" });
      } else {
        setMessage({ type: 'error', text: "An unknown error occurred" });
      }
    }    
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto p-6">
        <AdminNavbar />
        <h1 className="text-3xl font-semibold text-center mt-10 mb-6">Admin Dashboard</h1>
        
        {/* Display message (success or error) */}
        {message && typeof message !== 'string' && (
            <div className={`mb-4 text-center p-3 ${message.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {message.text}
            </div>
        )}


        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Create New Event</h2>

            {/* Title Field */}
            <div className="mb-4">
            <label htmlFor="title" className="block text-lg font-medium">Event Title</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter event title"
                required
            />
            </div>

            {/* Description Field */}
            <div className="mb-4">
            <label htmlFor="description" className="block text-lg font-medium">Event Description</label>
            <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter event description"
                required
            />
            </div>

            {/* Location Field */}
            <div className="mb-4">
            <label htmlFor="location" className="block text-lg font-medium">Event Location</label>
            <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter event location"
                required
            />
            </div>

            {/* Date Field */}
            <div className="mb-4">
            <label htmlFor="date" className="block text-lg font-medium">Event Date</label>
            <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-center">
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Post Event
            </button>
            </div>
        </form>
        </div>
    </div>
  );
};

export default AdminAddEvents;