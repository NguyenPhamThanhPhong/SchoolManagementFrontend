import './WeekMaterialLecturerView.scss'
import { Button, Divider, Modal } from 'antd';
import FileHolderLecturer from './FileHolderLecturer';
import { userPaths } from '../../../../routes/AppRoutes';
import parse from 'html-react-parser';
import { useState } from 'react';
import AddSection from './AddSection';
import AddMaterial from './AddMaterial';
import TextArea from "antd/es/input/TextArea";
function WeekMaterialLecturerView(props, { Sections }) {
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

    const showModalAdd = () => {
        setIsModalOpenAdd(true);
    };
    const handleOkAdd = () => {
        setIsModalOpenAdd(false);
    };
    const handleCancelAdd = () => {
        setIsModalOpenAdd(false);
    };

    const showModalEdit = () => {
        setIsModalOpenEdit(true);
    };
    const handleOkEdit = () => {
        setIsModalOpenEdit(false);
    };
    const handleCancelEdit = () => {
        setIsModalOpenEdit(false);
    };
    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };

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
                        <Button type="link" onClick={showModalEdit}><i class='bx bx-edit-alt' style={{ color: '#2f88ff' }}  ></i>Edit section</Button>
                    </div>

                ))}
                <Divider orientation="left" orientationMargin="2" style={{ color: "#2f88ff" }} >
                </Divider>
                <Button type="link" onClick={showModalAdd}>
                    +Add section
                </Button>
            </div>
            <Modal title="Add new section" open={isModalOpenAdd} onOk={handleOkAdd} onCancel={handleCancelAdd}>
                <div>Section title</div>
                <TextArea onChange={onChange} placeholder="Section title" />
                <AddSection></AddSection>
                <AddMaterial></AddMaterial>
            </Modal>
            <Modal title="Edit section" open={isModalOpenEdit} onOk={handleOkEdit} onCancel={handleCancelEdit}>
                <div>Section title</div>
                <TextArea onChange={onChange} placeholder="Section title" />
                <AddSection></AddSection>
                <AddMaterial></AddMaterial>
            </Modal>
        </div>)
}
export default WeekMaterialLecturerView;