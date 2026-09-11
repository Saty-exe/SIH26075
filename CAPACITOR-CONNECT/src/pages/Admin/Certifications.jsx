import AdminSectionPage from "../../components/Admin/AdminSectionPage";
import { useSelector } from "react-redux";
import { CheckCircle2 } from "lucide-react";

export default function Certifications() {
  const certificates = useSelector(
    (state) => state.certificateReducer.certificates,
  );
  return (
    <>
      <AdminSectionPage section="certifications" />
      <section className="admin-section-page">
        <div className="admin-section-heading">
          <div>
            <span className="admin-section-eyebrow">Shared credentials</span>
            <h2>Trainer-issued certificates</h2>
            <p>
              Certificates issued through trainer workflows are available in the
              shared certification record.
            </p>
          </div>
        </div>
        <div className="admin-section-grid">
          {certificates.map((certificate) => (
            <article className="admin-section-card" key={certificate.id}>
              <div className="admin-section-card-icon">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h2>{certificate.course}</h2>
                <p>
                  {certificate.trainee} · {certificate.certificateNumber}
                </p>
                <small>
                  Issued {certificate.issuedDate} · Final score{" "}
                  {certificate.finalScore}%
                </small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
