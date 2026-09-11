import { useState } from "react";
import { useDispatch } from "react-redux";
import { Search } from "lucide-react";
import { saveCourse } from "../../features/Trainee/tranieeSlice";
import useTraineeData from "./hooks/useTraineeData";
import { findTrainer } from "../../features/Trainee/traineeSelectors";
import {
  CourseCard,
  EmptyState,
  PageIntro,
} from "./components/PortalComponents";

export default function TraineeCourses() {
  const { trainee, courses, trainers } = useTraineeData();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const saved = trainee.learning.savedCourses || [];
  const published = courses
    .filter((course) => course.status === "Published")
    .filter((course) =>
      `${course.title} ${course.description} ${course.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .filter(
      (course) => category === "All categories" || course.category === category,
    );
  const categories = [
    ...new Set(
      courses
        .filter((course) => course.status === "Published")
        .map((course) => course.category),
    ),
  ];
  return (
    <section className="trainee-page">
      <PageIntro
        eyebrow="Learning catalogue"
        title="Browse courses"
        description="Find practical courses taught by experienced faculty and build your next capability."
      />
      <div className="trainee-toolbar">
        <label className="trainee-search">
          <Search size={18} />
          <input
            placeholder="Search courses..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option>All categories</option>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="trainee-course-grid">
        {published.map((course) => (
          <CourseCard
            key={course.id}
            item={{ course, trainer: findTrainer(trainers, course) }}
            onSave={(item) =>
              dispatch(saveCourse({ traineeId: trainee.id, courseId: item.id }))
            }
            saved={saved.includes(course.id)}
          />
        ))}
      </div>
      {!published.length && <EmptyState title="No courses match your search" />}
    </section>
  );
}
