import { ArrowLeft, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createTrainer,
  getTrainerById,
  updateTrainer,
} from "../../features/Trainer/trainerStore";

function getInitialValues(trainer) {
  return {
    name: trainer?.name || "",
    email: trainer?.email || "",
    phone: trainer?.phone || "",
    status: trainer?.status || "Pending",
    designation: trainer?.profile.designation || "",
    organization: trainer?.profile.organization || "",
    qualification: trainer?.profile.qualification || "",
    experience: trainer?.profile.experience || "",
    location: trainer?.profile.location || "",
    bio: trainer?.profile.bio || "",
    skills: trainer?.skills?.join(", ") || "",
    subjects: trainer?.subjects?.join(", ") || "",
    interests: trainer?.interests?.join(", ") || "",
    joinedDate: trainer?.joinedDate || "",
    courses: trainer?.courses || [],
    performance: trainer?.performance,
    activity: trainer?.activity,
    questionnaires: trainer?.questionnaires,
  };
}

const trainerSchema = z.object({
  name: z.string().trim().min(2, "Enter the trainer's full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(7, "Enter a valid phone number."),
  status: z.enum(["Active", "Pending"]),
  designation: z.string().trim().min(2, "Enter a designation."),
  organization: z.string().trim().min(2, "Enter an organization."),
  qualification: z.string().trim().min(2, "Enter a qualification."),
  experience: z.coerce.number().min(0, "Experience cannot be negative."),
  location: z.string().trim().min(2, "Enter a location."),
  bio: z.string().trim().min(20, "Biography must be at least 20 characters."),
  skills: z.string(),
  subjects: z.string(),
  interests: z.string(),
  joinedDate: z.string(),
});

function Field({ label, name, register, error, type = "text" }) {
  return (
    <label className="trainer-form-field">
      <span>
        {label}
        {error && (
          <small className="trainer-field-error">{error.message}</small>
        )}
      </span>
      <input {...register(name)} type={type} />
    </label>
  );
}

export default function TrainerForm() {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const editingTrainer = trainerId ? getTrainerById(trainerId) : null;

  const isEditing = Boolean(trainerId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(trainerSchema),
    defaultValues: getInitialValues(editingTrainer),
  });

  const onSubmit = (values) => {
    if (isEditing && !editingTrainer) {
      return;
    }

    const trainer = isEditing
      ? updateTrainer(trainerId, values)
      : createTrainer(values);

    navigate(`/admin/trainers/${trainer.id}`);
  };

  return (
    <section className="trainer-page trainer-form-page">
      <Link className="trainer-back-link" to="/admin/trainers">
        <ArrowLeft size={16} /> Back to trainers
      </Link>
      <div className="trainer-form-heading">
        <span className="trainer-eyebrow">Admin / User management</span>
        <h1>{isEditing ? "Edit trainer" : "Add trainer"}</h1>
        <p>
          {isEditing
            ? "Update the trainer record and professional profile."
            : "Create a complete trainer profile for your learning network."}
        </p>
      </div>

      <form
        className="trainer-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <section className="trainer-form-section">
          <div className="trainer-panel-heading">
            <div>
              <span className="trainer-eyebrow">Identity</span>
              <h2>Basic information</h2>
            </div>
          </div>
          <div className="trainer-form-grid">
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
              label="Location"
              name="location"
              register={register}
              error={errors.location}
            />
            <label className="trainer-form-field">
              <span>Status</span>
              <select name="status" {...register("status")}>
                <option>Active</option>
                <option>Pending</option>
              </select>
            </label>
            <Field
              label="Joined date"
              name="joinedDate"
              type="date"
              register={register}
              error={errors.joinedDate}
            />
          </div>
        </section>

        <section className="trainer-form-section">
          <div className="trainer-panel-heading">
            <div>
              <span className="trainer-eyebrow">Professional profile</span>
              <h2>Experience and expertise</h2>
            </div>
          </div>
          <div className="trainer-form-grid">
            <Field
              label="Designation"
              name="designation"
              register={register}
              error={errors.designation}
            />
            <Field
              label="Organization"
              name="organization"
              register={register}
              error={errors.organization}
            />
            <Field
              label="Qualification"
              name="qualification"
              register={register}
              error={errors.qualification}
            />
            <Field
              label="Years of experience"
              name="experience"
              type="number"
              register={register}
              error={errors.experience}
            />
            <label className="trainer-form-field trainer-form-field-wide">
              <span>
                Skills <small>Separate items with commas</small>
              </span>
              <input
                {...register("skills")}
                placeholder="React, Node.js, Cloud Computing"
              />
            </label>
            <label className="trainer-form-field trainer-form-field-wide">
              <span>
                Subjects <small>Separate items with commas</small>
              </span>
              <input
                {...register("subjects")}
                placeholder="Web Development, Software Engineering"
              />
            </label>
            <label className="trainer-form-field trainer-form-field-wide">
              <span>
                Interests <small>Separate items with commas</small>
              </span>
              <input
                {...register("interests")}
                placeholder="Research, Education, Technology"
              />
            </label>
            <label className="trainer-form-field trainer-form-field-wide">
              <span>Biography</span>
              <textarea {...register("bio")} rows="5" />
              {errors.bio && (
                <small className="trainer-field-error trainer-field-error-block">
                  {errors.bio.message}
                </small>
              )}
            </label>
          </div>
        </section>

        {isEditing && !editingTrainer && (
          <p className="trainer-form-error">This trainer could not be found.</p>
        )}
        <div className="trainer-form-actions">
          <Link className="trainer-secondary-button" to="/admin/trainers">
            Cancel
          </Link>
          <button className="trainer-primary-button" type="submit">
            <Save size={16} /> {isEditing ? "Save changes" : "Add trainer"}
          </button>
        </div>
      </form>
    </section>
  );
}
