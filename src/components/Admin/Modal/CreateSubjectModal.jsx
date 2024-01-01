import { Modal, Form, Input, Select, message } from 'antd';
import { useState } from 'react';
import { useSubjectContext, useFacultyContext, appendSubject } from '../../../data-store';
import { subjectApi, Subject } from '../../../data-api';

const CreateSubjectModal = ({ open, onCancel, onOk }) => {
    const [form] = Form.useForm();
    const { Option } = Select;

    const [subjectState, subjectDispatch] = useSubjectContext();
    const [facultyState, facultyDispatch] = useFacultyContext();

    let subjects = subjectState.subjects;
    let faculties = facultyState.faculties;

    const validateId = (rule, value, callback) => {
        if (subjects.some((subject) => subject.id === value)) {
            callback(`subject ID: ${value} already exist`);
        } else {
            callback();
        }
    };

    const handleSubmit = async () => {
        form.validateFields().then(
            async (values) => {
                let subject = new Subject(
                    values.id,
                    values.name,
                    values.faculty || "",
                    values.previous_subject || [],
                    values.prerequisite_subject || []
                );
                try {
                    const response = await subjectApi.subjectCreate(subject);
                    if (!response.isError) {
                        subjectDispatch(appendSubject(response.data.data));
                        message.success(`Create subject successfully! ${subject.id}`);
                        form.resetFields();
                        onOk();
                    } else {
                        message.error(`Create subject failed! ${response.data}`);
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
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    }

    const createForm = (
        <Form
            form={form}
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 16,
            }}
        >
            <Form.Item
                label="ID"
                name="id"
                rules={[{ required: true, message: 'Please enter an ID!' },
                { validator: validateId }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    { required: true, message: 'Please enter a name!' },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Faculty" name="faculty">
                <Select mode="single" showSearch optionFilterProp="children" allowClear>
                    {faculties.map((faculty) => (
                        <Option key={faculty.id} value={faculty.id}>
                            {faculty.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Previous Subject" name="previous_subject">
                <Select allowClear mode="multiple" defaultValue="subject1">
                    <Option value="subject1">subject1</Option>
                    <Option value="subject2">subject2</Option>
                    <Option value="subject3">subject3</Option>
                    <Option value="subject4">subject4</Option>
                    <Option value="subject5">subject5</Option>
                    <Option value="subject6">subject6</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Prerequisite Subject" name="prerequisite_subject">
                <Select allowClear mode="multiple" defaultValue="subject1">
                    <Option value="subject1">subject1</Option>
                    <Option value="subject2">subject2</Option>
                    <Option value="subject3">subject3</Option>
                </Select>
            </Form.Item>
        </Form>
    );

    return (
        <Modal title="Add New Subject" visible={open} onOk={handleSubmit} onCancel={handleCancel}>
            {createForm}
        </Modal>
    );
};

export default CreateSubjectModal;
