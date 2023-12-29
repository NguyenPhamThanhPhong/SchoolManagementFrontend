import { Card, Table, Divider, Space, Typography, List, Breadcrumb, Descriptions, Badge } from 'antd';
import { React, useState, useEffect } from 'react';
import { schoolClassApi, DateOfWeek } from '../../../data-api';
import { useParams } from 'react-router-dom';


const Column = Table.Column;
const Title = Typography.Title;

function DetailClass() {
    const [examTableVisible, setExamTableVisible] = useState(false);
    const [documentVisible, setDocumentVisible] = useState(false);

    const [selectedSchoolClass, setSelectedSchoolClass] = useState({});

    let subjectId = useParams().id;

    const fetchSchoolClass = async (id) => {
        try {
            let response = await schoolClassApi.classGetbyId(id)
            console.log(response)
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

    const toggleShowDocument = () => {
        setDocumentVisible(!documentVisible);
    };
    const toggleExamTable = () => {
        setExamTableVisible(!examTableVisible);
    };
    const classListData = [
        { id: 1, name: 'Student 1', progress: 80, midterm: 75, practice: 90, final: 85, GPA: 85 },
        { id: 2, name: 'Student 2', progress: 70, midterm: 80, practice: 85, final: 78, GPA: 78 },
    ];

    const examListData = [
        { name: 'Exam 1', date: '2023-01-01', room: 'Room A', duration: '2 hours', notes: 'Notes for Exam 1' },
        { name: 'Exam 2', date: '2023-02-01', room: 'Room B', duration: '3 hours', notes: 'Notes for Exam 2' },
    ];

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
            children: DateOfWeek.GetDateOfWeek(selectedSchoolClass?.schedule?.dateOfWeek)
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
        {
            key: '9',
            label: 'something',
            children: '............................',
        },
    ];

    return (
        <div>
            <Card>
                <Breadcrumb
                    items={[
                        {
                            title: (
                                <a href="/Class" className="breadcrumb-link">
                                    Class
                                </a>
                            ),
                        },
                        {
                            title: <span className="breadcrumb-link">Detail Class</span>,
                        },
                    ]}
                />
                <Divider style={{ color: 'blue', fontSize: '16px' }}>Chi tiết lớp</Divider>
                <Descriptions items={items} />
                <Divider style={{ color: 'blue', fontSize: '16px' }}>Danh sach sinh vien</Divider>
                <Table dataSource={classListData} pagination={false}>
                    <Column title="ID" dataIndex="id" key="id" />
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="Progress" dataIndex="progress" key="progress" />
                    <Column title="Midterm" dataIndex="midterm" key="midterm" />
                    <Column title="Practice" dataIndex="practice" key="practice" />
                    <Column title="Final" dataIndex="final" key="final" />
                    <Column title="GPA" dataIndex="GPA" key="GPA" />
                </Table>
            </Card>
            <Divider style={{ color: 'blue', fontSize: '16px' }}>
                <a onClick={toggleExamTable}>Show Exam Table</a>
            </Divider>
            {examTableVisible && (
                <Table dataSource={examListData} pagination={false}>
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column title="Date" dataIndex="date" key="date" />
                    <Column title="Room" dataIndex="room" key="room" />
                    <Column title="Duration" dataIndex="duration" key="duration" />
                    <Column title="Notes" dataIndex="notes" key="notes" />
                </Table>
            )}
            <Divider style={{ color: 'blue', fontSize: '16px' }}>
                <a onClick={toggleShowDocument}>Show Document</a>
            </Divider>
            {documentVisible && (
                <Card style={{ flex: 2 }}>
                    <List>
                        <List.Item>
                            <Space direction="vertical">
                                <Title level={4}>Tuần 1-2</Title>
                                <Title level={5}>Ghi chú: ........</Title>
                                <Title level={5}>Tài liệu: TaiLieu.txt</Title>
                                <Divider />
                            </Space>
                        </List.Item>
                    </List>
                </Card>
            )}
        </div>
    );
}

export default DetailClass;
