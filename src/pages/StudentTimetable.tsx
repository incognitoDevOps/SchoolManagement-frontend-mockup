import React from 'react';
import { useAuth } from '../context/AuthContext';
import { getStudentTimetable } from '../data/mockData';

const StudentTimetable: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser || currentUser.role !== 'student' || !currentUser.relatedId) {
    return <div>Unauthorized access</div>;
  }
  
  const timetable = getStudentTimetable(currentUser.relatedId);
  
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
      <h2 className="text-2xl font-bold mb-6">Exam Timetable</h2>
      
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
          <p className="text-gray-600">No exam timetable available</p>
        </div>
      )}
      
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Exam Guidelines</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Arrive at least 30 minutes before the exam starts</li>
          <li>Bring your student ID card</li>
          <li>No electronic devices allowed except approved calculators</li>
          <li>Seats are automatically assigned to prevent cheating</li>
          <li>Report any issues to the invigilator immediately</li>
        </ul>
      </div>
    </div>
  );
};

export default StudentTimetable;