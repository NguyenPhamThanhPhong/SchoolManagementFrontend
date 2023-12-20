import React from 'react';
import { Calendar, Card, Breadcrumb } from 'antd';

function ScheduleStudent() {
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const cardTitle = (
        <Breadcrumb
            items={[
                {
                    title: (
                        <a href="/student" className="breadcrumb-link">
                            Student
                        </a>
                    ),
                },
                {
                    title: <span className="breadcrumb-link">Schedule</span>,
                },
                {
                    title: (
                        <span className="breadcrumb-link">
                            <a>MSSV - Nguyen Van X</a>
                        </span>
                    ),
                },
            ]}
        />
    );

    return (
        <Card title={cardTitle}>
            <Calendar title="Hello" onPanelChange={onPanelChange} />
        </Card>
    );
}

export default ScheduleStudent;
