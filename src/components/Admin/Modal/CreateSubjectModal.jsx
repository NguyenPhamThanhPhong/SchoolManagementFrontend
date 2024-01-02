import { Modal, Form, Input, Select, message } from 'antd';
import { useState, useEffect } from 'react';
import { useSubjectContext, useFacultyContext, appendSubject } from '../../../data-store';
import { subjectApi, Subject } from '../../../data-api';

const CreateSubjectModal = ({ open, onCancel, onOk }) => {
    const [form] = Form.useForm();
    const { Option } = Select;


    useEffect(() => {
        form.setFieldsValue({
            id: "",
            facultyId: ""
        });
    }, []);

    const [subjectState, subjectDispatch] = useSubjectContext();
    const [facultyState, facultyDispatch] = useFacultyContext();

    let subjects = subjectState.subjects;
    let faculties = facultyState.faculties;

    const handleSelectFaculty = (value) => {
        const currentValues = form.getFieldsValue();
        let currentID = currentValues.id;
        const facultyId = currentValues.facultyId;

        // Use a regular expression to find the position of the first digit in the currentID
        if (currentID === undefined || currentID === null) {
            currentID = "";
        }
        if (facultyId === undefined || facultyId === null) {
            facultyId = "";
        }

        const firstDigitIndex = currentID?.search(/\d/);

        // If a digit is found, replace the substring from the start to the first digit with the facultyId
        if (firstDigitIndex !== -1) {
            currentID = facultyId + currentID?.slice(firstDigitIndex);
        } else {
            // If no digit is found, append the facultyId to the currentID
            currentID = facultyId;
        }

        form.setFieldsValue({
            id: currentID,
            facultyId: value
        });
    };


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
                defaultValue=""
                rules={[{ required: true, message: 'Please enter an ID!' },
                { validator: validateId }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Name"
                name="name"
                defaultValue=""
                rules={[
                    { required: true, message: 'Please enter a name!' },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Faculty" name="facultyId" defaultValue="" rules={[
                { required: true, message: 'Please select a faculty' },
            ]} >
                <Select mode="single" showSearch optionFilterProp="children" onChange={handleSelectFaculty} allowClear>
                    {faculties.map((faculty) => (
                        <Option key={faculty.id} value={faculty.id}>
                            {faculty.id + " - " + faculty.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Previous Subject" name="previousSubjectId">
                <Select allowClear mode="multiple">
                    {
                        subjects.map((subject) => {
                            let display = subject.id + " - " + subject.name;
                            return <Option value={subject.id}>{display}</Option>
                        })
                    }

                </Select>
            </Form.Item>
            <Form.Item label="Prerequisite Subject" name="prequisiteSubjectId">
                <Select allowClear mode="multiple" >
                    {
                        subjects.map((subject) => {
                            let display = subject.id + " - " + subject.name;
                            return <Option value={subject.id}>{display}</Option>
                        })
                    }
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
