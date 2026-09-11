import { Bell, ChevronRight, LockKeyhole, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PageIntro } from "./components/PortalComponents";

export default function TraineeSettings() {
  const navigate = useNavigate();
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [assessmentAlerts, setAssessmentAlerts] = useState(true);
  const signOut = () => {
    window.localStorage.removeItem("userRole");
    navigate("/login");
  };
  return (
    <section className="trainee-page">
      <PageIntro
        eyebrow="Workspace preferences"
        title="Settings"
        description="Manage your profile preferences and how Capacity Connect keeps you informed."
      />
      <div className="trainee-settings-grid">
        <article className="trainee-panel trainee-settings-card">
          <div className="trainee-setting-heading">
            <UserRound size={19} />
            <div>
              <h2>Profile settings</h2>
              <p>Update your personal information and learning interests.</p>
            </div>
          </div>
          <button
            className="trainee-outline-button"
            onClick={() => navigate("/trainee/profile")}
          >
            Manage profile <ChevronRight size={15} />
          </button>
        </article>
        <article className="trainee-panel trainee-settings-card">
          <div className="trainee-setting-heading">
            <Bell size={19} />
            <div>
              <h2>Notification preferences</h2>
              <p>Choose which updates appear in your workspace.</p>
            </div>
          </div>
          <label className="trainee-toggle">
            <span>Email course updates</span>
            <input
              type="checkbox"
              checked={emailUpdates}
              onChange={() => setEmailUpdates((value) => !value)}
            />
            <i />
          </label>
          <label className="trainee-toggle">
            <span>Assessment deadline alerts</span>
            <input
              type="checkbox"
              checked={assessmentAlerts}
              onChange={() => setAssessmentAlerts((value) => !value)}
            />
            <i />
          </label>
        </article>
        <article className="trainee-panel trainee-settings-card">
          <div className="trainee-setting-heading">
            <LockKeyhole size={19} />
            <div>
              <h2>Account settings</h2>
              <p>Your account is active and protected.</p>
            </div>
          </div>
          <span className="trainee-active-pill">
            <span /> Active account
          </span>
          <button className="trainee-danger-link" onClick={signOut}>
            Sign out of this account
          </button>
        </article>
      </div>
    </section>
  );
}
