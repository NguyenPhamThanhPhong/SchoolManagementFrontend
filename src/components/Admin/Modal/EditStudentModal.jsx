import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, AutoComplete, Table, DatePicker, Upload, Button, message } from 'antd';
import { useStudentContext, useFacultyContext, useSchoolClassContext, setStudents } from '../../../data-store';
import { lecturerApi, StudentApi } from '../../../data-api';
import { isValidDate, formatDate, PersonalInfo, SchoolMemberCreateRequest } from '../../../data-api';

import { PlusOutlined } from '@ant-design/icons';
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
function EditStudentModal({ open, onOk, onCancel, studentData }) {
    const [tableData, setTableData] = useState([]);

    const [form] = Form.useForm();
    const [facultyState, facultyDispatch] = useFacultyContext();
    const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();
    const [unselectedClasses, setUnselectedClasses] = useState(schoolClassState?.schoolClasses);
    const [studentState, studentDispatch] = useStudentContext();


    useEffect(() => {
        form.setFieldsValue({
            avatar: studentData.avatar,
            id: studentData.id,
            name: studentData?.personalInfo?.name,
            username: studentData.username,
            password: studentData.password,
            email: studentData.email,
            dateofbirth: moment(studentData?.personalInfo?.dateOfBirth, dateFormat),
            gender: studentData?.personalInfo?.gender,
            phone: studentData?.personalInfo?.phone,
            faculty: studentData?.personalInfo?.facultyId,
            program: studentData?.personalInfo?.program,
            classes: studentData.classes,
        });
        setFileList([{ url: studentData?.personalInfo?.avatarUrl }]);
        if (schoolClassState?.schoolClasses?.length > 0) {
            setUnselectedClasses(schoolClassState?.schoolClasses?.filter((item) => !studentData?.classes?.some((classId) => classId === item?.id)));
            setTableData(schoolClassState?.schoolClasses?.filter((item) => studentData?.classes?.some((classId) => classId === item?.id)));
        }
    }, [studentData, form]);

    const handleSave = () => {
        const studentClass = form.getFieldsValue();
    };

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
    const handleSubmit = async () => {
        form.validateFields()
            .then(async (values) => {
                message.info("handling request");
                const { id, name, username, password, email, dateofbirth, gender, phone, faculty, program } = form.getFieldsValue();
                const classIds = tableData.map((item) => item.id);
                const formattedDateOfBirth = formatDate(dateofbirth);
                const personalInformation = new PersonalInfo(isValidDate(formattedDateOfBirth) ? formattedDateOfBirth : null, name, gender, phone, faculty, program);
                let student = new SchoolMemberCreateRequest(id, username, password, email, "student", personalInformation, classIds);
                const formData = new FormData();
                const requestBody = JSON.stringify(student);

                formData.append('RequestBody', requestBody);
                if (fileList !== undefined && fileList !== null && fileList.length > 0) {
                    let file = fileList[0];
                    student.prevUrl = studentData?.personalInfo?.avatarUrl;
                    if (file?.originFileObj)
                        formData.append('File', file.originFileObj);
                }
                else
                    student.prevUrl = null;
                try {
                    console.log(student)
                    const response = await StudentApi.studentUpdateInstance(formData);
                    if (!response.isError) {
                        message.success(`Create student successfully! ${student.id}`);
                        let studentIndex = studentState.students.findIndex((item) => item.id === student.id);
                        if (studentIndex !== -1) {
                            let newStudents = [...studentState.students];
                            newStudents[studentIndex] = student;
                            studentDispatch(setStudents(newStudents));
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

    return (
        <Modal
            title="Edit Student"
            open={open}
            onOk={() => {
                handleSubmit();
                onOk();
            }}
            width={720}
            style={{
                top: 10,
            }}
            onCancel={onCancel}
            okText="Save"
            cancelText="Cancel"
        >
            <Form
                form={form}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 20,
                }}
            >
                <Form.Item label="Avatar" name="avatar">
                    <Upload
                        listType="picture-circle"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item label="ID" name="id" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'please enter your name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Username" name="username" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="Dateofbirth" name="dateofbirth">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Gender" name="gender">
                    <Select allowClear>
                        <Option value="nam">Nam</Option>
                        <Option value="nu">Nu</Option>
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
                        <Option value="clc">Normal</Option>
                        <Option value="daitra">High Quality Program</Option>
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

export default EditStudentModal;