import React, { useState } from 'react';
import { Table, Space, Button } from 'antd';
import CreateStudentExamModal from '../Modal/CreateStudentExamModal';
import EditStudentExamModal from '../Modal/EditStudentExamModal';

const examListData = [
    { id: 1, name: 'Exam 1', date: '2023-01-01', room: 'Room A', duration: '2 hours' },
    { id: 2, name: 'Exam 2', date: '2023-02-01', room: 'Room B', duration: '3 hours' },
];

const StudentExamListTable = () => {
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedExam, setSelectedExam] = useState({});

    const showCreateModal = () => {
        setIsCreateModalVisible(true);
    };

    const showEditModal = (record) => {
        setIsEditModalVisible(true);
        setSelectedExam(record);
    };

    const handleOk = () => {
        setSelectedExam({});
        setIsCreateModalVisible(false);
        setIsEditModalVisible(false);
    };

    const handleCancel = () => {
        setSelectedExam({});
        setIsCreateModalVisible(false);
        setIsEditModalVisible(false);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '25%',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            width: '15%',
        },
        {
            title: 'Room',
            dataIndex: 'room',
            width: '15%',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            width: '15%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showEditModal(record)}>
                        Edit
                    </Button>
                    <Button danger variant="contained" type="primary">
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" onClick={showCreateModal}>
                Create +
            </Button>
            <Table
                bordered
                dataSource={examListData}
                columns={columns}
                pagination={false}
            />
            <CreateStudentExamModal
                visible={isCreateModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            />

            <EditStudentExamModal
                open={isEditModalVisible}
                examData={selectedExam}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </>
    );
};

export default StudentExamListTable;
