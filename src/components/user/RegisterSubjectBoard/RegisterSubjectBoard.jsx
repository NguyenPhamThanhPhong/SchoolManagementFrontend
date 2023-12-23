import { Table,  } from 'antd';
import React from 'react';
function RegisterSubjectBoard() {

    const columns = [
        {
            title: 'No.',
            dataIndex: 'No_',
            key: 'No_'
        },
        {
            title: 'Subject Id',
            dataIndex: 'subject_id',
            key: 'subject_id',
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
            key:1 ,
            No_:'Subject name',
            subject_id: '',
            subject_name: '',
            date_start:'',
            date_end:'',
            lecturer_name:'',
            class_period:'', 
            children:[
                {
                    key: 2 ,
                    No_:'1',
                    subject_id: 'OOP.1',
                    subject_name: 'OOP',
                    date_start:'10',
                    date_end:'10',
                    lecturer_name:'10',
                    class_period:'10', 
                }
            ]
        }
    ]

    const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
        <Table
            columns={columns}
            rowSelection={{
                ...rowSelection,
            }}
            pagination={{ position: ['none'], }}
            dataSource={data}
        />
        </>
        
    );
}
export default RegisterSubjectBoard;