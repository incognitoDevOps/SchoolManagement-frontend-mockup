import { Department, Staff, Student, CourseUnit, Result, Room, RoomAllocation, Complaint, User } from '../types';

// Mock Departments
export const departments: Department[] = [
  { deptId: 'CS', name: 'Computer Science', hod: 'STAFF001' },
  { deptId: 'IT', name: 'Information Technology', hod: 'STAFF002' },
  { deptId: 'SE', name: 'Software Engineering', hod: 'STAFF003' },
];

// Mock Staff
export const staff: Staff[] = [
  { staffId: 'STAFF001', name: 'Dr. John Doe', rank: 'Professor', dateOfBirth: '1975-05-15', gender: 'Male', deptId: 'CS' },
  { staffId: 'STAFF002', name: 'Dr. Jane Smith', rank: 'Associate Professor', dateOfBirth: '1980-08-22', gender: 'Female', deptId: 'IT' },
  { staffId: 'STAFF003', name: 'Dr. Robert Johnson', rank: 'Senior Lecturer', dateOfBirth: '1978-03-10', gender: 'Male', deptId: 'SE' },
  { staffId: 'STAFF004', name: 'Dr. Mary Williams', rank: 'Lecturer', dateOfBirth: '1985-11-30', gender: 'Female', deptId: 'CS' },
];

// Mock Students
export const students: Student[] = [
  { studentNo: 'STU001', registrationNo: 'REG001', name: 'Alice Kamau', dateOfBirth: '2000-01-15', gender: 'Female', nationality: 'Kenyan' },
  { studentNo: 'STU002', registrationNo: 'REG002', name: 'Bob Ochieng', dateOfBirth: '1999-07-22', gender: 'Male', nationality: 'Kenyan' },
  { studentNo: 'STU003', registrationNo: 'REG003', name: 'Carol Wanjiku', dateOfBirth: '2001-03-10', gender: 'Female', nationality: 'Kenyan' },
  { studentNo: 'STU004', registrationNo: 'REG004', name: 'David Mwangi', dateOfBirth: '2000-11-30', gender: 'Male', nationality: 'Kenyan' },
];

// Mock Course Units
export const courseUnits: CourseUnit[] = [
  { code: 'CS101', name: 'Introduction to Programming', creditUnits: 4, homeDept: 'CS' },
  { code: 'CS102', name: 'Data Structures and Algorithms', creditUnits: 4, homeDept: 'CS' },
  { code: 'IT101', name: 'Database Systems', creditUnits: 3, homeDept: 'IT' },
  { code: 'SE101', name: 'Software Engineering Principles', creditUnits: 3, homeDept: 'SE' },
];

// Mock Results
export const results: Result[] = [
  { studentNo: 'STU001', code: 'CS101', courseWork: 25, exam: 60 },
  { studentNo: 'STU001', code: 'IT101', courseWork: 28, exam: 55 },
  { studentNo: 'STU002', code: 'CS101', courseWork: 20, exam: 50 },
  { studentNo: 'STU002', code: 'CS102', courseWork: 22, exam: 58 },
  { studentNo: 'STU003', code: 'SE101', courseWork: 30, exam: 65 },
  { studentNo: 'STU004', code: 'IT101', courseWork: 26, exam: 62 },
];

// Mock Rooms
export const rooms: Room[] = [
  { roomId: 'RM001', roomName: 'Lecture Hall A', capacity: 100 },
  { roomId: 'RM002', roomName: 'Lecture Hall B', capacity: 80 },
  { roomId: 'RM003', roomName: 'Lab 1', capacity: 50 },
  { roomId: 'RM004', roomName: 'Lab 2', capacity: 50 },
];

// Mock Room Allocations (Exam/Test Schedule)
export const roomAllocations: RoomAllocation[] = [
  { roomId: 'RM001', courseUnit: 'CS101', date: '2025-04-15', startTime: '09:00' },
  { roomId: 'RM002', courseUnit: 'IT101', date: '2025-04-15', startTime: '14:00' },
  { roomId: 'RM003', courseUnit: 'CS102', date: '2025-04-16', startTime: '09:00' },
  { roomId: 'RM004', courseUnit: 'SE101', date: '2025-04-16', startTime: '14:00' },
];

// Mock Complaints
export const complaints: Complaint[] = [
  { id: 'COMP001', studentNo: 'STU001', courseCode: 'CS101', message: 'I believe my coursework marks were incorrectly entered.', status: 'pending', createdAt: '2025-03-20' },
  { id: 'COMP002', studentNo: 'STU002', courseCode: 'CS102', message: 'My exam score seems to be missing.', status: 'reviewed', createdAt: '2025-03-18' },
];

// Mock Users
export const users: User[] = [
  { id: 'USER001', username: 'alice', role: 'student', relatedId: 'STU001' },
  { id: 'USER002', username: 'bob', role: 'student', relatedId: 'STU002' },
  { id: 'USER003', username: 'john', role: 'staff', relatedId: 'STAFF001' },
  { id: 'USER004', username: 'jane', role: 'hod', relatedId: 'STAFF002' },
  { id: 'USER005', username: 'admin', role: 'admin' },
];

// Helper function to get student results
export const getStudentResults = (studentNo: string) => {
  return results.filter(result => result.studentNo === studentNo).map(result => {
    const course = courseUnits.find(unit => unit.code === result.code);
    return {
      ...result,
      courseName: course?.name || '',
      total: result.courseWork + result.exam,
      grade: getGrade(result.courseWork + result.exam)
    };
  });
};

// Helper function to get course results for staff
export const getCourseResults = (courseCode: string) => {
  return results.filter(result => result.code === courseCode).map(result => {
    const student = students.find(s => s.studentNo === result.studentNo);
    return {
      ...result,
      studentName: student?.name || '',
      total: result.courseWork + result.exam,
      grade: getGrade(result.courseWork + result.exam)
    };
  });
};

// Helper function to get student exam timetable
export const getStudentTimetable = (studentNo: string) => {
  // Get courses the student is taking (based on results)
  const studentCourses = results.filter(result => result.studentNo === studentNo).map(result => result.code);
  
  // Get room allocations for those courses
  return roomAllocations.filter(allocation => studentCourses.includes(allocation.courseUnit)).map(allocation => {
    const course = courseUnits.find(unit => unit.code === allocation.courseUnit);
    const room = rooms.find(r => r.roomId === allocation.roomId);
    return {
      ...allocation,
      courseName: course?.name || '',
      roomName: room?.roomName || ''
    };
  });
};

// Helper function to get department timetable
export const getDepartmentTimetable = (deptId: string) => {
  // Get courses in the department
  const deptCourses = courseUnits.filter(unit => unit.homeDept === deptId).map(unit => unit.code);
  
  // Get room allocations for those courses
  return roomAllocations.filter(allocation => deptCourses.includes(allocation.courseUnit)).map(allocation => {
    const course = courseUnits.find(unit => unit.code === allocation.courseUnit);
    const room = rooms.find(r => r.roomId === allocation.roomId);
    return {
      ...allocation,
      courseName: course?.name || '',
      roomName: room?.roomName || ''
    };
  });
};

// Helper function to get grade
const getGrade = (total: number) => {
  if (total >= 80) return 'A';
  if (total >= 70) return 'B';
  if (total >= 60) return 'C';
  if (total >= 50) return 'D';
  return 'F';
};