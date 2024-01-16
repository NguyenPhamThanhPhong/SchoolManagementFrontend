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
                            <Button style={{ color: 'green', fontWeight: 'bold', background: 'pink' }} type="link"
                                onClick={() => { setIsModalOpenAdd(true); setAddSectionIndex(index) }}>
                                +Add section
                            </Button>
                            <Divider orientation="left" orientationMargin="2" style={{ color: "#2f88ff" }} >
                                {item.title}
                                <Button style={{ color: 'white', fontWeight: 'bold', background: 'red' }} type="link"
                                    onClick={() => { handleDeleteSection(index) }}>
                                    Delete section
                                </Button>
                            </Divider>
                            {parse(item?.content || "")}
                            {
                                (myUrls?.length > 0) &&
                                (
                                    myUrls.map((item, index) =>
                                        <div className="FileHodlerScss">
                                            <a href={item?.value || '#'}>{item.key}</a>
                                        </div>)
                                )
                            }
                            <Button
                                type="link" onClick={() => { showModalEdit(index) }}><i class='bx bx-edit-alt' style={{ color: '#2f88ff' }}  ></i>Edit section</Button>
                        </div>)
                }

                ))}
                <Divider orientation="left" orientationMargin="2" style={{ color: "#2f88ff" }} >
                </Divider>
                <Button type="link" style={{ color: 'green', fontWeight: 'bold', background: 'pink' }}
                    onClick={() => { setIsModalOpenAdd(true); setAddSectionIndex(props?.Sections?.length) }}>
                    +Add section
                </Button>
            </div>
            <Modal width={'50vw'} title="Add new section" open={isModalOpenAdd}
                onOk={() => { handleAddSection() }}
                onCancel={() => { setIsModalOpenAdd(false); clearAddModal(); }}>
                <div>Section title</div>
                <TextArea onChange={(e) => { setAddSectionTitle(e.target.value) }} value={addSectionTitle} placeholder="Section title" />
                <AddSection onChange={setAddSectionText} ></AddSection>
                <AddMaterial onDone={setAddSectionFileList}></AddMaterial>
            </Modal>
            <Modal title="Edit section" open={isModalOpenEdit} onOk={handleEditSection} onCancel={handleCancelEdit}>
                <div>Section title</div>
                <TextArea placeholder="Section title"
                    onChange={(e) => { setEditSectionTitle(e.target.value) }}
                    value={editSectionTitle} />
                <AddSection data={editSectionText} onChange={setEditSectionText} ></AddSection>
                <AddMaterial onDone={setEditSectionFileList} ></AddMaterial>

                {
                    editSelectedFileUrlsDisplay?.length > 0 && editSelectedFileUrlsDisplay.map((item, index) => {
                        let onClick = () => {
                            let myDisplays = editSelectedFileUrlsDisplay.filter((item, i) => i !== index);
                            setEditSelectedFileUrlsDisplay(myDisplays || []);
                        }
                        return (
                            <div className="FileHodlerScss">
                                <button onClick={onClick} > Delete</button>
                                <a href={item?.value || '#'}>{item.key}</a>
                            </div>
                        )
                    })
                }
            </Modal>
        </div>)
}
export default WeekMaterialLecturerView;