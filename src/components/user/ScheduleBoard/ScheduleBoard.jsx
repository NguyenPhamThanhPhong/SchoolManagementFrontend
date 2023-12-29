import './ScheduleBoard.scss'
import ScheduleHeader from './ScheduleHeader';
import FullCalendar from '@fullcalendar/react'
//import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}





function ScheduleBoard() {
    const events = [
        { title: 'Schedule', start: new Date() }
    ]
    return (
        <div className='MainContainErSchedule'>
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
                    />
                </div>
            </div>

        </div>
    )
}
export default ScheduleBoard;