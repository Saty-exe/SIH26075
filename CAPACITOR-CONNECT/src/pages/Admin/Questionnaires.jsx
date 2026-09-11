import { ClipboardCheck, Eye, Search } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Questionnaires() {
  const assessments = useSelector(
    (state) => state.assessmentReducer.assessments,
  );
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const visibleAssessments = assessments.filter((assessment) => {
    const query = search.toLowerCase();
    return (
      (!query ||
        `${assessment.title} ${assessment.course}`
          .toLowerCase()
          .includes(query)) &&
      (status === "All statuses" || assessment.status === status)
    );
  });

  return (
    <section className="assessment-page">
      <div className="assessment-heading">
        <div>
          <span className="assessment-eyebrow">Admin / Assessments</span>
          <h1>Questionnaires</h1>
          <p>Create and monitor assessments connected to your courses.</p>
        </div>
      </div>
      <div className="assessment-summary-row">
        <div>
          <ClipboardCheck size={18} />
          <span>Total questionnaires</span>
          <strong>{assessments.length}</strong>
        </div>
        <div>
          <span>Active</span>
          <strong>
            {assessments.filter((item) => item.status === "Active").length}
          </strong>
        </div>
        <div>
          <span>Questions</span>
          <strong>
            {assessments.reduce((sum, item) => sum + item.questions.length, 0)}
          </strong>
        </div>
      </div>
      <div className="assessment-toolbar">
        <label className="assessment-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search questionnaires..."
            aria-label="Search questionnaires"
          />
        </label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label="Filter questionnaires"
        >
          <option>All statuses</option>
          <option>Active</option>
          <option>Draft</option>
        </select>
      </div>
      <div className="assessment-card-grid">
        {visibleAssessments.map((assessment) => (
          <article className="assessment-card" key={assessment.id}>
            <div className="assessment-card-top">
              <span
                className={`assessment-status assessment-status-${assessment.status.toLowerCase()}`}
              >
                {assessment.status}
              </span>
              <span>{assessment.questions.length} questions</span>
            </div>
            <h2>{assessment.title}</h2>
            <p>{assessment.course}</p>
            <div className="assessment-card-meta">
              <span>
                Deadline <strong>{assessment.deadline}</strong>
              </span>
              <span>
                Completion{" "}
                <strong>
                  {assessment.participants
                    ? Math.round(
                        (assessment.completed / assessment.participants) * 100,
                      )
                    : 0}
                  %
                </strong>
              </span>
            </div>
            <div className="assessment-card-actions">
              <a href={`/admin/questions?assessment=${assessment.id}`}>
                <Eye size={15} /> View questions
              </a>
            </div>
          </article>
        ))}
      </div>
      {!visibleAssessments.length && (
        <div className="assessment-empty">
          <h2>No questionnaires found</h2>
          <p>Try changing your search or status filter.</p>
        </div>
      )}
    </section>
  );
}
