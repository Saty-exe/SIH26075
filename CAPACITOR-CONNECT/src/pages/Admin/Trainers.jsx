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
  deleteTrainer,
  getTrainers,
} from "../../features/Trainer/trainerStore";

const sortOptions = {
  newest: (first, second) =>
    new Date(second.joinedDate) - new Date(first.joinedDate),
  oldest: (first, second) =>
    new Date(first.joinedDate) - new Date(second.joinedDate),
  name: (first, second) => first.name.localeCompare(second.name),
  courses: (first, second) =>
    second.performance.totalCourses - first.performance.totalCourses,
};

export default function Trainers() {
  const [trainers, setTrainers] = useState(() => getTrainers());
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [location, setLocation] = useState("All locations");
  const [sortBy, setSortBy] = useState("newest");
  const [trainerToDelete, setTrainerToDelete] = useState(null);

  const locations = [
    ...new Set(trainers.map((trainer) => trainer.profile.location)),
  ];

  const filteredTrainers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return trainers
      .filter((trainer) => {
        const searchable = [
          trainer.name,
          trainer.email,
          trainer.profile.designation,
          trainer.profile.organization,
          trainer.profile.location,
          ...trainer.skills,
          ...trainer.subjects,
        ]
          .join(" ")
          .toLowerCase();

        return (
          (!query || searchable.includes(query)) &&
          (status === "All statuses" || trainer.status === status) &&
          (location === "All locations" ||
            trainer.profile.location === location)
        );
      })
      .sort(sortOptions[sortBy]);
  }, [location, search, sortBy, status]);

  const handleDelete = () => {
    setTrainers(deleteTrainer(trainerToDelete.id));
    setTrainerToDelete(null);
  };

  return (
    <section className="trainer-page">
      <div className="trainer-page-heading">
        <div>
          <span className="trainer-eyebrow">Admin / User management</span>
          <h1>Trainers</h1>
          <p>
            Review your training network, monitor activity, and open complete
            profiles.
          </p>
        </div>
        <div className="trainer-heading-actions">
          <div className="trainer-summary-card">
            <span>Total trainers</span>
            <strong>{trainers.length}</strong>
            <small>
              {trainers.filter((trainer) => trainer.status === "Active").length}{" "}
              active now
            </small>
          </div>
          <Link className="trainer-primary-button" to="/admin/trainers/new">
            <Plus size={17} /> Add trainer
          </Link>
        </div>
      </div>

      <div className="trainer-toolbar">
        <label className="trainer-search">
          <Search size={18} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, skill, organization..."
            aria-label="Search trainers"
          />
        </label>
        <label className="trainer-select-wrap">
          <SlidersHorizontal size={16} />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Filter by status"
          >
            <option>All statuses</option>
            <option>Active</option>
            <option>Pending</option>
          </select>
        </label>
        <label className="trainer-select-wrap">
          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            aria-label="Filter by location"
          >
            <option>All locations</option>
            {locations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="trainer-select-wrap">
          <ArrowUpDown size={16} />
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort trainers"
          >
            <option value="newest">Newest joined</option>
            <option value="oldest">Oldest joined</option>
            <option value="name">Name A-Z</option>
            <option value="courses">Most courses</option>
          </select>
        </label>
      </div>

      <div className="trainer-results-bar">
        <strong>
          {filteredTrainers.length} trainer
          {filteredTrainers.length === 1 ? "" : "s"}
        </strong>
        <span>
          {search || status !== "All statuses" || location !== "All locations"
            ? "Filtered results"
            : "All registered trainers"}
        </span>
      </div>

      <div className="trainer-table-wrap">
        <table className="trainer-table">
          <thead>
            <tr>
              <th>Trainer</th>
              <th>Expertise</th>
              <th>Location</th>
              <th>Status</th>
              <th>Courses</th>
              <th>Joined</th>
              <th>
                <span className="sr-only">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainers.map((trainer) => (
              <tr key={trainer.id}>
                <td>
                  <div className="trainer-identity">
                    <div className="trainer-avatar">
                      {trainer.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <strong>{trainer.name}</strong>
                      <span>{trainer.profile.designation}</span>
                      <small>{trainer.email}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="trainer-expertise">
                    <strong>{trainer.subjects[0]}</strong>
                    <span>{trainer.skills.slice(0, 2).join(" · ")}</span>
                  </div>
                </td>
                <td>{trainer.profile.location}</td>
                <td>
                  <span
                    className={`trainer-status trainer-status-${trainer.status.toLowerCase()}`}
                  >
                    {trainer.status}
                  </span>
                </td>
                <td>
                  <strong>{trainer.performance.totalCourses}</strong>
                  <span className="trainer-table-subtext">
                    {trainer.performance.totalTrainees} trainees
                  </span>
                </td>
                <td>{trainer.joinedDate}</td>
                <td>
                  <div className="trainer-row-actions">
                    <Link
                      className="trainer-view-button"
                      to={`/admin/trainers/${trainer.id}`}
                      aria-label={`View ${trainer.name}`}
                    >
                      <Eye size={16} /> View
                    </Link>
                    <Link
                      className="trainer-icon-button"
                      to={`/admin/trainers/${trainer.id}/edit`}
                      aria-label={`Edit ${trainer.name}`}
                    >
                      <Edit3 size={15} />
                    </Link>
                    <button
                      className="trainer-icon-button trainer-delete-button"
                      type="button"
                      onClick={() => setTrainerToDelete(trainer)}
                      aria-label={`Delete ${trainer.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filteredTrainers.length && (
          <div className="trainer-empty-results">
            <h2>No trainers found</h2>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
      <ConfirmDialog
        open={Boolean(trainerToDelete)}
        title="Delete trainer?"
        message={
          trainerToDelete
            ? `${trainerToDelete.name} will be permanently removed from the trainer directory.`
            : ""
        }
        confirmLabel="Delete trainer"
        onConfirm={handleDelete}
        onCancel={() => setTrainerToDelete(null)}
      />
    </section>
  );
}
