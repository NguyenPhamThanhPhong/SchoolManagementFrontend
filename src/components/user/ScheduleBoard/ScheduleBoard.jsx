import './ScheduleBoard.scss'
import ScheduleHeader from './ScheduleHeader';
import FullCalendar from '@fullcalendar/react'
//import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import Dropdown from 'react-bootstrap/Dropdown';

function renderEventContent(eventInfo) {
    return (
        <>
            <b style={{ fontSize: '15px' }}>{eventInfo.timeText}</b>
            <br></br>
            <h style={{ fontSize: '18px' }}>{eventInfo.event.title} - {eventInfo.event.extendedProps.classID}</h>
            <br></br>
            <i>{eventInfo.event.extendedProps.dateStart} - {eventInfo.event.extendedProps.dateEnd}</i>
        </>
    )
}


function ScheduleBoard(props, { Semester, ScheduleEvents }) {
    const events = props.ScheduleEvents;
    return (
        <div className='MainContainErSchedule'>
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