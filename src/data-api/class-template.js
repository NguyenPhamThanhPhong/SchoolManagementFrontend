
class CreateUserRequest {
    constructor(user, isloggedIn, role, adminAccounts) {
        this.user = user;
        this.isloggedIn = isloggedIn;
        this.role = role;
        this.adminAccounts = adminAccounts;
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
    DateOfWeek,
    UpdateAction
}