import React, { useRef, useState } from 'react';
import { Card, Button, Input, DatePicker } from 'antd';
import SemesterTable from '../../../components/Admin/Table/SemesterTable';
import FacultyTable from '../../../components/Admin/Table/FacultyTable';


import {
    useFacultyContext, FacultyState,
    useSemesterContext, SemesterState,
    setSemesters, setCurrentSemester,
    setFaculties, setCurrentFaculty
} from '../../../data-store';
import { SemesterApi, FacultyApi } from '../../../data-api/admin-api';

function SemesterFaculty() {

    const [semesterState, semesterDispatch] = useSemesterContext();
    const [facultyState, facultyDispatch] = useFacultyContext();



    useRef(async () => {

    }, [])


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
                <SemesterTable />
            </Card>

            <Card title="Faculty" style={{ flex: 1, width: '50%' }}>
                <div style={{ marginTop: '8px' }}>
                    <label>Name: </label>
                    <Input style={{ width: '120px', marginRight: '8px' }} />
                    <label>Description: </label>
                    <Input style={{ width: '240px', marginRight: '8px' }} />
                    <Button type="primary">Create</Button>
                </div>
                <FacultyTable />
            </Card>
        </div>
    );
}

export default SemesterFaculty;
