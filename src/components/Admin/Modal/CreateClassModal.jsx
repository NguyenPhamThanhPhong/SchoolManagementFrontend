import React, { useState } from 'react';
import { Modal, Form, Input, Select, AutoComplete, TimePicker, Checkbox } from 'antd';
const { Option } = Select;

function CreateClassModal({ open, onOk, onCancel }) {
    const [componentDisabled, setComponentDisabled] = useState(true);
    return (
        <Modal title="Add New Class" open={open} onOk={onOk} onCancel={onCancel}>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 20,
                }}
            >
                <Checkbox checked={componentDisabled} onChange={(e) => setComponentDisabled(e.target.checked)}>
                    Custom Class ID
                </Checkbox>
                <Form.Item label="ID" name="id" rules={[{ required: true }]}>
                    <Input disabled={componentDisabled} />
                </Form.Item>
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input value={name} onChange={(e) => { setName(e.target.value) }} />
                </Form.Item>
                <Form.Item label="SubjectID" name="sucject_id" rules={[{ required: true }]}>
                    <Input value={subjectId} onChange={(e) => { setSubjectId(e.target.value) }} />
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
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Select allowClear>
                            <Option value="schedule1">1</Option>
                            <Option value="schedule2">2</Option>
                            <Option value="schedule3">3</Option>
                        </Select>
                        <TimePicker.RangePicker format="HH:mm" />
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateClassModal;
