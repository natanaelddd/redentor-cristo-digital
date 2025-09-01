import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/admin/Dashboard";
import HeroSlidesAdmin from "@/pages/admin/HeroSlides";

export default function AdminPage() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/slides" element={<HeroSlidesAdmin />} />
        {/* Adicionar mais rotas conforme necessário */}
      </Routes>
    </AdminLayout>
  );
}