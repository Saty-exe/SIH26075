import { useNavigate, useParams } from "react-router-dom";
import { CalendarDays, Check, Target, Trophy } from "lucide-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addResult } from "../../features/assessments/assessmentSlice";
import useTraineeData from "./hooks/useTraineeData";
import {
  AssessmentCard,
  EmptyState,
  PageIntro,
  StatCard,
} from "./components/PortalComponents";
import { formatDate } from "./utils/traineeFormatters";

export function TraineeAssessments() {
  const { trainee, assessments, results } = useTraineeData();
  const traineeResults = results.filter(
    (result) => result.trainee === trainee.name,
  );
  return (
    <section className="trainee-page">
      <PageIntro
        eyebrow="Check your progress"
        title="Assessments"
        description="Complete assessments connected to your enrolled courses and track your results."
      />
      <div className="trainee-assessment-summary">
        <StatCard
          icon={Target}
          label="Available"
          value={assessments.length}
          detail="For your courses"
        />
        <StatCard
          icon={Check}
          label="Completed"
          value={traineeResults.length}
          detail="Attempts submitted"
          tone="blue"
        />
        <StatCard
          icon={Target}
          label="Average score"
          value={`${traineeResults.length ? Math.round(traineeResults.reduce((sum, item) => sum + item.score, 0) / traineeResults.length) : trainee.performance.totalPerformance}%`}
          detail="Keep improving"
          tone="gold"
        />
      </div>
      <div className="trainee-assessment-list">
        {assessments.map((assessment) => (
          <AssessmentCard
            key={assessment.id}
            assessment={assessment}
            result={traineeResults.find(
              (result) => result.assessmentId === assessment.id,
            )}
          />
        ))}
      </div>
    </section>
  );
}

export function TraineeAssessmentAttempt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { trainee, assessments, results } = useTraineeData();
  const assessment = assessments.find((item) => String(item.id) === id);
  const existing = results.find(
    (result) =>
      result.assessmentId === assessment?.id && result.trainee === trainee.name,
  );
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(Boolean(existing));
  if (!assessment)
    return (
      <section className="trainee-page">
        <EmptyState
          title="Assessment unavailable"
          action="Back to assessments"
          onClick={() => navigate("/trainee/assessments")}
        />
      </section>
    );
  const submit = () => {
    const questions = assessment.questions.filter(
      (question) => question.options.length,
    );
    const correct = questions.filter(
      (question) => question.options[0] === answers[question.id],
    ).length;
    dispatch(
      addResult({
        id: `${assessment.id}-${trainee.id}`,
        assessmentId: assessment.id,
        traineeId: trainee.id,
        trainee: trainee.name,
        score: Math.round((correct / Math.max(questions.length, 1)) * 100),
        status:
          correct / Math.max(questions.length, 1) >= 0.5
            ? "Passed"
            : "Needs review",
        submittedAt: new Date().toISOString().slice(0, 10),
      }),
    );
    setSubmitted(true);
  };
  return (
    <section className="trainee-page">
      <button
        className="trainee-back-button"
        onClick={() => navigate("/trainee/assessments")}
      >
        ← Back to assessments
      </button>
      <div className="trainee-assessment-heading">
        <div>
          <span className="trainee-eyebrow">{assessment.course}</span>
          <h1>{assessment.title}</h1>
          <p>
            {assessment.questions.length} questions · {assessment.duration}
          </p>
        </div>
        <span className="trainee-assessment-deadline">
          <CalendarDays size={15} /> Due {formatDate(assessment.deadline)}
        </span>
      </div>
      {submitted ? (
        <div className="trainee-result-hero">
          <Trophy size={34} />
          <span>Assessment submitted</span>
          <strong>
            {existing?.score || "Your"}
            {existing ? "%" : " result is recorded"}
          </strong>
          <p>Your result is now part of your shared performance record.</p>
          <button
            className="trainee-primary-button"
            onClick={() => navigate("/trainee/performance")}
          >
            View performance
          </button>
        </div>
      ) : (
        <div className="trainee-question-list">
          {assessment.questions.map((question, index) => (
            <article className="trainee-question" key={question.id}>
              <span>
                Question {index + 1} · {question.points} points
              </span>
              <h2>{question.text}</h2>
              {question.options.length ? (
                <div className="trainee-options">
                  {question.options.map((option) => (
                    <label
                      key={option}
                      className={
                        answers[question.id] === option ? "selected" : ""
                      }
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={answers[question.id] === option}
                        onChange={() =>
                          setAnswers({ ...answers, [question.id]: option })
                        }
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ) : (
                <textarea
                  placeholder="Write your response..."
                  value={answers[question.id] || ""}
                  onChange={(event) =>
                    setAnswers({
                      ...answers,
                      [question.id]: event.target.value,
                    })
                  }
                />
              )}
            </article>
          ))}
          <button
            className="trainee-primary-button trainee-submit-assessment"
            onClick={submit}
          >
            <Check size={16} /> Submit assessment
          </button>
        </div>
      )}
    </section>
  );
}
