import { Table,  } from 'antd';
import React from 'react';
function ScoreBoard() {
    
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
    const data = [
        {
            key:1 ,
            No_:'Semester 1(2023- 2024)',
            children:[
                {
                    key: 2 ,
                    No_:'1',
                    subject_id: 'OOP.1',
                    subject_name: 'OOP',
                    progress_score:10,
                    midterm_score:10,
                    practice_score:10,
                    finalterm_score:10, 
                    average_score: 10
                },
                {
                    key: 3 ,
                    No_:'1',
                    subject_id: 'OOP.1',
                    subject_name: 'OOP',
                    progress_score:10,
                    midterm_score:10,
                    practice_score:10,
                    finalterm_score:10, 
                    average_score: 10
                },
                {
                    key: 4 ,
                    No_:'1',
                    subject_id: 'OOP.1',
                    subject_name: 'OOP',
                    progress_score:10,
                    midterm_score:10,
                    practice_score:10,
                    finalterm_score:10, 
                    average_score: 10 
                }
            ]
        },
        {
            key:5 ,
            No_:'Semester 1(2023- 2024)',
            children:[
                {
                    key: 6 ,
                    No_:'1',
                    subject_id: 'OOP.1',
                    subject_name: 'OOP',
                    progress_score:10,
                    midterm_score:10,
                    practice_score:10,
                    finalterm_score:10, 
                    average_score: 10
                },
                {
                    key: 7 ,
                    No_:'2',
                    subject_id: 'OOP.1',
                    subject_name: 'OOP',
                    progress_score:10,
                    midterm_score:10,
                    practice_score:10,
                    finalterm_score:10, 
                    average_score: 10
                },
                {
                    key: 8 ,
                    No_:'3',
                    subject_id: 'OOP.1',
                    subject_name: 'OOP',
                    progress_score:10,
                    midterm_score:10,
                    practice_score:10,
                    finalterm_score:10, 
                    average_score: 10 
                }
            ]
        },
        {
            key:10 ,
            No_:'Semester 1(2023- 2024)',
            children:[
                
            ]
        }
    ]
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