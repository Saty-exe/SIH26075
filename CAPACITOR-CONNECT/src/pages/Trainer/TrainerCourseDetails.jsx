import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FileText,
  Users,
} from "lucide-react";
import { publishCourse } from "../../features/courses/courseSlice";
import useTrainerData from "./hooks/useTrainerData";
import { TrainerPageIntro } from "../../components/Trainer/TrainerComponents";

export default function TrainerCourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { trainer, courses, trainees, assessments } = useTrainerData();
  const resources = useSelector(
    (state) => state.resourceReducer.resources,
  ).filter((resource) => String(resource.courseId) === id);
  const course = courses.find((item) => String(item.id) === id);
  if (!course)
    return (
      <section className="trainer-page">
        <div className="trainer-panel">
          <h2>Course not found</h2>
        </div>
      </section>
    );
  const courseTrainees = trainees.filter((trainee) =>
    trainee.learning.enrolledCourses.some(
      (item) => item.courseId === course.id || item.title === course.title,
    ),
  );
  const courseAssessments = assessments.filter(
    (assessment) => assessment.course === course.title,
  );
  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Course details"
        title={course.title}
        description={course.description}
        action={
          <button
            className="trainer-primary-button"
            onClick={() =>
              dispatch(
                publishCourse({
                  id: course.id,
                  status: course.status === "Published" ? "Draft" : "Published",
                }),
              )
            }
          >
            {course.status === "Published" ? "Unpublish" : "Publish course"}
          </button>
        }
      />
      <div className="trainer-course-detail-summary">
        <span>
          <BookOpen size={16} /> {course.category} · {course.level}
        </span>
        <span>
          <Users size={16} /> {course.enrolledTrainees} trainees
        </span>
        <span>
          <BarChart3 size={16} /> {course.completionRate}% completion
        </span>
        <span>
          <ClipboardCheck size={16} /> {courseAssessments.length} assessments
        </span>
        <span>Owner: {trainer.name}</span>
      </div>
      <div className="trainer-course-detail-grid">
        <article className="trainer-panel">
          <h2>Resources</h2>
          {resources.map((resource) => (
            <div className="trainer-detail-row" key={resource.id}>
              <FileText size={16} />
              <span>{resource.title}</span>
              <small>{resource.type}</small>
            </div>
          ))}
          {!resources.length && (
            <p className="trainer-muted">No resources uploaded yet.</p>
          )}
        </article>
        <article className="trainer-panel">
          <h2>Assessments</h2>
          {courseAssessments.map((assessment) => (
            <div className="trainer-detail-row" key={assessment.id}>
              <ClipboardCheck size={16} />
              <span>{assessment.title}</span>
              <small>{assessment.questions.length} questions</small>
            </div>
          ))}
          {!courseAssessments.length && (
            <p className="trainer-muted">No assessments created yet.</p>
          )}
        </article>
        <article className="trainer-panel">
          <h2>Enrolled trainees</h2>
          {courseTrainees.map((trainee) => (
            <div className="trainer-detail-row" key={trainee.id}>
              <Users size={16} />
              <span>{trainee.name}</span>
              <small>
                {trainee.learning.enrolledCourses.find(
                  (item) =>
                    item.courseId === course.id || item.title === course.title,
                )?.progress || 0}
                % complete
              </small>
            </div>
          ))}
          {!courseTrainees.length && (
            <p className="trainer-muted">No enrolled trainees yet.</p>
          )}
        </article>
      </div>
      <button
        className="trainer-secondary-button"
        onClick={() => navigate("/trainer/courses")}
      >
        Back to courses
      </button>
    </section>
  );
}
