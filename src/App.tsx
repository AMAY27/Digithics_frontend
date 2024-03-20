import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ClientDashboardLayout from "./layouts/ClientDashboardLayout";
import DashboardPage from "./pages/client/DashboardPage";
import WebsiteViewPage from "./pages/client/WebsitesPage";
import ExpertSignin from "./pages/expert/ExpertSignin";
import ExpertDashboard from "./pages/expert/ExpertDashboard";
import WebsiteDashboard from "./pages/expert/WebsiteDashboard";
import SignIn from "./pages/client/SignInPage";
import SignUp from "./pages/client/SignUpPage";
import { AuthProvider } from "./context/AuthContext1";
import LandingPage from "./pages/landing/LandingPage";
import NavbarPage from "./pages/landing/NavbarPage";
import { ExpertProvider } from "./context/ExpertContext";
import SuperAdmin from "./pages/superAdmin/SuperAdmin";
import SuperAdminSignin from "./pages/superAdmin/SuperAdminSignin";
import { AdminProvider } from "./context/AdminContext";
import ServicePage from "./pages/landing/ServicePage";
import ProcessPage from "./pages/landing/ProcessPage";
import PaymentPage from "./pages/landing/PaymentPage";
import WebsiteDetailsPage from "./pages/client/WebsiteDetailsPage";

function App() {
  return (
    <AuthProvider>
      <ExpertProvider>
        <AdminProvider>
          <Routes>
            {/* <!-- Common routes --> */}
            <Route path="/" element={<ExpertSignin />} />

            <Route path="/processpage" element={<ProcessPage />} />
            <Route path="/servicepage" element={<ServicePage />} />
            <Route path="/paymentpage" element={<PaymentPage />} />
            <Route path="/navbar" element={<NavbarPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/expertsignin" element={<ExpertSignin />} />
            <Route path="/adminsignin" element={<SuperAdminSignin />} />

            {/* <!-- Client Dashboard routes --> */}
            <Route path="/client" element={<ClientDashboardLayout />}>
              {/* Redirect to actual dashboard instead of just layout page */}
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="websites" element={<WebsiteViewPage />} />
              <Route path="website/:id" element={<WebsiteDetailsPage />} />
            </Route>
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
