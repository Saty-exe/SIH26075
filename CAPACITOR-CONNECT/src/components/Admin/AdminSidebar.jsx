import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Award,
  BarChart3,
  Network,
  Bell,
  Megaphone,
  Settings,
  MessageSquareWarning,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const adminNavItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "User Management",
    icon: Users,
    children: [
      {
        label: "Trainees",
        path: "/admin/trainees",
      },
      {
        label: "Trainers",
        path: "/admin/trainers",
      },
      {
        label: "Pending Approvals",
        path: "/admin/pending-approvals",
      },
    ],
  },
  {
    label: "Courses",
    icon: BookOpen,
    children: [
      {
        label: "All Courses",
        path: "/admin/courses",
      },
      {
        label: "Create Course",
        path: "/admin/courses/create",
      },
      {
        label: "Categories",
        path: "/admin/categories",
      },
    ],
  },
  {
    label: "Enrollments",
    path: "/admin/enrollments",
    icon: GraduationCap,
  },
  {
    label: "Assessments",
    icon: ClipboardCheck,
    children: [
      {
        label: "Questionnaires",
        path: "/admin/questionnaires",
      },
      {
        label: "Questions",
        path: "/admin/questions",
      },
      {
        label: "Results",
        path: "/admin/results",
      },
    ],
  },
  {
    label: "Certifications",
    path: "/admin/certifications",
    icon: Award,
  },
  {
    label: "Performance",
    path: "/admin/participation-performance",
    icon: BarChart3,
  },
  {
    label: "Competency Mapping",
    path: "/admin/competency-mapping",
    icon: Network,
  },
  {
    label: "Notifications",
    path: "/admin/notifications",
    icon: Bell,
  },
  {
    label: "Complaints",
    path: "/admin/complaints",
    icon: MessageSquareWarning,
  },
  {
    label: "Announcements",
    path: "/admin/announcements",
    icon: Megaphone,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

function AdminSidebar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    window.localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <aside className="role-sidebar role-sidebar-admin">
      <div className="sidebar-brand">
        <span className="brand-mark">CC</span>
        <div>
          <strong>Capacity Connect</strong>
          <span>Admin workspace</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Admin navigation">
        {adminNavItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="admin-nav-group">
              {item.path ? (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-link${isActive ? " sidebar-link-active" : ""}`
                  }
                >
                  {Icon && <Icon size={18} />}
                  <span>{item.label}</span>
                </NavLink>
              ) : (
                <div className="sidebar-section-label">
                  {Icon && <Icon size={18} />}
                  <span>{item.label}</span>
                </div>
              )}

              {item.children && (
                <div className="admin-sub-navigation">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) =>
                        `sidebar-link sidebar-child-link${
                          isActive ? " sidebar-link-active" : ""
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <button type="button" className="sidebar-logout" onClick={handleSignOut}>
        Sign out
      </button>
    </aside>
  );
}

export default AdminSidebar;
