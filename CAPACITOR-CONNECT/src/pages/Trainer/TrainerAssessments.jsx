import { CalendarDays, ClipboardCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useTrainerData from "./hooks/useTrainerData";
import {
  TrainerPageIntro,
  TrainerStatCard,
} from "../../components/Trainer/TrainerComponents";

export default function TrainerAssessments() {
  const { assessments } = useTrainerData();
  const navigate = useNavigate();
  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Assessment workspace"
        title="Assessments"
        description="Review assessment activity and keep every learner checkpoint on track."
        action={
          <button
            className="trainer-primary-button"
            onClick={() => navigate("/trainer/assessments/create")}
          >
            Create assessment
          </button>
        }
      />
      <div className="trainer-stat-grid trainer-stat-grid-three">
        <TrainerStatCard
          icon={ClipboardCheck}
          label="Assessments"
          value={assessments.length}
          detail="Across your courses"
        />
        <TrainerStatCard
          icon={CalendarDays}
          label="Active"
          value={
            assessments.filter((assessment) => assessment.status === "Active")
              .length
          }
          detail="Currently available"
        />
        <TrainerStatCard
          icon={ClipboardCheck}
          label="Questions"
          value={assessments.reduce(
            (total, assessment) => total + assessment.questions.length,
            0,
          )}
          detail="In your question bank"
        />
      </div>
      <div className="trainer-panel trainer-assessment-list">
        {assessments.map((assessment) => (
          <article className="trainer-assessment-row" key={assessment.id}>
            <div className="trainer-assessment-icon">
              <ClipboardCheck size={19} />
            </div>
            <div>
              <span>{assessment.course}</span>
              <strong>{assessment.title}</strong>
              <small>
                {assessment.questions.length} questions · {assessment.duration}{" "}
                · Due {assessment.deadline}
              </small>
            </div>
            <span
              className={`trainer-status trainer-status-${assessment.status.toLowerCase()}`}
            >
              {assessment.status}
            </span>
            <button
              className="trainer-secondary-button"
              onClick={() => navigate(`/trainer/assessments/${assessment.id}`)}
            >
              View
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
