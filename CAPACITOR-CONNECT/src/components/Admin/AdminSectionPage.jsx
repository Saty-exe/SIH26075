import {
  CheckCircle2,
  Clock3,
  FileCheck2,
  Megaphone,
  Settings2,
  X,
} from "lucide-react";
import { useState } from "react";

const sectionRecords = {
  certifications: [
    {
      id: "CERT-2026-001",
      title: "Modern Web Development",
      recipient: "Ananya Gupta",
      issuer: "Amit Verma",
      issuedOn: "September 8, 2026",
      status: "Issued",
      description:
        "Successfully completed the Modern Web Development course with a final score of 91%.",
    },
    {
      id: "CERT-2026-002",
      title: "Climate Data Analysis",
      recipient: "Rahul Sharma",
      issuer: "Dr. Priya Nair",
      issuedOn: "September 5, 2026",
      status: "Issued",
      description:
        "Completed the advanced climate data analysis track and all required assessments.",
    },
    {
      id: "CERT-2026-003",
      title: "Fundamentals of Weather Forecasting",
      recipient: "Meera Joshi",
      issuer: "Dr. Rajiv Mehta",
      issuedOn: "September 2, 2026",
      status: "Pending verification",
      description:
        "Awaiting final verification before the credential is released to the trainee.",
    },
  ],
  announcements: [
    {
      id: "ANN-026",
      title: "September assessment window is now open",
      audience: "All trainees",
      publishedOn: "September 9, 2026",
      status: "Published",
      description:
        "Trainees can now access the September assessment window from their learning dashboard.",
    },
    {
      id: "ANN-025",
      title: "New climate data learning path",
      audience: "Data Science trainees",
      publishedOn: "September 6, 2026",
      status: "Published",
      description:
        "The new learning path combines climate datasets, Python notebooks, and guided analysis.",
    },
    {
      id: "ANN-024",
      title: "Trainer calibration workshop",
      audience: "All trainers",
      publishedOn: "September 15, 2026",
      status: "Scheduled",
      description:
        "A calibration workshop will help trainers align assessment rubrics for the next cohort.",
    },
  ],
};

const sectionContent = {
  dashboard: {
    eyebrow: "Admin / Overview",
    title: "Dashboard",
    description:
      "A connected view of learners, courses, assessments, and platform activity.",
    stats: [
      ["Active trainees", "7"],
      ["Active trainers", "5"],
      ["Published courses", "3"],
      ["Open issues", "4"],
    ],
    rows: ["Recent enrolments", "Pending approvals", "Assessment activity"],
  },
  approvals: {
    eyebrow: "Admin / User management",
    title: "Pending approvals",
    description:
      "Review new trainer and trainee applications before they enter the learning network.",
    stats: [
      ["Awaiting review", "4"],
      ["Approved this week", "12"],
      ["Average review time", "1.4d"],
    ],
    rows: ["Trainer applications", "Trainee applications"],
  },
  categories: {
    eyebrow: "Admin / Courses",
    title: "Categories",
    description:
      "Keep course taxonomy clear so every portal can discover learning content consistently.",
    stats: [
      ["Categories", "8"],
      ["Courses mapped", "12"],
      ["Unassigned", "1"],
    ],
    rows: ["Software Development", "Data Science", "Meteorology"],
  },
  certifications: {
    eyebrow: "Admin / Credentials",
    title: "Certifications",
    description:
      "Track issued credentials and keep certification records ready for verification.",
    stats: [
      ["Issued", "6"],
      ["This month", "2"],
      ["Pending", "1"],
    ],
    rows: ["Recent certificates", "Pending verification"],
  },
  performance: {
    eyebrow: "Admin / Insights",
    title: "Participation & performance",
    description:
      "Compare engagement and learning outcomes across courses, trainers, and cohorts.",
    stats: [
      ["Average completion", "74%"],
      ["Average score", "86%"],
      ["Active learners", "7"],
    ],
    rows: ["Completion trend", "Top performing courses", "Learner engagement"],
  },
  competency: {
    eyebrow: "Admin / Capability",
    title: "Competency mapping",
    description:
      "Connect course outcomes with the competencies learners and teams need to build.",
    stats: [
      ["Competencies", "18"],
      ["Mapped courses", "11"],
      ["Needs review", "3"],
    ],
    rows: ["Competency coverage", "Gaps to address"],
  },
  announcements: {
    eyebrow: "Admin / Communication",
    title: "Announcements",
    description:
      "Publish clear updates to the right portal audiences from one place.",
    stats: [
      ["Published", "8"],
      ["Scheduled", "2"],
      ["Drafts", "3"],
    ],
    rows: ["Latest announcements", "Scheduled updates"],
  },
  settings: {
    eyebrow: "Admin / Platform",
    title: "Settings",
    description:
      "Configure shared platform defaults and integration points for connected portals.",
    stats: [
      ["Profile", "Ready"],
      ["Notifications", "On"],
      ["Integrations", "2"],
    ],
    rows: [
      "Portal preferences",
      "Notification rules",
      "Access and integrations",
    ],
  },
  notifications: {
    eyebrow: "Admin / Communication",
    title: "Notifications",
    description:
      "Monitor system signals and keep important actions visible to administrators.",
    stats: [
      ["Unread", "4"],
      ["Today", "12"],
      ["Automations", "6"],
    ],
    rows: ["System notifications", "Approval reminders"],
  },
};

