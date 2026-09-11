import { ArrowLeft, Edit3, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../components/Admin/ConfirmDialog";
import { removeCourse } from "../../features/courses/courseSlice";
import { useState } from "react";

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const course = useSelector((state) =>
    state.courseReducer.courses.find((item) => String(item.id) === courseId),
  );

  if (!course)
    return (
      <section className="course-page course-empty-state">
        <h1>Course not found</h1>
        <p>The course record may have been removed or the link is invalid.</p>
        <Link className="course-secondary-button" to="/admin/courses">
          Back to courses
        </Link>
      </section>
    );

  const handleDelete = () => {
    dispatch(removeCourse(course.id));
    navigate("/admin/courses");
  };

  return (
    <section className="course-page course-details-page">
      <Link className="course-back-link" to="/admin/courses">
        <ArrowLeft size={16} /> Back to courses
      </Link>
      <div className="course-detail-hero">
        <div className="course-icon course-icon-large">
          {course.title.slice(0, 1)}
        </div>
        <div className="course-detail-heading">
          <div className="course-title-row">
            <div>
              <span className="course-eyebrow">Course profile</span>
              <h1>{course.title}</h1>
            </div>
            <span
              className={`course-status course-status-${course.status.toLowerCase()}`}
            >
              {course.status}
            </span>
          </div>
          <p>{course.description}</p>
          <div className="course-detail-actions">
            <Link
              className="course-secondary-button"
              to={`/admin/courses/${course.id}/edit`}
            >
              <Edit3 size={15} /> Edit course
            </Link>
            <button
              className="course-danger-button"
              type="button"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 size={15} /> Delete course
            </button>
          </div>
        </div>
      </div>
      <div className="course-detail-grid">
        <section className="course-panel">
          <span className="course-eyebrow">Course information</span>
          <h2>Overview</h2>
          <div className="course-info-grid">
            <div>
              <span>Category</span>
              <strong>{course.category}</strong>
            </div>
            <div>
              <span>Level</span>
              <strong>{course.level}</strong>
            </div>
            <div>
              <span>Instructor</span>
              <strong>{course.instructor}</strong>
            </div>
            <div>
              <span>Duration</span>
              <strong>{course.duration}</strong>
            </div>
            <div>
              <span>Enrolled trainees</span>
              <strong>{course.enrolledTrainees}</strong>
            </div>
            <div>
              <span>Completion rate</span>
              <strong>{course.completionRate}%</strong>
            </div>
          </div>
        </section>
      </div>
      <ConfirmDialog
        open={deleteOpen}
        title="Delete course?"
        message={`${course.title} will be permanently removed from the catalogue.`}
        confirmLabel="Delete course"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </section>
  );
}
