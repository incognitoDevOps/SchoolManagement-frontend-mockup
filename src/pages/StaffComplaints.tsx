import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { complaints, students, courseUnits, staff } from '../data/mockData';

const StaffComplaints: React.FC = () => {
  const { currentUser } = useAuth();
  const [staffComplaints, setStaffComplaints] = useState<any[]>([]);
  
  useEffect(() => {
    if (currentUser?.relatedId) {
      const staffMember = staff.find(s => s.staffId === currentUser.relatedId);
      if (staffMember) {
        // Get courses in the staff's department
        const deptCourses = courseUnits
          .filter(c => c.homeDept === staffMember.deptId)
          .map(c => c.code);
        
        // Get complaints for those courses
        const filteredComplaints = complaints
          .filter(c => deptCourses.includes(c.courseCode))
          .map(c => {
            const student = students.find(s => s.studentNo === c.studentNo);
            const course = courseUnits.find(co => co.code === c.courseCode);
            return {
              ...c,
              studentName: student?.name || 'Unknown',
              courseName: course?.name || 'Unknown'
            };
          });
        
        setStaffComplaints(filteredComplaints);
      }
    }
  }, [currentUser]);
  
  if (!currentUser || currentUser.role !== 'staff' || !currentUser.relatedId) {
    return <div>Unauthorized access</div>;
  }
  
  const handleStatusChange = (complaintId: string, newStatus: 'pending' | 'reviewed' | 'resolved') => {
    // In a real app, this would update the database
    // For this demo, we'll update the local state
    const updatedComplaints = staffComplaints.map(complaint => {
      if (complaint.id === complaintId) {
        return { ...complaint, status: newStatus };
      }
      return complaint;
    });
    
    setStaffComplaints(updatedComplaints);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Student Complaints</h2>
      
      {staffComplaints.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staffComplaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {complaint.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {complaint.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {complaint.courseCode} - {complaint.courseName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {complaint.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        complaint.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        {complaint.status === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(complaint.id, 'reviewed')}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Mark as Reviewed
                          </button>
                        )}
                        {complaint.status === 'reviewed' && (
                          <button
                            onClick={() => handleStatusChange(complaint.id, 'resolved')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Mark as Resolved
                          </button>
                        )}
                        {complaint.status === 'resolved' && (
                          <span className="text-gray-400">Resolved</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">No complaints to review</p>
        </div>
      )}
    </div>
  );
};

export default StaffComplaints;