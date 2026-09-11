import { useNavigate, useParams } from "react-router-dom";
import { ClipboardCheck, Edit3, Eye } from "lucide-react";
import useTrainerData from "./hooks/useTrainerData";
import { TrainerPageIntro } from "../../components/Trainer/TrainerComponents";

export default function TrainerAssessmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assessments, results } = useTrainerData();
  const assessment = assessments.find((item) => String(item.id) === id);
  if (!assessment)
    return (
      <section className="trainer-page">
        <div className="trainer-panel">
          <h2>Assessment not found</h2>
        </div>
      </section>
    );
  const submissions = results.filter(
    (result) => result.assessmentId === assessment.id,
  );
  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Assessment details"
        title={assessment.title}
        description={`${assessment.course} · ${assessment.duration}`}
        action={
          <button
            className="trainer-secondary-button"
            onClick={() => navigate("/trainer/assessments")}
          >
            <Edit3 size={15} /> Back to assessments
          </button>
        }
      />
      <div className="trainer-stat-grid trainer-stat-grid-three">
        <div className="trainer-stat-card">
          <ClipboardCheck size={19} />
          <div>
            <span>Questions</span>
            <strong>{assessment.questions.length}</strong>
          </div>
        </div>
        <div className="trainer-stat-card">
          <Eye size={19} />
          <div>
            <span>Participants</span>
            <strong>{assessment.participants}</strong>
          </div>
        </div>
        <div className="trainer-stat-card">
          <ClipboardCheck size={19} />
          <div>
            <span>Completed</span>
            <strong>{assessment.completed}</strong>
          </div>
        </div>
      </div>
      <article className="trainer-panel">
        <h2>Questions</h2>
        {assessment.questions.map((question, index) => (
          <div className="trainer-detail-row" key={question.id}>
            <ClipboardCheck size={16} />
            <span>
              {index + 1}. {question.text}
            </span>
            <small>{question.points} points</small>
          </div>
        ))}
      </article>
      <article className="trainer-panel">
        <h2>Results</h2>
        {submissions.map((result) => (
          <div className="trainer-detail-row" key={result.id}>
            <span>{result.trainee}</span>
            <strong>{result.score}%</strong>
            <small>{result.status}</small>
          </div>
        ))}
      </article>
    </section>
  );
}
