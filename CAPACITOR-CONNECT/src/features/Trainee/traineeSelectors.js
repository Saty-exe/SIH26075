export const DEMO_TRAINEE_ID = 1;

export function selectCurrentTrainee(state) {
  const traineeId = Number(window.localStorage.getItem("traineeId")) || DEMO_TRAINEE_ID;
  return state.traineeReducer.trainee.find((trainee) => trainee.id === traineeId) || state.traineeReducer.trainee[0];
}

export function selectCourses(state) {
  return state.courseReducer.courses;
}

export function selectTrainers(state) {
  return state.trainerReducer.trainer;
}

export function findCourse(courses, enrollment) {
  if (!enrollment) return null;
  return courses.find((course) => course.id === enrollment.courseId) ||
    courses.find((course) => course.title === enrollment.title);
}

export function findTrainer(trainers, course) {
  if (!course) return null;
  return trainers.find((trainer) => trainer.id === course.trainerId) ||
    trainers.find((trainer) => trainer.name === course.instructor);
}

export function getEnrichedEnrollments(trainee, courses, trainers) {
  return (trainee?.learning.enrolledCourses || []).map((enrollment) => {
    const course = findCourse(courses, enrollment) || {
      id: enrollment.courseId,
      title: enrollment.title,
      description: "Continue building practical skills through guided learning resources.",
      category: "Learning pathway",
      level: "Intermediate",
      duration: "Self-paced",
      status: "Published",
      instructor: "Capacity Connect faculty",
      enrolledTrainees: 0,
      completionRate: 0,
    };
    return { ...enrollment, course, trainer: findTrainer(trainers, course) };
  });
}

export function getAssessmentsForTrainee(assessments, enrollments) {
  const enrolledTitles = new Set(enrollments.map(({ course }) => course.title));
  return assessments.filter((assessment) => enrolledTitles.has(assessment.course));
}
