import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { courseUnits, complaints } from '../data/mockData';

const StudentComplaints: React.FC = () => {
  const { currentUser } = useAuth();
  const [courseCode, setCourseCode] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  if (!currentUser || currentUser.role !== 'student' || !currentUser.relatedId) {
    return <div>Unauthorized access</div>;
  }
  
  const studentComplaints = complaints.filter(
    complaint => complaint.studentNo === currentUser.relatedId
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!courseCode) {
      setError('Please select a course');
      return;
    }
    
    if (!message) {
      setError('Please enter a message');
      return;
    }
    
    // In a real app, this would send the data to the server
    // For this demo, we'll just show a success message
    setSubmitted(true);
    setCourseCode('');
    setMessage('');
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Submit Complaint</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">New Complaint</h3>
          
          {submitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Your complaint has been submitted successfully. A lecturer will review it shortly.
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="courseCode" className="block text-gray-700 font-medium mb-2">
                Course
              </label>
              <select
                id="courseCode"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a course</option>
                {courseUnits.map((course) => (
                  <option key={course.code} value={course.code}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Complaint Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your issue in detail..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              Submit Complaint
            </button>
          </form>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">My Complaints</h3>
          
          {studentComplaints.length > 0 ? (
            <div className="space-y-4">
              {studentComplaints.map((complaint) => {
                const course = courseUnits.find(c => c.code === complaint.courseCode);
                return (
                  <div key={complaint.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{course?.name || complaint.courseCode}</h4>
                        <p className="text-sm text-gray-600">Submitted on {complaint.createdAt}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        complaint.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        complaint.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700">{complaint.message}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">No complaints submitted</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentComplaints;