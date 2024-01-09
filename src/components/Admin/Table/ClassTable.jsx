import { React, useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import EditClassModal from '../Modal/EditClassModal';
import {
    useSchoolClassContext,
    setSchoolClasses, removeSchoolClass
} from '../../../data-store';
import { schoolClassApi } from '../../../data-api';


function ClassTable({ showDrawer, schoolClasses,
    selectedRowKeys, setSelectedRowKeys, setSelectedRows }) {
    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState({});

    const showModal = (record) => {
        setSelectedClass(record);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setSelectedClass({});
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();

    const onSelectChange = (selectedKeys, selectedRows) => {
        setSelectedRowKeys(selectedKeys);
        setSelectedRows(selectedRows);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }


    const deleteSchoolClass = async (id, prevUrls) => {
        try {
            let response = await schoolClassApi.classDelete(id, prevUrls)
            if (!response.isError) {
                schoolClassDispatch(removeSchoolClass(id));
            }
            else
                console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDeleteClick = (record) => {
        if (record !== null && record !== undefined) {
            let prevUrls = []
            for (let item of record.sections)
                for (const [key, value] of Object.entries(item))
                    prevUrls.push(value)
            deleteSchoolClass(record.id, prevUrls)
        }
    }

    const dataSource = schoolClasses || [];

    const columns = [
        {
            title: 'Class ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Class Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Room',
            dataIndex: 'roomName',
            key: 'roomName',
        },
        {
            title: 'Program',
            dataIndex: 'program',
            key: 'program',
        },
        {
            title: 'Class Type',
            dataIndex: 'classType',
            key: 'classType',
        },
        {
            title: 'Subject',
            render: (_, record) => (
                <Space size="middle">
                    <p>
                        {record.subject?.id + record.subject?.name}
                    </p>
                </Space>
            ),
            key: ['subject', 'id'],
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showModal(record)}>
                        Edit
                    </Button>
                    <Button onClick={() => { handleDeleteClick(record) }} type="primary" danger>
                        Delete
                    </Button>
                    <NavLink to={`/admin/class/detail-class/${record.id}`}>
                        <Button type="default">Details</Button>
                    </NavLink>
                </Space>
            ),
        },
    ];

    const pageSize = 5;

    const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <>
            <Table
                columns={columns}
                dataSource={currentData}
                pagination={{
                    current: currentPage,
                    total: dataSource.length,
                    pageSize,
                    onChange: handlePageChange,
                }}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                rowKey='id'
            />
            <EditClassModal open={isModalOpen} classData={selectedClass} onOk={handleOk} onCancel={handleCancel} />
        </>
    );
}

export default ClassTable;
