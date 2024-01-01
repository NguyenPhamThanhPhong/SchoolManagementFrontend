import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message } from 'antd';
import { useSemesterContext, setSemesters, SemesterInitialState } from '../../../data-store';
import { SemesterApi } from '../../../data-api';

function SemesterTable(props) {
    const [currentPage, setCurrentPage] = useState(1);

    const [semesterState, semesterDispatch] = useSemesterContext();

    const fetchSemesters = async () => {
        try {
            const response = await SemesterApi.getAll();
            if (!response.isError) {
                semesterDispatch(setSemesters(response.data.data));
            }
        } catch (error) {
            message.error('Fetch semester failed');
        }
    }

    useEffect(() => {
        fetchSemesters();
    }, []);

    let dataSource = semesterState.semesters || [];

    // If dataSource is not provided or is empty, create a default array
    if (!dataSource || dataSource.length === 0) {
        dataSource = Array.from({ length: 15 }, (_, index) => ({
            stt: index + 1,
            id: `Học kì ${index + 1} 2022 - 2023`,
            startTime: '1/1/2022',
            endTime: '30/06/2022',
        }));
    } else {
        // If dataSource is provided, map stt to the index + 1
        dataSource = dataSource.map((item, index) => ({
            ...item,
            stt: index + 1,
        }));
    }

    const pageSize = 10;
    const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const semesterColumns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'startTime',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'endTime',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary">Edit</Button>
                    <Button type="primary" danger>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Table
            dataSource={currentData}
            columns={semesterColumns}
            pagination={{
                current: currentPage,
                total: dataSource.length,
                pageSize,
                onChange: handlePageChange,
            }}
        />
    );
}

export default SemesterTable;
