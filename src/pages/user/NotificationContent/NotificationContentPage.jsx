import NotificationContent from "../../../components/user/NotificationContent/NotificationContent";
import './NotificationContentPage.scss'
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { usePostContext } from '../../../data-store';
import { useEffect, useState } from 'react';

function NotificationContentPage() {

    const [postState, postActions] = usePostContext();
    const [currentPost, setCurrentPost] = useState({});

    const { id } = useParams();

    useEffect(() => {
        if (postState?.posts !== undefined && postState?.posts !== null) {
            let currentPost = postState?.posts?.find(item => item.id === id);
            setCurrentPost(currentPost);
        }
    }, [id])



    return (
        <>
            <div className="NotiContentContain">
                <NotificationContent content={currentPost?.content} fileUrls={currentPost?.fileUrls}  ></NotificationContent>
            </div>
        </>
    );
}

export default NotificationContentPage;