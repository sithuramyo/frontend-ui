import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import NotFound from "../components/ui/not-found";
import Dashboard from "../pages/Home/Dashboard";
import HomeLayout from "../layouts/HomeLayout";
import PatientPage from "@/pages/Home/Patient/PatientPage";
import CreatePatientPage from "@/pages/Home/Patient/CreatePatientPage";
import Dispensing from "@/pages/Home/Dispense/Dispensing";
import DailyOperationPage from "@/pages/Home/DailyOperation/DailyOperationPage";
import FollowUpPage from "@/pages/Home/Patient/FollowUpPage";
import AuthLayout from "@/layouts/AuthLayout";
import Reg_followup from "@/components/pages/admin/patients/follow-up/reg_followup";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Auth />}
      // { path: 'login', element: <Auth />, loader: loader },
    ],
  },
  {
    path: '/home',
    element: (
      <HomeLayout />
      // <ProtectedRoute>
      // <HomeLayout />
      // </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'patient', element: <PatientPage /> },
      { path: 'registration', element: <CreatePatientPage /> },
      { path: 'daily-operation', element: <DailyOperationPage/>},
      { path: 'dispense', element: <Dispensing /> },
      { path: 'follow-up', element: <FollowUpPage /> },
      { path: 'regfollowup', element: <Reg_followup/> }
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  }
])