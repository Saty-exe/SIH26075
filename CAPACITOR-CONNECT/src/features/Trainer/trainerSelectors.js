export const DEMO_TRAINER_ID = 203;

export function selectCurrentTrainer(state) {
  const trainerId = Number(window.localStorage.getItem("trainerId")) || DEMO_TRAINER_ID;
  return state.trainerReducer.trainer.find((trainer) => trainer.id === trainerId) || state.trainerReducer.trainer[0];
}

export function selectTrainerCourses(state, trainer) {
  const courses = state.courseReducer.courses;
  return courses.filter((course) => course.trainerId === trainer?.id || course.instructor === trainer?.name || trainer?.courses?.some((item) => item.title === course.title));
}

export function selectTrainerTrainees(state, trainerCourses) {
  const trainees = state.traineeReducer.trainee;
  return trainees.filter((trainee) => trainee.learning.enrolledCourses.some((enrollment) => trainerCourses.some((course) => course.id === enrollment.courseId || course.title === enrollment.title)));
}
