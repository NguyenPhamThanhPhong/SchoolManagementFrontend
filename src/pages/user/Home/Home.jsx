import './Home.css'
import NotificationList from "../../../components/user/NotificationList/NotificationList";

function Home() {
  return (
    <>
      <div className="homeMain">
        <NotificationList></NotificationList>
      </div>
    </>
  );
}

export default Home;
