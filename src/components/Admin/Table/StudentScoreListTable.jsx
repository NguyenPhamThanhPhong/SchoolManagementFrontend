import React from 'react';
import { Table } from 'antd';


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
function StudentScoreListTable(props) {

    let creditLogs = props?.creditLogs ?? []

    function generateRows() {
        if (creditLogs !== undefined && creditLogs !== null) {
            let distinctSemester = [];
            for (let i = 0; i < creditLogs.length; i++) {
                let semester = creditLogs[i].semesterId;
                if (!distinctSemester.includes(semester)) {
                    distinctSemester.push({ semesterId: semester, children: [] });
                }
            }
            for (let i = 0; i < creditLogs.length; i++) {
                let semester = creditLogs[i].semesterId;
                let index = distinctSemester.findIndex(item => item.semesterId === semester);
                distinctSemester[index].children.push(creditLogs[i]);
            }
            return distinctSemester;
        }
        return [];
    }

    function renderCredits() {

        let rows = generateRows();
        let tables = [];
        if (creditLogs === undefined || creditLogs === null)
            return (<div></div>)

        for (let row of rows) {
            let table = (<Table dataSource={row?.children} columns={columns} pagination={false} />)
            tables.push(table);
        }

        return tables;
    }


    return (
        <div>
            {
                renderCredits()
            }
        </div>
    )

}

export default StudentScoreListTable;
