import initialTrainers from "./trainerData";

const storageKey = "capacity-connect-trainers";

export function getTrainers() {
  const storedTrainers = window.localStorage.getItem(storageKey);

  if (!storedTrainers) {
    return initialTrainers;
  }

  try {
    return JSON.parse(storedTrainers);
  } catch {
    return initialTrainers;
  }
}

export function saveTrainers(nextTrainers) {
  window.localStorage.setItem(storageKey, JSON.stringify(nextTrainers));
  return nextTrainers;
}

export function getTrainerById(id) {
  return getTrainers().find((trainer) => String(trainer.id) === String(id));
}

export function createTrainer(values) {
  const currentTrainers = getTrainers();
  const nextId = Math.max(0, ...currentTrainers.map((trainer) => trainer.id)) + 1;
  const trainer = buildTrainer(values, nextId);

  saveTrainers([...currentTrainers, trainer]);
  return trainer;
}

export function updateTrainer(id, values) {
  const currentTrainers = getTrainers();
  const trainer = buildTrainer(values, Number(id));
  const nextTrainers = currentTrainers.map((item) =>
    item.id === Number(id) ? { ...item, ...trainer } : item,
  );

  saveTrainers(nextTrainers);
  return trainer;
}

export function deleteTrainer(id) {
  const nextTrainers = getTrainers().filter(
    (trainer) => trainer.id !== Number(id),
  );

  saveTrainers(nextTrainers);
  return nextTrainers;
}

function buildTrainer(values, id) {
  const now = new Date().toISOString().slice(0, 10);
  const skills = splitValues(values.skills);
  const subjects = splitValues(values.subjects);
  const interests = splitValues(values.interests);

  return {
    id,
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    role: "trainer",
    status: values.status,
    joinedDate: values.joinedDate || now,
    profile: {
      designation: values.designation.trim(),
      organization: values.organization.trim(),
      qualification: values.qualification.trim(),
      experience: Number(values.experience) || 0,
      location: values.location.trim(),
      bio: values.bio.trim(),
    },
    skills,
    subjects,
    interests,
    courses: values.courses || [],
    performance: values.performance || {
      totalCourses: 0,
      totalTrainees: 0,
      averageCourseRating: 0,
      averageTraineeScore: 0,
      courseCompletionRate: 0,
    },
    activity: values.activity || {
      lastActive: now,
      lecturesUploaded: 0,
      resourcesUploaded: 0,
      assessmentsCreated: 0,
    },
    questionnaires: values.questionnaires || [],
  };
}

function splitValues(value) {
  return Array.isArray(value)
    ? value
    : value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}
