import { ArrowLeft, Edit3, Mail, MapPin, Phone, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../../components/Admin/ConfirmDialog";
import {
  deleteTrainee,
  getTraineeById,
} from "../../features/Trainee/traineeStore";

export default function TraineeDetails() {
  const { traineeId } = useParams();
  const navigate = useNavigate();
  const trainee = getTraineeById(traineeId);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (!trainee) {
    return (
      <section className="trainee-page trainee-empty-state">
        <h1>Trainee not found</h1>
        <p>The trainee record may have been removed or the link is invalid.</p>
        <Link className="trainee-secondary-button" to="/admin/trainees">
          Back to trainees
        </Link>
      </section>
    );
  }

  const handleDelete = () => {
    deleteTrainee(trainee.id);
    navigate("/admin/trainees");
  };

  return (
    <section className="trainee-page trainee-details-page">
      <Link className="trainee-back-link" to="/admin/trainees">
        <ArrowLeft size={16} /> Back to trainees
      </Link>
      <div className="trainee-detail-hero">
        <div className="trainee-avatar trainee-avatar-large">
          {trainee.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div className="trainee-detail-heading">
          <div className="trainee-title-row">
            <div>
              <span className="trainee-eyebrow">Trainee profile</span>
              <h1>{trainee.name}</h1>
            </div>
            <span
              className={`trainee-status trainee-status-${trainee.status.toLowerCase()}`}
            >
              {trainee.status}
            </span>
          </div>
          <p className="trainee-designation">{trainee.qualification}</p>
          <div className="trainee-detail-actions">
            <Link
              className="trainee-secondary-button"
              to={`/admin/trainees/${trainee.id}/edit`}
            >
              <Edit3 size={15} /> Edit trainee
            </Link>
            <button
              className="trainee-danger-button"
              type="button"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 size={15} /> Delete trainee
            </button>
          </div>
          <div className="trainee-contact-row">
            <span>
              <Mail size={15} /> {trainee.email}
            </span>
            <span>
              <Phone size={15} /> {trainee.phone}
            </span>
            <span>
              <MapPin size={15} /> {trainee.institution}
            </span>
          </div>
        </div>
      </div>
      <div className="trainee-detail-grid">
        <div className="trainee-detail-main">
          <section className="trainee-panel">
            <div className="trainee-panel-heading">
              <div>
                <span className="trainee-eyebrow">Academic profile</span>
                <h2>About {trainee.name.split(" ").slice(-1)[0]}</h2>
              </div>
            </div>
            <div className="trainee-info-grid">
              <div>
                <span>Qualification</span>
                <strong>{trainee.qualification}</strong>
              </div>
              <div>
                <span>Institution</span>
                <strong>{trainee.institution}</strong>
              </div>
              <div>
                <span>Work experience</span>
                <strong>{trainee.workExperience} years</strong>
              </div>
              <div>
                <span>Joined</span>
                <strong>{trainee.joinedDate}</strong>
              </div>
            </div>
            <div className="trainee-tag-list">
              <strong>Skills</strong>
              {trainee.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
            <div className="trainee-tag-list trainee-tag-list-soft">
              <strong>Interests</strong>
              {trainee.interests.map((interest) => (
                <span key={interest}>{interest}</span>
              ))}
            </div>
          </section>
          <section className="trainee-panel">
            <div className="trainee-panel-heading">
              <div>
                <span className="trainee-eyebrow">Learning journey</span>
                <h2>Enrolled courses</h2>
              </div>
              <span className="trainee-count">
                {trainee.learning.enrolledCourses.length} courses
              </span>
            </div>
            <div className="trainee-course-list">
              {trainee.learning.enrolledCourses.length ? (
                trainee.learning.enrolledCourses.map((course) => (
                  <div className="trainee-course-row" key={course.courseId}>
                    <div>
                      <strong>{course.title}</strong>
                      <span>{course.status}</span>
                    </div>
                    <div className="trainee-progress trainee-detail-progress">
                      <div>
                        <span style={{ width: `${course.progress}%` }} />
                      </div>
                      <strong>{course.progress}%</strong>
                    </div>
                  </div>
                ))
              ) : (
                <p className="trainee-muted">No courses enrolled yet.</p>
              )}
            </div>
          </section>
          <section className="trainee-panel">
            <div className="trainee-panel-heading">
              <div>
                <span className="trainee-eyebrow">Assessment history</span>
                <h2>Recent performance</h2>
              </div>
            </div>
            <div className="trainee-assessment-list">
              {trainee.performance.recentPerformance.length ? (
                trainee.performance.recentPerformance.map((item) => (
                  <div key={`${item.assessment}-${item.date}`}>
                    <div>
                      <strong>{item.assessment}</strong>
                      <span>{item.date}</span>
                    </div>
                    <strong className="trainee-score">{item.score}%</strong>
                  </div>
                ))
              ) : (
                <p className="trainee-muted">No assessment results yet.</p>
              )}
            </div>
          </section>
        </div>
        <aside className="trainee-detail-side">
          <section className="trainee-panel">
            <div className="trainee-panel-heading">
              <div>
                <span className="trainee-eyebrow">Snapshot</span>
                <h2>Performance</h2>
              </div>
            </div>
            <div className="trainee-metrics-grid">
              <div>
                <span>Overall score</span>
                <strong>{trainee.performance.totalPerformance}%</strong>
              </div>
              <div>
                <span>Completion</span>
                <strong>{trainee.performance.completionRate}%</strong>
              </div>
              <div>
                <span>Assessments</span>
                <strong>
                  {trainee.performance.assessmentsCompleted}/
                  {trainee.performance.assessmentsTotal}
                </strong>
              </div>
              <div>
                <span>Certificates</span>
                <strong>{trainee.learning.certificates.length}</strong>
              </div>
            </div>
          </section>
          <section className="trainee-panel">
            <div className="trainee-panel-heading">
              <div>
                <span className="trainee-eyebrow">Recent activity</span>
                <h2>Activity</h2>
              </div>
            </div>
            <div className="trainee-activity-list">
              <div>
                <span>Last active</span>
                <strong>{trainee.activity.lastActive}</strong>
              </div>
              <div>
                <span>Learning hours</span>
                <strong>{trainee.activity.learningHours} hrs</strong>
              </div>
              <div>
                <span>Courses in progress</span>
                <strong>{trainee.activity.coursesInProgress}</strong>
              </div>
            </div>
          </section>
          <section className="trainee-panel">
            <div className="trainee-panel-heading">
              <div>
                <span className="trainee-eyebrow">Achievements</span>
                <h2>Certificates</h2>
              </div>
            </div>
            {trainee.learning.certificates.length ? (
              <div className="trainee-certificate-list">
                {trainee.learning.certificates.map((certificate) => (
                  <div key={certificate.id}>
                    <strong>{certificate.course}</strong>
                    <span>
                      {certificate.id} · Issued {certificate.issuedDate}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="trainee-muted">No certificates earned yet.</p>
            )}
          </section>
        </aside>
      </div>
      <ConfirmDialog
        open={deleteOpen}
        title="Delete trainee?"
        message={`${trainee.name} will be permanently removed from the trainee directory.`}
        confirmLabel="Delete trainee"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </section>
  );
}
