import RegisterSubjectBoard from "../../../components/user/RegisterSubjectBoard/RegisterSubjectBoard";
import RegisteredSubjectBoard from "../../../components/user/RegisteredSubjectBoard/RegisteredSubjectBoard";
import Header from "../../../components/user/Header/Header";
import './RegisterSubject.scss'
import { schoolClassApi, registrationApi } from "../../../data-api";
import { useSchoolClassContext, useUserContext, setSchoolClasses, setUser } from "../../../data-store";


import { Tabs, message } from 'antd';
import { useEffect, useState } from "react";


function parseDate(dateString) {
  var parts = dateString.split("/");
  // Note: months are 0-based in JavaScript, so we subtract 1
  return new Date(parts[2], parts[1] - 1, parts[0]);
}
function isTodayInRange(startDate, endDate) {
  // Get current date
  var today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison

  // Convert start and end dates to Date objects
  var startDateObj = parseDate(startDate);
  var endDateObj = parseDate(endDate);

  // Check if today is within the range
  return today >= startDateObj && today <= endDateObj;
}

function RegisterSubject() {
  const onChange = (key) => {
    console.log(key);
  };
  const [isDisplay, setIsDisplay] = useState(null);

  const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();
  const [userState, userDispatch] = useUserContext();

  const [displaySchoolClass, setDisplaySchoolClass] = useState([]);
  const [registeredSchoolClass, setRegisteredSchoolClass] = useState([]);

  const [currentRegistration, setCurrentRegistration] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [selectRegisteredRowKeys, setSelectRegisteredRowKeys] = useState([]);

  const [searchRegister, setSearchRegister] = useState('');
  const [searchRegistered, setSearchRegistered] = useState('');

  const fetchRegistration = async () => {
    registrationApi.getAll().then((res) => {
      if (!res.isError) {
        let registrations = res.data?.data;
        for (const registration of registrations) {
          if (isTodayInRange(registration.startTime, registration.endTime)) {
            setIsDisplay(true);
            setCurrentRegistration(registration);
            break;
          }
        }
      }
    });
  }
  useEffect(() => {
    fetchRegistration();
  }, []);

  useEffect(() => {
    if (schoolClassState?.schoolClasses && userState?.user?.classes) {
      let myClasses = schoolClassState?.schoolClasses.filter((schoolClass) => currentRegistration?.classIds.includes(schoolClass.id));
      let registeredClasses = schoolClassState?.schoolClasses.filter((schoolClass) => userState?.user?.classes.includes(schoolClass.id));
      setDisplaySchoolClass(myClasses);
      setRegisteredSchoolClass(registeredClasses);
    }
  }, [currentRegistration, schoolClassState?.schoolClasses]);

  const registerClass = async (classId, option, studentId, studentName) => {
    try {
      let response = await schoolClassApi.classStudentRegistration(classId, option, studentId, studentName);
      if (!response.isError) {
        let myUser = userState?.user;
        if (myUser && myUser?.classIds) {
          myUser?.classes?.push(classId);
          userDispatch(setUser(myUser));
        }
      }
      else {
        message.error('create failed')
      }
    }
    catch (err) {
      message.error('create failed')
    }
  }

  const handleRegister = () => {
    for (const selectedRowKey of selectedRowKeys) {
      console.log(selectedRowKey)
      registerClass(selectedRowKey, 1, userState?.user?.id, userState?.user?.personalInfo?.name || "");
    }
  }

  const handleDeleteRegister = () => {
    console.log(selectRegisteredRowKeys)
    for (const selectRegisteredRowKey of selectRegisteredRowKeys) {
      registerClass(selectRegisteredRowKey, 0, userState?.user?.id, userState?.user?.personalInfo?.name || "");
    }
  }

  const filterSearchClass = (classList, searchTerm) => {
    // console.log(searchTerm)
    // console.log(classList)
    if (searchTerm === '' || searchTerm === null || searchTerm === undefined)
      return classList;
    if (classList) {
      const sanitizedSearchTerm = searchTerm.replace(/[^\w\s]/gi, '').toLowerCase();
      return classList.filter(schoolClass => {
        const sanitizedId = String(schoolClass.id).replace(/[^\w\s]/gi, '').toLowerCase();
        const sanitizedName = schoolClass.name.replace(/[^\w\s]/gi, '').toLowerCase();

        return sanitizedId.includes(sanitizedSearchTerm) || sanitizedName.includes(sanitizedSearchTerm);
      });
    }
    return [];
  }

  //
  const items = [
    {
      key: '1',
      label: 'Register new subject',
      children: <RegisterSubjectBoard
        searchText={searchRegister}
        setSearch={(value) => { setSearchRegister(value); }}
        onChange={setSearchRegister}
        setSelectedRowKeys={setSelectedRowKeys}
        handleRegistration={handleRegister}
        myClasses={filterSearchClass(displaySchoolClass, searchRegister)} ></RegisterSubjectBoard>,
    },
    {
      key: '2',
      label: 'Registered subject',
      children: <RegisteredSubjectBoard
        onChange={setSearchRegistered}
        searchText={searchRegistered}
        setSearch={(value) => { setSearchRegistered(value); }}
        setSelectedRowKeys={setSelectRegisteredRowKeys}
        myClasses={filterSearchClass(registeredSchoolClass, searchRegistered)} handleRegistration={handleDeleteRegister}></RegisteredSubjectBoard>,
    },
  ];

  return (
    <>
      <div className="MainRegisterContainer">
        {isDisplay === true &&
          <>
            <Header></Header>
            <div className="BoardRegisterContainerRegis">
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
          </>
        }

      </div>


    </>
  );
}

export default RegisterSubject;