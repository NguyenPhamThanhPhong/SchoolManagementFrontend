import { React, useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';
import { useFacultyContext, setFaculties, removeFaculty, FacultyInitialState } from '../../../data-store';
import { FacultyApi } from '../../../data-api';

function FacultyTable(props) {
    const [currentPage, setCurrentPage] = useState(1);

    const [facultyState, facultyDispatch] = useFacultyContext();

    const fetchFaculties = async () => {
        try {
            const response = await FacultyApi.getAll();
            if (!response.isError) {
                const dataArray = Array.isArray(response.data.data) ? response.data.data : [];
                facultyDispatch(setFaculties(dataArray));
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchFaculties();
    }, []);


    let dataSource = facultyState.faculties || [];
    dataSource = dataSource.map((item, index) => ({ ...item, stt: index + 1 }));


    const pageSize = 10;
    const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const facultyColumns = [
        {
            title: 'Stt',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
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
            columns={facultyColumns}
            pagination={{
                current: currentPage,
                total: dataSource.length,
                pageSize,
                onChange: handlePageChange,
            }}
        />
    );
}

export default FacultyTable;
