import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import LoginApp from "../app/LoginApp";
import AuthenticatedApp from "../app/AuthenticatedApp";
import ProtectedRoute from "./components/protectedroute";
import { getUserFromToken } from "../utils/decodeToken";

function App() {
  const token = Cookies.get("token");
  const user = getUserFromToken();

  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginApp />
            )
          }
        />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AuthenticatedApp
                user={
                   user}
                onLogout={() => {
                  Cookies.remove("token");
                  window.location.href = "/";
                }}
              />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;