import React from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';

const CreateStudentExamModal = ({ visible, onOk, onCancel }) => {
    return (
        <Modal
            title="Create Exam"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form
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
                    <DatePicker format="YYYY-MM-DD" defaultValue={moment()} />
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
};

export default CreateStudentExamModal;
