import './ScheduleBoard.scss'
import ScheduleHeader from './ScheduleHeader';
import FullCalendar from '@fullcalendar/react'
//import dayGridPlugin from '@fullcalendar/daygrid'
import { useState } from 'react';
import timeGridPlugin from '@fullcalendar/timegrid'
import Dropdown from 'react-bootstrap/Dropdown';

import { message } from 'antd';





function ScheduleBoard(props) {
    const events = props.ScheduleEvents || [];
    const semesterList = props.semesters || [];

    console.log(events)

    let items = props.semesters || [
        {
            "id": "HK I 2023-2024",
            "startTime": "01/01/0001",
            "endTime": "01/01/0001",
            "classIds": []
        },
        {
            "id": "HK II 2021-2022",
            "startTime": "01/01/0001",
            "endTime": "01/01/0001",
            "classIds": [
                "SE.trời xanh mây trắng",
                "SE.new new"
            ]
        },]
    const [selectedSemester, setSelectedSemester] = useState(items[0]?.id);

    const handleSelect = (eventKey) => {
        setSelectedSemester(eventKey);
        props?.onSemesterChange(eventKey);
    };


    function renderEventContent(eventInfo) {
        return (
            <>
                <b style={{ fontSize: '15px' }}>{eventInfo.timeText}</b>
                <br></br>
                <h style={{ fontSize: '18px' }}>{eventInfo.event.extendedProps.id}</h>
                <br></br>
                <i>{eventInfo.event.extendedProps.beginTime} - {eventInfo.event.extendedProps.finalTime}</i>
            </>
        );
    }

    return (
        <div className='MainContainerSchedule'>
            <div className='dropSemester_1'>
                {/* Check if semesters are available before rendering the dropdown */}
                {semesterList.length > 0 && (
                    <Dropdown id='dropSemester_1' onSelect={handleSelect}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {selectedSemester}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {items.map((item) => (
                                <Dropdown.Item key={item?.id} eventKey={item?.id}>
                                    {item?.id || "place holder"}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </div>
            <div className='ScheduleBoardM'>
                <div>
                    <ScheduleHeader />
                    <FullCalendar
                        plugins={[timeGridPlugin]}
                        initialView='timeGridWeek'
                        weekends={true}
                        events={events}
                        eventContent={renderEventContent}
                        slotMinTime="6:00:00"
                        slotMaxTime="18:00:00"
                        hiddenDays={[0]}
                        headerToolbar={false}
                        dayHeaders={false}
                        allDaySlot={false}
                        height={"auto"}
                    />
                </div>
            </div>
        </div>
    );
}

export default ScheduleBoard;
