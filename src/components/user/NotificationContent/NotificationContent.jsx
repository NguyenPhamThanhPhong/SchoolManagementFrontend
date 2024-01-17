import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { message } from 'antd';


function NotificationContent(props) {

    // const { id } = useParams();

    // useEffect(() => {
    //     message.info(`You clicked on item ${id}`);
    // }, [id])

    // message.info(`You clicked on item ${id}`);
    //const Time = "11:25am";
    const ContentHtml = props.content || "";
    let fileUrls = props.fileUrls || {};
    return (
        <>
            <div>
                {/* {Time} */}
            </div>
            <div>
                {parse(ContentHtml)}
                {
                    Object.keys(fileUrls).map((key) => {
                        return (
                            <div>
                                <a href={fileUrls[key]}>{key}</a>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default NotificationContent;