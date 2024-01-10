import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, AutoComplete, TimePicker } from 'antd';

import { useSubjectContext, useSemesterContext, useLecturerContext } from '../../../data-store';
import { DateOfWeek, convertTimeRange } from '../../../data-api/index';
import moment from 'moment';

const { Option } = Select;

function EditClassModal({ open, onOk, onCancel, classData }) {
    const [form] = Form.useForm();

    const [SubjectState, SubjectDispatch] = useSubjectContext();
    const [semesterState, semesterDispatch] = useSemesterContext();

    console.log(classData);
    const [LecturerState, LecturerDispatch] = useLecturerContext();


    useEffect(() => {
        let defaultStartTime = moment(classData.schedule?.startTime, 'HH:mm:ss');
        let defaultEndTime = moment(classData.schedule?.endTime, 'HH:mm:ss');
        form.setFieldsValue({
            id: classData?.id,
            name: classData?.name,
            roomName: classData?.roomName,
            program: classData?.program,
            classType: classData?.classType,
            subject: JSON.stringify({ id: classData?.subject?.id, name: classData?.subject?.name }),
            semester: classData?.semesterId,
            lecturer: JSON.stringify({ id: classData?.lecturer?.id, name: classData?.lecturer?.name }),
            schedule: classData?.schedule?.dateofweek,
            timerange: [defaultStartTime, defaultEndTime],
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
                <Form.Item label="ID" name="id" rules={[{ required: true }]}>
                    <Input disabled />
                </Form.Item>
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="roomName" name="roomName">
                    <Input />
                </Form.Item>
                <Form.Item label="program" name="program">
                    <Input />
                </Form.Item>
                <Form.Item label="Class Type" name="classType">
                    <Input />
                </Form.Item>
                <Form.Item label="Subject" name="subject" defaultValue="" rules={[
                    { required: true, message: 'Please select a faculty' },
                ]} >
                    <Select mode="single" showSearch optionFilterProp="children" allowClear>
                        {SubjectState.subjects?.map((subject) => (
                            <Option key={subject?.id} value={JSON.stringify({ id: subject?.id, name: subject?.name })}>
                                {subject?.id + " - " + subject?.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Semester" name="semester" defaultValue="" rules={[
                    { required: true, message: 'Please select a faculty' },
                ]} >
                    <Select mode="single" showSearch optionFilterProp="children" allowClear>
                        {semesterState.semesters?.map((semester) => (
                            <Option key={semester?.id} value={semester?.id}>
                                {semester?.id + " - " + semester.startTime + " - " + semester.endTime}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Lecturer" name="lecturer" defaultValue="" rules={[
                    { required: true, message: 'Please select a lecturer' },
                ]} >
                    <Select mode="single" showSearch optionFilterProp="children" allowClear>
                        {LecturerState.lecturers?.map((lecturer) => (
                            <Option key={lecturer?.id} value={JSON.stringify({ id: lecturer?.id, name: lecturer.personalInfo?.name })}>
                                {lecturer?.id + " - " + lecturer.personalInfo?.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Schedule" name="schedule">
                    <Select allowClear>
                        {Array.from({ length: 7 }, (_, i) => (
                            <Option key={i} value={i}>
                                {DateOfWeek.GetDateOfWeek(i)}
                            </Option>
                        ))}
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