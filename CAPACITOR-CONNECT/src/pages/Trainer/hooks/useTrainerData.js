import { useSelector } from "react-redux";
import { selectCurrentTrainer, selectTrainerCourses, selectTrainerTrainees } from "../../../features/Trainer/trainerSelectors";

export default function useTrainerData() {
  const trainer = useSelector(selectCurrentTrainer);
  const courses = useSelector((state) => selectTrainerCourses(state, trainer));
  const trainees = useSelector((state) => selectTrainerTrainees(state, courses));
  const assessments = useSelector((state) => state.assessmentReducer.assessments).filter((assessment) => courses.some((course) => course.title === assessment.course));
  const results = useSelector((state) => state.assessmentReducer.results);
  return { trainer, courses, trainees, assessments, results };
}
