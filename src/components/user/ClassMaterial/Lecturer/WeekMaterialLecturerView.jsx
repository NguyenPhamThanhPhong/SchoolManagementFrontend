import './WeekMaterialLecturerView.scss'
import { Button, Divider, Modal, message } from 'antd';
import FileHolderLecturer from './FileHolderLecturer';
import { userPaths } from '../../../../routes/AppRoutes';
import parse from 'html-react-parser';
import { useState } from 'react';
import AddSection from './AddSection';
import AddMaterial from './AddMaterial';
import TextArea from "antd/es/input/TextArea";
import { schoolClassApi } from '../../../../data-api';
import { useUserContext } from '../../../../data-store';

const convertToFormData = (schoolClassUpdateSectionsRequest) => {
    const formData = new FormData();

    // Append FormFiles
    if (schoolClassUpdateSectionsRequest.FormFiles) {
        schoolClassUpdateSectionsRequest.FormFiles.forEach((file, index) => {
            formData.append(`FormFiles`, file);
        });
    }

    // Append PrevUrls
    if (schoolClassUpdateSectionsRequest?.PrevUrls !== null && schoolClassUpdateSectionsRequest?.PrevUrls !== undefined) {
        for (let item of schoolClassUpdateSectionsRequest?.PrevUrls) {
            formData.append(`PrevUrls[${item.key}]`, item.value || '');
        }
    }

    // Append Sections
    if (schoolClassUpdateSectionsRequest.Sections) {
        schoolClassUpdateSectionsRequest.Sections.forEach((section, index) => {
            formData.append(`Sections[${index}].Title`, section.Title || '');
            formData.append(`Sections[${index}].Content`, section.Content || '');

            // Append DocumentUrls
            if (section.DocumentUrls) {
                Object.entries(section.DocumentUrls).forEach(([key, value]) => {
                    formData.append(`Sections[${index}].DocumentUrls[${key}]`, value || '');
                });
            }
        });
    }

    return formData;
};


