import { useState } from "react";
import { CheckCircle2, ClipboardCheck, Users } from "lucide-react";
import { TrainerPageIntro } from "../../components/Trainer/TrainerComponents";

const initialItems = [
  {
    id: 1,
    icon: Users,
    title: "New trainee enrollment",
    text: "A learner joined one of your courses.",
    date: "Today",
    read: false,
  },
  {
    id: 2,
    icon: ClipboardCheck,
    title: "Assessment completed",
    text: "A new learner result is ready to review.",
    date: "Yesterday",
    read: false,
  },
  {
    id: 3,
    icon: CheckCircle2,
    title: "Course completion",
    text: "A trainee completed a course in your catalogue.",
    date: "3 days ago",
    read: true,
  },
];

export default function TrainerNotifications() {
  const [items, setItems] = useState(initialItems);
  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Trainer updates"
        title="Notifications"
        description="Stay informed about learners, assessments, and course activity."
        action={
          <button
            className="trainer-secondary-button"
            onClick={() =>
              setItems((current) =>
                current.map((item) => ({ ...item, read: true })),
              )
            }
          >
            Mark all as read
          </button>
        }
      />
      <div className="trainer-notification-list">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <article
              className={`trainer-notification${item.read ? " is-read" : ""}`}
              key={item.id}
              onClick={() =>
                setItems((current) =>
                  current.map((entry) =>
                    entry.id === item.id ? { ...entry, read: true } : entry,
                  ),
                )
              }
            >
              <div>
                <Icon size={18} />
              </div>
              <section>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
                <small>{item.date}</small>
              </section>
              {!item.read && <i />}
            </article>
          );
        })}
      </div>
    </section>
  );
}
