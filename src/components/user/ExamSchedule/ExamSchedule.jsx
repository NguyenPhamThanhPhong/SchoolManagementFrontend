import { Table, } from 'antd';
import React from 'react';
import './ExamSchedule.scss'
import { Button } from 'antd'
import Dropdown from 'react-bootstrap/Dropdown';
function ExamSchedule(props, { Semester }) {
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
    const data = props.ExamData;
    return (
        <>
            <div className='MainContainErExamSchedule'>
                <div className='dropSemester_1'>
                    <Dropdown id='dropSemester_1'>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {props.Semester[props.Semester.length - 1]}
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            {props.Semester.map((item =>
                                (<Dropdown.Item id="dropdown-basic-items">{item}</Dropdown.Item>)
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
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