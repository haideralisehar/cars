import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import LoginApp from "../app/LoginApp";
import AuthenticatedApp from "../app/AuthenticatedApp";
import ProtectedRoute from "./components/protectedroute";
import { getUserFromToken } from "../utils/decodeToken";
import { logoutUser } from "../utils/logout";

function App() {

  const token = Cookies.get("token");

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" replace /> : <LoginApp />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AuthenticatedApp
                user={getUserFromToken()}
                onLogout={() => {
                   logoutUser();
                  Cookies.remove("token");
                 
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