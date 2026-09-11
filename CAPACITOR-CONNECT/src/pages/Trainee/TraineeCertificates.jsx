import { Award, Download } from "lucide-react";
import { useSelector } from "react-redux";
import useTraineeData from "./hooks/useTraineeData";
import { EmptyState, PageIntro } from "./components/PortalComponents";
import { formatDate } from "./utils/traineeFormatters";

export default function TraineeCertificates() {
  const { trainee, enrollments } = useTraineeData();
  const sharedCertificates = useSelector(
    (state) => state.certificateReducer.certificates,
  ).filter((certificate) => certificate.traineeId === trainee.id);
  const certificates = [
    ...trainee.learning.certificates,
    ...sharedCertificates.map((certificate) => ({
      id: certificate.certificateNumber || certificate.id,
      course: certificate.course,
      issuedDate: certificate.issuedDate,
    })),
  ];
  return (
    <section className="trainee-page">
      <PageIntro
        eyebrow="Credentials"
        title="Certificates"
        description="Your earned credentials from completed Capacity Connect courses."
      />
      <div className="trainee-certificate-grid">
        {certificates.map((certificate) => (
          <article className="trainee-certificate-card" key={certificate.id}>
            <div className="trainee-certificate-seal">
              <Award size={25} />
            </div>
            <span className="trainee-eyebrow">Capacity Connect credential</span>
            <h2>{certificate.course}</h2>
            <p>Certificate of completion</p>
            <div>
              <span>Certificate number</span>
              <strong>{certificate.id}</strong>
            </div>
            <div>
              <span>Issued on</span>
              <strong>{formatDate(certificate.issuedDate)}</strong>
            </div>
            <button
              className="trainee-outline-button"
              onClick={() => window.print()}
            >
              <Download size={15} /> View / download
            </button>
            {enrollments.some(
              (item) => item.course.title === certificate.course,
            ) && <small>Course credential</small>}
          </article>
        ))}
      </div>
      {!certificates.length && (
        <EmptyState
          title="Complete a course to earn your first certificate"
          action="View learning"
          onClick={() => window.location.assign("/trainee/learning")}
        />
      )}
    </section>
  );
}
