/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { Modal, Form, Input, Select, AutoComplete, Table, DatePicker } from 'antd';
const { Option } = Select;

function CreateStudentModal({ open, onOk, onCancel }) {
    const [selectedClass, setSelectedClass] = useState(null);
    const [tableData, setTableData] = useState([]);

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
        <Modal title="Tạo sinh viên" open={open} onOk={onOk} onCancel={onCancel}>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 20,
                }}
            >
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
        </Modal>
    );
}

export default CreateStudentModal;
