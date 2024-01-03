import React, { useState } from 'react';
import { Modal, Form, Input, Select, AutoComplete, TimePicker, Checkbox } from 'antd';
import { useSchoolClassContext, useSubjectContext, useLecturerContext, useSemesterContext } from '../../../data-store';
import { SchoolClassCreateRequest, DateOfWeek } from '../../../data-api';


const { Option } = Select;

function CreateClassModal({ open, onOk, onCancel }) {

    let [form] = Form.useForm();

    const [componentDisabled, setComponentDisabled] = useState(true);
    const [schedule, setSchedule] = useState(null);

    const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();
    const [SubjectState, SubjectDispatch] = useSubjectContext();
    const [semesterState, semesterDispatch] = useSemesterContext();
    const [LecturerState, LecturerDispatch] = useLecturerContext();

    const [timeRange, setTimeRange] = useState(null);

    const handleTimeRangeChange = (value) => {
        setTimeRange(value);
        // Additional logic if needed
    };


    const validateId = async (rule, value, callback) => {
        if (schoolClassState?.schoolClasses.some((schoolClass) => schoolClass.id === value)) {
            callback(`Class ID: ${value} already exist`);
        } else {
            callback();
        }
    }
    const handleSubmit = async () => {
        const { id, name, subject, semester, lecturer, roomName, program, classType } = form.getFieldsValue();
        const schoolClass = new SchoolClassCreateRequest(id, name, subject, semester, lecturer, roomName, program, classType, [], schedule);
        console.log(JSON.stringify(schoolClass));

    }

    const handleSelectSubject = (value) => {
    }

    const handleIdGenerate = () => {
        if (componentDisabled) {
            const currentValues = form.getFieldsValue();
            let name = currentValues?.name || "";
            let subjectId = currentValues?.subject || {}
            if (name === undefined || name === null)
                name = "";
            if (subjectId === undefined || subjectId === null)
                subjectId = "";
            form.setFieldsValue({
                id: subjectId + "." + name
            });
        }
    }

    return (
        <Modal title="Add New Class" open={open} onOk={handleSubmit} onCancel={onCancel}>
            <Form form={form}
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
                <Form.Item
                    label="ID"
                    name="id"
                    defaultValue=""

                    rules={[{ required: true, message: 'Please enter an ID!' },
                    { validator: validateId }
                    ]}
                >
                    <Input disabled={componentDisabled} />
                </Form.Item>
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input onChange={handleIdGenerate} />
                </Form.Item>

                <Form.Item label="Subject" name="subject" defaultValue="" rules={[
                    { required: true, message: 'Please select a faculty' },
                ]} >
                    <Select mode="single" showSearch optionFilterProp="children" onChange={handleIdGenerate} allowClear>
                        {SubjectState.subjects?.map((subject) => (
                            <Option key={subject.id} value={subject?.id}>
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
                            <Option key={semester.id} value={semester.id}>
                                {semester.id + " - " + semester.startTime + " - " + semester.endTime}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Lecturer" name="lecturer" defaultValue="" rules={[
                    { required: true, message: 'Please select a faculty' },
                ]} >
                    <Select mode="single" showSearch optionFilterProp="children" onChange={handleSelectSubject} allowClear>
                        {LecturerState.lecturers?.map((lecturer) => (
                            <Option key={{ id: lecturer.id, name: lecturer.name }} value={lecturer.id}>
                                {lecturer.id + " - " + lecturer.personalInfo?.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Room" name="room">
                    <Input />
                </Form.Item>
                <Form.Item label="Program" name="program">
                    <Input />
                </Form.Item>
                <Form.Item label="Class Type" name="classType">
                    <Input />
                </Form.Item>


                <Form.Item label="Schedule" name="schedule">
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Select allowClear>
                            {Array.from({ length: 7 }, (_, i) => (
                                <Option key={i} value={i}>
                                    {DateOfWeek.GetDateOfWeek(i)}
                                </Option>
                            ))}
                        </Select>
                        <TimePicker.RangePicker
                            format="HH:mm"
                            value={timeRange}
                            onChange={(e) => { setTimeRange(e.target.value) }}
                        />
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateClassModal;
