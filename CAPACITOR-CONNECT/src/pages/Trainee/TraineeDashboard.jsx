import { useNavigate } from "react-router-dom";
import { Award, BarChart3, BookOpen, Check, Target } from "lucide-react";
import useTraineeData from "./hooks/useTraineeData";
import { formatDate } from "./utils/traineeFormatters";
import {
  LearningCard,
  PageIntro,
  PanelHeading,
  StatCard,
} from "./components/PortalComponents";

export default function TraineeDashboard() {
  const { trainee, courses, assessments, results, enrollments } =
    useTraineeData();
  const navigate = useNavigate();
  const recommended = courses
    .filter(
      (course) =>
        course.status === "Published" &&
        !enrollments.some((item) => item.course.title === course.title),
    )
    .slice(0, 3);
  const recent = results
    .filter((result) => result.trainee === trainee.name)
    .slice(-3)
    .reverse();
  return (
    <section className="trainee-page">
      <PageIntro
        eyebrow="My learning space"
        title={`Good morning, ${trainee.name.split(" ")[0]}`}
        description="Pick up where you left off and keep your learning momentum moving."
        action={
          <button
            className="trainee-primary-button"
            onClick={() => navigate("/trainee/courses")}
          >
            <BookOpen size={16} /> Browse courses
          </button>
        }
      />
      <div className="trainee-hero-progress">
        <div>
          <span className="trainee-eyebrow">Overall learning progress</span>
          <strong>{trainee.performance.completionRate}%</strong>
          <p>{trainee.activity.learningHours} learning hours this month</p>
        </div>
        <div
          className="trainee-hero-ring"
          style={{
            "--progress": `${trainee.performance.completionRate * 3.6}deg`,
          }}
        >
          <span>{trainee.performance.completionRate}%</span>
        </div>
        <div className="trainee-hero-note">
          <Target size={17} />
          <span>You're ahead of the average learner. Keep going.</span>
        </div>
      </div>
      <div className="trainee-stat-grid">
        <StatCard
          icon={BookOpen}
          label="Enrolled courses"
          value={enrollments.length}
          detail="Across your learning path"
        />
        <StatCard
          icon={Check}
          label="Completed courses"
          value={trainee.learning.completedCourses}
          detail="Certificates unlocked"
          tone="blue"
        />
        <StatCard
          icon={Award}
          label="Certificates"
          value={trainee.learning.certificates.length}
          detail="Credentials earned"
          tone="gold"
        />
        <StatCard
          icon={BarChart3}
          label="Performance score"
          value={`${trainee.performance.totalPerformance}%`}
          detail="Across all assessments"
          tone="coral"
        />
      </div>
      <div className="trainee-dashboard-grid">
        <article className="trainee-panel">
          <PanelHeading
            title="Continue learning"
            action="View all"
            onClick={() => navigate("/trainee/learning/in-progress")}
          />
          {enrollments
            .filter((item) => item.status === "In Progress")
            .slice(0, 2)
            .map((item) => (
              <LearningCard item={item} key={item.course.id} />
            ))}
        </article>
        <article className="trainee-panel">
          <PanelHeading
            title="Recent performance"
            action="See performance"
            onClick={() => navigate("/trainee/performance")}
          />
          {(recent.length ? recent : trainee.performance.recentPerformance).map(
            (result) => (
              <div
                className="trainee-result-row"
                key={result.id || result.assessment}
              >
                <div className="trainee-result-icon">
                  <BarChart3 size={15} />
                </div>
                <div>
                  <strong>
                    {result.assessment ||
                      assessments.find(
                        (item) => item.id === result.assessmentId,
                      )?.title ||
                      "Assessment"}
                  </strong>
                  <span>{formatDate(result.date || result.submittedAt)}</span>
                </div>
                <b>{result.score}%</b>
              </div>
            ),
          )}
        </article>
      </div>
      <div className="trainee-dashboard-grid">
        <article className="trainee-panel">
          <PanelHeading
            title="Recommended for you"
            action="Explore"
            onClick={() => navigate("/trainee/courses")}
          />
          {recommended.map((course) => (
            <button
              className="trainee-recommend-row"
              key={course.id}
              onClick={() => navigate(`/trainee/courses/${course.id}`)}
            >
              <div className="trainee-course-symbol">{course.title[0]}</div>
              <div>
                <strong>{course.title}</strong>
                <span>
                  {course.category} · {course.level}
                </span>
              </div>
            </button>
          ))}
        </article>
        <article className="trainee-panel">
          <PanelHeading
            title="Upcoming deadlines"
            action="All assessments"
            onClick={() => navigate("/trainee/assessments")}
          />
          {assessments.slice(0, 3).map((assessment) => (
            <div className="trainee-deadline-row" key={assessment.id}>
              <div>
                <strong>{assessment.title}</strong>
                <span>{assessment.course}</span>
              </div>
              <time>{formatDate(assessment.deadline)}</time>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
