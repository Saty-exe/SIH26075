import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Award, Check, ShieldCheck } from "lucide-react";
import { addCertificate } from "../../features/certificates/certificateSlice";
import useTrainerData from "./hooks/useTrainerData";
import { TrainerPageIntro } from "../../components/Trainer/TrainerComponents";

export default function TrainerCertificates() {
  const { trainer, trainees, courses, results } = useTrainerData();
  const dispatch = useDispatch();
  const certificates = useSelector(
    (state) => state.certificateReducer.certificates,
  ).filter((certificate) => certificate.trainerId === trainer.id);
  const [selected, setSelected] = useState(null);
  const eligible = trainees
    .flatMap((trainee) =>
      trainee.learning.enrolledCourses
        .filter((enrollment) => enrollment.progress >= 100)
        .map((enrollment) => ({
          trainee,
          enrollment,
          course: courses.find((course) => course.id === enrollment.courseId),
        })),
    )
    .filter(
      (item) =>
        !certificates.some(
          (certificate) =>
            certificate.traineeId === item.trainee.id &&
            certificate.courseId === item.course?.id,
        ),
    );
  const issue = () => {
    const score =
      results
        .filter((result) => result.trainee === selected.trainee.name)
        .reduce((sum, result) => sum + result.score, 0) ||
      selected.trainee.performance.totalPerformance;
    dispatch(
      addCertificate({
        id: `CERT-${trainer.id}-${selected.trainee.id}-${selected.course.id}`,
        certificateNumber: `CC-${trainer.id}-${selected.trainee.id}`,
        traineeId: selected.trainee.id,
        courseId: selected.course.id,
        trainerId: trainer.id,
        course: selected.course.title,
        trainee: selected.trainee.name,
        issuedDate: new Date().toISOString().slice(0, 10),
        finalScore: score,
      }),
    );
    setSelected(null);
  };
  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Credentials"
        title="Certificates"
        description="Issue credentials when learners complete one of your courses."
      />
      <article className="trainer-panel">
        <div className="trainer-panel-heading">
          <h2>Eligible trainees</h2>
          <span>{eligible.length} ready to issue</span>
        </div>
        {eligible.map((item) => (
          <div className="trainer-certificate-row">
            <div className="trainer-certificate-icon">
              <Award size={19} />
            </div>
            <div>
              <strong>{item.trainee.name}</strong>
            </div>
            <b>{item.enrollment.progress}% complete</b>
            <button
              className="trainer-primary-button"
              onClick={() => setSelected(item)}
            >
              Issue certificate
            </button>
          </div>
        ))}
        {!eligible.length && (
          <p className="trainer-muted">No eligible trainees yet.</p>
        )}
      </article>
      <article className="trainer-panel">
        <h2>Issued by you</h2>
        {certificates.map((certificate) => (
          <div className="trainer-certificate-row" key={certificate.id}>
            <ShieldCheck size={19} />
            <div>
              <strong>{certificate.trainee}</strong>
              <span>
                {certificate.course} · {certificate.certificateNumber}
              </span>
            </div>
            <b>{certificate.finalScore}%</b>
            <small>{certificate.issuedDate}</small>
          </div>
        ))}
      </article>
      {selected && (
        <div className="trainer-confirm-panel">
          <h2>Issue certificate?</h2>
          <p>
            <strong>{selected.trainee.name}</strong> completed{" "}
          </p>
          <div>
            <button
              className="trainer-secondary-button"
              onClick={() => setSelected(null)}
            >
              Cancel
            </button>
            <button className="trainer-primary-button" onClick={issue}>
              <Check size={15} /> Confirm issue
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
