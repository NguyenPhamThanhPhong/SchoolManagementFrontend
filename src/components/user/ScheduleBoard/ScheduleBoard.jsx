import './ScheduleBoard.scss'
import { Table  } from 'antd';


function ScheduleBoard () {
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
            title: 'Subject name',
            dataIndex: 'subject_name',
            key: 'subject_name',
        },
        {
            title: 'Progress score',
            dataIndex: 'progress_score',
            key: 'progress_score',
        },
        {
            title: 'Midterm score',
            dataIndex: 'midterm_score',
            key: 'midterm_score',
        },
        {
            title: 'Practice score',
            dataIndex: 'practice_score',
            key: 'practice_score',
        },
        {
            title: 'Finalterm score',
            dataIndex: 'finalterm_score',
            key: 'finalterm_score',
        },
        {
            title: 'average score',
            dataIndex: 'average_score',
            key: 'average_score',
        },
    ];
    return (
        <div className='MainContainErSchedule'>
            <div className='ScheduleBoardM'>
                <Table columns={columns} /> 
            </div>
            
        </div>
    )
}
export default ScheduleBoard;