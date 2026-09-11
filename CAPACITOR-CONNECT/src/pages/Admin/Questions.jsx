import { ListChecks, Search } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function Questions() {
  const assessments = useSelector(
    (state) => state.assessmentReducer.assessments,
  );
  const questions = assessments.flatMap((assessment) =>
    assessment.questions.map((question) => ({
      ...question,
      assessmentId: assessment.id,
      assessment: assessment.title,
    })),
  );
  const [searchParams] = useSearchParams();
  const assessmentFilter = searchParams.get("assessment");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All types");
  const visibleQuestions = questions.filter(
    (question) =>
      (!search ||
        `${question.text} ${question.assessment}`
          .toLowerCase()
          .includes(search.toLowerCase())) &&
      (type === "All types" || question.type === type) &&
      (!assessmentFilter || String(question.assessmentId) === assessmentFilter),
  );

  return (
    <section className="assessment-page">
      <div className="assessment-heading">
        <div>
          <span className="assessment-eyebrow">Admin / Assessments</span>
          <h1>Questions</h1>
          <p>Review the question bank used across your questionnaires.</p>
        </div>
      </div>
      <div className="assessment-summary-row">
        <div>
          <ListChecks size={18} />
          <span>Total questions</span>
          <strong>{questions.length}</strong>
        </div>
        <div>
          <span>Multiple choice</span>
          <strong>
            {questions.filter((item) => item.type === "Multiple choice").length}
          </strong>
        </div>
        <div>
          <span>Written response</span>
          <strong>
            {
              questions.filter((item) => item.type === "Written response")
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
            placeholder="Search questions..."
            aria-label="Search questions"
          />
        </label>
        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          aria-label="Filter question type"
        >
          <option>All types</option>
          <option>Multiple choice</option>
          <option>Written response</option>
        </select>
      </div>
      <div className="question-list">
        {visibleQuestions.map((question, index) => (
          <article className="question-row" key={question.id}>
            <span className="question-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="question-copy">
              <strong>{question.text}</strong>
              <span>{question.assessment}</span>
              {question.options.length > 0 && (
                <div className="question-options">
                  {question.options.map((option) => (
                    <span key={option}>{option}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="question-meta">
              <span>{question.type}</span>
              <strong>{question.points} pts</strong>
            </div>
          </article>
        ))}
      </div>
      {!visibleQuestions.length && (
        <div className="assessment-empty">
          <h2>No questions found</h2>
          <p>Try changing your search or type filter.</p>
        </div>
      )}
    </section>
  );
}
