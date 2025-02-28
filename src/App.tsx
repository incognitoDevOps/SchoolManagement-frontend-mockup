import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentResults from './pages/StudentResults';
import StudentTimetable from './pages/StudentTimetable';
import StudentComplaints from './pages/StudentComplaints';
import CourseResults from './pages/CourseResults';
import StaffComplaints from './pages/StaffComplaints';
import DepartmentTimetable from './pages/DepartmentTimetable';
import RoomAllocation from './pages/RoomAllocation';

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = [] }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { isAuthenticated, currentUser } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles.length > 0 && currentUser && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <Layout>
              <ProtectedRoute>
                <Navigate to="/dashboard" />
              </ProtectedRoute>
            </Layout>
          } />
          
          <Route path="/dashboard" element={
            <Layout>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Layout>
          } />
          
          {/* Student Routes */}
          <Route path="/results" element={
            <Layout>
              <ProtectedRoute allowedRoles={['student']}>
                <StudentResults />
              </ProtectedRoute>
            </Layout>
          } />
          
          <Route path="/timetable" element={
            <Layout>
              <ProtectedRoute allowedRoles={['student']}>
                <StudentTimetable />
              </ProtectedRoute>
            </Layout>
          } />
          
          <Route path="/complaints" element={
            <Layout>
              <ProtectedRoute allowedRoles={['student']}>
                <StudentComplaints />
              </ProtectedRoute>
            </Layout>
          } />
          
          {/* Staff Routes */}
          <Route path="/course-results" element={
            <Layout>
              <ProtectedRoute allowedRoles={['staff', 'hod']}>
                <CourseResults />
              </ProtectedRoute>
            </Layout>
          } />
          
          <Route path="/complaints-review" element={
            <Layout>
              <ProtectedRoute allowedRoles={['staff', 'hod']}>
                <StaffComplaints />
              </ProtectedRoute>
            </Layout>
          } />
          
          {/* HOD Routes */}
          <Route path="/department-timetable" element={
            <Layout>
              <ProtectedRoute allowedRoles={['hod']}>
                <DepartmentTimetable />
              </ProtectedRoute>
            </Layout>
          } />
          
          <Route path="/room-allocation" element={
            <Layout>
              <ProtectedRoute allowedRoles={['hod']}>
                <RoomAllocation />
              </ProtectedRoute>
            </Layout>
          } />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;