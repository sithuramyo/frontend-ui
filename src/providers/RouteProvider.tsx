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
import IconLayout from "@/layouts/IconLayout";
import FollowUp from "@/components/pages/admin/patients/follow-up";
import InventoryPage from "@/pages/Home/Inventory/InventoryPage";
import FacilityDashboard from "@/pages/Facility/Dashboard";
import DrugTreatment from "@/pages/Facility/DrugTreatment";
import MMTARTCascade from "@/pages/Facility/MMTARTCascade";
import BCCoInfection from "@/pages/Facility/BCCoInfection";
import SixMonthsRetention from "@/pages/Facility/SixMonthsRetention";
import ExpiredAndCauseOfDeath from "@/pages/Facility/ExpiredAndCauseOfDeath";
import FacilityLayout from "@/layouts/FacilityLayout";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Auth /> }
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
      { path: 'daily-operation', element: <DailyOperationPage /> },
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'dispense', element: <Dispensing /> },
      { path: 'patient/follow-up', element: <FollowUpPage /> },
      { path: 'registration/regfollowup', element: <Reg_followup /> }
    ],
  },
  {
    path: '/iconOnlyHome',
    element: (
      <IconLayout />
      // <ProtectedRoute>
      // <HomeLayout />
      // </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'patient', element: <PatientPage /> },
      { path: 'registration', element: <CreatePatientPage /> },
      { path: 'daily-operation', element: <DailyOperationPage /> },
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'dispense', element: <Dispensing /> },
      { path: 'patient/follow-up', element: <FollowUp /> },
      { path: 'registration/regfollowup', element: <Reg_followup /> }
    ],
  },
  {
    path: '/facility',
    element: (
      <FacilityLayout />
      // <ProtectedRoute>
      // <HomeLayout />
      // </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <FacilityDashboard /> },
      { path: 'drugs-treatment', element: <DrugTreatment /> },
      { path: 'mmt-art-cascade', element: <MMTARTCascade /> },
      { path: 'b-c-co-infection', element: <BCCoInfection /> },
      { path: 'six-months-retention', element: <SixMonthsRetention /> },
      { path: 'expired-and-cause-of-death', element: <ExpiredAndCauseOfDeath /> }
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  }
])