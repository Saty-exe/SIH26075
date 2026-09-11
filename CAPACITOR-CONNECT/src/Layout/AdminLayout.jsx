import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";

export default function AdminLayout() {
  const isAdmin = window.localStorage.getItem("userRole") === "Admin";

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="role-shell role-shell-admin">
      <AdminSidebar />
      <main className="role-content">
        <header className="role-header">
          <span className="role-kicker">Admin portal</span>
          <span className="role-status">Workspace active</span>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
