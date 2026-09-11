import { BarChart3 } from "lucide-react";
import useTraineeData from "./hooks/useTraineeData";
import {
  PageIntro,
  PanelHeading,
  ProgressBar,
} from "./components/PortalComponents";
import { formatDate } from "./utils/traineeFormatters";

export default function TraineePerformance() {
  const { trainee, enrollments } = useTraineeData();
  return (
    <section className="trainee-page">
      <PageIntro
        eyebrow="Your insights"
        title="Performance"
        description="See how your assessment scores and course progress are building over time."
      />
      <div className="trainee-performance-hero">
        <div>
          <span className="trainee-eyebrow">Overall performance</span>
          <strong>{trainee.performance.totalPerformance}%</strong>
          <p>Strong progress across your learning pathway.</p>
        </div>
        <div className="trainee-score-bars">
          <div>
            <span>Completion rate</span>
            <ProgressBar value={trainee.performance.completionRate} />
            <b>{trainee.performance.completionRate}%</b>
          </div>
          <div>
            <span>Assessment completion</span>
            <ProgressBar
              value={
                (trainee.performance.assessmentsCompleted /
                  Math.max(trainee.performance.assessmentsTotal, 1)) *
                100
              }
            />
            <b>
              {trainee.performance.assessmentsCompleted}/
              {trainee.performance.assessmentsTotal}
            </b>
          </div>
        </div>
      </div>
      <div className="trainee-performance-grid">
        <article className="trainee-panel">
          <PanelHeading title="Recent performance" />
          {trainee.performance.recentPerformance.map((result) => (
            <div className="trainee-result-row" key={result.assessment}>
              <div className="trainee-result-icon">
                <BarChart3 size={15} />
              </div>
              <div>
                <strong>{result.assessment}</strong>
                <span>{formatDate(result.date)}</span>
              </div>
              <b>{result.score}%</b>
            </div>
          ))}
        </article>
        <article className="trainee-panel">
          <PanelHeading title="Course-wise progress" />
          {enrollments.map((item) => (
            <div className="trainee-course-performance" key={item.course.id}>
              <div>
                <strong>{item.course.title}</strong>
                <span>{item.course.category}</span>
              </div>
              <b>{item.progress}%</b>
              <ProgressBar value={item.progress} />
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
