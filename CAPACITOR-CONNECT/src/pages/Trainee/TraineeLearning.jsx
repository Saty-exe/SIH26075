import { useNavigate, useParams } from "react-router-dom";
import useTraineeData from "./hooks/useTraineeData";
import { findTrainer } from "../../features/Trainee/traineeSelectors";
import {
  EmptyState,
  LearningCard,
  PageIntro,
} from "./components/PortalComponents";

export default function TraineeLearning() {
  const { trainee, courses, trainers, enrollments } = useTraineeData();
  const { view = "all" } = useParams();
  const navigate = useNavigate();
  const savedItems = courses
    .filter((course) =>
      (trainee.learning.savedCourses || []).includes(course.id),
    )
    .map((course) => ({
      course,
      trainer: findTrainer(trainers, course),
      progress: 0,
      status: "Saved",
    }));
  const items =
    view === "saved"
      ? savedItems
      : enrollments.filter(
          (item) =>
            view === "all" ||
            (view === "completed"
              ? item.status === "Completed"
              : item.status === "In Progress"),
        );
  const title =
    view === "completed"
      ? "Completed courses"
      : view === "saved"
        ? "Saved courses"
        : view === "in-progress"
          ? "In-progress learning"
          : "My learning";
  return (
    <section className="trainee-page">
      <PageIntro
        eyebrow="My learning"
        title={title}
        description="Your enrolled courses, progress, and next steps in one place."
      />
      <div className="trainee-learning-tabs">
        {[
          ["all", "All courses"],
          ["in-progress", "In progress"],
          ["completed", "Completed"],
          ["saved", "Saved"],
        ].map(([key, label]) => (
          <button
            className={
              view === key || (view === "all" && key === "all") ? "active" : ""
            }
            onClick={() => navigate(`/trainee/learning/${key}`)}
            key={key}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="trainee-learning-list">
        {items.map((item) => (
          <LearningCard key={item.course.id} item={item} />
        ))}
      </div>
      {!items.length && (
        <EmptyState
          title="Nothing here yet"
          action="Browse courses"
          onClick={() => navigate("/trainee/courses")}
        />
      )}
    </section>
  );
}
