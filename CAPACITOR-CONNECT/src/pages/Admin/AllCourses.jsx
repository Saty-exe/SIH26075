import { ArrowUpDown, Edit3, Eye, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../../components/Admin/ConfirmDialog";
import { removeCourse } from "../../features/courses/courseSlice";

const sortOptions = {
  newest: (first, second) => second.id - first.id,
  name: (first, second) => first.title.localeCompare(second.title),
  learners: (first, second) => second.enrolledTrainees - first.enrolledTrainees,
  completion: (first, second) => second.completionRate - first.completionRate,
};

export default function AllCourses() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courseReducer.courses);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [status, setStatus] = useState("All statuses");
  const [level, setLevel] = useState("All levels");
  const [sortBy, setSortBy] = useState("newest");
  const [courseToDelete, setCourseToDelete] = useState(null);
  const categories = [...new Set(courses.map((course) => course.category))];

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return courses
      .filter((course) => {
        const searchable =
          `${course.title} ${course.category} ${course.instructor} ${course.description}`.toLowerCase();
        return (
          (!query || searchable.includes(query)) &&
          (category === "All categories" || course.category === category) &&
          (status === "All statuses" || course.status === status) &&
          (level === "All levels" || course.level === level)
        );
      })
      .sort(sortOptions[sortBy]);
  }, [category, courses, level, search, sortBy, status]);

  const handleDelete = () => {
    dispatch(removeCourse(courseToDelete.id));
    setCourseToDelete(null);
  };

  return (
    <section className="course-page">
      <div className="course-page-heading">
        <div>
          <span className="course-eyebrow">Admin / Course management</span>
          <h1>All courses</h1>
          <p>
            Organize the learning catalogue and keep every course moving
            forward.
          </p>
        </div>
        <div className="course-heading-actions">
          <div className="course-summary-card">
            <span>Total courses</span>
            <strong>{courses.length}</strong>
            <small>
              {courses.filter((course) => course.status === "Published").length}{" "}
              published
            </small>
          </div>
          <Link className="course-primary-button" to="/admin/courses/create">
            <Plus size={17} /> Create course
          </Link>
        </div>
      </div>
      <div className="course-toolbar">
        <label className="course-search">
          <Search size={18} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search courses, instructors..."
            aria-label="Search courses"
          />
        </label>
        <label className="course-select-wrap">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter by category"
          >
            <option>All categories</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="course-select-wrap">
          <select
            value={level}
            onChange={(event) => setLevel(event.target.value)}
            aria-label="Filter by level"
          >
            <option>All levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>
        <label className="course-select-wrap">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Filter by status"
          >
            <option>All statuses</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Archived</option>
          </select>
        </label>
        <label className="course-select-wrap">
          <ArrowUpDown size={16} />
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort courses"
          >
            <option value="newest">Recently added</option>
            <option value="name">Name A-Z</option>
            <option value="learners">Most learners</option>
            <option value="completion">Highest completion</option>
          </select>
        </label>
      </div>
      <div className="course-results-bar">
        <strong>
          {filteredCourses.length} course
          {filteredCourses.length === 1 ? "" : "s"}
        </strong>
        <span>
          {search ||
          category !== "All categories" ||
          status !== "All statuses" ||
          level !== "All levels"
            ? "Filtered results"
            : "Full catalogue"}
        </span>
      </div>
      <div className="course-table-wrap">
        <table className="course-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Category</th>
              <th>Instructor</th>
              <th>Status</th>
              <th>Learners</th>
              <th>Completion</th>
              <th>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id}>
                <td>
                  <div className="course-identity">
                    <div className="course-icon">
                      {course.title.slice(0, 1)}
                    </div>
                    <div>
                      <strong>{course.title}</strong>
                      <span>
                        {course.level} · {course.duration}
                      </span>
                    </div>
                  </div>
                </td>
                <td>{course.category}</td>
                <td>{course.instructor}</td>
                <td>
                  <span
                    className={`course-status course-status-${course.status.toLowerCase()}`}
                  >
                    {course.status}
                  </span>
                </td>
                <td>
                  <strong>{course.enrolledTrainees}</strong>
                </td>
                <td>
                  <div className="course-progress">
                    <div>
                      <span style={{ width: `${course.completionRate}%` }} />
                    </div>
                    <strong>{course.completionRate}%</strong>
                  </div>
                </td>
                <td>
                  <div className="course-row-actions">
                    <Link
                      className="course-view-button"
                      to={`/admin/courses/${course.id}`}
                      aria-label={`View ${course.title}`}
                    >
                      <Eye size={15} /> View
                    </Link>
                    <Link
                      className="course-icon-button"
                      to={`/admin/courses/${course.id}/edit`}
                      aria-label={`Edit ${course.title}`}
                    >
                      <Edit3 size={15} />
                    </Link>
                    <button
                      className="course-icon-button course-delete-button"
                      type="button"
                      onClick={() => setCourseToDelete(course)}
                      aria-label={`Delete ${course.title}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filteredCourses.length && (
          <div className="course-empty-results">
            <h2>No courses found</h2>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
      <ConfirmDialog
        open={Boolean(courseToDelete)}
        title="Delete course?"
        message={
          courseToDelete
            ? `${courseToDelete.title} will be permanently removed from the catalogue.`
            : ""
        }
        confirmLabel="Delete course"
        onConfirm={handleDelete}
        onCancel={() => setCourseToDelete(null)}
      />
    </section>
  );
}
