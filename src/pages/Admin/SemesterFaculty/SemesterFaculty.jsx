import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Input, DatePicker } from 'antd';
import SemesterTable from '../../../components/Admin/Table/SemesterTable';
import FacultyTable from '../../../components/Admin/Table/FacultyTable';


import {
    useFacultyContext, FacultyInitialState,
    useSemesterContext, SemesterInitialState,
    setSemesters, setCurrentSemester,
    setFaculties, setCurrentFaculty
} from '../../../data-store';
import { SemesterApi, FacultyApi } from '../../../data-api/index';

function SemesterFaculty() {

    const [semesterState, semesterDispatch] = useSemesterContext();
    const [facultyState, facultyDispatch] = useFacultyContext();

    console.log(facultyState);


    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                const response = await SemesterApi.getAll();
                if (!response.isError) {
                    if (response.data.status === 200) {
                        semesterDispatch(setSemesters({ semesters: response.data.data }));
                    }
                    else {
                        console.log("not success");
                    }
                }
                else {
                    console.log("error");
                }
            } catch (error) {
                console.log(error);
            }
        };
        const fetchFaculties = async () => {
            try {
                const response = await FacultyApi.getAll();
                if (!response.isError) {
                    if (response.data.status === 200) {
                        facultyDispatch(setFaculties({ faculties: response.data.data }));
                    }
                    else {
                        console.log("not success");
                    }
                }
                else {
                    console.log("error");
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSemesters();
        fetchFaculties();
    }, []);




    return (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Card title="Semester" style={{ flex: 1, width: '50%' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div>
                        <label>Start: </label>
                        <DatePicker />
                    </div>
                    <div>
                        <label>End: </label>
                        <DatePicker />
                    </div>
                    <div>
                        <label>Name: </label>
                        <Input style={{ width: '150px', marginRight: '8px' }} />
                        <Button type="primary">Create</Button>
                    </div>
                </div>
                <SemesterTable dataSource={semesterState.semesters} />
            </Card>

            <Card title="Faculty" style={{ flex: 1, width: '50%' }}>
                <div style={{ marginTop: '8px' }}>
                    <label>Name: </label>
                    <Input style={{ width: '120px', marginRight: '8px' }} />
                    <label>Description: </label>
                    <Input style={{ width: '240px', marginRight: '8px' }} />
                    <Button type="primary">Create</Button>
                </div>
                <FacultyTable dataSource={facultyState.faculties} />
            </Card>
        </div>
    );
}

export default SemesterFaculty;
