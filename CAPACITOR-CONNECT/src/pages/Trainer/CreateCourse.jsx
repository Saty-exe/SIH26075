import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import { addCourse } from "../../features/courses/courseSlice";
import useTrainerData from "./hooks/useTrainerData";
import { TrainerPageIntro } from "../../components/Trainer/TrainerComponents";

export default function CreateCourse() {
  const { trainer } = useTrainerData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      category: "Software Development",
      level: "Beginner",
      duration: "4 weeks",
    },
  });
  const save = (values) => {
    const id = `TR-${trainer.id}-${values.title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}`;
    dispatch(
      addCourse({
        id,
        title: values.title,
        description: values.description,
        category: values.category,
        level: values.level,
        duration: values.duration,
        skills: values.skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        objectives: values.objectives.split("\n").filter(Boolean),
        prerequisites: values.prerequisites.split("\n").filter(Boolean),
        trainerId: trainer.id,
        instructor: trainer.name,
        status: "Draft",
        createdDate: new Date().toISOString().slice(0, 10),
        enrolledTrainees: 0,
        completionRate: 0,
        resources: [],
        assessmentIds: [],
      }),
    );
    navigate("/trainer/courses");
  };
  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Course management"
        title="Create course"
        description="Add a structured learning experience to your trainer catalogue."
      />
      <form
        className="trainer-panel trainer-form-grid"
        onSubmit={handleSubmit(save)}
      >
        {[
          ["title", "Course title"],
          ["duration", "Duration"],
          ["category", "Category"],
          ["level", "Level"],
          ["skills", "Skills (comma separated)"],
        ].map(([name, label]) => (
          <label key={name}>
            {label}
            <input {...register(name, { required: true })} />
          </label>
        ))}
        {[
          ["description", "Description"],
          ["objectives", "Course objectives (one per line)"],
          ["prerequisites", "Prerequisites (one per line)"],
        ].map(([name, label]) => (
          <label className="trainer-form-wide" key={name}>
            {label}
            <textarea
              {...register(name, { required: name === "description" })}
            />
          </label>
        ))}
        <div className="trainer-form-actions">
          <button
            type="button"
            className="trainer-secondary-button"
            onClick={() => navigate("/trainer/courses")}
          >
            Cancel
          </button>
          <button className="trainer-primary-button" type="submit">
            <Save size={16} /> Save course
          </button>
        </div>
      </form>
    </section>
  );
}
