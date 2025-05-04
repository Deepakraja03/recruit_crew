import { useState } from "react";
import OrganizationNavbar from "../Components/organization/OrganizationNavbar";

type Message = {
  type: 'success' | 'error';
  text: string;
};

const OrganizationAddEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [gradeRequired, setGradeRequired] = useState("");
  const [message, setMessage] = useState<Message | string>("");

  const categoryOptions = ["Web3", "Web2", "Hackathon", "NGO"];
  const gradeOptions = ["A", "B", "C", "D", "E", "F"];

  const userData = localStorage.getItem("user");
  const userEmail = userData ? JSON.parse(userData).email : null;

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setCategories(selected);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const eventData = {
      title,
      description,
      location,
      date,
      email: userEmail,
      categories,
      gradeRequired,
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

      setMessage({ type: "success", text: data.message });

      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
      setCategories([]);
      setGradeRequired("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage({ type: 'error', text: error.message || "Failed to create event" });
      } else {
        setMessage({ type: 'error', text: "An unknown error occurred" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <OrganizationNavbar />
      <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Add New Event</h1>

        {message && typeof message !== 'string' && (
          <div className={`mb-4 p-3 rounded-md text-center ${message.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Basic Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Event Information</h2>
            <div className="space-y-4">
              <InputField label="Event Title" id="title" value={title} onChange={setTitle} placeholder="Enter event title" required />
              <TextAreaField label="Event Description" id="description" value={description} onChange={setDescription} placeholder="Enter event description" required />
              <InputField label="Event Location" id="location" value={location} onChange={setLocation} placeholder="Enter event location" required />
              <InputField type="date" label="Event Date" id="date" value={date} onChange={setDate} required />
            </div>
          </div>

          {/* Section: Additional Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Additional Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-lg font-medium">Event Categories</label>
                <select
                  multiple
                  id="category"
                  value={categories}
                  onChange={handleCategoryChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <small className="text-gray-500 mt-1 block">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</small>
              </div>

              <div>
                <label htmlFor="grade" className="block text-lg font-medium">Grade Required</label>
                <select
                  id="grade"
                  value={gradeRequired}
                  onChange={(e) => setGradeRequired(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select grade</option>
                  {gradeOptions.map((grade) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Post Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable input field component
const InputField = ({
  type = "text",
  label,
  id,
  value,
  onChange,
  placeholder = "",
  required = false,
}: {
  type?: string;
  label: string;
  id: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
}) => (
  <div>
    <label htmlFor={id} className="block text-lg font-medium">{label}</label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

// Reusable textarea field component
const TextAreaField = ({
  label,
  id,
  value,
  onChange,
  placeholder = "",
  required = false,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
}) => (
  <div>
    <label htmlFor={id} className="block text-lg font-medium">{label}</label>
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default OrganizationAddEvent;