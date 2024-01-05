import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, AutoComplete, Button, Table, DatePicker, message } from 'antd';

import { useLecturerContext, useFacultyContext, useSchoolClassContext, appendLecturer } from '../../../data-store';
import { lecturerApi } from '../../../data-api';
import { SchoolMemberCreateRequest, PersonalInfo, formatDate, isValidDate } from '../../../data-api';
const { Option } = Select;

function CreateLecturerModal({ open, onOk, onCancel }) {
    const [form] = Form.useForm();

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
        form.validateFields().then(async (values) => {
            let { id, name, username, password, email, dateofbirth, gender, phone, faculty, program } = values;
            let classIds = tableData.map((item) => item.id);
            dateofbirth = formatDate(dateofbirth);
            let personalInformation = new PersonalInfo(isValidDate(dateofbirth) ? dateofbirth : null, name, gender, phone, faculty, program);
            let lecturer = new SchoolMemberCreateRequest(id, username, password, email, "lecturer", personalInformation, classIds);
            console.log(JSON.stringify(lecturer))
            message.info('Submit ' + JSON.stringify(values))
            try {
                let response = await lecturerApi.lecturerCreate(lecturer)
                console.log(response);
                if (!response.isError) {
                    lecturerDispatch(appendLecturer(response.data.data));
                    message.success(`Create lecturer successfully! ${lecturer.id}`);
                    form.resetFields();
                    onOk();
                }
                else {
                    message.error(`Create lecturer failed! ${response.data}`);
                    message.error(`${JSON.stringify(lecturer)}`);
                }
            }
            catch (error) {
                message.error(`Create student failed! ${error}`);
            }
        })
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
                <Button danger >
                    Remove
                </Button>
            ),
            key: 'action',
        }
    ];



    return (
        <Modal title="Create Lecturer" open={open} onOk={handleSubmit} onCancel={onCancel}>
            <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
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
        </Modal>
    );
}

export default CreateLecturerModal;


