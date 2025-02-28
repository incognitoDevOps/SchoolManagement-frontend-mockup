# SchoolManagement-frontend-mockup

![alt text](image-1.png)

![alt text](image.png)

In groups of 5s, you are assigned to develop a database driven java application that will manage students results at the Faculty of Computing and Information Technology in one public university in Kenya. It has been observed that
(a) Students are fed up with lining up and view their results on notice boards. They should therefore view the results using a computerized system
(b) Lecturers who teach courses always get complaints and they end up searching for students work in hard copy files. They want to use the computerized system to view the results and whenever necessary make updates
(c) The examinations office has problems with students choosing their own seats. They may copy in the process. The system should automatically assign seats to all students registered for a certain paper (test and exam)
The following tables are to be used:
Department (DeptId, name, hod*)
Staff(staffId,name,rank, dateofBirth, gender, deptId*)
Student(studentNo, registrationNo, name, dateOfBirth, gender, nationality)
Course Unit(code, name, creditUnits, homeDept*) Results(studentNo,code.courseWork, exam) Room(roomId.roomName,capacity)
RoomAllocation(roomId, course Unit, date, startTime)
Ensure that the following stakeholders are satisfied A) Student:
the student should be able to
view his/her results
view his/her test/exam timetable
submit a complaint about his/her test results to the concerned lecturer
B) Head of Department:
The head of department should be able to
view the timetable of all course units in his/her department
view the timetables and room allocation for the courses 9and students) in the department
C) Staff:
Staff should be able to
view all results of the papers they teach
edit results of the papers they teach
view exam/test timetables of the faculty