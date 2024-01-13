import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
const { Option } = Select;

function EditStudentExamModal({ open, onOk, onCancel, examData }) {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            name: examData.name,
            room: examData.room,
            duration: examData.duration,


        });
    }, [examData, form]);

    const handleSave = () => {
        const dataClass = form.getFieldsValue();
        console.log(dataClass);
    };
    return (
        <Modal
            title="Edit Exam"
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

                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Date" name="date">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Room" name="room">
                    <Input />
                </Form.Item>
                <Form.Item label="Duration" name="duration">
                    <Input type="number" />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditStudentExamModal;