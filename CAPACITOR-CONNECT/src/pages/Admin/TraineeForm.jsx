import { ArrowLeft, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createTrainee,
  getTraineeById,
  updateTrainee,
} from "../../features/Trainee/traineeStore";

const traineeSchema = z.object({
  name: z.string().trim().min(2, "Enter the trainee's full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(7, "Enter a valid phone number."),
  status: z.enum(["Active", "Pending", "Inactive"]),
  qualification: z.string().trim().min(2, "Enter a qualification."),
  institution: z.string().trim().min(2, "Enter an institution."),
  workExperience: z.coerce.number().min(0, "Experience cannot be negative."),
  joinedDate: z.string(),
  skills: z.string(),
  interests: z.string(),
});

function initialValues(trainee) {
  return {
    name: trainee?.name || "",
    email: trainee?.email || "",
    phone: trainee?.phone || "",
    status: trainee?.status || "Pending",
    qualification: trainee?.qualification || "",
    institution: trainee?.institution || "",
    workExperience: trainee?.workExperience || "",
    joinedDate: trainee?.joinedDate || "",
    skills: trainee?.skills?.join(", ") || "",
    interests: trainee?.interests?.join(", ") || "",
    learning: trainee?.learning,
    performance: trainee?.performance,
    activity: trainee?.activity,
  };
}

function Field({ label, name, register, error, type = "text" }) {
  return (
    <label className="trainee-form-field">
      <span>
        {label}
        {error && (
          <small className="trainee-field-error">{error.message}</small>
        )}
      </span>
      <input {...register(name)} type={type} />
    </label>
  );
}

export default function TraineeForm() {
  const { traineeId } = useParams();
  const navigate = useNavigate();
  const trainee = traineeId ? getTraineeById(traineeId) : null;
  const isEditing = Boolean(traineeId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(traineeSchema),
    defaultValues: initialValues(trainee),
  });

  const onSubmit = (values) => {
    if (isEditing && !trainee) return;
    const savedTrainee = isEditing
      ? updateTrainee(traineeId, values)
      : createTrainee(values);
    navigate(`/admin/trainees/${savedTrainee.id}`);
  };

  return (
    <section className="trainee-page trainee-form-page">
      <Link className="trainee-back-link" to="/admin/trainees">
        <ArrowLeft size={16} /> Back to trainees
      </Link>
      <div className="trainee-form-heading">
        <span className="trainee-eyebrow">Admin / User management</span>
        <h1>{isEditing ? "Edit trainee" : "Add trainee"}</h1>
        <p>
          {isEditing
            ? "Update the trainee record and learning profile."
            : "Create a complete trainee profile for your learning network."}
        </p>
      </div>
      <form
        className="trainee-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <section className="trainee-form-section">
          <div className="trainee-panel-heading">
            <div>
              <span className="trainee-eyebrow">Identity</span>
              <h2>Basic information</h2>
            </div>
          </div>
          <div className="trainee-form-grid">
            <Field
              label="Full name"
              name="name"
              register={register}
              error={errors.name}
            />
            <Field
              label="Email address"
              name="email"
              type="email"
              register={register}
              error={errors.email}
            />
            <Field
              label="Phone number"
              name="phone"
              register={register}
              error={errors.phone}
            />
            <Field
              label="Joined date"
              name="joinedDate"
              type="date"
              register={register}
              error={errors.joinedDate}
            />
            <label className="trainee-form-field">
              <span>Status</span>
              <select {...register("status")}>
                <option>Active</option>
                <option>Pending</option>
                <option>Inactive</option>
              </select>
            </label>
          </div>
        </section>
        <section className="trainee-form-section">
          <div className="trainee-panel-heading">
            <div>
              <span className="trainee-eyebrow">Education</span>
              <h2>Academic profile</h2>
            </div>
          </div>
          <div className="trainee-form-grid">
            <Field
              label="Qualification"
              name="qualification"
              register={register}
              error={errors.qualification}
            />
            <Field
              label="Institution"
              name="institution"
              register={register}
              error={errors.institution}
            />
            <Field
              label="Work experience in years"
              name="workExperience"
              type="number"
              register={register}
              error={errors.workExperience}
            />
            <label className="trainee-form-field trainee-form-field-wide">
              <span>
                Skills <small>Separate items with commas</small>
              </span>
              <input
                {...register("skills")}
                placeholder="JavaScript, React, Git"
              />
            </label>
            <label className="trainee-form-field trainee-form-field-wide">
              <span>
                Interests <small>Separate items with commas</small>
              </span>
              <input
                {...register("interests")}
                placeholder="Web Development, Cloud Computing"
              />
            </label>
          </div>
        </section>
        {isEditing && !trainee && (
          <p className="trainee-form-error">This trainee could not be found.</p>
        )}
        <div className="trainee-form-actions">
          <Link className="trainee-secondary-button" to="/admin/trainees">
            Cancel
          </Link>
          <button className="trainee-primary-button" type="submit">
            <Save size={16} /> {isEditing ? "Save changes" : "Add trainee"}
          </button>
        </div>
      </form>
    </section>
  );
}
