import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import useTrainerData from "./hooks/useTrainerData";
import {
  TrainerCourseCard,
  TrainerEmpty,
  TrainerPageIntro,
} from "../../components/Trainer/TrainerComponents";

export default function TrainerCourses() {
  const { courses } = useTrainerData();
  const navigate = useNavigate();
  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Course management"
        title="My courses"
        description="Keep your learning catalogue current and see how learners are progressing."
        action={
          <button
            className="trainer-primary-button"
            onClick={() => navigate("/trainer/courses/create")}
          >
            <Plus size={16} /> Create course
          </button>
        }
      />
      <div className="trainer-course-grid">
        {courses.map((course) => (
          <TrainerCourseCard key={course.id} course={course} />
        ))}
      </div>
      {!courses.length && <TrainerEmpty title="No courses assigned yet" />}
    </section>
  );
}
