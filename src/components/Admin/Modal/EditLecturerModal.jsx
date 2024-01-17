import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, AutoComplete, Button, Table, DatePicker, message, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useLecturerContext, useFacultyContext, useSchoolClassContext, appendLecturer, setLecturers } from '../../../data-store';
import { lecturerApi } from '../../../data-api';
import { SchoolMemberCreateRequest, PersonalInfo, formatDate, isValidDate } from '../../../data-api';
import moment from 'moment';
const { Option } = Select;

const dateFormat = 'DD/MM/YYYY';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function EditLecturerModal({ open, onOk, onCancel, lecturerData }) {
    const [form] = Form.useForm();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList }) => {
        const latestFile = fileList[fileList.length - 1];
        setFileList(latestFile ? [latestFile] : []);

        if (latestFile && latestFile.originFileObj) {
            // If a file is selected, set the previewImage using your custom URL
            const customURL = 'YOUR_CUSTOM_URL'; // Replace 'YOUR_CUSTOM_URL' with your actual URL
            setPreviewImage(customURL);
        } else {
            // If no file is selected, reset the previewImage
            setPreviewImage('');
        }
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    const [tableData, setTableData] = useState([]);
    const [lecturerState, lecturerDispatch] = useLecturerContext();
    const [facultyState, facultyDispatch] = useFacultyContext();
    const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();


    const [unselectedClasses, setUnselectedClasses] = useState(schoolClassState?.schoolClasses);

    let lecturers = lecturerState?.lecturers;

    useEffect(() => {
        form.setFieldsValue({
            avatar: lecturerData.avatar,
            id: lecturerData.id,
            name: lecturerData?.personalInfo?.name,
            username: lecturerData.username,
            password: lecturerData.password,
            email: lecturerData.email,
            dateofbirth: moment(lecturerData?.personalInfo?.dateOfBirth, dateFormat),
            gender: lecturerData?.personalInfo?.gender,
            phone: lecturerData?.personalInfo?.phone,
            faculty: lecturerData?.personalInfo?.facultyId,
            program: lecturerData?.personalInfo?.program,
        });
        setFileList([{ url: lecturerData?.personalInfo?.avatarUrl }]);
        if (schoolClassState?.schoolClasses?.length > 0) {
            setUnselectedClasses(schoolClassState?.schoolClasses?.filter((item) => !lecturerData?.classes?.some((classId) => classId === item?.id)));
            setTableData(schoolClassState?.schoolClasses?.filter((item) => lecturerData?.classes?.some((classId) => classId === item?.id)));
        }

    }, [lecturerData, form]);


    useEffect(() => {
        setTableData([]);
        setUnselectedClasses(schoolClassState?.schoolClasses);
    }, [schoolClassState?.schoolClasses]);

    const handleIdChange = () => {
        const value = form.getFieldValue("id");
        form.setFieldsValue({
            id: value,
            username: value,
            email: value + "@gm.uit.edu.vn",
        })

    }

    const handleClassChange = (value) => {
        const selectedClassData = unselectedClasses.find((item) => item?.id === value);

        if (selectedClassData) {
            setTableData((prevData) => [...prevData, selectedClassData]);
            setUnselectedClasses((prevData) => prevData.filter((item) => item?.id !== value));
        }
    };
    const handleRemoveClass = (value) => {
        const selectedClassData = tableData.find((item) => item?.id === value?.id);

        if (selectedClassData !== undefined && selectedClassData !== null) {
            if (!unselectedClasses.some((item) => item?.id === value?.id))
                setUnselectedClasses((prevData) => [value, ...prevData]);
            setTableData((prevData) => prevData.filter((item) => item?.id !== value.id));
        }
    }
    const handleSubmit = () => {
        form.validateFields()
            .then(async (values) => {
                message.info("handling request");
                const { id, name, username, password, email, dateofbirth, gender, phone, faculty, program } = form.getFieldsValue();
                const classIds = tableData.map((item) => item.id);
                const formattedDateOfBirth = formatDate(dateofbirth);
                const personalInformation = new PersonalInfo(isValidDate(formattedDateOfBirth) ? formattedDateOfBirth : null, name, gender, phone, faculty, program);
                let lecturer = new SchoolMemberCreateRequest(id, username, password, email, "lecturer", personalInformation, classIds);
                const formData = new FormData();
                const requestBody = JSON.stringify(lecturer);
                formData.append('RequestBody', requestBody);

                if (fileList !== undefined && fileList !== null && fileList.length > 0) {
                    let file = fileList[0];
                    lecturer.prevUrl = lecturerData?.personalInfo?.avatarUrl;
                    if (file?.originFileObj)
                        formData.append('File', file.originFileObj);
                }
                else
                    lecturer.prevUrl = null;


                console.log(requestBody)
                try {
                    console.log(lecturer)
                    const response = await lecturerApi.lecturerUpdateInstance(formData);
                    if (!response.isError) {
                        message.success(`Create lecturer successfully! ${lecturer.id}`);
                        let lecturerIndex = lecturerState.lecturers.findIndex((item) => item.id === lecturer.id);
                        if (lecturerIndex !== -1) {
                            let newLecturers = [...lecturerState.students];
                            newLecturers[lecturerIndex] = lecturer;
                            lecturerDispatch(setLecturers(newLecturers));
                        }
                        form.resetFields();
                        onOk();
                    } else {
                        message.error(`Create student failed! ${response.data?.message}`);
                    }
                } catch (error) {
                    message.error(`Create student failed! ${error}`);
                }
            })
            .catch((error) => {
                let messageError = "Create student failed!";
                error.errorFields?.map((item) => {
                    messageError += "\n" + item.errors;
                });
                message.error(messageError);
            });
    };

    const handleExitForm = () => {
        form.resetFields();
        onCancel();
    }



    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Class Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Subject',
            render: (text, record) => (
                <p>
                    {record.subject?.id + "-" + record.subject?.name}
                </p>
            ),
            key: ['subject', 'id'],
        },
        {
            title: 'Action',
            render: (text, record) => (
                <Button onClick={() => { handleRemoveClass(record) }} danger >
                    Remove
                </Button>
            ),
            key: 'action',
        }
    ];



    return (
        <Modal
            title="Create Lecturer"
            open={open}
            onOk={handleSubmit}
            width={720}
            style={{
                top: 10,
            }}
            onCancel={handleExitForm}
            okText="Save"
            cancelText="Cancel"
        >
            <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                <Form.Item label="Avatar" name="avatar">
                    <Upload
                        listType="picture-circle"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}>
                        {fileList.length >= 1 ? null : uploadButton}

                    </Upload>
                </Form.Item>

                <Form.Item label="ID" name="id" rules={[{ required: true, message: "please enter id" }]}>
                    <Input disabled={true} onChange={handleIdChange} />
                </Form.Item>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: "please enter name" }]}>
                    <Input onChange={handleIdChange} />
                </Form.Item>
                <Form.Item label="Username" name="username" rules={[{ required: true, message: "please enter name" }]}>
                    <Input disabled={true} />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="Dateofbirth" name="dateofbirth" >
                    <DatePicker format="DD/MM/YYYY" />
                </Form.Item>
                <Form.Item label="Gender" name="gender">
                    <Select allowClear>
                        <Option value="nam">Male</Option>
                        <Option value="nu">Female</Option>
                        <Option value="orther">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Phone" name="phone">
                    <Input />
                </Form.Item>
                <Form.Item label="Faculty" name="faculty">
                    <AutoComplete
                        placeholder="Faculty"
                        options={
                            facultyState?.faculties?.map((item) => {
                                return {
                                    value: item.id,
                                    label: item.name,
                                };
                            })
                        }
                    />
                </Form.Item>
                <Form.Item label="Program" name="program">
                    <Select allowClear>
                        <Option value="clc">CLC</Option>
                        <Option value="daitra">Đại trà</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Classes" name="classes">
                    <Select allowClear onChange={handleClassChange}>
                        {
                            unselectedClasses?.map((item) => {
                                return <Option value={item.id}>{item.id + " - " + item.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Table dataSource={tableData} columns={columns} pagination={false} />

            </Form>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </Modal>
    );
}

export default EditLecturerModal;


