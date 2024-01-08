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

    const data = props.ExamData;
    const semesters = props.semesters?.map((item => item?.id));

    const [selectedSemester, setSelectedSemester] = useState(semesters[0] || '');

    return (
        <>
            <div className='MainContainErExamSchedule'>
                <div className='dropSemester_1'>
                    {
                        semesters?.length > 0 && (
                            <Dropdown id='dropSemester_1'>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {selectedSemester}
                                </Dropdown.Toggle>
                                <Dropdown.Menu >
                                    {semesters?.map((item =>
                                        (<Dropdown.Item id="dropdown-basic-items">{item}</Dropdown.Item>)
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        )}

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