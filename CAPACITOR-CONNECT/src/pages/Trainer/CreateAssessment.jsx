import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus, Save, Trash2 } from "lucide-react";
import { addAssessment } from "../../features/assessments/assessmentSlice";
import useTrainerData from "./hooks/useTrainerData";
import { TrainerPageIntro } from "../../components/Trainer/TrainerComponents";

export default function CreateAssessment() {
  const { trainer, courses } = useTrainerData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correct: "", points: 2 },
  ]);
  const { register, handleSubmit } = useForm({
    defaultValues: { duration: "30 minutes", status: "Draft" },
  });
  const addQuestion = () =>
    setQuestions([
      ...questions,
      { text: "", options: ["", "", "", ""], correct: "", points: 2 },
    ]);
  const save = (values) => {
    const selectedCourse = courses.find(
      (course) => String(course.id) === values.courseId,
    );
    const assessment = {
      id: `AS-${trainer.id}-${values.title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}`,
      title: values.title,
      course: selectedCourse?.title || "",
      courseId: selectedCourse?.id,
      trainerId: trainer.id,
      description: values.description,
      deadline: values.deadline,
      duration: values.duration,
      status: "Draft",
      participants: 0,
      completed: 0,
      questions: questions.map((question, index) => ({
        id: `${trainer.id}-${index}`,
        text: question.text,
        type: "Multiple choice",
        points: Number(question.points),
        options: question.options.filter(Boolean),
      })),
    };
    dispatch(addAssessment(assessment));
    navigate("/trainer/assessments");
  };
  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Assessment workspace"
        title="Create questionnaire"
        description="Build a clear checkpoint for learners on one of your courses."
      />
      <form
        className="trainer-panel trainer-form-grid"
        onSubmit={handleSubmit(save)}
      >
        <label>
          Assessment title
          <input required {...register("title")} />
        </label>
        <label>
          Course
          <select required {...register("courseId")}>
            <option value="">Select course</option>
            {courses.map((course) => (
              <option value={course.id} key={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Deadline
          <input type="date" required {...register("deadline")} />
        </label>
        <label>
          Duration
          <input {...register("duration")} />
        </label>
        <label className="trainer-form-wide">
          Description
          <textarea {...register("description")} />
        </label>
        <div className="trainer-question-builder trainer-form-wide">
          <div className="trainer-panel-heading">
            <h2>Questions</h2>
            <button type="button" onClick={addQuestion}>
              <Plus size={14} /> Add question
            </button>
          </div>
          {questions.map((question, index) => (
            <div className="trainer-question-builder-row" key={index}>
              <label>
                Question
                <input
                  value={question.text}
                  onChange={(event) =>
                    setQuestions(
                      questions.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, text: event.target.value }
                          : item,
                      ),
                    )
                  }
                />
              </label>
              <label>
                Options
                <input
                  placeholder="Option 1, Option 2, Option 3"
                  value={question.options.join(", ")}
                  onChange={(event) =>
                    setQuestions(
                      questions.map((item, itemIndex) =>
                        itemIndex === index
                          ? {
                              ...item,
                              options: event.target.value
                                .split(",")
                                .map((option) => option.trim()),
                            }
                          : item,
                      ),
                    )
                  }
                />
              </label>
              <label>
                Marks
                <input
                  type="number"
                  min="1"
                  value={question.points}
                  onChange={(event) =>
                    setQuestions(
                      questions.map((item, itemIndex) =>
                        itemIndex === index
                          ? { ...item, points: event.target.value }
                          : item,
                      ),
                    )
                  }
                />
              </label>
              <button
                type="button"
                className="trainer-danger-button"
                onClick={() =>
                  setQuestions(
                    questions.filter((_, itemIndex) => itemIndex !== index),
                  )
                }
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
        <button className="trainer-primary-button" type="submit">
          <Save size={16} /> Save assessment
        </button>
      </form>
    </section>
  );
}
