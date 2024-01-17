
class CreateUserRequest {
    constructor(user, isloggedIn, role, adminAccounts) {
        this.user = user;
        this.isloggedIn = isloggedIn;
        this.role = role;
        this.adminAccounts = adminAccounts;
    }
}

class Semester {
    constructor(id, startTime, endTime, classIds = []) {
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.classIds = classIds;
    }
}
class Faculty {
    constructor(id, name, desciprtion, subjectIds = []) {
        this.id = id;
        this.name = name;
        this.desciprtion = desciprtion;
        this.subjectIds = subjectIds;
    }

}

class Subject {
    constructor(id, name, facultyId, prequisiteIds, previousSubjectIds, classIds = []) {
        this.id = id;
        this.name = name;
        this.facultyId = facultyId;
        this.prequisiteIds = prequisiteIds;
        this.previousSubjectIds = previousSubjectIds;
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
    constructor(id, name, subject = {}, semesterId, lecturer, roomName, program, classType, studentLog, schedule = []) {
        console.log(roomName)
        this.ID = id;
        this.Name = name;
        this.roomName = roomName;
        this.Program = program;
        this.ClassType = classType;
        this.Subject = subject;
        this.SemesterId = semesterId;
        this.Schedule = schedule;
        this.lecturer = lecturer;
        this.StudentLog = studentLog;
    }
}
class TimeStamp {
    constructor(hour, minute) {
        this.hour = hour;
        this.minute = minute;
        this.sec = 0;
    }
    getTimeStamp = () => {
        return `${this.hour}:${this.minute}:${this.sec}`;
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
}
class PostCreateRequest {
    constructor(title, content, facultyTags) {
        this.title = title;
        this.content = content;
        this.facultyTags = facultyTags;
    }
}
class PostUpdateRequest {
    constructor(id, title, content, facultyTags, keepUrls, Files) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.facultyTags = facultyTags;
        this.keepUrls = keepUrls;
        this.Files = Files;
    }
}
// Remove the unused TextFilters constant
const TextFilters = {
    generateFilter: (parameter) => {
        const regexPattern = parameter.value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'); // Escape special characters
        const regex = new RegExp(regexPattern, 'i');
        return {
            field: parameter.fieldName,
            operator: parameter.action,
            value: regex  // Use the created regex here
        };
    },
    generateCommonFilter: (value) => {
        const regexPattern = value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'); // Escape special characters
        const regex = new RegExp(regexPattern, 'i'); // Case-insensitive regex

        return {
            $or: [
                { _id: { $regex: regex } },
                { Name: { $regex: regex } }
            ]
        };
    }
};

function convertTimeRange(timeRange) {
    if (!Array.isArray(timeRange) || timeRange.length !== 2) {
        console.error('Invalid time range format. Expected an array with two elements.');
        return { startTime: '00:00:00', endTime: '00:00:00' }; // Default values
    }

    const [startTime, endTime] = timeRange.map((isoString) => {
        const dateObject = new Date(isoString);
        const hours = dateObject.getHours().toString().padStart(2, '0');
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');
        const seconds = dateObject.getSeconds().toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    });

    return { startTime, endTime };
}

// Example usage
const timeRange = ["2024-01-09T14:45:49.704Z", "2024-01-09T17:49:56.697Z"];
const { startTime, endTime } = convertTimeRange(timeRange);

console.log("Start Time:", startTime);
console.log("End Time:", endTime);



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
    Sunday: 6,
    GetDateOfWeek(date) {
        switch (date) {
            case 0: return "Sunday";
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
            default: return "";
        }
    }
}
function formatDate(isoDateString) {
    const date = new Date(isoDateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
function isValidDate(inputString) {
    // Check if the inputString is null or undefined
    if (inputString === null || inputString === undefined) {
        return false;
    }

    // Define a regular expression for the "dd/MM/yyyy" format
    const dateFormatRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;

    // Test if the inputString matches the regular expression
    return dateFormatRegex.test(inputString);
}


export {
    CreateUserRequest,
    Semester,
    Faculty,
    SchoolMemberCreateRequest,
    PersonalInfo,
    UpdateParameter,
    Subject,
    SchoolClassCreateRequest,
    TimeStamp,
    SchedulePiece,
    StudentLog,
    PostCreateRequest,
    PostUpdateRequest,
    TextFilters,
    DateOfWeek,
    formatDate,
    isValidDate,
    convertTimeRange,
    UpdateAction
}