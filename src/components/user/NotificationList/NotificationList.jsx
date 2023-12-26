import './NotificationList.scss'
import { Link } from 'react-router-dom';
function NotificationList() {


    let NotificationItems = [
        {
            NotificationId: "Noti1",
            Time: "Time1"
        },
        {
            NotificationId: "Noti2",
            Time: "Time2"
        },
        {
            NotificationId: "Noti3",
            Time: "Time3"
        },
        {
            NotificationId: "Noti4",
            Time: "Time4"
        },
        {
            NotificationId: "Noti5",
            Time: 'Time5'
        },



    ]
    return (
        <>
            <div className='bigContainer'>
                <ul className="list-group">
                    {NotificationItems.map((item =>
                    (<li className="list-group" key={item.NotificationId}>
                        <Link to='/user-notification/notifi_ID' className="classitemContainer" style={{ textDecoration: 'none' }}>
                            <div className='firstLine'>{item.NotificationId}</div>
                            <div className='secondLine'>{item.Time}</div>
                        </Link>
                    </li>)
                    ))}
                </ul>
            </div>
        </>
    )
}

export default NotificationList;