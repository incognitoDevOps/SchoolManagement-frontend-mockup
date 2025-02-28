import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { courseUnits, getCourseResults } from '../data/mockData';
import { useSearchParams } from 'react-router-dom';

const CourseResults: React.FC = () => {
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const [selectedCourse, setSelectedCourse] = useState(searchParams.get('code') || '');
  const [results, setResults] = useState<any[]>([]);
  const [editingResult, setEditingResult] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ courseWork: number; exam: number }>({ courseWork: 0, exam: 0 });
  
  useEffect(() => {
    if (selectedCourse) {
      const courseResults = getCourseResults(selectedCourse);
      setResults(courseResults);
    } else {
      setResults([]);
    }
  }, [selectedCourse]);
  
  if (!currentUser || (currentUser.role !== 'staff' && currentUser.role !== 'hod')) {
    return <div>Unauthorized access</div>;
  }
  
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value);
    setEditingResult(null);
  };
  
  const startEditing = (result: any) => {
    setEditingResult(result.studentNo);
    setEditValues({
      courseWork: result.courseWork,
      exam: result.exam
    });
  };
  
  const cancelEditing = () => {
    setEditingResult(null);
  };
  
  const saveChanges = (studentNo: string) => {
    // In a real app, this would update the database
    // For this demo, we'll update the local state
    const updatedResults = results.map(result => {
      if (result.studentNo === studentNo) {
        return {
          ...result,
          courseWork: editValues.courseWork,
          exam: editValues.exam,
          total: editValues.courseWork + editValues.exam,
          grade: getGrade(editValues.courseWork + editValues.exam)
        };
      }
      return result;
    });
    
    setResults(updatedResults);
    setEditingResult(null);
  };
  
  const getGrade = (total: number) => {
    if (total >= 80) return 'A';
    if (total >= 70) return 'B';
    if (total >= 60) return 'C';
    if (total >= 50) return 'D';
    return 'F';
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Course Results</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="courseSelect" className="block text-gray-700 font-medium mb-2">
            Select Course
          </label>
          <select
            id="courseSelect"
            value={selectedCourse}
            onChange={handleCourseChange}
            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a course</option>
            {courseUnits.map((course) => (
              <option key={course.code} value={course.code}>
                {course.code} - {course.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {selectedCourse && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-800 text-white px-6 py-3">
            <h3 className="text-lg font-semibold">
              {courseUnits.find(c => c.code === selectedCourse)?.name || selectedCourse}
            </h3>
          </div>
          
          {results.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.map((result) => (
                    <tr key={result.studentNo}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {result.studentNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.studentName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {editingResult === result.studentNo ? (
                          <input
                            type="number"
                            min="0"
                            max="30"
                            value={editValues.courseWork}
                            onChange={(e) => setEditValues({ ...editValues, courseWork: parseInt(e.target.value) || 0 })}
                            className="w-16 px-2 py-1 border border-gray-300 rounded-md"
                          />
                        ) : (
                          result.courseWork
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {editingResult === result.studentNo ? (
                          <input
                            type="number"
                            min="0"
                            max="70"
                            value={editValues.exam}
                            onChange={(e) => setEditValues({ ...editValues, exam: parseInt(e.target.value) || 0 })}
                            className="w-16 px-2 py-1 border border-gray-300 rounded-md"
                          />
                        ) : (
                          result.exam
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {editingResult === result.studentNo ? 
                          editValues.courseWork + editValues.exam : 
                          result.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          (editingResult === result.studentNo ? 
                            getGrade(editValues.courseWork + editValues.exam) : 
                            result.grade) === 'A' ? 'bg-green-100 text-green-800' :
                          (editingResult === result.studentNo ? 
                            getGrade(editValues.courseWork + editValues.exam) : 
                            result.grade) === 'B' ? 'bg-blue-100 text-blue-800' :
                          (editingResult === result.studentNo ? 
                            getGrade(editValues.courseWork + editValues.exam) : 
                            result.grade) === 'C' ? 'bg-yellow-100 text-yellow-800' :
                          (editingResult === result.studentNo ? 
                            getGrade(editValues.courseWork + editValues.exam) : 
                            result.grade) === 'D' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {editingResult === result.studentNo ? 
                            getGrade(editValues.courseWork + editValues.exam) : 
                            result.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {editingResult === result.studentNo ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => saveChanges(result.studentNo)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="text-red-600 hover:text-red-900"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => startEditing(result)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6">
              <p className="text-gray-600">No results available for this course</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseResults;