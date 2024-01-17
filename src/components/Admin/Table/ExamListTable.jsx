import React, { useState } from 'react';
import { Table, Space, Button, message } from 'antd';
import CreateStudentExamModal from '../Modal/CreateStudentExamModal';
import EditStudentExamModal from '../Modal/EditStudentExamModal';
import { schoolClassApi } from '../../../data-api';


const StudentExamListTable = ({ setSelectedSchoolClass, classId, exams }) => {



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

    const handleDelete = (classId, recordId) => {
        schoolClassApi.deleteExam(classId, recordId).then((response) => {
            if (!response.isError) {
                setSelectedSchoolClass(response?.data?.data);
                message.success("Delete exam successfully");
            }
            else {
                message.error(response?.data);
            }
        }).catch((error) => {
            message.error(error);
        });
    }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '25%',
        },
        {
            title: 'Date',
            render: (_, record) => (
                <>
                    {record?.dateString}
                </>
            ),
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
                    <Button danger variant="contained" onClick={() => handleDelete(classId, record?.id)} type="primary">
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
                dataSource={exams}
                columns={columns}
                pagination={false}
            />
            <CreateStudentExamModal
                setSelectedSchoolClass={setSelectedSchoolClass}
                classId={classId}
                exams={exams}
                visible={isCreateModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            />

            <EditStudentExamModal
                setSelectedSchoolClass={setSelectedSchoolClass}
                classId={classId}
                open={isEditModalVisible}
                examData={selectedExam}
                exams={exams}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </>
    );
};

export default StudentExamListTable;