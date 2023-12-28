import { Space, Button, Table } from 'antd';
import { React, useState } from 'react';

const SubjectTable = ({ showDrawer, subjects, deleteSubject }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 5;
    let currentData = subjects.slice((currentPage - 1) * pageSize, currentPage * pageSize);


    console.log(currentData);

    const handleDelete = (id) => {

    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <Table
            columns={[
                {
                    title: 'Subject id',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Prerequisite Subject',
                    dataIndex: 'prequisiteId',
                    key: 'prequisiteId',
                },
                {
                    title: 'previousSubjectId',
                    dataIndex: 'previousSubjectId',
                    key: 'previousSubjectId',
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (_, record) => (
                        <Space size="middle">
                            <Button type="primary" onClick={() => console.log('Edit')}>
                                Edit
                            </Button>
                            <Button onClick={() => { deleteSubject(record.id) }} danger variant="contained" type="primary">
                                Delete
                            </Button>
                            <Button type="dashed" onClick={() => showDrawer(record)}>
                                Detail
                            </Button>
                        </Space>
                    ),
                },
            ]}
            dataSource={currentData}
            pagination={{
                current: currentPage,
                total: subjects.length,
                pageSize,
                onChange: handlePageChange,
            }}
            rowSelection={{
                type: 'checkbox',
            }}
        />
    );
};

export default SubjectTable;
