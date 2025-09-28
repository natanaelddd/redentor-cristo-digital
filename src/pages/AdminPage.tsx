import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import HeroSlidesAdmin from "@/pages/admin/HeroSlides";
import EventsAdmin from "@/pages/admin/Events";
import ContentAdmin from "@/pages/admin/Content";
import NavigationAdmin from "@/pages/admin/Navigation";
import ReadingPlansAdmin from "@/pages/admin/ReadingPlans";
import AnnouncementsAdmin from "@/pages/admin/Announcements";
import UsersAdmin from "@/pages/admin/Users";
import SettingsAdmin from "@/pages/admin/Settings";
import EventAppointments from "@/pages/admin/EventAppointments";
import FormsAdmin from "@/pages/admin/Forms";
import FormBuilder from "@/pages/admin/FormBuilder";

export default function AdminPage() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/slides" element={<HeroSlidesAdmin />} />
        <Route path="/events" element={<EventsAdmin />} />
        <Route path="/event-appointments" element={<EventAppointments />} />
        <Route path="/announcements" element={<AnnouncementsAdmin />} />
        <Route path="/content" element={<ContentAdmin />} />
        <Route path="/navigation" element={<NavigationAdmin />} />
        <Route path="/reading-plans" element={<ReadingPlansAdmin />} />
        <Route path="/users" element={<UsersAdmin />} />
        <Route path="/settings" element={<SettingsAdmin />} />
        <Route path="/forms" element={<FormsAdmin />} />
        <Route path="/forms/:id/builder" element={<FormBuilder />} />
      </Routes>
    </AdminLayout>
  );
}