import { Bell, LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useTrainerData from "./hooks/useTrainerData";
import { TrainerPageIntro } from "../../components/Trainer/TrainerComponents";

export default function TrainerSettings() {
  const { trainer } = useTrainerData();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState(true);
  const signOut = () => {
    window.localStorage.removeItem("userRole");
    navigate("/login");
  };
  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Workspace preferences"
        title="Settings"
        description="Manage your trainer profile and communication preferences."
      />
      <div className="trainer-settings-grid">
        <article className="trainer-panel trainer-setting-card">
          <UserRound size={20} />
          <h2>Profile</h2>
          <p>{trainer?.name}</p>
          <span>{trainer?.email}</span>
          <button className="trainer-secondary-button">Profile details</button>
        </article>
        <article className="trainer-panel trainer-setting-card">
          <Bell size={20} />
          <h2>Notifications</h2>
          <p>Receive learner and assessment updates.</p>
          <label className="trainer-setting-toggle">
            <span>Activity alerts</span>
            <input
              type="checkbox"
              checked={alerts}
              onChange={() => setAlerts((value) => !value)}
            />
            <i />
          </label>
        </article>
        <article className="trainer-panel trainer-setting-card">
          <LogOut size={20} />
          <h2>Account</h2>
          <p>Your trainer workspace is active.</p>
          <button className="trainer-danger-button" onClick={signOut}>
            Sign out
          </button>
        </article>
      </div>
    </section>
  );
}
