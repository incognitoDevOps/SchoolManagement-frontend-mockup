import React from 'react';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, LogOut, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getNavLinks = () => {
    if (!currentUser) return [];

    switch (currentUser.role) {
      case 'student':
        return [
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/results', label: 'My Results' },
          { to: '/timetable', label: 'Exam Timetable' },
          { to: '/complaints', label: 'Submit Complaint' },
        ];
      case 'staff':
        return [
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/course-results', label: 'Course Results' },
          { to: '/timetable', label: 'Exam Timetable' },
          { to: '/complaints', label: 'View Complaints' },
        ];
      case 'hod':
        return [
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/department-timetable', label: 'Department Timetable' },
          { to: '/room-allocation', label: 'Room Allocation' },
          { to: '/staff', label: 'Department Staff' },
        ];
      default:
        return [{ to: '/dashboard', label: 'Dashboard' }];
    }
  };

  const navLinks = getNavLinks();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap size={24} />
            <h1 className="text-xl font-bold">FCIT Results System</h1>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-blue-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="font-medium">
              {currentUser?.username} ({currentUser?.role})
            </span>
            <button 
              onClick={logout}
              className="flex items-center space-x-1 px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 text-white">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-md ${
                    location.pathname === link.to ? 'bg-blue-600' : 'hover:bg-blue-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button 
                onClick={logout}
                className="flex items-center space-x-1 px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors mt-2"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar (desktop only) */}
        <aside className="hidden md:block w-64 bg-white shadow-md">
          <nav className="p-4">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`block px-4 py-2 rounded-md ${
                      location.pathname === link.to
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;