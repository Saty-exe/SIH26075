import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import AdminLayout from "./Layout/AdminLayout";
import TraineeLayout from "./Layout/TraineeLayout";
import TraineeDashboard from "./pages/Trainee/TraineeDashboard";
import TraineeProfile from "./pages/Trainee/TraineeProfile";
import TraineeCourses from "./pages/Trainee/TraineeCourses";
import TraineeCourseDetails from "./pages/Trainee/TraineeCourseDetails";
import TraineeLearning from "./pages/Trainee/TraineeLearning";
import {
  TraineeAssessments,
  TraineeAssessmentAttempt,
} from "./pages/Trainee/TraineeAssessments";
import TraineePerformance from "./pages/Trainee/TraineePerformance";
import TraineeCertificates from "./pages/Trainee/TraineeCertificates";
import TraineeNotifications from "./pages/Trainee/TraineeNotifications";
import TraineeSettings from "./pages/Trainee/TraineeSettings";
import Notifications from "./components/Admin/Notifications";
import Dashboard from "./pages/Admin/Dashboard";
import Trainees from "./pages/Admin/Trainees";
import TraineeDetails from "./pages/Admin/TraineeDetails";
import TraineeForm from "./pages/Admin/TraineeForm";
import Trainers from "./pages/Admin/Trainers";
import TrainerDetails from "./pages/Admin/TrainerDetails";
import TrainerForm from "./pages/Admin/TrainerForm";
import PendingApprovals from "./pages/Admin/PendingApprovals";
import AllCourses from "./pages/Admin/AllCourses";
import CreateCourse from "./pages/Admin/CreateCourse";
import CourseDetails from "./pages/Admin/CourseDetails";
import Categories from "./pages/Admin/Categories";
import Enrollments from "./pages/Admin/Enrollments";
import Questionnaires from "./pages/Admin/Questionnaires";
import Questions from "./pages/Admin/Questions";
import Results from "./pages/Admin/Results";
import Certifications from "./pages/Admin/Certifications";
import ParticipationPerformance from "./pages/Admin/ParticipationPerformance";
import CompetencyMapping from "./pages/Admin/CompetencyMapping";
import Announcements from "./pages/Admin/Announcements";
import Settings from "./pages/Admin/Settings";
import Complaints from "./pages/Admin/Complaints";
import TraineeComplaints from "./pages/Trainee/TraineeComplaints";
import TrainerLayout from "./Layout/TrainerLayout.jsx";
import TrainerDashboard from "./pages/Trainer/TrainerDashboard";
import TrainerProfile from "./pages/Trainer/TrainerProfile";
import TrainerCourses from "./pages/Trainer/TrainerCourses";
import CreateTrainerCourse from "./pages/Trainer/CreateCourse";
import TrainerCourseDetails from "./pages/Trainer/TrainerCourseDetails";
import TrainerLibrary from "./pages/Trainer/TrainerLibrary";
import TrainerTrainees from "./pages/Trainer/TrainerTrainees";
import TrainerAssessments from "./pages/Trainer/TrainerAssessments";
import CreateAssessment from "./pages/Trainer/CreateAssessment";
import TrainerAssessmentDetails from "./pages/Trainer/TrainerAssessmentDetails";
import TrainerResults from "./pages/Trainer/TrainerResults";
import TrainerPerformance from "./pages/Trainer/TrainerPerformance";
import TrainerCertificates from "./pages/Trainer/TrainerCertificates";
import TrainerAnnouncements from "./pages/Trainer/TrainerAnnouncements";
import TrainerNotifications from "./pages/Trainer/TrainerNotifications";
import TrainerSettings from "./pages/Trainer/TrainerSettings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="trainees/new" element={<TraineeForm />} />
        <Route path="trainees/:traineeId/edit" element={<TraineeForm />} />
        <Route path="trainees/:traineeId" element={<TraineeDetails />} />
        <Route path="trainees" element={<Trainees />} />
        <Route path="trainers/new" element={<TrainerForm />} />
        <Route path="trainers/:trainerId/edit" element={<TrainerForm />} />
        <Route path="trainers/:trainerId" element={<TrainerDetails />} />
        <Route path="trainers" element={<Trainers />} />
        <Route path="pending-approvals" element={<PendingApprovals />} />
        <Route path="courses/:courseId/edit" element={<CreateCourse />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="courses" element={<AllCourses />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="categories" element={<Categories />} />
        <Route path="enrollments" element={<Enrollments />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="questionnaires" element={<Questionnaires />} />
        <Route path="questions" element={<Questions />} />
        <Route path="results" element={<Results />} />
        <Route path="certifications" element={<Certifications />} />
        <Route
          path="participation-performance"
          element={<ParticipationPerformance />}
        />
        <Route path="competency-mapping" element={<CompetencyMapping />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/trainee" element={<TraineeLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<TraineeDashboard />} />
        <Route path="profile" element={<TraineeProfile />} />
        <Route path="courses" element={<TraineeCourses />} />
        <Route path="courses/:id" element={<TraineeCourseDetails />} />
        <Route path="learning" element={<TraineeLearning />} />
        <Route path="learning/:view" element={<TraineeLearning />} />
        <Route path="assessments" element={<TraineeAssessments />} />
        <Route path="assessments/:id" element={<TraineeAssessmentAttempt />} />
        <Route path="performance" element={<TraineePerformance />} />
        <Route path="certificates" element={<TraineeCertificates />} />
        <Route path="notifications" element={<TraineeNotifications />} />
        <Route path="complaints" element={<TraineeComplaints />} />
        <Route path="settings" element={<TraineeSettings />} />
      </Route>
      <Route path="/trainer" element={<TrainerLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<TrainerDashboard />} />
        <Route path="profile" element={<TrainerProfile />} />
        <Route path="courses" element={<TrainerCourses />} />
        <Route path="courses/create" element={<CreateTrainerCourse />} />
        <Route path="courses/:id" element={<TrainerCourseDetails />} />
        <Route path="library" element={<TrainerLibrary />} />
        <Route path="trainees" element={<TrainerTrainees />} />
        <Route path="assessments" element={<TrainerAssessments />} />
        <Route path="assessments/create" element={<CreateAssessment />} />
        <Route path="assessments/:id" element={<TrainerAssessmentDetails />} />
        <Route path="results" element={<TrainerResults />} />
        <Route path="performance" element={<TrainerPerformance />} />
        <Route path="certificates" element={<TrainerCertificates />} />
        <Route path="announcements" element={<TrainerAnnouncements />} />
        <Route path="notifications" element={<TrainerNotifications />} />
        <Route path="settings" element={<TrainerSettings />} />
      </Route>
    </Routes>
  );
}
