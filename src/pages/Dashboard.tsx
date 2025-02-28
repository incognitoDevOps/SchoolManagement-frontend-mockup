import React from 'react';
import { useAuth } from '../context/AuthContext';
import { students, staff, departments, courseUnits, getStudentResults, getStudentTimetable } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const renderStudentDashboard = () => {
    const studentId = currentUser.relatedId;
    if (!studentId) return <div>Student information not found</div>;
    
    const student = students.find(s => s.studentNo === studentId);
    if (!student) return <div>Student information not found</div>;
    
    const results = getStudentResults(studentId);
    const timetable = getStudentTimetable(studentId);
    
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Student Dashboard</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Student Number</p>
              <p className="font-medium">{student.studentNo}</p>
            </div>
            <div>
              <p className="text-gray-600">Registration Number</p>
              <p className="font-medium">{student.registrationNo}</p>
            </div>
            <div>
              <p className="text-gray-600">Full Name</p>
              <p className="font-medium">{student.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Nationality</p>
              <p className="font-medium">{student.nationality}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Results</h3>
            {results.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Course</th>
                      <th className="px-4 py-2 text-left">Total</th>
                      <th className="px-4 py-2 text-left">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.slice(0, 3).map((result, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{result.courseName}</td>
                        <td className="px-4 py-2">{result.total}</td>
                        <td className="px-4 py-2">{result.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No results available</p>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Upcoming Exams</h3>
            {timetable.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Course</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Time</th>
                      <th className="px-4 py-2 text-left">Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timetable.slice(0, 3).map((exam, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{exam.courseName}</td>
                        <td className="px-4 py-2">{exam.date}</td>
                        <td className="px-4 py-2">{exam.startTime}</td>
                        <td className="px-4 py-2">{exam.roomName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No upcoming exams</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStaffDashboard = () => {
    const staffId = currentUser.relatedId;
    if (!staffId) return <div>Staff information not found</div>;
    
    const staffMember = staff.find(s => s.staffId === staffId);
    if (!staffMember) return <div>Staff information not found</div>;
    
    const department = departments.find(d => d.deptId === staffMember.deptId);
    const courses = courseUnits.filter(c => c.homeDept === staffMember.deptId);
    
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Staff Dashboard</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Staff ID</p>
              <p className="font-medium">{staffMember.staffId}</p>
            </div>
            <div>
              <p className="text-gray-600">Full Name</p>
              <p className="font-medium">{staffMember.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Rank</p>
              <p className="font-medium">{staffMember.rank}</p>
            </div>
            <div>
              <p className="text-gray-600">Department</p>
              <p className="font-medium">{department?.name || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">My Courses</h3>
          {courses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Course Code</th>
                    <th className="px-4 py-2 text-left">Course Name</th>
                    <th className="px-4 py-2 text-left">Credit Units</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{course.code}</td>
                      <td className="px-4 py-2">{course.name}</td>
                      <td className="px-4 py-2">{course.creditUnits}</td>
                      <td className="px-4 py-2">
                        <a href={`/course-results?code=${course.code}`} className="text-blue-600 hover:underline">
                          View Results
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No courses assigned</p>
          )}
        </div>
      </div>
    );
  };

  const renderHodDashboard = () => {
    const staffId = currentUser.relatedId;
    if (!staffId) return <div>Staff information not found</div>;
    
    const staffMember = staff.find(s => s.staffId === staffId);
    if (!staffMember) return <div>Staff information not found</div>;
    
    const department = departments.find(d => d.deptId === staffMember.deptId);
    const departmentStaff = staff.filter(s => s.deptId === staffMember.deptId);
    const departmentCourses = courseUnits.filter(c => c.homeDept === staffMember.deptId);
    
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Head of Department Dashboard</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Department Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Department ID</p>
              <p className="font-medium">{department?.deptId || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600">Department Name</p>
              <p className="font-medium">{department?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600">Head of Department</p>
              <p className="font-medium">{staffMember.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Total Staff</p>
              <p className="font-medium">{departmentStaff.length}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Department Staff</h3>
            {departmentStaff.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Staff ID</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentStaff.slice(0, 5).map((s, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{s.staffId}</td>
                        <td className="px-4 py-2">{s.name}</td>
                        <td className="px-4 py-2">{s.rank}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No staff in department</p>
            )}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Department Courses</h3>
            {departmentCourses.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Course Code</th>
                      <th className="px-4 py-2 text-left">Course Name</th>
                      <th className="px-4 py-2 text-left">Credit Units</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentCourses.slice(0, 5).map((course, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{course.code}</td>
                        <td className="px-4 py-2">{course.name}</td>
                        <td className="px-4 py-2">{course.creditUnits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No courses in department</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render dashboard based on user role
  switch (currentUser.role) {
    case 'student':
      return renderStudentDashboard();
    case 'staff':
      return renderStaffDashboard();
    case 'hod':
      return renderHodDashboard();
    default:
      return <div>Unknown user role</div>;
  }
};

export default Dashboard;