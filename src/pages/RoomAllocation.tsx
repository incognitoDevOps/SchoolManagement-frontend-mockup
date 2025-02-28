import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { departments, staff, rooms, roomAllocations, courseUnits } from '../data/mockData';

const RoomAllocation: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState('');
  const [roomData, setRoomData] = useState<any>(null);
  
  useEffect(() => {
    if (selectedRoom) {
      const room = rooms.find(r => r.roomId === selectedRoom);
      const allocations = roomAllocations
        .filter(a => a.roomId === selectedRoom)
        .map(a => {
          const course = courseUnits.find(c => c.code === a.courseUnit);
          return {
            ...a,
            courseName: course?.name || ''
          };
        });
      
      setRoomData({ room, allocations });
    } else {
      setRoomData(null);
    }
  }, [selectedRoom]);
  
  if (!currentUser || currentUser.role !== 'hod' || !currentUser.relatedId) {
    return <div>Unauthorized access</div>;
  }
  
  const staffMember = staff.find(s => s.staffId === currentUser.relatedId);
  if (!staffMember) {
    return <div>Staff information not found</div>;
  }
  
  const department = departments.find(d => d.deptId === staffMember.deptId);
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Room Allocation</h2>
      
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
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="roomSelect" className="block text-gray-700 font-medium mb-2">
            Select Room
          </label>
          <select
            id="roomSelect"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a room</option>
            {rooms.map((room) => (
              <option key={room.roomId} value={room.roomId}>
                {room.roomName} (Capacity: {room.capacity})
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {roomData && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-800 text-white px-6 py-3">
            <h3 className="text-lg font-semibold">
              {roomData.room.roomName} (Capacity: {roomData.room.capacity})
            </h3>
          </div>
          
          {roomData.allocations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Name
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {roomData.allocations.map((allocation: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {allocation.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {allocation.startTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {allocation.courseUnit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {allocation.courseName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6">
              <p className="text-gray-600">No allocations for this room</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomAllocation;