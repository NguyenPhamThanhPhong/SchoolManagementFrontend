import {
    Card,
    Table,
    Divider,
    Space,
    Typography,
    List,
    Breadcrumb,
    Descriptions,
    Badge,
    Tabs,
    Button,
    Input, message
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import StudentListTable from '../../../components/Admin/Table/StudentListTable';
import ExamListTable from '../../../components/Admin/Table/ExamListTable';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DateOfWeek } from '../../../data-api/index';
import { schoolClassApi } from '../../../data-api/index';
import WeekMaterialLecturerView from '../../../components/user/ClassMaterial/Lecturer/WeekMaterialLecturerView';
import StudentExamListTable from '../../../components/Admin/Table/ExamListTable';


const Column = Table.Column;
const Title = Typography.Title;

function DetailClass() {

    const [selectedSchoolClass, setSelectedSchoolClass] = useState({});

    let subjectId = useParams().id;
    let sections = selectedSchoolClass?.sections;

    const fetchSchoolClass = async (id) => {
        try {
            let response = await schoolClassApi.classGetbyId(id)
            if (!response.isError) {
                if (response.data.data !== null && response.data.data !== undefined)
                    setSelectedSchoolClass(response.data.data);
            }
            else
                console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchSchoolClass(subjectId);
    }, []);

    console.log(selectedSchoolClass.id);

    const items = [
        {
            key: '1',
            label: 'Class Name',
            children: selectedSchoolClass?.id + ' - ' + selectedSchoolClass?.name,
        },
        {
            key: '2',
            label: 'Lecturer',
            children: selectedSchoolClass?.lecturer?.name,
        },
        {
            key: '3',
            label: 'Schedule',
            children: DateOfWeek.GetDateOfWeek(selectedSchoolClass?.schedule?.dateofweek)
                + ' - ' + selectedSchoolClass?.schedule?.startTime
                + ' - ' + selectedSchoolClass?.schedule?.endTime,
        },
        {
            key: '4',
            label: 'Room',
            children: selectedSchoolClass?.roomName,
        },
        {
            key: '5',
            label: 'Program',
            children: selectedSchoolClass?.program,
        },
        {
            key: '6',
            label: 'Class type',
            children: selectedSchoolClass?.classType,
        },
        {
            key: '7',
            label: 'SubjectID',
            children: selectedSchoolClass?.subject?.id,
        },
        {
            key: '8',
            label: 'Semester',
            children: selectedSchoolClass?.semesterId,
        },
    ];

    const itemtab = [
        {
            key: '1',
            label: 'List Student',
            children: <StudentListTable />,
        },
        {
            key: '2',
            label: 'Exam Table',
            children: <StudentExamListTable
                classId={selectedSchoolClass?.id}
                exams={selectedSchoolClass?.exams || []}
                setSelectedSchoolClass={setSelectedSchoolClass} />,
        },
        {
            key: '3',
            label: 'Document',
            children: (
                <WeekMaterialLecturerView Sections={sections || []} >

                </WeekMaterialLecturerView>
            ),
        },
    ];

    const renderDescriptions = () => {
        return <Descriptions bordered items={items} />;
    };

    return (
        <div>
            <Card>
                <Divider style={{ color: 'blue', fontSize: '16px' }}>Chi tiết lớp</Divider>
                {renderDescriptions()}
            </Card>
            <Tabs
                defaultActiveKey="1"
                tabBarStyle={{ margin: '0 auto' }}
                items={itemtab}
                size="large"
            />
        </div>
    );
}

export default DetailClass;
