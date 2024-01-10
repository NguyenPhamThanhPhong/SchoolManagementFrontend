import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, Upload, message, Select } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

import { InboxOutlined } from '@ant-design/icons';
import { usePostContext, setPosts, appendPost, removePost } from '../../../data-store';
import { useFacultyContext } from '../../../data-store';
import { PostApi, PostCreateRequest, PostUpdateRequest } from '../../../data-api';

const { Dragger } = Upload;
const { Option } = Select;


const CreatePostModal = ({ isOpen, handleOk, handleCancel, selectedPost }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [image, setImage] = useState(null);
    const [editorContent, setEditorContent] = useState('');

    const [postState, postDispatch] = usePostContext();
    const [facultyState, facultyDispatch] = useFacultyContext();

    const handleSubmit = async () => {
        let values = await form.getFieldsValue();
        const formData = new FormData();
        let postCreateRequest = new PostCreateRequest(values.title, editorContent, values?.facultyTags || []);

        const requestBody = JSON.stringify(postCreateRequest);
        formData.append('RequestBody', requestBody);

        if (values.files)
            if (values.files?.fileList !== undefined && values.files?.fileList !== null && values.files?.fileList.length > 0)
                values.files.fileList.forEach((file) => {
                    console.log(JSON.stringify(file));
                    formData.append('Files', file.originFileObj);
                });
        try {
            const response = await PostApi.postCreate(formData);
            if (!response.isError) {
                postDispatch(appendPost(response?.data?.data));
                message.success(`create post successfully: ${response?.data?.data?.title}`)
                handleOk();
            }
            else
                message.error(`create post failed: ${response?.data}`)

        } catch (error) {
            console.log(JSON.stringify(error));
        }

    }
    useEffect(() => {
        if (selectedPost !== undefined || selectedPost !== null) {
            form.setFieldsValue({
                title: selectedPost?.title,
                facultyTags: selectedPost?.facultyTags,
                files: []
            })
            setEditorContent(selectedPost?.content);
        }
        else {
            form.resetFields();
            setEditorContent('');
        }
    }, [selectedPost]);

    const handleCloseCreate = () => {
        handleCancel();
        if (selectedPost === undefined || selectedPost === null) {
            form.resetFields();
            setEditorContent('');
        }
    }

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            setFileList(info.fileList);
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
            message.info('Dropped files', e.dataTransfer.files);
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <Modal title="Create Notification" visible={isOpen} onOk={handleSubmit} onCancel={handleCloseCreate} width={1000}>
            <Form
                form={form}
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
                <Form.Item label="Faculty tags" name="facultyTags">
                    <Select allowClear mode="multiple">
                        {
                            facultyState?.faculties.map((faculty) => {
                                let display = faculty.id + " - " + faculty.name;
                                return <Option value={faculty.id}>{display}</Option>
                            })
                        }
                    </Select>
                </Form.Item>

                <Form.Item label="description" name="myContent">
                    <CKEditor
                        editor={ClassicEditor}
                        data="<p>Hello from CKEditor&nbsp;5!</p>"
                        onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const newContent = editor.getData();
                            setEditorContent(newContent);
                        }}
                    />
                </Form.Item>
                <Form.Item label="Prequisite Subject" name="files">
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
