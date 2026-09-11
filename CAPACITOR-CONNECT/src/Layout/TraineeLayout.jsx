import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Award,
  BookOpen,
  ClipboardCheck,
  Gauge,
  MessageSquareWarning,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectCurrentTrainee } from "../features/Trainee/traineeSelectors";

const primaryLinks = [
  ["Dashboard", "dashboard", LayoutDashboard],
  ["My Profile", "profile", UserRound],
  ["Browse Courses", "courses", BookOpen],
  ["Assessments", "assessments", ClipboardCheck],
  ["Performance", "performance", Gauge],
  ["Certificates", "certificates", Award],
  ["Notifications", "notifications", Bell],
  ["Complaints", "complaints", MessageSquareWarning],
  ["Settings", "settings", Settings],
];

export default function TraineeLayout() {
  const trainee = useSelector(selectCurrentTrainee);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const signOut = () => {
    window.localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="trainee-shell">
      <aside
        className={`trainee-sidebar${mobileOpen ? " trainee-sidebar-open" : ""}`}
      >
        <div className="trainee-brand">
          <span className="trainee-brand-mark">CC</span>
          <div>
            <strong>Capacity Connect</strong>
            <span>Learning workspace</span>
          </div>
          <button
            className="trainee-mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="trainee-nav" aria-label="Trainee navigation">
          {primaryLinks.map(([label, path, Icon]) => (
            <NavLink
              key={path}
              to={`/trainee/${path}`}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `trainee-nav-link${isActive ? " trainee-nav-link-active" : ""}`
              }
            >
              <Icon size={17} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="trainee-learning-nav">
          <span className="trainee-nav-label">My Learning</span>
          {["in-progress", "completed", "saved"].map((view) => (
            <NavLink
              key={view}
              to={`/trainee/learning/${view}`}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `trainee-sub-link${isActive ? " trainee-sub-link-active" : ""}`
              }
            >
              <span className="trainee-sub-dot" />
              {view.replace("-", " ")}
            </NavLink>
          ))}
        </div>
        <button className="trainee-signout" onClick={signOut}>
          <LogOut size={16} /> Sign out
        </button>
      </aside>
      {mobileOpen && (
        <button
          className="trainee-sidebar-scrim"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <main className="trainee-main">
        <header className="trainee-header">
          <button
            className="trainee-menu-button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          <div>
            <span className="trainee-header-kicker">Trainee portal</span>
            <strong>Keep growing, {trainee?.name?.split(" ")[0]}</strong>
          </div>
          <div className="trainee-header-actions">
            <button
              className="trainee-icon-button"
              onClick={() => navigate("/trainee/notifications")}
              aria-label="Open notifications"
            >
              <Bell size={18} />
              <span className="trainee-notification-dot" />
            </button>
            <button
              className="trainee-user-menu"
              onClick={() => navigate("/trainee/profile")}
            >
              <span className="trainee-avatar">
                {trainee?.name?.slice(0, 1)}
              </span>
              <span>{trainee?.name}</span>
              <ChevronDown size={15} />
            </button>
          </div>
        </header>
        <div className="trainee-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
