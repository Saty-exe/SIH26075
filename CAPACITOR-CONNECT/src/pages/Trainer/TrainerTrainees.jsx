import { Search, Users } from "lucide-react";
import { useState } from "react";
import useTrainerData from "./hooks/useTrainerData";
import {
  TrainerEmpty,
  TrainerPageIntro,
  TrainerProgressRow,
} from "../../components/Trainer/TrainerComponents";

export default function TrainerTrainees() {
  const { trainees } = useTrainerData();
  const [query, setQuery] = useState("");
  const visible = trainees.filter((trainee) =>
    `${trainee.name} ${trainee.email}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <section className="trainer-page">
      <TrainerPageIntro
        eyebrow="Learner support"
        title="Trainees"
        description="Monitor progress and identify learners who may need support."
      />
      <div className="trainer-toolbar">
        <label className="trainer-search">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search trainees..."
          />
        </label>
        <span>
          <Users size={15} /> {visible.length} learners
        </span>
      </div>
      <article className="trainer-panel trainer-trainee-list">
        {visible.map((trainee) => (
          <TrainerProgressRow key={trainee.id} trainee={trainee} />
        ))}
        {!visible.length && <TrainerEmpty title="No trainees found" />}
      </article>
    </section>
  );
}
