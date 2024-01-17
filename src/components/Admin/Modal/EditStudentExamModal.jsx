import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, TimePicker, message } from 'antd';
import { schoolClassApi } from '../../../data-api';
import moment from 'moment';

const { Option } = Select;

const format = 'HH:mm';


function EditStudentExamModal({ open, onOk, onCancel, examData, classId, setSelectedSchoolClass, exams }) {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            name: examData.name,
            room: examData.room,
            duration: moment(examData.duration, 'HH:mm:ss'),
            date: moment(examData.dateString, 'DD/MM/YYYY HH:mm:ss'),
        });
    }, [examData, form]);

    const handleSave = () => {
        form.validateFields().then((values) => {
            const { name, date, duration, room } = values;
            const exam = {
                id: examData.id,
                name: name,
                date: date,
                dateString: date?.format('DD/MM/YYYY HH:mm:ss'),
                duration: duration?.format('HH:mm'),
                room: room,
            }
            console.log(exams);
            const examIndex = exams.findIndex((item) => item.id === exam.id);
            exams[examIndex] = exam;

            schoolClassApi.updateExam(classId, exams).then((response) => {
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
            title="Edit Exam"
            open={open}
            onOk={() => {
                handleSave();
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
                    <DatePicker format="DD/MM/YYYY hh:mm A" showTime={{ use12Hours: true }} />
                </Form.Item>
                <Form.Item label="Room" name="room">
                    <Input />
                </Form.Item>
                <Form.Item label="Duration" name="duration">
                    <TimePicker format={format} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default EditStudentExamModal;