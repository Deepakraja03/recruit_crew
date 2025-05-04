import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VideoUpload from "./pages/VideoUpload";
import UserProfile from "./pages/UserProfile";
import Events from "./pages/Events";
import AdminAddEvents from "./pages/admin/AdminAddEvents";
import ApplyEvent from "./pages/ApplyEvent";
import MyApplications from "./pages/MyApplications";
import EventDetail from "./pages/EventDetail";
import PendingApproval from "./pages/PendingApproval";
import OrganizationRegister from "./pages/OrganizationRegister";
import AdminOrganizationReview from "./pages/admin/AdminOrganizationReview";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import OrganizationAddEvent from "./pages/OrganizationAddEvent";
import OrganizationEvents from "./pages/OrganizationEvents";
import OrganizationReview from "./pages/OrganizationApplicationReview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/events" element={<Events />} />
        <Route path="/apply/:eventId" element={<ApplyEvent />} />
        <Route path="/event-details/:eventId" element={<EventDetail />} />
        <Route path="/organization" element={<OrganizationRegister />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/organization-events" element={<OrganizationEvents />} />
        <Route path="/organization-addEvent" element={<OrganizationAddEvent />} />
        <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
        <Route path="/OrganizationReview" element={<OrganizationReview />} />
        <Route path="/organization/pending" element={<PendingApproval />} />
        <Route path="/video" element={<VideoUpload />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-addEvent" element={<AdminAddEvents />} />
        <Route path="/admin-organization-review" element={<AdminOrganizationReview />} />
      </Routes>
    </Router>
  );
}

export default App;