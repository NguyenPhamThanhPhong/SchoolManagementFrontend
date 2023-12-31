import React from 'react';
import { Modal, Form, Input, DatePicker, Upload, message } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const CreatePostModal = ({ isOpen, handleOk, handleCancel }) => {
    return (
        <Modal title="Create Notification" visible={isOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 16,
                }}
            >
                <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter a name!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Date" name="date">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <CKEditor
                        editor={ClassicEditor}
                        data="<p>Hello from CKEditor&nbsp;5!</p>"
                        onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event) => {
                            console.log(event);
                        }}
                        onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                        }}
                    />
                </Form.Item>
                <Form.Item label="Prequisite Subject" name="prequisite_subject">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or
                            other banned files.
                        </p>
                    </Dragger>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreatePostModal;
