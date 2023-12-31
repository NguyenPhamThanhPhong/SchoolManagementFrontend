import { Modal, Form, Input, Select } from 'antd';
const { Option } = Select;
const CreateSubjectModal = ({ open, onCancel, onOk }) => {
    const createForm = (
        <Form
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 16,
            }}
        >
            <Form.Item label="ID" name="id" rules={[{ required: true, message: 'Please enter a id!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter a name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Previous Subject" name="previous_subject">
                <Select allowClear mode="multiple" defaultValue="subject1">
                    <Option value="subject1">subject1</Option>
                    <Option value="subject2">subject2</Option>
                    <Option value="subject3">subject3</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Prequisite Subject" name="prequisite_subject">
                <Select allowClear mode="multiple" defaultValue="subject1">
                    <Option value="subject1">subject1</Option>
                    <Option value="subject2">subject2</Option>
                    <Option value="subject3">subject3</Option>
                </Select>
            </Form.Item>
        </Form>
    );

    return (
        <Modal title="Thêm mới môn học" visible={open} onOk={onOk} onCancel={onCancel}>
            {createForm}
        </Modal>
    );
};

export default CreateSubjectModal;
