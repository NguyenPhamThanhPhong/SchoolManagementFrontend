import './NotificationList.scss'
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import { userPaths } from '../../../routes/AppRoutes';
function NotificationList(props, { NotificationItems }) {



    return (
        <>
            <div className='bigContainerNotif'>
                <Divider orientation="left" orientationMargin="2" style={{ color: "#2f88ff" }}>{props.NotiType}</Divider>
                <ul className="list-group">
                    {props.NotificationItems.map((item =>
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