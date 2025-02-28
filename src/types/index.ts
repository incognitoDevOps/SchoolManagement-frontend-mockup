export interface Department {
  deptId: string;
  name: string;
  hod: string; // Reference to staffId
}

export interface Staff {
  staffId: string;
  name: string;
  rank: string;
  dateOfBirth: string;
  gender: string;
  deptId: string; // Reference to Department
}

export interface Student {
  studentNo: string;
  registrationNo: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
}

export interface CourseUnit {
  code: string;
  name: string;
  creditUnits: number;
  homeDept: string; // Reference to Department
}

export interface Result {
  studentNo: string; // Reference to Student
  code: string; // Reference to CourseUnit
  courseWork: number;
  exam: number;
}

export interface Room {
  roomId: string;
  roomName: string;
  capacity: number;
}

export interface RoomAllocation {
  roomId: string; // Reference to Room
  courseUnit: string; // Reference to CourseUnit
  date: string;
  startTime: string;
}

export interface Complaint {
  id: string;
  studentNo: string;
  courseCode: string;
  message: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  role: 'student' | 'staff' | 'hod' | 'admin';
  relatedId?: string; // studentNo or staffId
}