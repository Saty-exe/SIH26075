import { useNavigate } from "react-router-dom";
import { BarChart3, BookOpen, ClipboardCheck, Users } from "lucide-react";
import useTrainerData from "./hooks/useTrainerData";
import {
  TrainerPageIntro,
  TrainerProgressRow,
  TrainerStatCard,
} from "../../components/Trainer/TrainerComponents";

export default function TrainerDashboard() {
  const { trainer, courses, trainees, assessments } = useTrainerData();
  const navigate = useNavigate();
  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Trainer overview"
        title={`Good morning, ${trainer?.name?.split(" ").slice(-1)[0]}`}
        description="Manage your courses, support learners, and track outcomes from one workspace."
        action={
          <button
            className="trainer-primary-button"
            onClick={() => navigate("/trainer/courses")}
          >
            <BookOpen size={16} /> View my courses
          </button>
        }
      />
      <div className="trainer-stat-grid">
        <TrainerStatCard
          icon={BookOpen}
          label="Published courses"
          value={
            courses.filter((course) => course.status === "Published").length
          }
          detail="Your active catalogue"
        />
        <TrainerStatCard
          icon={Users}
          label="Learners supported"
          value={trainees.length}
          detail="Connected trainees"
        />
        <TrainerStatCard
          icon={ClipboardCheck}
          label="Assessments"
          value={assessments.length}
          detail="Across your courses"
        />
        <TrainerStatCard
          icon={BarChart3}
          label="Average score"
          value={`${trainer?.performance?.averageTraineeScore || 0}%`}
          detail="Learner outcomes"
        />
      </div>
      <div className="trainer-dashboard-grid">
        <article className="trainer-panel">
          <div className="trainer-panel-heading">
            <h2>Learner progress</h2>
            <button onClick={() => navigate("/trainer/trainees")}>
              View trainees →
            </button>
          </div>
          {trainees.slice(0, 5).map((trainee) => (
            <TrainerProgressRow key={trainee.id} trainee={trainee} />
          ))}
        </article>
        <article className="trainer-panel">
          <div className="trainer-panel-heading">
            <h2>Upcoming assessments</h2>
            <button onClick={() => navigate("/trainer/assessments")}>
              View all →
            </button>
          </div>
          {assessments.slice(0, 4).map((assessment) => (
            <div className="trainer-upcoming-row" key={assessment.id}>
              <div>
                <strong>{assessment.title}</strong>
                <span>{assessment.course}</span>
              </div>
              <time>{assessment.deadline}</time>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
