import './NotificationList.scss'
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import { userPaths } from '../../../routes/AppRoutes';
function NotificationList(props) {

    const truncateString = (str, maxLength) => {
        return str?.length > maxLength ? str?.slice(0, maxLength - 1) + '...' : str;
    };

    return (
        <>
            <div className='bigContainerNotif'>
                <Divider orientation="left" orientationMargin="2" style={{ color: "#2f88ff" }}>{props.NotiType}</Divider>
                <ul className="list-group">
                    {props.NotificationItems.map((item =>
                    (<li className="list-group" key={item.id}>
                        <Link to={`/user-home/notification/${item.id}`} className="NotificationitemContainer" style={{ textDecoration: 'none' }}>
                            <div className='firstLine'>{item?.title}</div>
                        </Link>
                    </li>)
                    ))}
                </ul>
            </div>
        </>
    )
}

export default NotificationList;