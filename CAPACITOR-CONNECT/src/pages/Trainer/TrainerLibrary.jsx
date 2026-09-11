import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilePlus2, Trash2 } from "lucide-react";
import {
  addResource,
  removeResource,
} from "../../features/resources/resourceSlice";
import useTrainerData from "./hooks/useTrainerData";
import { TrainerPageIntro } from "../../components/Trainer/TrainerComponents";

export default function TrainerLibrary() {
  const { trainer, courses } = useTrainerData();
  const dispatch = useDispatch();
  const resources = useSelector(
    (state) => state.resourceReducer.resources,
  ).filter((resource) => resource.trainerId === trainer.id);
  const [formOpen, setFormOpen] = useState(false);
  const [values, setValues] = useState({
    title: "",
    type: "Recorded Lectures",
    courseId: "",
  });
  const add = (event) => {
    event.preventDefault();
    dispatch(
      addResource({
        ...values,
        id: `RES-${trainer.id}-${resources.length + 1}`,
        trainerId: trainer.id,
        courseId: Number(values.courseId),
        url: "#",
        uploadedAt: new Date().toISOString().slice(0, 10),
        status: "Published",
      }),
    );
    setValues({ title: "", type: "Recorded Lectures", courseId: "" });
    setFormOpen(false);
  };
  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Trainer library"
        title="Learning resources"
        description="Manage lectures, presentations, documents, and study materials for your courses."
        action={
          <button
            className="trainer-primary-button"
            onClick={() => setFormOpen((value) => !value)}
          >
            <FilePlus2 size={16} /> Add resource
          </button>
        }
      />
      {formOpen && (
        <form className="trainer-panel trainer-form-grid" onSubmit={add}>
          <label>
            Resource title
            <input
              required
              value={values.title}
              onChange={(event) =>
                setValues({ ...values, title: event.target.value })
              }
            />
          </label>
          <label>
            Resource type
            <select
              value={values.type}
              onChange={(event) =>
                setValues({ ...values, type: event.target.value })
              }
            >
              <option>Recorded Lectures</option>
              <option>Presentations</option>
              <option>Study Materials</option>
              <option>Documents</option>
              <option>Videos</option>
            </select>
          </label>
          <label>
            Course
            <select
              required
              value={values.courseId}
              onChange={(event) =>
                setValues({ ...values, courseId: event.target.value })
              }
            >
              <option value="">Select course</option>
              {courses.map((course) => (
                <option value={course.id} key={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>
          <button className="trainer-primary-button" type="submit">
            Save resource
          </button>
        </form>
      )}
      <div className="trainer-panel trainer-resource-list">
        {resources.map((resource) => (
          <div className="trainer-resource-row" key={resource.id}>
            <FilePlus2 size={18} />
            <div>
              <strong>{resource.title}</strong>
              <span>
                {courses.find((course) => course.id === resource.courseId)
                  ?.title || "Course"}{" "}
                · {resource.type}
              </span>
            </div>
            <small>{resource.uploadedAt}</small>
            <button
              className="trainer-danger-button"
              onClick={() => dispatch(removeResource(resource.id))}
              aria-label={`Delete ${resource.title}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
