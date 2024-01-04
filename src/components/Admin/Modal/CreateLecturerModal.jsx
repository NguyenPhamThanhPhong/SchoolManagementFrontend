import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, AutoComplete, Table, DatePicker, message } from 'antd';

import { useLecturerContext, useFacultyContext, useSchoolClassContext, appendLecturer } from '../../../data-store';
import { LecturerApi, SchoolMemberCreateRequest, PersonalInfo, formatDate } from '../../../data-api';
const { Option } = Select;

function CreateLecturerModal({ open, onOk, onCancel }) {
    const [form] = Form.useForm();

    const [tableData, setTableData] = useState([]);
    const [lecturerState, lecturerDispatch] = useLecturerContext();
    const [facultyState, facultyDispatch] = useFacultyContext();
    const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();


    const [unselectedClasses, setUnselectedClasses] = useState(schoolClassState?.schoolClasses);

    let lecturers = lecturerState?.lecturers;

    const validateId = async (rule, value, callback) => {
        let x = form.getFieldValue('id');
        console.log(x);
        if (lecturerState.lecturers?.some((lecturer) => lecturer.id === value)) {
            callback(`lecturer ID: ${value} already exist`);
        } else {
            callback();
        }
    }
    const validateUsername = async (rule, value, callback) => {
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

    const handleIdChange = (value) => {
        form.setFieldValue({
            id: value,
            username: value,
            email: value + "@gm.uit.edu.vn",
        })
    }

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
        <Modal title="Create Lecturer" open={open} onOk={onOk} onCancel={onCancel}>
            <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                <Form.Item label="ID" name="id" rules={[{ required: true, message: "please enter id" }, { validator: validateId }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: "please enter name" }]}>
                    <Input />
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
                        <Option value="Class 1">Class 1</Option>
                        {
                            schoolClassState?.schoolClasses?.map((item) => {
                                return <Option value={item.id}>{item.id + " - " + item.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Table dataSource={tableData} columns={columns} pagination={false} />

            </Form>
        </Modal>
    );
}

export default CreateLecturerModal;


