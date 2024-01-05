import './Home.css'
import NotificationList from "../../../components/user/NotificationList/NotificationList";
import { Tabs } from 'antd';

const onChange = (key) => {
  console.log(key);
};
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
//
const items = [
  {
    key: '1',
    label: 'Faculty notification',
    children: <NotificationList NotiType={'Faculty notification'} NotificationItems={NotificationItems}></NotificationList>,
  },
  {
    key: '2',
    label: 'General notification',
    children: <NotificationList NotiType={'General notification'} NotificationItems={NotificationItems}></NotificationList>,
  },
  {
    key: '3',
    label: 'Your notification',
    children: <NotificationList NotiType={'Your notification'} NotificationItems={NotificationItems}></NotificationList>,
  },
];
function Home() {
  return (
    <>
      <div className="homeMain">
        <Tabs className='TabsPosition' defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );
}

export default Home;
