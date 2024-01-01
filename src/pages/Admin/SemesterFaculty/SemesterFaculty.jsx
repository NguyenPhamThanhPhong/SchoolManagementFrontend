import React, { useState } from 'react';
import { Card, Button, Input, DatePicker, message, Space, Form, Select, Modal } from 'antd';
import SemesterTable from '../../../components/Admin/Table/SemesterTable';
import FacultyTable from '../../../components/Admin/Table/FacultyTable';
import {
    useSemesterContext, setSemesters, SemesterInitialState, appendSemester,
    useFacultyContext, setFaculties, FacultyInitialState, appendFaculty
} from '../../../data-store';
import { SemesterApi, FacultyApi, Semester } from '../../../data-api';


import { SearchOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Option } = Select;
function SemesterFaculty() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalFacultyOpen, setIsModalFacultyOpen] = useState(false);


    const [semesterState, semesterDispatch] = useSemesterContext();
    const [facultyState, facultyDispatch] = useFacultyContext();

    let semesters = semesterState.semesters;

    const createSemester = async (semester) => {
        try {
            const response = await SemesterApi.create(semester);
            if (!response.isError) {
                const newSemester = response.data.data;
                semesterDispatch(setSemesters([...semesterState.semesters, newSemester]));
                message.success('Create semester successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const showModalSemester = () => {
        setIsModalOpen(true);
    };
    const showModalFaculty = () => {
        setIsModalFacultyOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleModalFacultyOk = () => {
        setIsModalFacultyOpen(false);
    };

    const handleModalFacultyCancel = () => {
        setIsModalFacultyOpen(false);
    };

    function CreateSemesterModal() {

        const [form] = Form.useForm();
        const validateId = (rule, value, callback) => {
            if (semesters.some((semester) => semester.id === value)) {
                callback(`semester "${value}" already exist`);
            } else {
                callback();
            }
        };

        const handleSubmit = async () => {
            form.validateFields().then(
                async (values) => {
                    let { id, start, end } = values;
                    const formatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
                    start = new Date(start).toLocaleDateString('en-GB', formatOptions);
                    end = new Date(end).toLocaleDateString('en-GB', formatOptions);
                    let semester = new Semester(id, start || null, end || null)
                    console.log(semester);
                    try {
                        const response = await SemesterApi.createSemester(semester);
                        if (!response.isError) {
                            semesterDispatch(appendSemester(response.data.data));
                            message.success(`Create subject successfully! ${semester.id}`);
                            form.resetFields();
                            handleOk();
                        } else {
                            message.error(`Create subject failed! ${response.data}`);
                            message.error(`${JSON.stringify(semester)}`);
                        }
                    } catch (error) {
                        message.error(`Create subject failed! ${error}`);
                    }
                },
                (reason) => {
                    const errorMessage = reason.errorFields
                        ? `Create subject failed: ${reason.errorFields[0].name} - ${reason.errorFields[0].errors[0]}`
                        : 'Create subject failed. Please check the form inputs.';
                    message.error(errorMessage);
                }
            );
        }

        return (
            <Modal title="Create Semester" visible={isModalOpen} onOk={handleSubmit} onCancel={handleCancel}>
                <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                    <Form.Item
                        label="Name"
                        name="id"
                        rules={[{ required: true, message: 'Please enter a name!' },
                        { validator: validateId }]}
                    >
                        <Input style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Start time"
                        name="start"
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="End time"
                        name="end"
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                </Form>
            </Modal>
        );
    }

    return (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Card title="Semester" style={{ flex: 1, width: '50%' }}>
                <Space>
                    <Select style={{ width: 150 }} placeholder="Select Semester">
                        <Option value="K42">K42</Option>
                        <Option value="K43">K43</Option>
                    </Select>
                    <Search
                        placeholder="Search..."
                        onSearch={(value) => console.log(value)}
                        style={{ width: 200 }}
                        prefix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={showModalSemester}>
                        Create
                    </Button>
                    <Button type="primary">Auto Create</Button>
                </Space>
                <SemesterTable />
                <CreateSemesterModal>

                </CreateSemesterModal>
            </Card>

            <Card title="Faculty" style={{ flex: 1, width: '50%' }}>
                <Space>
                    <Select style={{ width: 150 }} placeholder="Select Faculty">
                        <Option value="K42">K42</Option>
                        <Option value="K43">K43</Option>
                    </Select>
                    <Search
                        placeholder="Search..."
                        onSearch={(value) => console.log(value)}
                        style={{ width: 200 }}
                        prefix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={showModalFaculty}>
                        Create
                    </Button>
                </Space>
                <FacultyTable />
                <Modal
                    title="Create Faculty"
                    open={isModalFacultyOpen}
                    onOk={handleModalFacultyOk}
                    onCancel={handleModalFacultyCancel}
                >
                    <Space direction="vertical" size={16} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '20%' }}>Name:</label>
                            <Input style={{ width: '80%' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label style={{ width: '20%' }}>Desciption:</label>
                            <Input style={{ width: '80%' }} />
                        </div>
                    </Space>
                </Modal>
            </Card>
        </div>
    );
}

export default SemesterFaculty;
