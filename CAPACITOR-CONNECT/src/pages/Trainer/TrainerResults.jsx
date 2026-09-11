import { BarChart3 } from "lucide-react";
import useTrainerData from "./hooks/useTrainerData";
import { TrainerPageIntro, TrainerStatCard } from "../../components/Trainer/TrainerComponents";

export default function TrainerResults() {
  const { trainer, results, assessments } = useTrainerData();
  const ownResults = results.filter((result) => assessments.some((assessment) => assessment.id === result.assessmentId));
  const average = ownResults.length ? Math.round(ownResults.reduce((sum, result) => sum + result.score, 0) / ownResults.length) : trainer?.performance?.averageTraineeScore || 0;
  return <section className="trainer-page"><TrainerPageIntro eyebrow="Learner outcomes" title="Results" description="Review scores across your assessments and spot where learners need more support." /><div className="trainer-stat-grid trainer-stat-grid-three"><TrainerStatCard icon={BarChart3} label="Average score" value={`${average}%`} detail="Across submissions" /><TrainerStatCard icon={BarChart3} label="Submissions" value={ownResults.length} detail="Learner attempts" /><TrainerStatCard icon={BarChart3} label="Passed" value={ownResults.filter((result) => result.status === "Passed").length} detail="Successful outcomes" /></div><article className="trainer-panel"><div className="trainer-panel-heading"><h2>Recent submissions</h2></div><div className="trainer-results-table"><div className="trainer-results-table-head"><span>Trainee</span><span>Assessment</span><span>Score</span><span>Status</span></div>{ownResults.map((result) => <div className="trainer-results-table-row" key={result.id}><strong>{result.trainee}</strong><span>{assessments.find((assessment) => assessment.id === result.assessmentId)?.title}</span><b>{result.score}%</b><span className={`trainer-status trainer-status-${result.status.toLowerCase().replace(" ", "-")}`}>{result.status}</span></div>)}</div></article></section>;
}
