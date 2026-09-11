import AdminSectionPage from "../../components/Admin/AdminSectionPage";
import { useSelector } from "react-redux";
import { Megaphone } from "lucide-react";

export default function Announcements() {
  const announcements = useSelector(
    (state) => state.announcementReducer.announcements,
  );
  return (
    <>
      <AdminSectionPage section="announcements" />
      <section className="admin-section-page">
        <div className="admin-section-heading">
          <div>
            <span className="admin-section-eyebrow">
              Shared trainer updates
            </span>
            <h2>Trainer announcements</h2>
            <p>
              Announcements created by trainers are visible here for platform
              oversight.
            </p>
          </div>
        </div>
        <div className="admin-section-grid">
          {announcements.map((announcement) => (
            <article className="admin-section-card" key={announcement.id}>
              <div className="admin-section-card-icon">
                <Megaphone size={18} />
              </div>
              <div>
                <h2>{announcement.title}</h2>
                <p>{announcement.message}</p>
                <small>
                  {announcement.publishDate} · {announcement.status}
                </small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
