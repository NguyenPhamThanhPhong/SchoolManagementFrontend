import { Table, } from 'antd';
import React from 'react';
function ScoreBoard(props) {

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
            title: 'Progress score',
            dataIndex: 'progress_score',
            key: 'progress_score',
        },
        {
            title: 'Midterm score',
            dataIndex: 'midterm_score',
            key: 'midterm_score',
        },
        {
            title: 'Practice score',
            dataIndex: 'practice_score',
            key: 'practice_score',
        },
        {
            title: 'Finalterm score',
            dataIndex: 'finalterm_score',
            key: 'finalterm_score',
        },
        {
            title: 'average score',
            dataIndex: 'average_score',
            key: 'average_score',
        },
    ];
    const data = props.StudentScoreData;
    return (
        <>
            <Table
                columns={columns}

                dataSource={data}
            />
        </>

    );
}
export default ScoreBoard;