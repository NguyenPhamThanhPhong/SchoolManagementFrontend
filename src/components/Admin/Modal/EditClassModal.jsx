import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, AutoComplete, TimePicker } from 'antd';
const { Option } = Select;

function EditClassModal({ open, onOk, onCancel, classData }) {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            class_id: classData.class_id,
            name: classData.name,
            room: classData.room,
            program: classData.program,
            class_type: classData.class_type,
            subject: classData.subject,
            semester: classData.semester,
            lecturer: classData.lecturer,
            schedule: classData.schedule,
            timerange: classData.timerange,
        });
    }, [classData, form]);

    const handleSave = () => {
        const dataClass = form.getFieldsValue();
        console.log(dataClass);
    };
    return (
        <Modal
            title="Edit Class"
            open={open}
            onOk={() => {
                handleSave();
                onOk();
            }}
            onCancel={onCancel}
            destroyOnClose={true}
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
                <Form.Item label="ID" name="class_id" rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Room" name="room">
                    <Input />
                </Form.Item>
                <Form.Item label="Program" name="program">
                    <Input />
                </Form.Item>
                <Form.Item label="Class Type" name="class_type">
                    <Input />
                </Form.Item>
                <Form.Item label="Subject" name="subject">
                    <AutoComplete
                        placeholder="Subject"
                        options={[
                            {
                                value: 'Subject 1',
                            },
                            {
                                value: 'Subject 2',
                            },
                            {
                                value: 'Subject 3',
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Semester" name="semester">
                    <Select allowClear>
                        <Option value="semester1">semester1</Option>
                        <Option value="semester2">semester2</Option>
                        <Option value="semester3">semester3</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Lecturer" name="lecturer">
                    <AutoComplete
                        placeholder="Lecturer"
                        options={[
                            {
                                value: 'Lecturer 1',
                            },
                            {
                                value: 'Lecturer 2',
                            },
                            {
                                value: 'Lecturer 3',
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Schedule" name="schedule">
                    <Select allowClear>
                        <Option value="schedule1">1</Option>
                        <Option value="schedule2">2</Option>
                        <Option value="schedule3">3</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Time Range" name="timerange">
                    <TimePicker.RangePicker style={{ width: '100%' }} format="HH:mm" />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditClassModal;