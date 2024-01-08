import { Button, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import SearchBox from '../SearchBox/SearchBox';
import { useSemesterContext, useSubjectContext, useSchoolClassContext } from '../../../data-store';
import { registrationApi } from '../../../data-api';

function mapData(classIds, classList, subjects) {
    const mappedData = classList
        .filter((cls) => classIds.includes(cls.id))
        .map((cls) => {
            const subject = subjects.find((subj) => subj.id === cls.subject.id);

            if (subject) {
                return {
                    key: `${subject?.id} ${subject?.name}`,
                    id: `${subject?.id} ${subject?.name}`,
                    children: [
                        {
                            key: cls?.id,
                            id: cls?.id,
                            startTime: cls?.Schedule?.beginTime,
                            endTime: cls?.Schedule?.endTime,
                            lecturerName: cls?.lecturer?.name,
                            schedule: `${cls?.Schedule?.dateofweek} ${cls?.Schedule.startTime}-${cls?.Schedule.endTime}`,
                            previousSubjects: cls?.Schedule?.beginTime,
                            prequisiteSubjects: cls?.Schedule?.beginTime,
                            program: cls?.program,
                        },
                    ],
                };
            }

            return null;
        })
        .filter((item) => item !== null);

    return mappedData;
}
const columns = [
    {
        title: 'subjectId',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'lecturer',
        dataIndex: 'lecturerName',
        key: 'lecturerName',
    },
    {
        title: 'Subject name',
        dataIndex: 'schedule',
        key: 'schedule',
    },
    {
        title: 'previous subjects',
        dataIndex: 'previousSubjects',
        key: 'previousSubjects',
    },
    {
        title: 'prequisite subjects',
        dataIndex: 'prequisiteSubjects',
        key: 'prequisiteSubjects',
    },
    {
        title: 'Lecturer name',
        dataIndex: 'schedule',
        key: 'lecturerName',
    },
    {
        title: 'Program',
        dataIndex: 'program',
        key: 'program',
    },
];
function RegisterSubjectBoard() {
    const [subjectState] = useSubjectContext();
    const [schoolClassState] = useSchoolClassContext();

    const [registrations, setRegistrations] = useState([]);
    const [currentRegistration, setCurrentRegistration] = useState(null);
    const [isInRegistration, setIsInRegistration] = useState(false);

    const getCurrentRegistration = (items) => {
        let currentDate = new Date();
        let selectedItem = null;

        for (let i = 0; i < items.length; i++) {
            let startTimeParts = items[i].startTime.split('/');
            let endTimeParts = items[i].endTime.split('/');

            // Construct Date objects using the correct order: month/day/year
            let startTime = new Date(`${startTimeParts[1]}/${startTimeParts[0]}/${startTimeParts[2]}`);
            let endTime = new Date(`${endTimeParts[1]}/${endTimeParts[0]}/${endTimeParts[2]}`);

            // Check if the current date is within the range
            if (currentDate >= startTime && currentDate <= endTime) {
                selectedItem = items[i];
                break; // Exit the loop if a matching item is found
            }
        }

        return selectedItem;
    }


    const fetchRegistration = async () => {
        try {
            const response = await registrationApi.getAll();
            if (!response.isError) {
                setRegistrations(response?.data?.data);
                let currentRegistration = getCurrentRegistration(response?.data?.data);
                setCurrentRegistration(currentRegistration);
                if (currentRegistration !== null)
                    setIsInRegistration(true);
            }
            else {
                message.error(response?.data?.message);
                console.log(JSON.stringify(response?.data));
                setIsInRegistration(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRegistration();
    }, [])


    // Example usage:
    let classIds = currentRegistration?.classIds || [];
    const classList = [{
        id: "SE.new new",
        name: "GAME & OOP",
        roomName: "zxcvzxcv",
        program: "CLC",
        classType: "213",
        semesterId: "HK III 2021-2022",
        subject: {
            id: "SE",
            name: "NHAP MON test schedule"
        },
        lecturer: {
            id: "20000221",
            name: "john"
        },
        Schedule: {
            dateofweek: 4,
            startTime: "08:00:00",
            endTime: "09:00:00",
            beginTime: "12/20/2021"
        }
    }];
    const subjects = [{
        id: "SE",
        name: "zxcvzxc",
        prequisiteIds: [
            "SE"
        ],
        previousSubjectIds: [
            "SE temp delete",
            "SE"
        ],
        facultyId: "IS",
        classIds: []
    }];


    let myData = mapData(classIds, classList, subjects);

    const mappedResult = myData


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            message.info('You have selected ' + selectedRowKeys + ' items')
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };

    if (!isInRegistration)
        return (
            <div>
                <h1>Currently not in regisrtation period</h1>
            </div>
        )
    return (
        <>
            <SearchBox></SearchBox>
            <br></br>
            <br></br>
            <div>Choose subject to register</div>
            <br></br>
            <Table
                columns={columns}
                rowSelection={{
                    ...rowSelection,
                }}
                pagination={{ position: ['none'], }}
                dataSource={mappedResult}
            />
            <br></br>
            <Button type='primary' style={{ float: 'right' }}>Confirm</Button>
        </>

    );
}
export default RegisterSubjectBoard;