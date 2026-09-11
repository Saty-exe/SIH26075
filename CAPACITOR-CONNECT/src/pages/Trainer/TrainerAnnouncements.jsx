import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Megaphone, Pencil, Trash2 } from "lucide-react";
import {
  addAnnouncement,
  removeAnnouncement,
  updateAnnouncement,
} from "../../features/announcements/announcementSlice";
import useTrainerData from "./hooks/useTrainerData";
import { TrainerPageIntro } from "../../components/Trainer/TrainerComponents";

export default function TrainerAnnouncements() {
  const { trainer, courses } = useTrainerData();
  const dispatch = useDispatch();
  const announcements = useSelector(
    (state) => state.announcementReducer.announcements,
  ).filter((item) => item.trainerId === trainer.id);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { target: "course-trainees", status: "Published" },
  });
  const save = (values) => {
    const payload = {
      ...values,
      id:
        editing && editing !== "new"
          ? editing
          : `ANN-${trainer.id}-${announcements.length + 1}`,
      trainerId: trainer.id,
      courseId: Number(values.courseId),
      publishDate: values.publishDate || new Date().toISOString().slice(0, 10),
    };
    dispatch(
      editing && editing !== "new"
        ? updateAnnouncement(payload)
        : addAnnouncement(payload),
    );
    reset({ target: "course-trainees", status: "Published" });
    setEditing(null);
  };
  const edit = (announcement) => {
    setEditing(announcement.id);
    reset(announcement);
  };
  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Communication"
        title="Announcements"
        description="Keep trainees in your courses informed with timely updates."
        action={
          <button
            className="trainer-primary-button"
            onClick={() => setEditing("new")}
          >
            New announcement
          </button>
        }
      />
      {editing && (
        <form
          className="trainer-panel trainer-form-grid"
          onSubmit={handleSubmit(save)}
        >
          <label>
            Title
            <input required {...register("title")} />
          </label>
          <label>
            Course
            <select required {...register("courseId")}>
              <option value="">Select course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Target audience
            <select {...register("target")}>
              <option value="course-trainees">
                Trainees of selected course
              </option>
              <option value="all-trainees">All trainees in my courses</option>
            </select>
          </label>
          <label>
            Publish date
            <input type="date" {...register("publishDate")} />
          </label>
          <label className="trainer-form-wide">
            Message
            <textarea required {...register("message")} />
          </label>
          <div className="trainer-form-actions">
            <button
              type="button"
              className="trainer-secondary-button"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
            <button className="trainer-primary-button" type="submit">
              Publish announcement
            </button>
          </div>
        </form>
      )}
      <div className="trainer-announcement-list">
        {announcements.map((announcement) => (
          <article
            className="trainer-panel trainer-announcement-card"
            key={announcement.id}
          >
            <div className="trainer-announcement-icon">
              <Megaphone size={19} />
            </div>
            <div>
              <span>
                {courses.find((course) => course.id === announcement.courseId)
                  ?.title || "Course learners"}{" "}
                · {announcement.publishDate}
              </span>
              <h2>{announcement.title}</h2>
              <p>{announcement.message}</p>
            </div>
            <div className="trainer-announcement-actions">
              <b>{announcement.status}</b>
              <button
                onClick={() => edit(announcement)}
                aria-label={`Edit ${announcement.title}`}
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => dispatch(removeAnnouncement(announcement.id))}
                aria-label={`Delete ${announcement.title}`}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
