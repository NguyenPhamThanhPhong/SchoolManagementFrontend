import { Space, Button, Table } from 'antd';
import { React, useState } from 'react';

const SubjectTable = ({ showDrawer }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const dataSource = [
        {
            key: '1',
            subject_id: '1',
            name: 'SE001.O11.PMCL',
            prerequisite_subject: 'abc',
            previos_subject: '90',
        },
        {
            key: '2',
            subject_id: '2',
            name: 'SE001.O12.PMCL',
            prerequisite_subject: '4',
            previos_subject: '120',
        },
        {
            key: '3',
            subject_id: '3',
            name: 'SE001.O13.PMCL',
            prerequisite_subject: '4',
            previos_subject: '120',
        },
        {
            key: '4',
            subject_id: '3',
            name: 'SE001.O13.PMCL',
            prerequisite_subject: '4',
            previos_subject: '120',
        },
        {
            key: '5',
            subject_id: '3',
            name: 'SE001.O13.PMCL',
            prerequisite_subject: '4',
            previos_subject: '120',
        },
        {
            key: '6',
            subject_id: '3',
            name: 'SE001.O13.PMCL',
            prerequisite_subject: '4',
            previos_subject: '120',
        },
    ];
    const pageSize = 5;

    const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <Table
            columns={[
                {
                    title: 'Subject id',
                    dataIndex: 'subject_id',
                    key: 'subject_id',
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },

                {
                    title: 'Prerequisite Subject',
                    dataIndex: 'prerequisite_subject',
                    key: 'prerequisite_subject',
                },
                {
                    title: 'Previos Subject',
                    dataIndex: 'previos_subject',
                    key: 'previos_subject',
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (_, record) => (
                        <Space size="middle">
                            <Button type="primary" onClick={() => console.log('Edit')}>
                                Edit
                            </Button>
                            <Button danger variant="contained" type="primary" onClick={() => console.log('Delete')}>
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
                total: dataSource.length,
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
