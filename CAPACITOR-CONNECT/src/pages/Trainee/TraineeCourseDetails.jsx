import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  BookOpen,
  CirclePlay,
  Clock3,
  FileText,
  Star,
  UserRound,
  Users,
} from "lucide-react";
import { enrollTrainee } from "../../features/courses/courseSlice";
import { enrollCourse } from "../../features/Trainee/tranieeSlice";
import useTraineeData from "./hooks/useTraineeData";
import { findTrainer } from "../../features/Trainee/traineeSelectors";
import { EmptyState, ProgressBar } from "./components/PortalComponents";
import { formatDate } from "./utils/traineeFormatters";

export default function TraineeCourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { trainee, courses, trainers, enrollments, assessments } =
    useTraineeData();
  const course =
    courses.find((item) => String(item.id) === id) ||
    enrollments.find((item) => String(item.course.id) === id)?.course;
  if (!course)
    return (
      <section className="trainee-page">
        <EmptyState
          title="Course not found"
          action="Back to courses"
          onClick={() => navigate("/trainee/courses")}
        />
      </section>
    );
  const enrollment = enrollments.find(
    (item) => item.course.title === course.title,
  );
  const trainer = findTrainer(trainers, course);
  const assessment = assessments.find((item) => item.course === course.title);
  const enroll = () => {
    dispatch(
      enrollCourse({
        traineeId: trainee.id,
        courseId: course.id,
        title: course.title,
      }),
    );
    dispatch(enrollTrainee({ courseId: course.id }));
  };
  return (
    <section className="trainee-page">
      <button className="trainee-back-button" onClick={() => navigate(-1)}>
        ← Back to courses
      </button>
      <div className="trainee-course-detail-hero">
        <div>
          <span className="trainee-eyebrow">
            {course.category} · {course.level}
          </span>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="trainee-course-detail-meta">
            <span>
              <UserRound size={15} /> {trainer?.name || course.instructor}
            </span>
            <span>
              <Clock3 size={15} /> {course.duration}
            </span>
            <span>
              <Users size={15} /> {course.enrolledTrainees} learners
            </span>
            <span>
              <Star size={15} /> 4.8 rating
            </span>
          </div>
        </div>
        <div className="trainee-detail-course-mark">{course.title[0]}</div>
      </div>
      <div className="trainee-detail-layout">
        <div>
          <article className="trainee-panel trainee-content-panel">
            <h2>About this course</h2>
            <p>
              {course.description} This learning experience combines guided
              lessons, practical resources, and assessments.
            </p>
            <div className="trainee-resource-grid">
              {[
                "Recorded lectures",
                "Presentation decks",
                "Study materials",
                "Practice exercises",
              ].map((resource) => (
                <div key={resource}>
                  <FileText size={17} />
                  <span>{resource}</span>
                  <small>Available in course</small>
                </div>
              ))}
            </div>
          </article>
          <article className="trainee-panel trainee-content-panel">
            <h2>Assessment</h2>
            {assessment ? (
              <div className="trainee-assessment-inline">
                <div>
                  <strong>{assessment.title}</strong>
                  <span>
                    {assessment.questions.length} questions ·{" "}
                    {assessment.duration} · Due{" "}
                    {formatDate(assessment.deadline)}
                  </span>
                </div>
                {enrollment ? (
                  <button
                    className="trainee-primary-button"
                    onClick={() =>
                      navigate(`/trainee/assessments/${assessment.id}`)
                    }
                  >
                    Open assessment
                  </button>
                ) : (
                  <span className="trainee-muted">Enroll to unlock</span>
                )}
              </div>
            ) : (
              <p className="trainee-muted">
                No assessment has been published for this course yet.
              </p>
            )}
          </article>
        </div>
        <aside className="trainee-panel trainee-enrollment-panel">
          <span className="trainee-eyebrow">Your enrollment</span>
          {enrollment ? (
            <>
              <strong className="trainee-enrollment-progress">
                {enrollment.progress}%
              </strong>
              <span>{enrollment.status}</span>
              <ProgressBar value={enrollment.progress} />
              <button
                className="trainee-primary-button"
                onClick={() =>
                  navigate(
                    `/trainee/learning/${enrollment.status === "Completed" ? "completed" : "in-progress"}`,
                  )
                }
              >
                <CirclePlay size={16} /> Continue learning
              </button>
            </>
          ) : (
            <>
              <h2>Start learning today</h2>
              <p>Join this course for free and add it to your learning path.</p>
              <button className="trainee-primary-button" onClick={enroll}>
                <BookOpen size={16} /> Enroll now
              </button>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
