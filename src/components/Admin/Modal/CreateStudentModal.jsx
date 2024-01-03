/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, AutoComplete, Table, DatePicker, message } from 'antd';
import { useStudentContext, useFacultyContext, useSchoolClassContext, appendStudent } from '../../../data-store';
import { StudentApi, SchoolMemberCreateRequest, PersonalInfo, formatDate } from '../../../data-api';

const { Option } = Select;

function CreateStudentModal({ open, onOk, onCancel }) {
    const [form] = Form.useForm();

    const [tableData, setTableData] = useState([]);

    const [studentState, studentDispatch] = useStudentContext();
    const [facultyState, facultyDispatch] = useFacultyContext();
    const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();

    const [unselectedClasses, setUnselectedClasses] = useState(schoolClassState?.schoolClasses);

    const validateId = async (rule, value, callback) => {
        if (studentState.students.some((student) => student.id === value)) {
            callback(`Student ID: ${value} already exist`);
        } else {
            callback();
        }
    }
    const handleIdChange = (value) => {
        form.setFieldValue({
            id: value,
            username: value,
            email: value + "@gm.uit.edu.vn",
        })
    }

    const validateUsername = async (rule, value, callback) => {
        if (studentState?.students.some((student) => student.username === value)) {
            callback(`Username: ${value} already exist`);
        } else {
            callback();
        }
    }

    useEffect(() => {
        setTableData([]);
        setUnselectedClasses(schoolClassState?.schoolClasses);
    }, [schoolClassState?.schoolClasses]);



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

    const handleSubmit = async () => {
        form.validateFields().then(async (values) => {
            let { id, name, username, password, email, dateofbirth, gender, phone, faculty, program } = values;
            console.log(faculty)
            let classIds = tableData.map((item) => item.id);
            dateofbirth = formatDate(dateofbirth);
            let personalInformation = new PersonalInfo(dateofbirth, name, gender, phone, faculty, program);
            let student = new SchoolMemberCreateRequest(id, username, password, email, "student", personalInformation, classIds);
            console.log(student);
            try {
                let response = await StudentApi.studentCreate(student);
                if (!response.isError) {
                    studentDispatch(appendStudent(response.data.data));
                    message.success(`Create student successfully! ${student.id}`);
                    form.resetFields();
                    onOk();
                }
                else {
                    message.error(`Create student failed! ${response.data}`);
                    message.error(`${JSON.stringify(student)}`);
                }
            }
            catch (error) {
                message.error(`Create student failed! ${error}`);
            }
        })
    }


    const handleClassChange = (value) => {
        const selectedClassData = unselectedClasses?.find((item) => item.id === value);

        if (selectedClassData) {
            setTableData((prevData) => [...prevData, selectedClassData]);
            setUnselectedClasses((prevData) => prevData.filter((item) => item.id !== value));
        }
    };

    return (
        <Modal title="Tạo sinh viên" open={open} onOk={handleSubmit} onCancel={onCancel}>
            <Form
                form={form}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 20,
                }}
            >
                <Form.Item
                    label="ID"
                    name="id"
                    rules={[{ required: true, message: 'Please enter an ID!' },
                    { validator: validateId }]}
                >
                    <Input onChange={(e) => { form.setFieldValue(handleIdChange(e.target.value)) }} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter a username!' },
                { validator: validateUsername }]} >
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
                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        { required: true, message: 'Please enter a phone number' },
                        { pattern: /^[0-9]*$/, message: 'Please enter a valid phone number (numeric characters only)' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Faculty" name="faculty" defaultValue="" rules={[
                    { required: true, message: 'Please select a faculty' },
                ]} >
                    <Select mode="single" showSearch optionFilterProp="children" allowClear>
                        {facultyState.faculties?.map((faculty) => (
                            <Option key={faculty.id} value={faculty.id}>
                                {faculty.id + " - " + faculty.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Program" name="program">
                    <Select allowClear>
                        <Option value="high quality program">high quality program</Option>
                        <Option value="Normal">Normal</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Classes" name="classes">
                    <Select allowClear onChange={handleClassChange}>
                        {
                            unselectedClasses?.map((item) => (
                                <Option value={item.id}>{item.id + "-" + item.name}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Table dataSource={tableData} columns={columns} pagination={false} />
            </Form>
        </Modal>
    );
}

export default CreateStudentModal;
