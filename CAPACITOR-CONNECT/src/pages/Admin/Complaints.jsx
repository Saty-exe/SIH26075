import { AlertCircle, CheckCircle2, Search } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComplaintStatus } from "../../features/complaints/complaintSlice";

export default function Complaints() {
  const dispatch = useDispatch();
  const complaints = useSelector((state) => state.complaintReducer.complaints);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const visibleComplaints = complaints.filter(
    (complaint) =>
      (!search ||
        `${complaint.subject} ${complaint.reporter} ${complaint.category}`
          .toLowerCase()
          .includes(search.toLowerCase())) &&
      (status === "All statuses" || complaint.status === status),
  );

  return (
    <section className="complaints-page">
      <div className="complaints-heading">
        <div>
          <span className="complaints-eyebrow">Admin / Support operations</span>
          <h1>Complaints</h1>
          <p>
            Capture issues from connected portals and move every case toward
            resolution.
          </p>
        </div>
        <div className="complaints-summary">
          <div>
            <span>Open cases</span>
            <strong>
              {complaints.filter((item) => item.status === "Open").length}
            </strong>
          </div>
          <div>
            <span>In review</span>
            <strong>
              {complaints.filter((item) => item.status === "In review").length}
            </strong>
          </div>
          <div>
            <span>Resolved</span>
            <strong>
              {complaints.filter((item) => item.status === "Resolved").length}
            </strong>
          </div>
        </div>
      </div>
      <div className="complaints-toolbar">
        <label className="complaints-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search subject, reporter, category..."
            aria-label="Search complaints"
          />
        </label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label="Filter complaints"
        >
          <option>All statuses</option>
          <option>Open</option>
          <option>In review</option>
          <option>Resolved</option>
        </select>
      </div>
      <div className="complaint-list">
        {visibleComplaints.map((complaint) => (
          <article className="complaint-card" key={complaint.id}>
            <div className="complaint-card-icon">
              {complaint.status === "Resolved" ? (
                <CheckCircle2 size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
            </div>
            <div className="complaint-content">
              <div className="complaint-card-heading">
                <div>
                  <span className="complaint-category">
                    {complaint.category} · {complaint.role}
                  </span>
                  <h2>{complaint.subject}</h2>
                </div>
                <span
                  className={`complaint-priority complaint-priority-${complaint.priority.toLowerCase()}`}
                >
                  {complaint.priority}
                </span>
              </div>
              <p>{complaint.description}</p>
              <div className="complaint-meta">
                <span>
                  Reported by <strong>{complaint.reporter}</strong>
                </span>
                <span>{complaint.createdAt}</span>
                <select
                  value={complaint.status}
                  onChange={(event) =>
                    dispatch(
                      updateComplaintStatus({
                        id: complaint.id,
                        status: event.target.value,
                      }),
                    )
                  }
                  aria-label={`Update status for ${complaint.subject}`}
                >
                  <option>Open</option>
                  <option>In review</option>
                  <option>Resolved</option>
                </select>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!visibleComplaints.length && (
        <div className="complaints-empty">
          <h2>No complaints found</h2>
          <p>Try adjusting your search or status filter.</p>
        </div>
      )}
    </section>
  );
}
