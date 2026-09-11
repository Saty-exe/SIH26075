import {
  Bell,
  BookOpen,
  ClipboardCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
  BarChart3,
  Megaphone,
  UserRound,
  FilePlus2,
  Library,
  Award,
  BellRing,
} from "lucide-react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectCurrentTrainer } from "../features/Trainer/trainerSelectors";

const links = [
  ["Dashboard", "dashboard", LayoutDashboard],
  ["My Profile", "profile", UserRound],
  ["My Courses", "courses", BookOpen],
  ["Create Course", "courses/create", FilePlus2],
  ["Trainer Library", "library", Library],
  ["Trainees", "trainees", Users],
  ["Assessments", "assessments", ClipboardCheck],
  ["Performance", "performance", BarChart3],
  ["Certificates", "certificates", Award],
  ["Results", "results", BarChart3],
  ["Announcements", "announcements", Megaphone],
  ["Notifications", "notifications", BellRing],
  ["Settings", "settings", Settings],
];

export default function TrainerLayout() {
  const trainer = useSelector(selectCurrentTrainer);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const signOut = () => {
    window.localStorage.removeItem("userRole");
    window.localStorage.removeItem("trainerId");
    navigate("/login");
  };

  if (window.localStorage.getItem("userRole") !== "Trainer") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="trainer-shell">
      <aside
        className={`trainer-sidebar${open ? " trainer-sidebar-open" : ""}`}
      >
        <div className="trainer-brand">
          <span className="trainer-brand-mark">CC</span>
          <div>
            <strong>Capacity Connect</strong>
            <span>Trainer workspace</span>
          </div>
          <button
            className="trainer-mobile-close"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="trainer-nav" aria-label="Trainer navigation">
          {links.map(([label, path, Icon]) => (
            <NavLink
              key={path}
              to={`/trainer/${path}`}
              end={path !== "assessments"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `trainer-nav-link${isActive ? " trainer-nav-link-active" : ""}`
              }
            >
              <Icon size={17} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <button className="trainer-signout" onClick={signOut}>
          <LogOut size={16} /> Sign out
        </button>
      </aside>
      {open && (
        <button
          className="trainer-sidebar-scrim"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <main className="trainer-main">
        <header className="trainer-header">
          <button
            className="trainer-menu-button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div>
            <span>Trainer portal</span>
            <strong>Welcome back, {trainer?.name}</strong>
          </div>
          <button
            className="trainer-header-notification"
            onClick={() => navigate("/trainer/announcements")}
            aria-label="Open announcements"
          >
            <Bell size={18} />
          </button>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
