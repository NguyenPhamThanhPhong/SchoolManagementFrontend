import React from 'react';
import { Modal, Form, Input, DatePicker, TimePicker, message } from 'antd';
import { schoolClassApi } from '../../../data-api';
import moment from 'moment';

const format = 'HH:mm';


const CreateStudentExamModal = ({ visible, onOk, onCancel, setSelectedSchoolClass, classId }) => {


    const [form] = Form.useForm();
    const handleSave = () => {
        form.validateFields().then((values) => {
            const { name, date, duration, room } = values;
            const exam = {
                name: name,
                date: date,
                dateString: date?.format('DD/MM/YYYY HH:mm:ss'),
                duration: duration?.format('HH:mm:ss'),
                room: room,
            }
            schoolClassApi.createExam(classId, exam).then((response) => {
                if (!response.isError) {
                    setSelectedSchoolClass(response?.data?.data);
                    message.success("Create exam successfully");
                    onOk();
                    form.resetFields();
                }
                else {
                    message.error(response?.data);
                }
            }).catch((error) => {
                message.error(error);
            });
        }).catch((error) => {
            message.error('Please enter all required fields');
            console.log(error);
        });
    }

    return (
        <Modal
            title="Create Exam"

            visible={visible}
            onOk={handleSave}
            onCancel={onCancel}
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
                <Form.Item rules={[{ required: true, message: 'please enter exam name' }]} label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Date" name="date">
                    <DatePicker format="DD/MM/YYYY hh:mm A" showTime={{ use12Hours: true }} defaultValue={moment()} />
                </Form.Item>
                <Form.Item label="Duration" name="duration">
                    <TimePicker format={format} />
                </Form.Item>
                <Form.Item label="Room" name="room">
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default CreateStudentExamModal;