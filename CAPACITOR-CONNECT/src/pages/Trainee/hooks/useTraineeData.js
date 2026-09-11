import { useSelector } from "react-redux";
import { getAssessmentsForTrainee, getEnrichedEnrollments, selectCourses, selectCurrentTrainee, selectTrainers } from "../../../features/Trainee/traineeSelectors";

export default function useTraineeData() {
  const trainee = useSelector(selectCurrentTrainee);
  const courses = useSelector(selectCourses);
  const trainers = useSelector(selectTrainers);
  const allAssessments = useSelector((state) => state.assessmentReducer.assessments);
  const results = useSelector((state) => state.assessmentReducer.results);
  const enrollments = getEnrichedEnrollments(trainee, courses, trainers);
  return { trainee, courses, trainers, assessments: getAssessmentsForTrainee(allAssessments, enrollments), results, enrollments };
}
