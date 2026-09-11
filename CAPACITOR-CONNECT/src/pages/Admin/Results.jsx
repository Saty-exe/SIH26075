import { BarChart3, Search } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Results() {
  const { assessments, results } = useSelector(
    (state) => state.assessmentReducer,
  );
  const [search, setSearch] = useState("");
  const [assessmentId, setAssessmentId] = useState("All assessments");
  const visibleResults = results.filter((result) => {
    const assessment = assessments.find(
      (item) => item.id === result.assessmentId,
    );
    return (
      (!search ||
        `${result.trainee} ${assessment?.title}`
          .toLowerCase()
          .includes(search.toLowerCase())) &&
      (assessmentId === "All assessments" ||
        String(result.assessmentId) === assessmentId)
    );
  });
  const average = visibleResults.length
    ? Math.round(
        visibleResults.reduce((sum, result) => sum + result.score, 0) /
          visibleResults.length,
      )
    : 0;

  return (
    <section className="assessment-page">
      <div className="assessment-heading">
        <div>
          <span className="assessment-eyebrow">Admin / Assessments</span>
          <h1>Results</h1>
          <p>Review learner outcomes and identify where support is needed.</p>
        </div>
      </div>
      <div className="assessment-summary-row">
        <div>
          <BarChart3 size={18} />
          <span>Submissions</span>
          <strong>{visibleResults.length}</strong>
        </div>
        <div>
          <span>Average score</span>
          <strong>{average}%</strong>
        </div>
        <div>
          <span>Passed</span>
          <strong>
            {
              visibleResults.filter((result) => result.status === "Passed")
                .length
            }
          </strong>
        </div>
      </div>
      <div className="assessment-toolbar">
        <label className="assessment-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search trainee or assessment..."
            aria-label="Search results"
          />
        </label>
        <select
          value={assessmentId}
          onChange={(event) => setAssessmentId(event.target.value)}
          aria-label="Filter results by assessment"
        >
          <option>All assessments</option>
          {assessments.map((assessment) => (
            <option key={assessment.id} value={assessment.id}>
              {assessment.title}
            </option>
          ))}
        </select>
      </div>
      <div className="results-table-wrap">
        <table className="results-table">
          <thead>
            <tr>
              <th>Trainee</th>
              <th>Assessment</th>
              <th>Score</th>
              <th>Status</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {visibleResults.map((result) => {
              const assessment = assessments.find(
                (item) => item.id === result.assessmentId,
              );
              return (
                <tr key={result.id}>
                  <td>
                    <strong>{result.trainee}</strong>
                  </td>
                  <td>{assessment?.title}</td>
                  <td>
                    <strong className="result-score">{result.score}%</strong>
                  </td>
                  <td>
                    <span
                      className={`assessment-status assessment-status-${result.status.toLowerCase()}`}
                    >
                      {result.status}
                    </span>
                  </td>
                  <td>{result.submittedAt}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!visibleResults.length && (
          <div className="assessment-empty">
            <h2>No results found</h2>
            <p>Try changing your search or assessment filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
