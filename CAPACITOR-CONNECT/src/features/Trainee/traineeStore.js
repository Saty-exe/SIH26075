import initialTrainees from "./traineeData";

const storageKey = "capacity-connect-trainees";

export function getTrainees() {
  const storedTrainees = window.localStorage.getItem(storageKey);

  if (!storedTrainees) return initialTrainees;

  try {
    return JSON.parse(storedTrainees);
  } catch {
    return initialTrainees;
  }
}

export function getTraineeById(id) {
  return getTrainees().find((trainee) => String(trainee.id) === String(id));
}

export function saveTrainees(nextTrainees) {
  window.localStorage.setItem(storageKey, JSON.stringify(nextTrainees));
  return nextTrainees;
}

export function createTrainee(values) {
  const currentTrainees = getTrainees();
  const nextId = Math.max(0, ...currentTrainees.map((trainee) => trainee.id)) + 1;
  const trainee = buildTrainee(values, nextId);

  saveTrainees([...currentTrainees, trainee]);
  return trainee;
}

export function updateTrainee(id, values) {
  const currentTrainees = getTrainees();
  const trainee = buildTrainee(values, Number(id));
  const nextTrainees = currentTrainees.map((item) =>
    item.id === Number(id) ? { ...item, ...trainee } : item,
  );

  saveTrainees(nextTrainees);
  return trainee;
}

export function deleteTrainee(id) {
  const nextTrainees = getTrainees().filter(
    (trainee) => trainee.id !== Number(id),
  );

  saveTrainees(nextTrainees);
  return nextTrainees;
}

function buildTrainee(values, id) {
  const now = new Date().toISOString().slice(0, 10);
  const skills = splitValues(values.skills);
  const interests = splitValues(values.interests);

  return {
    id,
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    role: "trainee",
    status: values.status,
    joinedDate: values.joinedDate || now,
    qualification: values.qualification.trim(),
    institution: values.institution.trim(),
    workExperience: Number(values.workExperience) || 0,
    skills,
    interests,
    learning: values.learning || {
      enrolledCourses: [],
      completedCourses: 0,
      certificates: [],
    },
    performance: values.performance || {
      totalPerformance: 0,
      completionRate: 0,
      assessmentsCompleted: 0,
      assessmentsTotal: 0,
      recentPerformance: [],
    },
    activity: values.activity || {
      lastActive: now,
      learningHours: 0,
      coursesInProgress: 0,
    },
  };
}

function splitValues(value) {
  return Array.isArray(value)
    ? value
    : value.split(",").map((item) => item.trim()).filter(Boolean);
}
