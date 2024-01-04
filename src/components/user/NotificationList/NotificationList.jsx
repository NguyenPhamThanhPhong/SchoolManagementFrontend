import './NotificationList.scss'
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import { userPaths } from '../../../routes/AppRoutes';
function NotificationList(props) {


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
        {
            NotificationId: "Noti5",
            Time: 'Time5'
        },
        {
            NotificationId: "Noti5",
            Time: 'Time5'
        },



    ]
    return (
        <>
            <div className='bigContainerNotif'>
                <Divider orientation="left" orientationMargin="2" style={{ color: "#2f88ff" }}>{props.NotiType}</Divider>
                <ul className="list-group">
                    {NotificationItems.map((item =>
                    (<li className="list-group" key={item.NotificationId}>
                        <Link to={userPaths.notification} className="NotificationitemContainer" style={{ textDecoration: 'none' }}>
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