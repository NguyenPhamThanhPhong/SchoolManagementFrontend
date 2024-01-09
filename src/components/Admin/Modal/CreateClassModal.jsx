import React, { useState } from 'react';
import { Modal, Form, Input, Select, AutoComplete, TimePicker, Checkbox, message } from 'antd';
import { useSchoolClassContext, useSubjectContext, useLecturerContext, useSemesterContext } from '../../../data-store';
import { appendSchoolClass } from '../../../data-store';
import { SchoolClassCreateRequest, DateOfWeek, schoolClassApi } from '../../../data-api';


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
        form.validateFields().then(async (values) => {
            const { id, name, subject, semester, lecturer, roomName, program, classType } = values
            const schoolClass = new SchoolClassCreateRequest(id, name, JSON.parse(subject), semester, JSON.parse(lecturer), roomName, program, classType, [], schedule);
            console.log(JSON.stringify(schoolClass));
            try {
                let response = await schoolClassApi.classCreate(schoolClass);
                if (!response.isError) {
                    schoolClassDispatch(appendSchoolClass(response.data.data));
                    message.success("Create class successfully");
                    onOk();
                    form.resetFields();
                }
                else {
                    message.error(response?.data);
                }
            }
            catch (error) {
                message.error(error);
            }
        }).catch((error) => {
            message.error(error?.errorFields[0]?.errors[0]);
        })

    }

    const handleSelectSubject = (value) => {
    }

    const handleIdGenerate = () => {
        if (componentDisabled) {
            const currentValues = form.getFieldsValue();
            let name = currentValues?.name || "";
            let subjectId = currentValues?.subject;

            if (name === undefined || name === null)
                name = "";
            if (subjectId === undefined || subjectId === null)
                subjectId = "";

            try {
                subjectId = JSON.parse(subjectId)?.id || {}
            }
            catch (error) {
                subjectId = "";
            }

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
                            <Option key={subject.id} value={JSON.stringify({ id: subject?.id, name: subject?.name })}>
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
                    { required: true, message: 'Please select a lecturer' },
                ]} >
                    <Select mode="single" showSearch optionFilterProp="children" allowClear>
                        {LecturerState.lecturers?.map((lecturer) => (
                            <Option key={lecturer?.id} value={JSON.stringify({ id: lecturer?.id, name: lecturer.personalInfo?.name })}>
                                {lecturer.id + " - " + lecturer.personalInfo?.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Room" name="roomName">
                    <Input />
                </Form.Item>
                <Form.Item label="Program" name="program">
                    <Input />
                </Form.Item>
                <Form.Item label="Class Type" name="classType">
                    <Input />
                </Form.Item>


                {/* <Form.Item label="Schedule" name="schedule">
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
                </Form.Item> */}

                <Form.Item label="Schedule" name="schedule">
                    <Select allowClear>
                        <Option value="schedule1">1</Option>
                        <Option value="schedule2">2</Option>
                        <Option value="schedule3">3</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Time Range" name="timerange">
                    <TimePicker.RangePicker style={{ width: '100%' }} format="HH:mm" />
                </Form.Item>

            </Form>
        </Modal>
    );
}

export default CreateClassModal;
