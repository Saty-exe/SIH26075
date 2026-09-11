import { ArrowLeft, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, updateCourse } from "../../features/courses/courseSlice";

const courseSchema = z.object({
  title: z.string().trim().min(3, "Enter a course title."),
  category: z.string().trim().min(2, "Enter a category."),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  status: z.enum(["Published", "Draft", "Archived"]),
  instructor: z.string().trim().min(2, "Enter an instructor."),
  duration: z.string().trim().min(2, "Enter a duration."),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters."),
});

export default function CreateCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courseReducer.courses);
  const course = courses.find((item) => String(item.id) === courseId);
  const isEditing = Boolean(courseId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: course || {
      title: "",
      category: "",
      level: "Beginner",
      status: "Draft",
      instructor: "",
      duration: "",
      description: "",
    },
  });

  const onSubmit = (values) => {
    if (isEditing && !course) return;
    if (isEditing) {
      dispatch(updateCourse({ ...course, ...values }));
      navigate(`/admin/courses/${course.id}`);
      return;
    }
    const nextId = Math.max(0, ...courses.map((item) => item.id)) + 1;
    dispatch(
      addCourse({
        ...values,
        id: nextId,
        enrolledTrainees: 0,
        completionRate: 0,
      }),
    );
    navigate(`/admin/courses/${nextId}`);
  };

  const field = (label, name, type = "text") => (
    <label className="course-form-field">
      <span>
        {label}
        {errors[name] && (
          <small className="course-field-error">{errors[name].message}</small>
        )}
      </span>
      <input {...register(name)} type={type} />
    </label>
  );

  return (
    <section className="course-page course-form-page">
      <Link className="course-back-link" to="/admin/courses">
        <ArrowLeft size={16} /> Back to courses
      </Link>
      <div className="course-form-heading">
        <span className="course-eyebrow">Admin / Course management</span>
        <h1>{isEditing ? "Edit course" : "Create course"}</h1>
        <p>
          {isEditing
            ? "Update the course catalogue record."
            : "Add a new learning experience to the catalogue."}
        </p>
      </div>
      <form
        className="course-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <section className="course-form-section">
          <div className="course-panel-heading">
            <div>
              <span className="course-eyebrow">Course setup</span>
              <h2>Course information</h2>
            </div>
          </div>
          <div className="course-form-grid">
            {field("Course title", "title")} {field("Category", "category")}{" "}
            {field("Instructor", "instructor")} {field("Duration", "duration")}
            <label className="course-form-field">
              <span>Level</span>
              <select {...register("level")}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </label>
            <label className="course-form-field">
              <span>Status</span>
              <select {...register("status")}>
                <option>Draft</option>
                <option>Published</option>
                <option>Archived</option>
              </select>
            </label>
            <label className="course-form-field course-form-field-wide">
              <span>
                Description
                {errors.description && (
                  <small className="course-field-error">
                    {errors.description.message}
                  </small>
                )}
              </span>
              <textarea {...register("description")} rows="6" />
            </label>
          </div>
        </section>
        <div className="course-form-actions">
          <Link className="course-secondary-button" to="/admin/courses">
            Cancel
          </Link>
          <button className="course-primary-button" type="submit">
            <Save size={16} /> {isEditing ? "Save changes" : "Create course"}
          </button>
        </div>
      </form>
    </section>
  );
}
