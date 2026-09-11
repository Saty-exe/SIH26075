import { useState } from "react";
import { useSelector } from "react-redux";
import { Award, Bell, BookOpen, CalendarDays } from "lucide-react";
import { PageIntro } from "./components/PortalComponents";
import useTraineeData from "./hooks/useTraineeData";

const initialNotifications = [
  {
    id: 1,
    icon: BookOpen,
    title: "New course available",
    text: "Data Analytics Fundamentals is now open for enrollment.",
    date: "Today",
    read: false,
  },
  {
    id: 2,
    icon: CalendarDays,
    title: "Assessment deadline coming up",
    text: "Your next assessment deadline is approaching.",
    date: "Yesterday",
    read: false,
  },
  {
    id: 3,
    icon: Award,
    title: "Certificate issued",
    text: "Your course credential is ready.",
    date: "20 Aug",
    read: true,
  },
  {
    id: 4,
    icon: Bell,
    title: "Welcome to Capacity Connect",
    text: "Your learning workspace is ready.",
    date: "12 Jul",
    read: true,
  },
];

export default function TraineeNotifications() {
  const { enrollments } = useTraineeData();
  const announcements = useSelector(
    (state) => state.announcementReducer.announcements,
  );
  const [notifications, setNotifications] = useState(initialNotifications);
  const sharedNotifications = announcements
    .filter((announcement) => announcement.status === "Published")
    .filter(
      (announcement) =>
        announcement.target === "all-trainees" ||
        enrollments.some((item) => item.course.id === announcement.courseId),
    )
    .map((announcement) => ({
      id: announcement.id,
      icon: Bell,
      title: announcement.title,
      text: announcement.message,
      date: announcement.publishDate,
      read: false,
    }));
  const visibleNotifications = [...sharedNotifications, ...notifications];
  const markRead = (id) =>
    setNotifications((items) =>
      items.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  return (
    <section className="trainee-page">
      <PageIntro
        eyebrow="Stay in the loop"
        title="Notifications"
        description="Important updates from your courses, assessments, and learning community."
        action={
          <button
            className="trainee-text-button"
            onClick={() =>
              setNotifications((items) =>
                items.map((item) => ({ ...item, read: true })),
              )
            }
          >
            Mark all as read
          </button>
        }
      />
      <div className="trainee-notification-list">
        {visibleNotifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <article
              className={`trainee-notification${notification.read ? " is-read" : ""}`}
              key={notification.id}
              onClick={() => markRead(notification.id)}
            >
              <div className="trainee-notification-icon">
                <Icon size={18} />
              </div>
              <div>
                <strong>{notification.title}</strong>
                <p>{notification.text}</p>
                <span>{notification.date}</span>
              </div>
              {!notification.read && <i />}
            </article>
          );
        })}
      </div>
    </section>
  );
}
