import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  CalendarDays,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { updateTrainer } from "../../features/Trainer/trainerSlice";
import useTrainerData from "./hooks/useTrainerData";
import { TrainerPageIntro } from "../../components/Trainer/TrainerComponents";

export default function TrainerProfile() {
  const { trainer } = useTrainerData();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: trainer.name,
      email: trainer.email,
      phone: trainer.phone,
      designation: trainer.profile.designation,
      organization: trainer.profile.organization,
      qualification: trainer.profile.qualification,
      experience: trainer.profile.experience,
      location: trainer.profile.location,
      bio: trainer.profile.bio,
      skills: trainer.skills.join(", "),
      subjects: trainer.subjects.join(", "),
      interests: trainer.interests.join(", "),
    },
  });
  const save = (values) => {
    dispatch(
      updateTrainer({
        id: trainer.id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        skills: values.skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        subjects: values.subjects
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        interests: values.interests
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        profile: {
          ...trainer.profile,
          designation: values.designation,
          organization: values.organization,
          qualification: values.qualification,
          experience: Number(values.experience),
          location: values.location,
          bio: values.bio,
        },
      }),
    );
    setEditing(false);
  };
  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Trainer account"
        title="My profile"
        description="Keep your professional profile current for the learners you support."
        action={
          <button
            className="trainer-secondary-button"
            onClick={() => setEditing((value) => !value)}
          >
            <Pencil size={15} /> {editing ? "Cancel" : "Edit profile"}
          </button>
        }
      />
      <div className="trainer-profile-grid">
        <article className="trainer-panel trainer-profile-summary">
          <div className="trainer-profile-avatar">
            {trainer.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>
          <h2>{trainer.name}</h2>
          <p>{trainer.profile.designation}</p>
          <span className="trainer-status">{trainer.status}</span>
          <div>
            <span>
              <CalendarDays size={14} /> Joined {trainer.joinedDate}
            </span>
            <span>
              <MapPin size={14} /> {trainer.profile.location}
            </span>
          </div>
        </article>
        <article className="trainer-panel">
          {editing ? (
            <form className="trainer-form-grid" onSubmit={handleSubmit(save)}>
              {[
                ["name", "Name"],
                ["email", "Email"],
                ["phone", "Phone"],
                ["designation", "Designation"],
                ["organization", "Organization"],
                ["qualification", "Qualification"],
                ["experience", "Experience"],
                ["location", "Location"],
                ["skills", "Skills"],
                ["subjects", "Subjects"],
                ["interests", "Interests"],
              ].map(([name, label]) => (
                <label key={name}>
                  {label}
                  <input {...register(name)} />
                </label>
              ))}
              <label className="trainer-form-wide">
                Bio
                <textarea {...register("bio")} />
              </label>
              <button className="trainer-primary-button" type="submit">
                Save profile
              </button>
            </form>
          ) : (
            <>
              <div className="trainer-panel-heading">
                <h2>Professional information</h2>
                <ShieldCheck size={19} />
              </div>
              <div className="trainer-profile-detail-grid">
                <span>
                  <Mail size={15} /> <b>Email</b>
                  <strong>{trainer.email}</strong>
                </span>
                <span>
                  <Phone size={15} /> <b>Phone</b>
                  <strong>{trainer.phone}</strong>
                </span>
                <span>
                  <MapPin size={15} /> <b>Organization</b>
                  <strong>{trainer.profile.organization}</strong>
                </span>
                <span>
                  <CalendarDays size={15} /> <b>Experience</b>
                  <strong>{trainer.profile.experience} years</strong>
                </span>
              </div>
              <p className="trainer-profile-bio">{trainer.profile.bio}</p>
              <div className="trainer-profile-tags">
                <b>Skills</b>
                <div>
                  {trainer.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
                <b>Subjects</b>
                <div>
                  {trainer.subjects.map((subject) => (
                    <span key={subject}>{subject}</span>
                  ))}
                </div>
                <b>Interests</b>
                <div>
                  {trainer.interests.map((interest) => (
                    <span key={interest}>{interest}</span>
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
