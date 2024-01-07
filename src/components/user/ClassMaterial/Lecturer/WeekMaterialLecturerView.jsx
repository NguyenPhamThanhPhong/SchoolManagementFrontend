import './WeekMaterialLecturerView.scss'
import { Button, Divider } from 'antd';
import FileHolderLecturer from './FileHolderLecturer';
import { userPaths } from '../../../../routes/AppRoutes';
import parse from 'html-react-parser';
function WeekMaterialLecturerView(props, { Sections }) {

    return (
        <div className='WeekMaterialLecturerviewContain'>
            <div className='WeekMaterialLecturerview'>
                {props.Sections.map((item =>
                    <div>
                        <Divider orientation="left" orientationMargin="2" style={{ color: "#2f88ff" }} >
                            {item.SectionTitle}
                        </Divider>
                        {parse(item.Content)}
                        <FileHolderLecturer WFiles={item.WFile} />
                        <Button type="link" href={userPaths.lecutrerAddFile}><i class='bx bx-edit-alt' style={{ color: '#2f88ff' }}  ></i>Edit section</Button>
                    </div>

                ))}
                <Divider orientation="left" orientationMargin="2" style={{ color: "#2f88ff" }} >
                </Divider>
                <Button type="link" href={userPaths.lecutrerAddFile} style={{ marginBottom: '3%' }}>+ Add new section</Button>
            </div>

        </div>)
}
export default WeekMaterialLecturerView;