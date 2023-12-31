import parse from 'html-react-parser';

function NotificationContent() {
    const Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac. Senectus et netus et malesuada. Nunc pulvinar"
    const Time = "11:25am";
    const ContentHtml = '<h1>Hello</h1><div>div test</div>';
    return (
        <>
            <div>
                {Time}
            </div>
            <div>
                {Content}
                {parse(ContentHtml)}
            </div>
        </>
    )
}
export default NotificationContent;