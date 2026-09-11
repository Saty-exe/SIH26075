import {
  ArrowUpDown,
  Edit3,
  Eye,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDialog from "../../components/Admin/ConfirmDialog";
import {
  deleteTrainee,
  getTrainees,
} from "../../features/Trainee/traineeStore";

const sortOptions = {
  newest: (first, second) =>
    new Date(second.joinedDate) - new Date(first.joinedDate),
  oldest: (first, second) =>
    new Date(first.joinedDate) - new Date(second.joinedDate),
  name: (first, second) => first.name.localeCompare(second.name),
  performance: (first, second) =>
    second.performance.totalPerformance - first.performance.totalPerformance,
};

export default function Trainees() {
  const [trainees, setTrainees] = useState(() => getTrainees());
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [institution, setInstitution] = useState("All institutions");
  const [sortBy, setSortBy] = useState("newest");
  const [traineeToDelete, setTraineeToDelete] = useState(null);
  const institutions = [
    ...new Set(trainees.map((trainee) => trainee.institution)),
  ];

  const filteredTrainees = useMemo(() => {
    const query = search.trim().toLowerCase();
    return trainees
      .filter((trainee) => {
        const searchable = [
          trainee.name,
          trainee.email,
          trainee.qualification,
          trainee.institution,
          ...trainee.skills,
          ...trainee.interests,
        ]
          .join(" ")
          .toLowerCase();
        return (
          (!query || searchable.includes(query)) &&
          (status === "All statuses" || trainee.status === status) &&
          (institution === "All institutions" ||
            trainee.institution === institution)
        );
      })
      .sort(sortOptions[sortBy]);
  }, [institution, search, sortBy, status, trainees]);

  const handleDelete = () => {
    setTrainees(deleteTrainee(traineeToDelete.id));
    setTraineeToDelete(null);
  };

  return (
    <section className="trainee-page">
      <div className="trainee-page-heading">
        <div>
          <span className="trainee-eyebrow">Admin / User management</span>
          <h1>Trainees</h1>
          <p>
            Track learner activity, progress, and performance across the
            programme.
          </p>
        </div>
        <div className="trainee-heading-actions">
          <div className="trainee-summary-card">
            <span>Total trainees</span>
            <strong>{trainees.length}</strong>
            <small>
              {trainees.filter((trainee) => trainee.status === "Active").length}{" "}
              active now
            </small>
          </div>
          <Link className="trainee-primary-button" to="/admin/trainees/new">
            <Plus size={17} /> Add trainee
          </Link>
        </div>
      </div>
      <div className="trainee-toolbar">
        <label className="trainee-search">
          <Search size={18} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, skill, institution..."
            aria-label="Search trainees"
          />
        </label>
        <label className="trainee-select-wrap">
          <SlidersHorizontal size={16} />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Filter by status"
          >
            <option>All statuses</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Inactive</option>
          </select>
        </label>
        <label className="trainee-select-wrap">
          <select
            value={institution}
            onChange={(event) => setInstitution(event.target.value)}
            aria-label="Filter by institution"
          >
            <option>All institutions</option>
            {institutions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="trainee-select-wrap">
          <ArrowUpDown size={16} />
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort trainees"
          >
            <option value="newest">Newest joined</option>
            <option value="oldest">Oldest joined</option>
            <option value="name">Name A-Z</option>
            <option value="performance">Highest performance</option>
          </select>
        </label>
      </div>
      <div className="trainee-results-bar">
        <strong>
          {filteredTrainees.length} trainee
          {filteredTrainees.length === 1 ? "" : "s"}
        </strong>
        <span>
          {search ||
          status !== "All statuses" ||
          institution !== "All institutions"
            ? "Filtered results"
            : "All registered trainees"}
        </span>
      </div>
      <div className="trainee-table-wrap">
        <table className="trainee-table">
          <thead>
            <tr>
              <th>Trainee</th>
              <th>Education</th>
              <th>Status</th>
              <th>Performance</th>
              <th>Progress</th>
              <th>Joined</th>
              <th>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainees.map((trainee) => (
              <tr key={trainee.id}>
                <td>
                  <div className="trainee-identity">
                    <div className="trainee-avatar">
                      {trainee.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <strong>{trainee.name}</strong>
                      <span>{trainee.email}</span>
                      <small>{trainee.phone}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="trainee-expertise">
                    <strong>{trainee.qualification}</strong>
                    <span>{trainee.institution}</span>
                  </div>
                </td>
                <td>
                  <span
                    className={`trainee-status trainee-status-${trainee.status.toLowerCase()}`}
                  >
                    {trainee.status}
                  </span>
                </td>
                <td>
                  <strong>{trainee.performance.totalPerformance}%</strong>
                  <span className="trainee-table-subtext">
                    {trainee.performance.assessmentsCompleted}/
                    {trainee.performance.assessmentsTotal} assessments
                  </span>
                </td>
                <td>
                  <div className="trainee-progress">
                    <div>
                      <span
                        style={{
                          width: `${trainee.performance.completionRate}%`,
                        }}
                      />
                    </div>
                    <strong>{trainee.performance.completionRate}%</strong>
                  </div>
                </td>
                <td>{trainee.joinedDate}</td>
                <td>
                  <div className="trainee-row-actions">
                    <Link
                      className="trainee-view-button"
                      to={`/admin/trainees/${trainee.id}`}
                      aria-label={`View ${trainee.name}`}
                    >
                      <Eye size={16} /> View
                    </Link>
                    <Link
                      className="trainee-icon-button"
                      to={`/admin/trainees/${trainee.id}/edit`}
                      aria-label={`Edit ${trainee.name}`}
                    >
                      <Edit3 size={15} />
                    </Link>
                    <button
                      className="trainee-icon-button trainee-delete-button"
                      type="button"
                      onClick={() => setTraineeToDelete(trainee)}
                      aria-label={`Delete ${trainee.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filteredTrainees.length && (
          <div className="trainee-empty-results">
            <h2>No trainees found</h2>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
      <ConfirmDialog
        open={Boolean(traineeToDelete)}
        title="Delete trainee?"
        message={
          traineeToDelete
            ? `${traineeToDelete.name} will be permanently removed from the trainee directory.`
            : ""
        }
        confirmLabel="Delete trainee"
        onConfirm={handleDelete}
        onCancel={() => setTraineeToDelete(null)}
      />
    </section>
  );
}
