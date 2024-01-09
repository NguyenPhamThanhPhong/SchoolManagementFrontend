import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, AutoComplete, Table, DatePicker, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
function EditLecturerModal({ open, onOk, onCancel, lecturerData }) {
    const [tableData, setTableData] = useState([]);

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            avatar: lecturerData.avatar,
            id: lecturerData.id,
            name: lecturerData.name,
            username: lecturerData.username,
            password: lecturerData.password,
            email: lecturerData.email,
            dateofbirth: lecturerData.dateofbirth,
            gender: lecturerData.gender,
            phone: lecturerData.phone,
            faculty: lecturerData.faculty,
            program: lecturerData.program,
            classes: lecturerData.classes,
        });
    }, [lecturerData, form]);

    const handleSave = () => {
        const studentClass = form.getFieldsValue();
        console.log(studentClass);
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

    const dataSource = [
        {
            key: '1',
            id: '1',
            class_name: 'Huong dt',
            subject: 'Class 1',
        },
        {
            key: '2',
            id: '2',
            class_name: 'lap trinh',
            subject: 'Class 2',
        },
    ];

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Class Name',
            dataIndex: 'class_name',
            key: 'class_name',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
        },
    ];

    const handleClassChange = (value) => {
        // Find the selected class in dataSource
        const selectedClassData = dataSource.find((item) => item.subject === value);

        // Update the tableData with the selected class information without removing existing data
        if (selectedClassData) {
            setTableData((prevData) => [...prevData, selectedClassData]);
        }
    };

    return (
        <Modal
            title="Edit Lecturer"
            open={open}
            onOk={() => {
                handleSave();
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
                        {fileList.length >= 2 ? null : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item label="ID" name="id" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Username" name="username">
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
                        <Option value="orther">Orther</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Phone" name="phone">
                    <Input />
                </Form.Item>
                <Form.Item label="Faculty" name="faculty">
                    <AutoComplete
                        placeholder="Faculty"
                        options={[
                            {
                                value: 'Faculty 1',
                            },
                            {
                                value: 'Faculty 2',
                            },
                            {
                                value: 'Faculty 3',
                            },
                        ]}
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
                        <Option value="Class 1">Class 1</Option>
                        <Option value="Class 2">Class 2</Option>
                        <Option value="Class 3">Class 3</Option>
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