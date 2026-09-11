import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  FileText,
  Heart,
  Play,
  Users,
} from "lucide-react";
import { formatDate, initials } from "../utils/traineeFormatters";

export function PageIntro({ eyebrow, title, description, action }) {
  return (
    <div className="trainee-page-intro">
      <div>
        <span className="trainee-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, detail, tone = "mint" }) {
  return (
    <article className={`trainee-stat-card trainee-stat-${tone}`}>
      <div className="trainee-stat-icon">
        <Icon size={18} />
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
    </article>
  );
}

export function ProgressBar({ value }) {
  return (
    <div className="trainee-progress-bar">
      <span style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

export function PanelHeading({ title, action, onClick }) {
  return (
    <div className="trainee-panel-heading">
      <h2>{title}</h2>
      {action && (
        <button onClick={onClick}>
          {action} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title, action, onClick }) {
  return (
    <div className="trainee-empty">
      <FileText size={22} />
      <strong>{title}</strong>
      {action && (
        <button className="trainee-text-button" onClick={onClick}>
          {action} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

export function CourseCard({ item, onSave, saved }) {
  const navigate = useNavigate();
  const { course, trainer } = item;
  return (
    <article className="trainee-course-card">
      <div className="trainee-course-cover">
        <span>{course.category}</span>
        <button
          onClick={() => onSave(course)}
          className={saved ? "is-saved" : ""}
          aria-label={saved ? "Course saved" : "Save course"}
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
        <strong>{course.title.slice(0, 1)}</strong>
      </div>
      <div className="trainee-course-card-body">
        <div className="trainee-course-meta">
          <span>{course.level}</span>
          <span>
            <Clock3 size={13} /> {course.duration}
          </span>
        </div>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="trainee-course-trainer">
          <span className="trainee-mini-avatar">
            {initials(trainer?.name || course.instructor)}
          </span>
          <span>{trainer?.name || course.instructor}</span>
          <span className="trainee-course-learners">
            <Users size={14} /> {course.enrolledTrainees}
          </span>
        </div>
        <button
          className="trainee-outline-button"
          onClick={() => navigate(`/trainee/courses/${course.id}`)}
        >
          View course <ChevronRight size={15} />
        </button>
      </div>
    </article>
  );
}

export function LearningCard({ item }) {
  const navigate = useNavigate();
  return (
    <article className="trainee-learning-card">
      <div className="trainee-learning-card-top">
        <div className="trainee-course-symbol">
          {item.course.title.slice(0, 1)}
        </div>
        <div>
          <span>{item.course.category}</span>
          <h3>{item.course.title}</h3>
          <p>{item.trainer?.name || item.course.instructor}</p>
        </div>
      </div>
      <div className="trainee-learning-progress">
        <div>
          <span>Progress</span>
          <strong>{item.progress}%</strong>
        </div>
        <ProgressBar value={item.progress} />
      </div>
      <div className="trainee-learning-footer">
        <span
          className={`trainee-status trainee-status-${item.status.toLowerCase().replace(" ", "-")}`}
        >
          {item.status}
        </span>
        <button
          className="trainee-text-button"
          onClick={() => navigate(`/trainee/courses/${item.course.id}`)}
        >
          {item.status === "Completed" ? "View course" : "Continue learning"}{" "}
          <ChevronRight size={15} />
        </button>
      </div>
    </article>
  );
}

export function AssessmentCard({ assessment, result }) {
  const navigate = useNavigate();
  return (
    <article className="trainee-assessment-card">
      <div className="trainee-assessment-icon">
        <FileText size={20} />
      </div>
      <div className="trainee-assessment-copy">
        <span>{assessment.course}</span>
        <h3>{assessment.title}</h3>
        <p>
          <CalendarDays size={14} /> Due {formatDate(assessment.deadline)} <i />{" "}
          <Clock3 size={14} /> {assessment.duration}
        </p>
      </div>
      <div className="trainee-assessment-side">
        <span>{assessment.questions.length} questions</span>
        {result ? (
          <strong className="trainee-score">{result.score}%</strong>
        ) : (
          <button
            className="trainee-primary-button"
            onClick={() => navigate(`/trainee/assessments/${assessment.id}`)}
          >
            Attempt <Play size={14} />
          </button>
        )}
      </div>
    </article>
  );
}

export function Detail({ label, value, icon: Icon }) {
  return (
    <div className="trainee-detail">
      <Icon size={16} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
