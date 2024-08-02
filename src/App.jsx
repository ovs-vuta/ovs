import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Base from "./components/layouts/Base";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/Dashboard";
import VotingPage from "./pages/Vote";
import OBCVoterPage from "./pages/OBCVoterPage";
import ECCVoterPage from "./pages/ECCVoterPage";

import OfficeBearer from "./components/dashboard/OfficeBearer";
import ExecutiveCommete from "./components/dashboard/ExecutiveCommete";
import FileUpload from "./components/ui/FileUpload";
import ExcelReader from "./components/vote/ExcelReader";
import "./App.css";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Base />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            {" "}
            <DashboardPage />
          </AdminRoute>
        }
      >
        <Route index element={<OfficeBearer />} />
        <Route path="ecc-members" element={<ExecutiveCommete />} />
        <Route path="upload-users" element={<FileUpload />} />
        <Route path="OBC-vote-data" element={<ExcelReader />} />
      </Route>
      <Route
        path="vote"
        element={
          <ProtectedRoute>
            <VotingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="office-bearer-vote"
        element={
          <ProtectedRoute>
            <OBCVoterPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="executive-vote"
        element={
          <ProtectedRoute>
            <ECCVoterPage />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
