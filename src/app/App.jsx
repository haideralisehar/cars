import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

import LoginApp from "../app/LoginApp";
import AuthenticatedApp from "../app/AuthenticatedApp";
import ProtectedRoute from "./components/protectedroute";
import { getUserFromToken } from "../utils/decodeToken";
import { logoutUser } from "../utils/logout";

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading application...</p>
    </div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = Cookies.get("token");
        
        if (token) {
          // Decode token synchronously
          const decodedUser = getUserFromToken(token);
          setUser(decodedUser.role);
          setuserData(decodedUser);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleLogout = () => {
    logoutUser();
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginApp />
          }
        />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AuthenticatedApp
                user={user}
                userData={userData}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />

        {/* Catch all other routes */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { useState, useEffect } from "react";

// import LoginApp from "../app/LoginApp";
// import AuthenticatedApp from "../app/AuthenticatedApp";
// import ProtectedRoute from "./components/protectedroute";
// import { getUserFromToken } from "../utils/decodeToken";
// import { logoutUser } from "../utils/logout";
// import { verifyToken } from "../api/auth"; // You'll need this API

// const LoadingScreen = () => (
//   <div className="min-h-screen flex items-center justify-center bg-background">
//     <div className="text-center">
//       <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//       <p className="text-muted-foreground">Loading application...</p>
//     </div>
//   </div>
// );

// function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const token = Cookies.get("token");
        
//         if (!token) {
//           setIsAuthenticated(false);
//           setUser(null);
//           setIsLoading(false);
//           return;
//         }

//         // Option 1: Just decode locally (synchronous)
//         // const decodedUser = getUserFromToken(token);
//         // setUser(decodedUser);
//         // setIsAuthenticated(true);

//         // Option 2: Verify with backend (asynchronous)
//         const response = await verifyToken(token);
        
//         if (response.valid) {
//           const decodedUser = getUserFromToken(token);
//           setUser(decodedUser);
//           setIsAuthenticated(true);
//         } else {
//           // Token invalid, remove it
//           Cookies.remove("token");
//           setIsAuthenticated(false);
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Auth initialization error:", error);
//         Cookies.remove("token");
//         setIsAuthenticated(false);
//         setUser(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     initializeAuth();
//   }, []);

//   const handleLogout = () => {
//     logoutUser();
//     Cookies.remove("token");
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginApp />
//           }
//         />

//         <Route
//           path="/dashboard/*"
//           element={
//             <ProtectedRoute isAuthenticated={isAuthenticated}>
//               <AuthenticatedApp
//                 user={user}
//                 onLogout={handleLogout}
//               />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="*"
//           element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;