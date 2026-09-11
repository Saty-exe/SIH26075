import { ArrowUpDown, BookOpen, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTrainees } from "../../features/Trainee/traineeStore";

const sortOptions = {
  newest: (first, second) =>
    new Date(second.enrolledDate) - new Date(first.enrolledDate),
  oldest: (first, second) =>
    new Date(first.enrolledDate) - new Date(second.enrolledDate),
  progress: (first, second) => second.progress - first.progress,
  trainee: (first, second) =>
    first.traineeName.localeCompare(second.traineeName),
};

function getEnrollments(courses) {
  return getTrainees().flatMap((trainee) =>
    trainee.learning.enrolledCourses.map((enrollment) => {
      const course = courses.find((item) => item.id === enrollment.courseId);
      return {
        id: `${trainee.id}-${enrollment.courseId}`,
        traineeId: trainee.id,
        traineeName: trainee.name,
        traineeEmail: trainee.email,
        courseId: enrollment.courseId,
        courseTitle: course?.title || enrollment.title,
        category: course?.category || "Learning programme",
        progress: enrollment.progress,
        status: enrollment.status,
        enrolledDate: trainee.joinedDate,
      };
    }),
  );
}

export default function Enrollments() {
  const courses = useSelector((state) => state.courseReducer.courses);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [progress, setProgress] = useState("All progress");
  const [sortBy, setSortBy] = useState("newest");
  const enrollments = useMemo(() => getEnrollments(courses), [courses]);
  const filteredEnrollments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return enrollments
      .filter((enrollment) => {
        const searchable =
          `${enrollment.traineeName} ${enrollment.traineeEmail} ${enrollment.courseTitle} ${enrollment.category}`.toLowerCase();
        const progressMatch =
          progress === "All progress" ||
          (progress === "Not started" && enrollment.progress === 0) ||
          (progress === "In progress" &&
            enrollment.progress > 0 &&
            enrollment.progress < 100) ||
          (progress === "Completed" && enrollment.progress === 100);
        return (
          (!query || searchable.includes(query)) &&
          (status === "All statuses" || enrollment.status === status) &&
          progressMatch
        );
      })
      .sort(sortOptions[sortBy]);
  }, [enrollments, progress, search, sortBy, status]);
  const completed = enrollments.filter((item) => item.progress === 100).length;
  const inProgress = enrollments.filter(
    (item) => item.progress > 0 && item.progress < 100,
  ).length;
  const averageProgress = enrollments.length
    ? Math.round(
        enrollments.reduce((sum, item) => sum + item.progress, 0) /
          enrollments.length,
      )
    : 0;

  return (
    <section className="enrollment-page">
      <div className="enrollment-page-heading">
        <div>
          <span className="enrollment-eyebrow">
            Admin / Learning operations
          </span>
          <h1>Enrollments</h1>
          <p>
            Monitor how trainees join, progress through, and complete courses.
          </p>
        </div>
        <div className="enrollment-summary-grid">
          <div>
            <Users size={17} />
            <span>Active records</span>
            <strong>{enrollments.length}</strong>
          </div>
          <div>
            <BookOpen size={17} />
            <span>Avg. progress</span>
            <strong>{averageProgress}%</strong>
          </div>
        </div>
      </div>
      <div className="enrollment-metric-row">
        <div>
          <span>In progress</span>
          <strong>{inProgress}</strong>
          <small>enrollments</small>
        </div>
        <div>
          <span>Completed</span>
          <strong>{completed}</strong>
          <small>enrollments</small>
        </div>
        <div>
          <span>Completion rate</span>
          <strong>
            {enrollments.length
              ? Math.round((completed / enrollments.length) * 100)
              : 0}
            %
          </strong>
          <small>of records</small>
        </div>
      </div>
      <div className="enrollment-toolbar">
        <label className="enrollment-search">
          <Search size={18} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search trainee or course..."
            aria-label="Search enrollments"
          />
        </label>
        <label className="enrollment-select-wrap">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Filter enrollment status"
          >
            <option>All statuses</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </label>
        <label className="enrollment-select-wrap">
          <select
            value={progress}
            onChange={(event) => setProgress(event.target.value)}
            aria-label="Filter progress"
          >
            <option>All progress</option>
            <option>Not started</option>
            <option>In progress</option>
            <option>Completed</option>
          </select>
        </label>
        <label className="enrollment-select-wrap">
          <ArrowUpDown size={16} />
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort enrollments"
          >
            <option value="newest">Newest joined</option>
            <option value="oldest">Oldest joined</option>
            <option value="progress">Highest progress</option>
            <option value="trainee">Trainee A-Z</option>
          </select>
        </label>
      </div>
      <div className="enrollment-results-bar">
        <strong>
          {filteredEnrollments.length} enrollment
          {filteredEnrollments.length === 1 ? "" : "s"}
        </strong>
        <span>
          {search || status !== "All statuses" || progress !== "All progress"
            ? "Filtered records"
            : "All learner enrollments"}
        </span>
      </div>
      <div className="enrollment-table-wrap">
        <table className="enrollment-table">
          <thead>
            <tr>
              <th>Trainee</th>
              <th>Course</th>
              <th>Enrolled</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnrollments.map((enrollment) => (
              <tr key={enrollment.id}>
                <td>
                  <div className="enrollment-person">
                    <div className="enrollment-avatar">
                      {enrollment.traineeName
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <strong>{enrollment.traineeName}</strong>
                      <span>{enrollment.traineeEmail}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="enrollment-course">
                    <strong>{enrollment.courseTitle}</strong>
                    <span>{enrollment.category}</span>
                  </div>
                </td>
                <td>{enrollment.enrolledDate}</td>
                <td>
                  <span
                    className={`enrollment-status enrollment-status-${enrollment.status.toLowerCase().replace(" ", "-")}`}
                  >
                    {enrollment.status}
                  </span>
                </td>
                <td>
                  <div className="enrollment-progress">
                    <div>
                      <span style={{ width: `${enrollment.progress}%` }} />
                    </div>
                    <strong>{enrollment.progress}%</strong>
                  </div>
                </td>
                <td>
                  <div className="enrollment-actions">
                    <Link to={`/admin/trainees/${enrollment.traineeId}`}>
                      Trainee
                    </Link>
                    {courses.some(
                      (course) => course.id === enrollment.courseId,
                    ) && (
                      <Link to={`/admin/courses/${enrollment.courseId}`}>
                        Course
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filteredEnrollments.length && (
          <div className="enrollment-empty">
            <h2>No enrollments found</h2>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
