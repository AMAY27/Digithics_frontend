import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ExpertSignin from "./pages/expert/ExpertSignin";
import ExpertDashboard from "./pages/expert/ExpertDashboard";
import WebsiteDashboard from "./pages/expert/WebsiteDashboard";
import { AuthProvider } from "./context/AuthContext1";
import { ExpertProvider } from "./context/ExpertContext";
import SuperAdmin from "./pages/superAdmin/SuperAdmin";
import SuperAdminSignin from "./pages/superAdmin/SuperAdminSignin";
import { AdminProvider } from "./context/AdminContext";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <AuthProvider>
      <ExpertProvider>
        <AdminProvider>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/expertsignin" element={<ExpertSignin />} />
            <Route path="/adminsignin" element={<SuperAdminSignin />} />
            <Route path="/expert/dashboard" element={<ExpertDashboard />} />
            <Route path="/expert/website" element={<WebsiteDashboard />} />
            <Route path="/superAdmin" element={<SuperAdmin />} />
          </Routes>
        </AdminProvider>
      </ExpertProvider>
    </AuthProvider>
  );
}

export default App;
