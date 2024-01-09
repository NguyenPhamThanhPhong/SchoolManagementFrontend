import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, AutoComplete, Button, Table, DatePicker, message, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useLecturerContext, useFacultyContext, useSchoolClassContext, appendLecturer } from '../../../data-store';
import { lecturerApi } from '../../../data-api';
import { SchoolMemberCreateRequest, PersonalInfo, formatDate, isValidDate } from '../../../data-api';
const { Option } = Select;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function CreateLecturerModal({ open, onOk, onCancel }) {
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

    const validateId = (rule, value, callback) => {
        if (lecturers.some((lecturer) => lecturer.id === value)) {
            callback(`lecturer "${value}" already exist`);
        } else {
            callback();
        }
    };
    const validateUsername = (rule, value, callback) => {
        if (lecturerState.lecturers.some((lecturer) => lecturer.username === value)) {
            callback(`Username: ${value} already exist`);
        } else {
            callback();
        }
    }

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
        message.info("Remove class " + JSON.stringify(value));
        const selectedClassData = tableData.find((item) => item?.id === value);
        if (selectedClassData) {
            setUnselectedClasses((prevData) => [...prevData, selectedClassData]);
            setTableData((prevData) => prevData.filter((item) => item?.id !== value));
        }
    }
    const handleSubmit = async () => {
        try {
            await form.validateFields();
            const values = form.getFieldsValue();
            const { id, name, username, password, email, dateofbirth, gender, phone, faculty, program } = values;
            const classIds = tableData.map((item) => item.id);
            const formattedDateOfBirth = formatDate(dateofbirth);
            const personalInformation = new PersonalInfo(isValidDate(formattedDateOfBirth) ? formattedDateOfBirth : null, name, gender, phone, faculty, program);
            const lecturer = new SchoolMemberCreateRequest(id, username, password, email, "lecturer", personalInformation, classIds);

            try {
                const response = await lecturerApi.lecturerCreate(lecturer);
                console.log(response);

                if (!response.isError) {
                    lecturerDispatch(appendLecturer(response.data.data));
                    message.success(`Create lecturer successfully! ${lecturer.id}`);
                    form.resetFields();
                    onOk();
                } else {
                    message.error(`Create lecturer failed! ${response.data}`);
                    message.error(`${JSON.stringify(lecturer)}`);
                }
            } catch (error) {
                message.error(`Create lecturer failed! ${error}`);
            }
        } catch (error) {
            let messageError = "create lecturer failed!";
            error.errorFields?.map((item) => {
                messageError += "\n" + item.errors;
            });
            message.error(messageError);
        }
    };


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
                <Button danger >
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
            onOk={onOk}
            width={720}
            style={{
                top: 10,
            }}
            onCancel={onCancel}
            okText="Save"
            cancelText="Cancel"
        >
            <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
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
                <Form.Item label="ID" name="id" rules={[{ required: true, message: "please enter id" }, { validator: validateId }]}>
                    <Input onChange={handleIdChange} />
                </Form.Item>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: "please enter name" }]}>
                    <Input onChange={handleIdChange} />
                </Form.Item>
                <Form.Item label="Username" name="username" rules={[{ required: true, message: "please enter name" }, { validator: validateUsername }]}>
                    <Input />
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

export default CreateLecturerModal;


