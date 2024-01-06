import { Space, Button, Table, message } from 'antd';
import { React, useState } from 'react';

const SubjectTable = ({ showDrawer, subjects, deleteSubject, handleEdit,
    selectedRowKeys, setSelectedRowKeys, setSelectedRows }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 5;
    let currentData = subjects.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const onSelectChange = (selectedKeys, selectedRows) => {
        setSelectedRowKeys(selectedKeys);
        setSelectedRows(selectedRows);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
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
                    key: 'id',
                },
                {
                    title: 'Prequisite Subject',
                    render: (_, record) => (
                        <Space size="middle">
                            {record.prequisiteIds?.map((id) => {
                                const hasPrequisite = subjects?.some((subject) => subject.id === id);
                                return <p style={{ color: hasPrequisite ? '' : 'red' }}>{id}</p>;
                            })}
                        </Space>
                    ),
                    key: 'id',
                },
                {
                    title: 'previousSubjectId',
                    render: (_, record) => (
                        <Space size="middle">
                            {record.previousSubjectIds?.map((id) => {
                                const hasPrevious = subjects?.some((subject) => subject.id === id);
                                return <p style={{ color: hasPrevious ? '' : 'red' }} >{id}</p>
                            })}
                        </Space>
                    ),
                    key: 'id',
                },
                {
                    title: 'Action',
                    key: 'id',
                    render: (_, record) => (
                        <Space size="middle">
                            <Button type="primary" onClick={() => { handleEdit(record) }}>
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
                ...rowSelection,
            }}
            rowKey="id"
        />
    );
};

export default SubjectTable;
