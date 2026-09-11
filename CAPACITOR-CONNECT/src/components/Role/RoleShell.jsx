import { Outlet } from "react-router-dom";
import RoleSidebar from "./RoleSidebar";

export default function RoleShell({ role }) {
  return (
    <div className={`role-shell role-shell-${role.toLowerCase()}`}>
      <RoleSidebar role={role} />
      <main className="role-content">
        <header className="role-header">
          <span className="role-kicker">{role} portal</span>
          <span className="role-status">Workspace active</span>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
