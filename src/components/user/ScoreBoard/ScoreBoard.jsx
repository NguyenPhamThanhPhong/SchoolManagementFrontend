import { Table, } from 'antd';
import React from 'react';
function ScoreBoard(props) {

    const columns = [
        {
            title: 'Semester',
            dataIndex: 'semesterId',
            width: '10%',
        },
        {
            title: 'Class ID',
            dataIndex: 'id',
            width: '10%',
        },
        {
            title: 'Class name',
            dataIndex: 'name',
            width: '25%',
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            width: '10%',
            editable: true,
        },
        {
            title: 'Midterm',
            dataIndex: 'midterm',
            width: '10%',
            editable: true,
        },
        {
            title: 'Practice',
            dataIndex: 'practice',
            width: '10%',
            editable: true,
        },
        {
            title: 'Final',
            dataIndex: 'final',
            width: '10%',
            editable: true,
        },
        {
            title: 'GPA',
            render: (text, record) => (record.progress * 0.1 + record.midterm * 0.2 + record.practice * 0.2 + record.final * 0.5).toFixed(2),
            width: '10%',
        }
    ];
    const data = props.StudentScoreData;
    return (
        <>
            <Table
                columns={columns}
                pagination={false}
                dataSource={data}
                style={{ marginBottom: '3%' }}
            />
        </>

    );
}
export default ScoreBoard;