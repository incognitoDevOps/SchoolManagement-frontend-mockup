import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { departments, staff, getDepartmentTimetable } from '../data/mockData';

const DepartmentTimetable: React.FC = () => {
  const { currentUser } = useAuth();
  const [timetable, setTimetable] = useState<any[]>([]);
  
  useEffect(() => {
    if (currentUser?.relatedId) {
      const staffMember = staff.find(s => s.staffId === currentUser.relatedId);
      if (staffMember) {
        const departmentTimetable = getDepartmentTimetable(staffMember.deptId);
        setTimetable(departmentTimetable);
      }
    }
  }, [currentUser]);
  
  if (!currentUser || currentUser.role !== 'hod' || !currentUser.relatedId) {
    return <div>Unauthorized access</div>;
  }
  
  const staffMember = staff.find(s => s.staffId === currentUser.relatedId);
  if (!staffMember) {
    return <div>Staff information not found</div>;
  }
  
  const department = departments.find(d => d.deptId === staffMember.deptId);
  
  // Group timetable by date
  const timetableByDate: Record<string, typeof timetable> = {};
  timetable.forEach(entry => {
    if (!timetableByDate[entry.date]) {
      timetableByDate[entry.date] = [];
    }
    timetableByDate[entry.date].push(entry);
  });
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Department Timetable</h2>
      
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
        </div>
      </div>
      
      {Object.keys(timetableByDate).length > 0 ? (
        <div className="space-y-6">
          {Object.entries(timetableByDate).map(([date, entries]) => (
            <div key={date} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-800 text-white px-6 py-3">
                <h3 className="text-lg font-semibold">{date}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {entries.map((entry, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {entry.startTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.courseUnit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.courseName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.roomName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">No timetable available for this department</p>
        </div>
      )}
    </div>
  );
};

export default DepartmentTimetable;