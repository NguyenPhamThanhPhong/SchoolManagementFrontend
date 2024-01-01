import './Home.css'
import NotificationList from "../../../components/user/NotificationList/NotificationList";
import { Tabs } from 'antd';

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Faculty notification',
    children: <NotificationList NotiType={'Faculty notification'}></NotificationList>,
  },
  {
    key: '2',
    label: 'General notification',
    children: <NotificationList NotiType={'General notification'}></NotificationList>,
  },
  {
    key: '3',
    label: 'Your notification',
    children: <NotificationList NotiType={'Your notification'}></NotificationList>,
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
