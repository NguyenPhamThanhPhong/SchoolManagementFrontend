import './WeekMaterialLecturerView.scss'
import { Button, Divider } from 'antd';
import FileHolder from '../FileHolder';
import { userPaths } from '../../../../routes/AppRoutes';
function WeekMaterialLecturerView() {
    const WFiles = ['Helloworld.pdf', 'Hi.pdf']
    const Weeks =
        [
            {
                Wnumber: 1,
                WFile: WFiles,
            },
            {
                Wnumber: 2,
                WFile: WFiles,
            },
            {
                Wnumber: 3,
                WFile: WFiles,
            },
        ];
    return (
        <>
            <div className='WeekMaterialLecturerview'>
                {Weeks.map((item =>
                    <div>
                        <Divider orientation="left" orientationMargin="2" style={{ color: "#2f88ff" }} >
                            Week {item.Wnumber}
                        </Divider>
                        <FileHolder WFiles={item.WFile} />
                        <Button type="link" href={userPaths.lecutrerAddFile}>+ New file</Button>

                    </div>

                ))}

            </div>

        </>)
}
export default WeekMaterialLecturerView;