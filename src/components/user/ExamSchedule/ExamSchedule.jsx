import { Table,  } from 'antd';
import React from 'react';
import './ExamSchedule.scss'
function ExamSchedule() {
    
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
            title: 'Class id',
            dataIndex: 'class_id',
            key: 'class_id',
        },
        {
            title: 'Exam date',
            dataIndex: 'exam_date',
            key: 'exam_date',
        },
        {
            title: 'Room',
            dataIndex: 'room',
            key: 'room',
        },
        {
            title: 'Exam form',
            dataIndex: 'exam_form',
            key: 'exam_form',
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
        },
    ];
    const data = [
        {
            key:1 ,
            No_:'1',
            subject_id:'OOP.1',
            class_id:'OOP.PMCL',
            room: 'C108',
            exam_date:'1/1/2024',
            exam_form:'Paper',
            note:'',
        },
        {
            key:2 ,
            No_:'2',
            subject_id:'OOP.1',
            class_id:'OOP.PMCL',
            room: 'C108',
            exam_date:'1/1/2024',
            exam_form:'Paper',
            note:'',
        },
        {
            key:3 ,
            No_:'3',
            subject_id:'OOP.1',
            class_id:'OOP.PMCL',
            room: 'C108',
            exam_date:'1/1/2024',
            exam_form:'Paper',
            note:'',
        }
    ]
    return (
        <>
        <div className='MainContainErExamSchedule'>
            <div className='ExamScheduleBoardM'>
                <Table
            columns={columns}
            pagination={{ position: ['none'], }}
            dataSource={data}
            bordered
            />
            </div>
            
        </div>
        
        </>
        
    );
}
export default ExamSchedule;