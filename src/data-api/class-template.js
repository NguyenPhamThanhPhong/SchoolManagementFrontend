
class CreateUserRequest {
    constructor(user, isloggedIn, role, adminAccounts) {
        this.user = user;
        this.isloggedIn = isloggedIn;
        this.role = role;
        this.adminAccounts = adminAccounts;
    }
}

class Subject {
    constructor(id, name, prequisiteId, previousSubjectId, classIds) {
        this.id = id;
        this.name = name;
        this.prequisiteId = prequisiteId;
        this.previousSubjectId = previousSubjectId;
        this.classIds = classIds;
    }
}

class SchoolMemberCreateRequest {
    constructor(id, username, password, email, role, personalInfo, classes) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.personalInfo = personalInfo;
        this.classes = classes;
    }
}

class PersonalInfo {
    constructor(dateOfBirth, name, gender, phone, facultyId, program) {
        this.dateOfBirth = dateOfBirth;
        this.name = name;
        this.gender = gender;
        this.phone = phone;
        this.facultyId = facultyId;
        this.program = program;
    }
}
class UpdateParameter {
    constructor(fieldName, value, action) {
        this.fieldName = fieldName;
        this.value = value;
        this.action = action;
    }
}

class SchoolClassCreateRequest {
    constructor(id, name, subjectId, roomName, program, classType, semesterId, schedule, studentLog) {
        this.ID = id;
        this.Name = name;
        this.RoomName = roomName;
        this.Program = program;
        this.ClassType = classType;
        this.SubjectId = subjectId;
        this.SemesterId = semesterId;
        this.Schedule = schedule;
        this.StudentLog = studentLog;
    }
}
class TimeStamp {
    constructor(hour, minute) {
        this.ticks = 0;
        this.days = 0;
        this.hours = hour;
        this.milliseconds = 0;
        this.minutes = minute;
        this.seconds = 0;
    }
}
class SchedulePiece {
    constructor(dateOfWeek, startTime, endTime) {
        this.dateOfWeek = dateOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
class StudentLog {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.scores = [];
        for (var i = 0; i < 5; i++) {
            this.scores.push(-1);
        }
    }
    constructor(id, name, scores) {
        this.id = id;
        this.name = name;
        this.scores = scores;
    }
}

const UpdateAction = {
    set: 0,
    push: 1,
    pull: 2
}
const DateOfWeek = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
    Saturday: 5,
    Sunday: 6
}


export {
    CreateUserRequest,
    SchoolMemberCreateRequest,
    PersonalInfo,
    UpdateParameter,
    Subject,
    SchoolClassCreateRequest,
    TimeStamp,
    SchedulePiece,
    StudentLog,
    DateOfWeek,
    UpdateAction
}