function WeekMaterialLecturerView(props) {
    const [userState, userDispatch] = useUserContext();

    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

    let sections = props.Sections || [];

    const [addSectionIndex, setAddSectionIndex] = useState(0);
    const [addSectionTitle, setAddSectionTitle] = useState('');
    const [addSectionText, setAddSectionText] = useState('');
    const [addSectionFileList, setAddSectionFileList] = useState([]);

    const [editSectionIndex, setEditSectionIndex] = useState(0);
    const [editSectionTitle, setEditSectionTitle] = useState('');
    const [editSectionText, setEditSectionText] = useState('');
    const [editSectionFileList, setEditSectionFileList] = useState([]);
    const [editSelectedFileUrlsDisplay, setEditSelectedFileUrlsDisplay] = useState([]);

    const clearAddModal = () => {
        setAddSectionIndex(0);
        setAddSectionTitle('');
        setAddSectionText('');
        setAddSectionFileList([]);
    }
    const clearEditModal = () => {
        setEditSectionIndex(0);
        setEditSectionTitle('');
        setEditSectionText('');
        setEditSectionFileList([]);
        setEditSelectedFileUrlsDisplay([]);
    }

    const handleAddSection = () => {
        let myFormFiles = [];
        if (addSectionFileList) {
            addSectionFileList.forEach((file) => {
                myFormFiles.push(file.originFileObj);
            });
        }
        const newSection = {
            Title: addSectionTitle,
            Content: addSectionText,
            DocumentUrls: null
        }
        let mySections = sections;
        mySections.splice(addSectionIndex, 0, newSection);

        const schoolClassUpdateSectionsRequest = {
            FormFiles: myFormFiles,
            Sections: mySections,
            PrevUrls: null
        };
        const formData = convertToFormData(schoolClassUpdateSectionsRequest);
        schoolClassApi.classUpdateSection(props.classId, addSectionIndex, formData).then((res) => {
            if (!res.isError) {
                props.updateGlobalSchoolClasses(res.data.data);
                clearAddModal();
                setIsModalOpenAdd(false);
            }
            else {
                message.error(res.data.message);
            }
        }).catch((err) => {
            message.error(err.message);
        });
    }

    const handleEditSection = () => {
        let myFormFiles = [];
        if (editSectionFileList) {
            editSectionFileList.forEach((file) => {
                myFormFiles.push(file.originFileObj);
            });
        }
        const newSection = {
            Title: editSectionTitle,
            Content: editSectionText,
            DocumentUrls: null
        }
        let mySections = sections;
        mySections.splice(editSectionIndex, 1, newSection);

        const schoolClassUpdateSectionsRequest = {
            FormFiles: myFormFiles,
            Sections: mySections,
            PrevUrls: editSelectedFileUrlsDisplay
        };
        const formData = convertToFormData(schoolClassUpdateSectionsRequest);
        schoolClassApi.classUpdateSection(props.classId, editSectionIndex, formData).then((res) => {
            if (!res.isError) {
                props.updateGlobalSchoolClasses(res.data.data);
                clearEditModal();
                setIsModalOpenEdit(false);
            }
            else {
                message.error(res.data.message);
            }
        }).catch((err) => {
            message.error(err.message);
        });
    }

    const handleDeleteSection = (index) => {
        let mySections = sections;
        mySections.splice(editSectionIndex, 1);

        const schoolClassUpdateSectionsRequest = {
            FormFiles: null,
            Sections: mySections,
            PrevUrls: null
        };
        const formData = convertToFormData(schoolClassUpdateSectionsRequest);
        schoolClassApi.classUpdateSection(props.classId, -1, formData).then((res) => {
            if (!res.isError) {
                props.updateGlobalSchoolClasses(res.data.data);
                setIsModalOpenEdit(false);
            }
            else {
                message.error(res.data.message);
            }
        }).catch((err) => {
            message.error(err.message);
        });
    }


    const showModalEdit = (index) => {
        setEditSectionIndex(index);
        setEditSectionTitle(sections[index].title);
        setEditSectionText(sections[index].content);

        let myDisplays = [];
        for (const [key, value] of Object.entries(sections[index].documentUrls)) {
            myDisplays.push({ key: key, value: value });
        }
        setEditSelectedFileUrlsDisplay(myDisplays);

        setIsModalOpenEdit(true);
    };
    const handleOkEdit = () => {
        setIsModalOpenEdit(false);
    };
    const handleCancelEdit = () => {
        setIsModalOpenEdit(false);
    };

    ///////



    return (
        <div className='WeekMaterialLecturerviewContain'>
            <div className='WeekMaterialLecturerview'>
                {(props?.Sections) && (props?.Sections?.length > 0) && props.Sections.map(((item, index) => {
                    let myUrls = []
                    if (item.documentUrls) {
                        Object.entries(item.documentUrls).forEach(([key, value]) => {
                            myUrls.push({ key: key, value: value });
                        });
                    }
                    return (
                        <div>
                            {
                                userState?.user?.role === 'student' ?
                                    <></> :
                                    <Button style={{ color: 'green', fontWeight: 'bold', display: 'block', borderColor: 'green' }} s type="link"
                                        onClick={() => { setIsModalOpenAdd(true); setAddSectionIndex(index) }}>
                                        +Add new section
                                    </Button>
                            }
                            <Divider orientation="left" orientationMargin="2" style={{ color: "#2f88ff" }}  >
                                {item.title}

                                {
                                    userState?.user?.role === 'student' ?
                                        <></> :
                                        <Button style={{ color: 'red', fontWeight: 'bold', background: 'transparent' }} type="link"
                                            onClick={() => { handleDeleteSection(index) }}>
                                            <i class='bx bx-trash'></i>
                                        </Button>
                                }
                            </Divider>
                            {parse(item?.content || "")}
                            {
                                (myUrls?.length > 0) &&
                                (
                                    myUrls.map((item, index) =>
                                        <div className="FileHodlerScss">
                                            <i class='bx bx-file' style={{ color: '#2f88ff' }}></i><a href={item?.value || '#'}>{item.key}</a>
                                        </div>)
                                )
                            }
                            {
                                userState?.user?.role === 'student' ?
                                    <></> :
                                    <Button style={{ color: '#2f88ff', fontWeight: 'bold', display: 'block', borderColor: '#2f88ff' }}
                                        type="link" onClick={() => { showModalEdit(index) }}><i class='bx bx-edit-alt' style={{ color: '#2f88ff' }}  ></i>Edit section</Button>
                            }
                            <Divider />
                        </div>)
                }

                ))}
                {
                    userState?.user?.role === 'student' ?
                        <></> :
                        <Button type="link" style={{ color: 'green', fontWeight: 'bold', display: 'block', borderColor: 'green' }}
                            onClick={() => { setIsModalOpenAdd(true); setAddSectionIndex(props?.Sections?.length) }}>
                            +Add new section
                        </Button>
                }
            </div>
            <Modal width={'520px'} title="Add new section" open={isModalOpenAdd}
                onOk={() => { handleAddSection() }}
                onCancel={() => { setIsModalOpenAdd(false); clearAddModal(); }}>
                <b>Section title</b>
                <TextArea width={'520px'} onChange={(e) => { setAddSectionTitle(e.target.value) }} value={addSectionTitle} placeholder="Section title" />
                <b>Section content</b>
                <AddSection onChange={setAddSectionText} ></AddSection>
                <b>Section file(s)</b>
                <AddMaterial onDone={setAddSectionFileList}></AddMaterial>
            </Modal>
            <Modal width={'520px'} title="Edit section" open={isModalOpenEdit} onOk={handleEditSection} onCancel={handleCancelEdit}>
                <b>Section title</b>
                <TextArea width={'520px'} placeholder="Section title"
                    onChange={(e) => { setEditSectionTitle(e.target.value) }}
                    value={editSectionTitle} />
                <b>Section content</b>
                <AddSection data={editSectionText} onChange={setEditSectionText} ></AddSection>
                <b>Section file(s)</b>
                <AddMaterial onDone={setEditSectionFileList} ></AddMaterial>

                {
                    editSelectedFileUrlsDisplay?.length > 0 && editSelectedFileUrlsDisplay.map((item, index) => {
                        let onClick = () => {
                            let myDisplays = editSelectedFileUrlsDisplay.filter((item, i) => i !== index);
                            setEditSelectedFileUrlsDisplay(myDisplays || []);
                        }
                        return (
                            <div className="FileHodlerScss">
                                <Button onClick={onClick} type='warning' style={{ color: 'red' }} ><i class='bx bx-trash'></i></Button>
                                <a href={item?.value || '#'}>{item.key}</a>
                            </div>
                        )
                    })
                }
            </Modal>
        </div>)
}
export default WeekMaterialLecturerView;