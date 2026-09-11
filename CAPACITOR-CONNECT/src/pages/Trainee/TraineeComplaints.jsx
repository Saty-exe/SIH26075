import {
  AlertCircle,
  CheckCircle2,
  MessageSquareWarning,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addComplaint } from "../../features/complaints/complaintSlice";
import { selectCurrentTrainee } from "../../features/Trainee/traineeSelectors";

const initialValues = {
  subject: "",
  category: "Course progress",
  priority: "Medium",
  description: "",
};

export default function TraineeComplaints() {
  const dispatch = useDispatch();
  const trainee = useSelector(selectCurrentTrainee);
  const complaints = useSelector((state) => state.complaintReducer.complaints);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const myComplaints = complaints
    .filter(
      (complaint) =>
        complaint.traineeId === trainee.id ||
        (complaint.role === "Trainee" && complaint.reporter === trainee.name),
    )
    .filter((complaint) =>
      `${complaint.subject} ${complaint.category}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  const submit = (values) => {
    dispatch(
      addComplaint({
        ...values,
        id: `TR-${trainee.id}-${values.subject
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}`,
        traineeId: trainee.id,
        reporter: trainee.name,
        role: "Trainee",
        status: "Open",
        createdAt: new Date().toISOString().slice(0, 10),
      }),
    );
    reset(initialValues);
    setShowForm(false);
  };

  return (
    <section className="trainee-page">
      <div className="trainee-page-intro">
        <div>
          <span className="trainee-eyebrow">Support centre</span>
          <h1>Complaints</h1>
          <p>
            Report a learning issue and follow its progress with the Capacity
            Connect support team.
          </p>
        </div>
        <button
          className="trainee-primary-button"
          onClick={() => setShowForm((value) => !value)}
        >
          <Plus size={16} /> {showForm ? "Close form" : "New complaint"}
        </button>
      </div>
      {showForm && (
        <form
          className="trainee-complaint-form trainee-panel"
          onSubmit={handleSubmit(submit)}
        >
          <div className="trainee-complaint-form-heading">
            <div>
              <h2>Tell us what happened</h2>
              <p>
                Include enough detail for the support team to investigate
                quickly.
              </p>
            </div>
            <MessageSquareWarning size={22} />
          </div>
          <div className="trainee-form-grid">
            <label>
              Subject
              <input
                {...register("subject", { required: "Add a subject" })}
                placeholder="e.g. Assessment will not open"
              />
              {errors.subject && <small>{errors.subject.message}</small>}
            </label>
            <label>
              Category
              <select {...register("category")}>
                <option>Course progress</option>
                <option>Assessment</option>
                <option>Course content</option>
                <option>Certification</option>
                <option>Account access</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Priority
              <select {...register("priority")}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>
            <label className="trainee-complaint-description">
              Description
              <textarea
                {...register("description", { required: "Add a description" })}
                placeholder="Describe the issue and what you have already tried."
              />
              {errors.description && (
                <small>{errors.description.message}</small>
              )}
            </label>
          </div>
          <div className="trainee-complaint-actions">
            <button
              type="button"
              className="trainee-outline-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button className="trainee-primary-button" type="submit">
              Submit complaint
            </button>
          </div>
        </form>
      )}
      <div className="trainee-complaints-toolbar">
        <div>
          <h2>My complaints</h2>
          <span>{myComplaints.length} cases submitted</span>
        </div>
        <label className="trainee-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search complaints..."
            aria-label="Search complaints"
          />
        </label>
      </div>
      <div className="trainee-complaint-list">
        {myComplaints.map((complaint) => (
          <article className="trainee-complaint-card" key={complaint.id}>
            <div
              className={`trainee-complaint-icon trainee-complaint-icon-${complaint.status.toLowerCase().replace(" ", "-")}`}
            >
              {complaint.status === "Resolved" ? (
                <CheckCircle2 size={19} />
              ) : (
                <AlertCircle size={19} />
              )}
            </div>
            <div className="trainee-complaint-copy">
              <div>
                <span>{complaint.category}</span>
                <h2>{complaint.subject}</h2>
              </div>
              <span
                className={`trainee-complaint-status trainee-complaint-status-${complaint.status.toLowerCase().replace(" ", "-")}`}
              >
                {complaint.status}
              </span>
              <p>{complaint.description}</p>
              <small>
                Submitted {complaint.createdAt} · {complaint.priority} priority
              </small>
            </div>
          </article>
        ))}
      </div>
      {!myComplaints.length && (
        <div className="trainee-empty">
          <MessageSquareWarning size={23} />
          <strong>No complaints found</strong>
          <span>
            Submit a complaint when you need help with your learning experience.
          </span>
        </div>
      )}
    </section>
  );
}
