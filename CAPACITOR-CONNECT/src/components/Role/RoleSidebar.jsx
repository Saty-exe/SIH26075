import { NavLink } from "react-router-dom";

const roleNavigation = {
  Trainee: [
    { label: "My Dashboard", path: "dashboard" },
    { label: "Browse Courses", path: "courses" },
    { label: "My Enrollments", path: "enrollments" },
    { label: "Assessments", path: "assessments" },
    { label: "Certificates", path: "certificates" },
    { label: "My Performance", path: "performance" },
    { label: "Notifications", path: "notifications" },
    { label: "Profile Settings", path: "settings" },
  ],
  Trainer: [
    { label: "Trainer Dashboard", path: "dashboard" },
    { label: "My Courses", path: "courses" },
    { label: "Create Course", path: "courses/create" },
    { label: "Trainees", path: "trainees" },
    { label: "Assessments", path: "assessments" },
    { label: "Results", path: "results" },
    { label: "Announcements", path: "announcements" },
    { label: "Profile Settings", path: "settings" },
  ],
};

export default function RoleSidebar({ role }) {
  return (
    <aside className={`role-sidebar role-sidebar-${role.toLowerCase()}`}>
      <div className="sidebar-brand">
        <span className="brand-mark">CC</span>
        <div>
          <strong>Capacity Connect</strong>
          <span>{role} workspace</span>
        </div>
      </div>
      <nav className="sidebar-nav" aria-label={`${role} navigation`}>
        {roleNavigation[role].map((item) => (
          <NavLink
            key={item.path}
            to={`/${role.toLowerCase()}/${item.path}`}
            className={({ isActive }) =>
              `sidebar-link${isActive ? " sidebar-link-active" : ""}`
            }
          >
            <span className="sidebar-link-dot" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <NavLink className="sidebar-logout" to="/login">
        Sign out
      </NavLink>
    </aside>
  );
}