export default function AdminSectionPage({ section }) {
  const content = sectionContent[section];
  const records = sectionRecords[section] || [];
  const [selectedRecord, setSelectedRecord] = useState(null);

  return (
    <section className="admin-section-page">
      <div className="admin-section-heading">
        <div>
          <span className="admin-section-eyebrow">{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
        </div>
      </div>
      <div className="admin-section-stats">
        {content.stats.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="admin-section-grid">
        {content.rows.map((row, index) => {
          const record = records[index] || {
            id: `${section.toUpperCase()}-${String(index + 1).padStart(3, "0")}`,
            title: row,
            status: "Ready",
            details: `Open the ${row.toLowerCase()} workspace to review its latest activity and connected records.`,
          };
          return (
            <article className="admin-section-card" key={row}>
              <div className="admin-section-card-icon">
                {section === "certifications" ? (
                  <FileCheck2 size={18} />
                ) : section === "announcements" ? (
                  <Megaphone size={18} />
                ) : index === 0 ? (
                  <CheckCircle2 size={18} />
                ) : index === 1 ? (
                  <Clock3 size={18} />
                ) : (
                  <Settings2 size={18} />
                )}
              </div>
              <div>
                <h2>{row}</h2>
                <p>
                  Connected records and actions for this workspace will appear
                  here.
                </p>
              </div>
              <button
                className="admin-section-arrow"
                type="button"
                onClick={() => setSelectedRecord(record)}
              >
                View
              </button>
            </article>
          );
        })}
      </div>
      {selectedRecord && (
        <div
          className="admin-record-detail"
          role="dialog"
          aria-labelledby="admin-record-title"
        >
          <div className="admin-record-detail-heading">
            <div>
              <span className="admin-section-eyebrow">{selectedRecord.id}</span>
              <h2 id="admin-record-title">{selectedRecord.title}</h2>
            </div>
            <button
              className="admin-record-close"
              type="button"
              onClick={() => setSelectedRecord(null)}
              aria-label="Close details"
            >
              <X size={18} />
            </button>
          </div>
          <p className="admin-record-description">
            {selectedRecord.description}
          </p>
          <dl className="admin-record-meta">
            {Object.entries(selectedRecord)
              .filter(([key]) => !["id", "title", "description"].includes(key))
              .map(([key, value]) => (
                <div key={key}>
                  <dt>{key.replace(/([A-Z])/g, " $1")}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
          </dl>
        </div>
      )}
    </section>
  );
}
