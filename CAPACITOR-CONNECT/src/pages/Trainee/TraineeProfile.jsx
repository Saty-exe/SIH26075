import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import { updateTrainee } from "../../features/Trainee/tranieeSlice";
import useTraineeData from "./hooks/useTraineeData";
import { formatDate, initials } from "./utils/traineeFormatters";
import { Detail, PageIntro } from "./components/PortalComponents";

export default function TraineeProfile() {
  const { trainee } = useTraineeData();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...trainee,
      skills: trainee.skills.join(", "),
      interests: trainee.interests.join(", "),
    },
  });
  const save = (values) => {
    dispatch(
      updateTrainee({
        id: trainee.id,
        ...values,
        workExperience: Number(values.workExperience),
        skills: values.skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        interests: values.interests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      }),
    );
    setEditing(false);
  };
  return (
    <section className="trainee-page">
      <PageIntro
        eyebrow="Account"
        title="My profile"
        description="Keep your learner profile current so recommendations stay relevant."
        action={
          <button
            className="trainee-outline-button"
            onClick={() => setEditing((value) => !value)}
          >
            <Pencil size={15} /> {editing ? "Cancel editing" : "Edit profile"}
          </button>
        }
      />
      <div className="trainee-profile-grid">
        <article className="trainee-profile-card trainee-profile-summary">
          <div className="trainee-profile-avatar">{initials(trainee.name)}</div>
          <h2>{trainee.name}</h2>
          <p>{trainee.qualification}</p>
          <span className="trainee-active-pill">
            <span /> {trainee.status}
          </span>
          <div className="trainee-profile-summary-meta">
            <span>
              <CalendarDays size={15} /> Joined {formatDate(trainee.joinedDate)}
            </span>
            <span>
              <MapPin size={15} /> {trainee.institution}
            </span>
          </div>
        </article>
        <article className="trainee-profile-card">
          {editing ? (
            <form className="trainee-form-grid" onSubmit={handleSubmit(save)}>
              {[
                ["name", "Full name"],
                ["email", "Email"],
                ["phone", "Phone"],
                ["qualification", "Qualification"],
                ["institution", "Institution"],
                ["workExperience", "Work experience"],
                ["skills", "Skills"],
                ["interests", "Interests"],
              ].map(([name, label]) => (
                <label key={name}>
                  {label}
                  <input {...register(name)} />
                </label>
              ))}
              <button className="trainee-primary-button" type="submit">
                Save changes
              </button>
            </form>
          ) : (
            <>
              <div className="trainee-detail-heading">
                <h2>Personal information</h2>
                <ShieldCheck size={20} />
              </div>
              <div className="trainee-detail-grid">
                <Detail label="Email" value={trainee.email} icon={Mail} />
                <Detail label="Phone" value={trainee.phone} icon={Phone} />
                <Detail
                  label="Qualification"
                  value={trainee.qualification}
                  icon={GraduationCap}
                />
                <Detail
                  label="Institution"
                  value={trainee.institution}
                  icon={MapPin}
                />
                <Detail
                  label="Experience"
                  value={`${trainee.workExperience} years`}
                  icon={Users}
                />
              </div>
              <div className="trainee-tag-section">
                <span>Skills</span>
                <div>
                  {trainee.skills.map((skill) => (
                    <b key={skill}>{skill}</b>
                  ))}
                </div>
              </div>
              <div className="trainee-tag-section">
                <span>Interests</span>
                <div>
                  {trainee.interests.map((interest) => (
                    <b key={interest}>{interest}</b>
                  ))}
                </div>
              </div>
            </>
          )}
        </article>
      </div>
    </section>
  );
}
