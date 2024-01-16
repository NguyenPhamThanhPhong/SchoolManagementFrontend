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
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Subject Id',
            dataIndex: 'subjectId',
            key: 'index',
        },
        {
            title: 'Class id',
            dataIndex: 'classId',
            key: 'index',
        },
        {
            title: 'Exam date',
            dataIndex: 'examDate',
            key: 'index',
        },
        {
            title: 'Room',
            dataIndex: 'room',
            key: 'index',
        },
        {
            title: 'Exam form',
            dataIndex: 'duration',
            key: 'index',
        },
        {
            title: 'Exam form',
            dataIndex: 'examName',
            key: 'index',
        },
    ];
    let mySemester = "";
    console.log(!(props.Semester === undefined || props.Semester === null || props.Semester?.length === 0))
    if (!(props.Semester === undefined || props.Semester === null || props.Semester?.length === 0))
        mySemester = props.Semester[0];


    const handleSelect = (eventKey) => {
        setSelectedSemester(eventKey);
    };
    const data = props.ExamData;
    const semesters = props.semesters?.map((item => item?.id));

    const [selectedSemester, setSelectedSemester] = useState(semesters[0] || '');

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