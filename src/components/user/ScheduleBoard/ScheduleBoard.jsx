import './ScheduleBoard.scss'
import ScheduleHeader from './ScheduleHeader';
import FullCalendar from '@fullcalendar/react'
//import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import Dropdown from 'react-bootstrap/Dropdown';

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}





function ScheduleBoard() {
    let Semester = ["Semester 1 (2023-2024)", "Semester 2 (2023-2024)", "Semester summer (2023-2024)"]
    const events = [
        {
            title: ' OOP',
            daysOfWeek: ['4'],
            startTime: '8:00:00',
            endTime: '10:00:00',
        },
        {
            title: ' OOP',
            daysOfWeek: ['5'],
            startTime: '07:30:00',
            endTime: '12:00:00',
        }
    ]
    return (
        <div className='MainContainErSchedule'>
            <div className='dropSemester_1'>
                <Dropdown id='dropSemester_1'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {Semester[Semester.length - 1]}
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        {Semester.map((item =>
                            (<Dropdown.Item id="dropdown-basic-items">{item}</Dropdown.Item>)
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

            </div>
            <div className='ScheduleBoardM'>
                <div>
                    <ScheduleHeader></ScheduleHeader>
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
    )
}
export default ScheduleBoard;