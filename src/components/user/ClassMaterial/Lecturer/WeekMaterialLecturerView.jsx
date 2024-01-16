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
    console.log(schoolClassUpdateSectionsRequest?.PrevUrls);
    if (schoolClassUpdateSectionsRequest?.PrevUrls !== null && schoolClassUpdateSectionsRequest?.PrevUrls !== undefined) {
        schoolClassUpdateSectionsRequest.PrevUrls.forEach((url, index) => {
            formData.append(`PrevUrls`, url);
        });
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

const displayDocumentUrl = (props) => {

    let key = props.key;
    let remove = props.remove;

    return (
        <div className="FileHodlerScss">
            <button > Delete</button>
            <a href={props?.value || '#'}>{props?.key}</a>
        </div>
    )
}



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
    const [editSelectedFileUrls, setEditSelectedFileUrls] = useState([]);
    const [editSelectedFileUrlsDisplay, setEditSelectedFileUrlsDisplay] = useState([]);

    const clearAddModal = () => {
        setAddSectionIndex(0);
        setAddSectionTitle('');
        setAddSectionText('');
        setAddSectionFileList([]);
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
            PrevUrls: editSelectedFileUrls
        };
        console.log(JSON.stringify(schoolClassUpdateSectionsRequest));
        const formData = convertToFormData(schoolClassUpdateSectionsRequest);
        schoolClassApi.classUpdateSection(props.classId, editSectionIndex, formData).then((res) => {
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

        let selectedFileUrls = [];
        if (sections[index].documentUrls) {
            for (const [key, value] of Object.entries(sections[index].documentUrls)) {
                selectedFileUrls.push(value);
            }
        }
        setEditSelectedFileUrls(selectedFileUrls);

        let displayFiles = [];
        if (sections[index].documentUrls) {
            for (const [key, value] of Object.entries(sections[index].documentUrls)) {
                displayFiles.push({ key: key, value: value });
            }
        }
        setEditSelectedFileUrlsDisplay(displayFiles);

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
                            <Button style={{ color: 'green', fontWeight: 'bold', display: 'block', borderColor: 'green' }} type="link"
                                onClick={() => { setIsModalOpenAdd(true); setAddSectionIndex(index) }}>
                                +Add new section
                            </Button>
                            <Divider orientation="left" orientationMargin="2" style={{ color: "#2f88ff" }} >
                                {item.title}
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
                            <Button style={{ color: 'red', fontWeight: 'bold', display: 'block', borderColor: 'red' }}
                                type="link" onClick={() => { showModalEdit(index) }}><i class='bx bx-edit-alt' style={{ color: 'red' }}  ></i>Edit section</Button>
                            <Divider />
                        </div>)
                }

                ))}
                <Button type="link" style={{ color: 'green', fontWeight: 'bold', display: 'block', borderColor: 'green' }}
                    onClick={() => { setIsModalOpenAdd(true); setAddSectionIndex(props?.Sections?.length) }}>
                    +Add new section
                </Button>
            </div>
            <Modal width={'520px'} title="Add new section" open={isModalOpenAdd}
                onOk={() => { handleAddSection() }}
                onCancel={() => { setIsModalOpenAdd(false); clearAddModal(); }}>
                <b>Section title</b>
                <br></br>
                <TextArea width={'520px'} onChange={(e) => { setAddSectionTitle(e.target.value) }} value={addSectionTitle} placeholder="Section title" /><br></br>
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
                    (editSelectedFileUrlsDisplay?.length > 0) &&
                    (
                        editSelectedFileUrlsDisplay.map((item, index) => {
                            const onClick = () => {
                                setEditSelectedFileUrlsDisplay(editSelectedFileUrlsDisplay.filter((item, i) => i !== index));
                            }
                            return (
                                <div className="FileHodlerScss">
                                    <button onClick={onClick} > Delete</button>
                                    <a href={item?.key || '#'}>{item?.value}</a>
                                </div>
                            )
                        })
                    )
                }
            </Modal>
        </div>)
}
export default WeekMaterialLecturerView;