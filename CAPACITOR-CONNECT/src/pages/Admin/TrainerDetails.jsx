import { ArrowLeft, Edit3, Mail, MapPin, Phone, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmDialog from "../../components/Admin/ConfirmDialog";
import {
  deleteTrainer,
  getTrainerById,
} from "../../features/Trainer/trainerStore";

function DetailMetric({ label, value }) {
  return (
    <div className="trainer-detail-metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function TrainerDetails() {
  const { trainerId } = useParams();
  const navigate = useNavigate();
  const trainer = getTrainerById(trainerId);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = () => {
    deleteTrainer(trainer.id);
    navigate("/admin/trainers");
  };

  if (!trainer) {
    return (
      <section className="trainer-page trainer-empty-state">
        <h1>Trainer not found</h1>
        <p>The trainer record may have been removed or the link is invalid.</p>
        <Link className="trainer-secondary-button" to="/admin/trainers">
          Back to trainers
        </Link>
      </section>
    );
  }

  return (
    <section className="trainer-page trainer-details-page">
      <Link className="trainer-back-link" to="/admin/trainers">
        <ArrowLeft size={16} /> Back to trainers
      </Link>

      <div className="trainer-detail-hero">
        <div className="trainer-avatar trainer-avatar-large">
          {trainer.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div className="trainer-detail-heading">
          <div className="trainer-title-row">
            <div>
              <span className="trainer-eyebrow">Trainer profile</span>
              <h1>{trainer.name}</h1>
            </div>
            <span
              className={`trainer-status trainer-status-${trainer.status.toLowerCase()}`}
            >
              {trainer.status}
            </span>
          </div>
          <p className="trainer-designation">{trainer.profile.designation}</p>
          <div className="trainer-detail-actions">
            <Link
              className="trainer-secondary-button"
              to={`/admin/trainers/${trainer.id}/edit`}
            >
              <Edit3 size={15} /> Edit trainer
            </Link>
            <button
              className="trainer-danger-button"
              type="button"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 size={15} /> Delete trainer
            </button>
          </div>
          <div className="trainer-contact-row">
            <span>
              <Mail size={15} /> {trainer.email}
            </span>
            <span>
              <Phone size={15} /> {trainer.phone}
            </span>
            <span>
              <MapPin size={15} /> {trainer.profile.location}
            </span>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete trainer?"
        message={`${trainer.name} will be permanently removed from the trainer directory.`}
        confirmLabel="Delete trainer"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />

      <div className="trainer-detail-grid">
        <div className="trainer-detail-main">
          <section className="trainer-panel">
            <div className="trainer-panel-heading">
              <div>
                <span className="trainer-eyebrow">Professional profile</span>
                <h2>About {trainer.name.split(" ").slice(-1)[0]}</h2>
              </div>
            </div>
            <p className="trainer-bio">{trainer.profile.bio}</p>
            <div className="trainer-info-grid">
              <div>
                <span>Organization</span>
                <strong>{trainer.profile.organization}</strong>
              </div>
              <div>
                <span>Qualification</span>
                <strong>{trainer.profile.qualification}</strong>
              </div>
              <div>
                <span>Experience</span>
                <strong>{trainer.profile.experience} years</strong>
              </div>
              <div>
                <span>Joined</span>
                <strong>{trainer.joinedDate}</strong>
              </div>
            </div>
          </section>

          <section className="trainer-panel">
            <div className="trainer-panel-heading">
              <div>
                <span className="trainer-eyebrow">Teaching portfolio</span>
                <h2>Courses</h2>
              </div>
              <span className="trainer-count">
                {trainer.courses.length} courses
              </span>
            </div>
            <div className="trainer-course-list">
              {trainer.courses.length ? (
                trainer.courses.map((course) => (
                  <article className="trainer-course-row" key={course.courseId}>
                    <div>
                      <strong>{course.title}</strong>
                      <span>
                        {course.category} · {course.enrolledTrainees} enrolled
                      </span>
                    </div>
                    <div className="trainer-course-result">
                      <span
                        className={`trainer-course-status trainer-course-${course.status.toLowerCase()}`}
                      >
                        {course.status}
                      </span>
                      <strong>{course.completionRate}% completion</strong>
                    </div>
                  </article>
                ))
              ) : (
                <p className="trainer-muted">No courses assigned yet.</p>
              )}
            </div>
          </section>

          <section className="trainer-panel">
            <div className="trainer-panel-heading">
              <div>
                <span className="trainer-eyebrow">Assessment activity</span>
                <h2>Questionnaires</h2>
              </div>
            </div>
            {trainer.questionnaires.length ? (
              trainer.questionnaires.map((questionnaire) => (
                <div className="trainer-questionnaire" key={questionnaire.id}>
                  <div>
                    <strong>{questionnaire.title}</strong>
                    <span>Deadline {questionnaire.deadline}</span>
                  </div>
                  <div>
                    <strong>
                      {questionnaire.completed}/{questionnaire.participants}
                    </strong>
                    <span>completed</span>
                  </div>
                  <span className="trainer-course-status trainer-course-published">
                    {questionnaire.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="trainer-muted">No questionnaires created yet.</p>
            )}
          </section>
        </div>

        <aside className="trainer-detail-side">
          <section className="trainer-panel">
            <div className="trainer-panel-heading">
              <div>
                <span className="trainer-eyebrow">Snapshot</span>
                <h2>Performance</h2>
              </div>
            </div>
            <div className="trainer-metrics-grid">
              <DetailMetric
                label="Courses"
                value={trainer.performance.totalCourses}
              />
              <DetailMetric
                label="Trainees"
                value={trainer.performance.totalTrainees}
              />
              <DetailMetric
                label="Avg. rating"
                value={`${trainer.performance.averageCourseRating}/5`}
              />
              <DetailMetric
                label="Avg. score"
                value={`${trainer.performance.averageTraineeScore}%`}
              />
              <DetailMetric
                label="Completion"
                value={`${trainer.performance.courseCompletionRate}%`}
              />
            </div>
          </section>

          <section className="trainer-panel">
            <div className="trainer-panel-heading">
              <div>
                <span className="trainer-eyebrow">Recent activity</span>
                <h2>Activity</h2>
              </div>
            </div>
            <div className="trainer-activity-list">
              <div>
                <span>Last active</span>
                <strong>{trainer.activity.lastActive}</strong>
              </div>
              <div>
                <span>Lectures uploaded</span>
                <strong>{trainer.activity.lecturesUploaded}</strong>
              </div>
              <div>
                <span>Resources uploaded</span>
                <strong>{trainer.activity.resourcesUploaded}</strong>
              </div>
              <div>
                <span>Assessments created</span>
                <strong>{trainer.activity.assessmentsCreated}</strong>
              </div>
            </div>
          </section>

          <section className="trainer-panel">
            <div className="trainer-panel-heading">
              <div>
                <span className="trainer-eyebrow">Expertise</span>
                <h2>Skills & subjects</h2>
              </div>
            </div>
            <div className="trainer-tag-list">
              {[...trainer.skills, ...trainer.subjects]
                .filter((item, index, list) => list.indexOf(item) === index)
                .map((item) => (
                  <span key={item}>{item}</span>
                ))}
            </div>
          </section>

          <section className="trainer-panel">
            <div className="trainer-panel-heading">
              <div>
                <span className="trainer-eyebrow">Outside the classroom</span>
                <h2>Interests</h2>
              </div>
            </div>
            <div className="trainer-tag-list trainer-tag-list-soft">
              {trainer.interests.map((interest) => (
                <span key={interest}>{interest}</span>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
