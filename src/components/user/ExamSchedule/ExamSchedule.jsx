import { Table, } from 'antd';
import React from 'react';
import './ExamSchedule.scss'
import { Button } from 'antd'
import { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
function ExamSchedule(props) {


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
    let mySemester = "";
    console.log(!(props.Semester === undefined || props.Semester === null || props.Semester?.length === 0))
    if (!(props.Semester === undefined || props.Semester === null || props.Semester?.length === 0))
        mySemester = props.Semester[0];

    const [selectedSemester, setSelectedSemester] = useState(mySemester);

    const handleSelect = (eventKey) => {
        setSelectedSemester(eventKey);
    };
    const data = props.ExamData;
    return (
        <>
            <div className='MainContainErExamSchedule'>
                <div className='dropSemester_1'>
                    <Dropdown id='dropSemester_1' onSelect={handleSelect}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {selectedSemester}
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            {props.Semester.map((item =>
                                (<Dropdown.Item eventKey={item}>{item}</Dropdown.Item>)
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