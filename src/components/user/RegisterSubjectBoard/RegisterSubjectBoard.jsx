import { Button, Table, message } from 'antd';
import React from 'react';
import SearchBox from '../SearchBox/SearchBox';

function RegisterSubjectBoard() {

    const columns = [
        {
            title: 'No.',
            dataIndex: 'No_',
            key: 'No_'
        },
        {
            title: 'Subject Id',
            dataIndex: 'subjectId',
            key: 'subjectId',
        },
        {
            title: 'Subject name',
            dataIndex: 'subject_name',
            key: 'subject_name',
        },
        {
            title: 'Date start',
            dataIndex: 'date_start',
            key: 'date_start',
        },
        {
            title: 'Date end',
            dataIndex: 'date_end',
            key: 'date_end',
        },
        {
            title: 'Lecturer name',
            dataIndex: 'lecturer_name',
            key: 'lecturer_name',
        },
        {
            title: 'Class period',
            dataIndex: 'class_period',
            key: 'class_period',
        },
    ];
    const data = [
        {
            key: 1,
            No_: 'Subject name',
            subjectId: '',
            subject_name: '',
            date_start: '',
            date_end: '',
            lecturer_name: '',
            class_period: '',
            children: [
                {
                    key: 2,
                    No_: '1',
                    subjectId: 'OOP.1',
                    subject_name: 'OOP',
                    date_start: '10',
                    date_end: '10',
                    lecturer_name: '10',
                    class_period: '10',
                },

            ]
        }
    ]

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            message.info('You have selected ' + selectedRowKeys + ' items')
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    return (
        <>
            <SearchBox></SearchBox>
            <br></br>
            <br></br>
            <div>Choose subject to register</div>
            <br></br>
            <Table
                columns={columns}
                rowSelection={{
                    ...rowSelection,
                }}
                pagination={{ position: ['none'], }}
                dataSource={data}
            />
            <br></br>
            <Button type='primary' style={{ float: 'right' }}>Confirm</Button>
        </>

    );
}
export default RegisterSubjectBoard;