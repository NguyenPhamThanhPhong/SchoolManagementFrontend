import React from 'react';
import { Table } from 'antd';

const scoreListData = [
    {
        ID: 'Se001',
        name: 'Lap trinh',
        progress: '9',
        midtearn: '9',
        practice: '9',
        final: '9',
        GPA: '9',
    },
    {
        ID: 'Se002',
        name: 'Lap trinh',
        progress: '9',
        midtearn: '9',
        practice: '9',
        final: '9',
        GPA: '9',
    },
];

function generateRow(semester, credit, scores = [9, 9, 9, 9, 9]) {
    let myScoreItem = {
        semester: semester,
        key: credit?.id,
        id: credit?.id,
        name: credit?.name,
        status: credit?.status,
    }
    if (scores === undefined || scores === null)
        return myScoreItem;

    for (var i = 0; i < scores.length; i++) {
        switch (i) {
            case 0:
                myScoreItem.progress = scores[i];
                break;
            case 1:
                myScoreItem.midterm = scores[i];
                break;
            case 2:
                myScoreItem.practice = scores[i];
                break;
            case 3:
                myScoreItem.finalterm = scores[i];
                break;
            case 4:
                myScoreItem.average = scores[i];
                break;
            default:
                break;
        }
    }
    return myScoreItem;
}
function destructureCreditLogs(creditLogs) {
    let result = [];
    for (const [semester, credits] of Object.entries(creditLogs)) {
        for (const credit of credits) {
            let myScoreItem = generateRow(semester, credit, credit?.scores);
            result.push(myScoreItem);
        }
    }
    return result;
}

const columns = [
    { title: 'id', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: ['personalInfo', 'name'], key: 'name' },
    { title: 'Progress', dataIndex: 'progress', key: 'progress' },
    { title: 'Midterm', dataIndex: 'midterm', key: 'midterm' },
    { title: 'Practice', dataIndex: 'practice', key: 'practice' },
    { title: 'Final', dataIndex: 'final', key: 'final' },
    { title: 'GPA', dataIndex: 'GPA', key: 'GPA' },
];
function StudentScoreListTable({ creditLogs }) {

    let credits = creditLogs ?? {
        "semester II 2020-2021":
            [
                {
                    id: "SE001",
                    name: "Software Engineering",
                    scores: [9, 9, 9, 9, 9],
                    status: "passed",
                }
            ],
        "semester III 2020-2021": [
            {
                id: "SE001",
                name: "Software Engineering",
                scores: [9, 9, 9, 9, 9],
                status: "passed",
            },
            {
                id: "SE001",
                name: "Software Engineering",
                scores: [9, 9, 9, 9, 9],
                status: "passed",
            },
            {
                id: "SE001",
                name: "Software Engineering",
                scores: [9, 9, 9, 9, 9],
                status: "passed",
            }
        ],
        "semester IV 2020-2021": [
            {
                id: "SE001",
                name: "Software Engineering",
                scores: [9, 9, 9, 9, 9],
                status: "passed",
            }
        ]
    }

    function renderCredits() {

        let rows = destructureCreditLogs(credits);
        let tables = [];
        if (credits === undefined || credits === null)
            return (<div></div>)
        for (const [semester, credit] of Object.entries(credits)) {
            let myDataSource = rows.filter((row) => row?.semester !== semester);
            let table = (<Table dataSource={myDataSource} columns={columns} pagination={false} />)
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

    return <Table dataSource={scoreListData} columns={columns} pagination={false} />;
}

export default StudentScoreListTable;
