import React from 'react';
import { useAuth } from '../context/AuthContext';
import { getStudentResults } from '../data/mockData';

const StudentResults: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser || currentUser.role !== 'student' || !currentUser.relatedId) {
    return <div>Unauthorized access</div>;
  }
  
  const results = getStudentResults(currentUser.relatedId);
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Results</h2>
      
      {results.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coursework (30%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam (70%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((result, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.courseName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.courseWork}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.exam}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        result.grade === 'A' ? 'bg-green-100 text-green-800' :
                        result.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                        result.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                        result.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {result.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">No results available</p>
        </div>
      )}
      
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Grading System</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-green-100 p-3 rounded-md text-center">
            <span className="font-bold text-green-800">A</span>
            <p className="text-sm text-green-800">80-100</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-md text-center">
            <span className="font-bold text-blue-800">B</span>
            <p className="text-sm text-blue-800">70-79</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-md text-center">
            <span className="font-bold text-yellow-800">C</span>
            <p className="text-sm text-yellow-800">60-69</p>
          </div>
          <div className="bg-orange-100 p-3 rounded-md text-center">
            <span className="font-bold text-orange-800">D</span>
            <p className="text-sm text-orange-800">50-59</p>
          </div>
          <div className="bg-red-100 p-3 rounded-md text-center">
            <span className="font-bold text-red-800">F</span>
            <p className="text-sm text-red-800">0-49</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResults;