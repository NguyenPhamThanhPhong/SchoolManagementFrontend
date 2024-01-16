import { Table, } from 'antd';
import React from 'react';
function ScoreBoard(props) {

    const columns = [
        {
            title: 'No.',
            dataIndex: 'id',
            key: 'index',
        },
        {
            title: 'Subject Id',
            dataIndex: 'subjectId',
            key: 'index',
        },
        {
            title: 'Subject name',
            dataIndex: 'subjectName',
            key: 'index',
        },
        {
            title: 'Progress score',
            dataIndex: 'progress',
            key: 'index',
        },
        {
            title: 'Midterm score',
            dataIndex: 'midterm',
            key: 'index',
        },
        {
            title: 'Practice score',
            dataIndex: 'practice',
            key: 'index',
        },
        {
            title: 'Finalterm score',
            dataIndex: 'final',
            key: 'index',
        },
        {
            title: 'average score',
            dataIndex: 'average',
            key: 'index',
        },

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