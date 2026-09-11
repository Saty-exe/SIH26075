import { BarChart3, Target, Users } from "lucide-react";
import useTrainerData from "./hooks/useTrainerData";
import {
  TrainerPageIntro,
  TrainerStatCard,
} from "../../components/Trainer/TrainerComponents";

export default function TrainerPerformance() {
  const { trainer, trainees, assessments, results, courses } = useTrainerData();
  const ownResults = results.filter((result) =>
    assessments.some((assessment) => assessment.id === result.assessmentId),
  );
  const average = ownResults.length
    ? Math.round(
        ownResults.reduce((sum, result) => sum + result.score, 0) /
          ownResults.length,
      )
    : trainer.performance?.averageTraineeScore || 0;
  const completion = trainees.length
    ? Math.round(
        trainees.reduce(
          (sum, trainee) => sum + trainee.performance.completionRate,
          0,
        ) / trainees.length,
      )
    : 0;
  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Trainer insights"
        title="Performance"
        description="Understand learner outcomes across your courses and assessments."
      />
      <div className="trainer-stat-grid trainer-stat-grid-three">
        <TrainerStatCard
          icon={BarChart3}
          label="Average trainee score"
          value={`${average}%`}
          detail="Across assessment results"
        />
        <TrainerStatCard
          icon={Target}
          label="Course completion"
          value={`${completion}%`}
          detail="Average learner completion"
        />
        <TrainerStatCard
          icon={Users}
          label="Active learners"
          value={trainees.length}
          detail={`${courses.length} owned courses`}
        />
      </div>
      <div className="trainer-panel">
        <div className="trainer-panel-heading">
          <h2>Course-wise performance</h2>
        </div>
        {courses.map((course) => (
          <div className="trainer-performance-course" key={course.id}>
            <div>
              <strong>{course.title}</strong>
              <span>{course.enrolledTrainees} enrolled trainees</span>
            </div>
            <b>{course.completionRate}%</b>
            <div className="trainer-performance-bar">
              <span style={{ width: `${course.completionRate}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="trainer-panel">
        <div className="trainer-panel-heading">
          <h2>Recent assessment results</h2>
        </div>
        {ownResults
          .slice(-6)
          .reverse()
          .map((result) => (
            <div className="trainer-detail-row" key={result.id}>
              <span>{result.trainee}</span>
              <small>
                {
                  assessments.find(
                    (assessment) => assessment.id === result.assessmentId,
                  )?.title
                }
              </small>
              <strong>{result.score}%</strong>
            </div>
          ))}
      </div>
    </section>
  );
}
