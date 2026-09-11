import { useNavigate } from "react-router-dom";
import { BarChart3, BookOpen, ChevronRight, Users } from "lucide-react";

export function TrainerPageIntro({ eyebrow, title, description, action }) {
  return (
    <div className="trainer-page-intro">
      <div>
        <span className="trainer-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

export function TrainerStatCard({ icon: Icon, label, value, detail }) {
  return (
    <article className="trainer-stat-card">
      <div className="trainer-stat-icon">
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

export function TrainerCourseCard({ course }) {
  const navigate = useNavigate();
  return (
    <article className="trainer-course-card">
      <div className="trainer-course-card-top">
        <span>{course.category}</span>
        <strong>{course.title.slice(0, 1)}</strong>
      </div>
      <div>
        <span className="trainer-course-level">
          {course.level} · {course.duration}
        </span>
        <h2>{course.title}</h2>
        <p>{course.description}</p>
        <div className="trainer-course-card-meta">
          <span>
            <Users size={14} /> {course.enrolledTrainees} trainees
          </span>
          <span>
            <BarChart3 size={14} /> {course.completionRate}% completion
          </span>
        </div>
        <button
          className="trainer-secondary-button"
          onClick={() => navigate(`/trainer/courses/${course.id}`)}
        >
          Open course <ChevronRight size={15} />
        </button>
      </div>
    </article>
  );
}

export function TrainerProgressRow({ trainee }) {
  const enrollment = trainee.learning.enrolledCourses[0];
  return (
    <div className="trainer-progress-row">
      <div className="trainer-mini-avatar">{trainee.name.slice(0, 1)}</div>
      <div>
        <strong>{trainee.name}</strong>
        <span>{enrollment?.title || "No active course"}</span>
      </div>
      <div className="trainer-progress-value">
        <strong>{enrollment?.progress || 0}%</strong>
        <div>
          <span style={{ width: `${enrollment?.progress || 0}%` }} />
        </div>
      </div>
    </div>
  );
}

export function TrainerEmpty({ title }) {
  return (
    <div className="trainer-empty">
      <BookOpen size={22} />
      <strong>{title}</strong>
    </div>
  );
}
