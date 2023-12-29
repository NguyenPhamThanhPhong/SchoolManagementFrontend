import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';

import { useSchoolClassContext, appendSchoolClass } from '../../../data-store';
import { schoolClassApi, SchoolClassCreateRequest } from '../../../data-api';


function CreateClassModal({ open, onOk, onCancel }) {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [program, setProgram] = useState('');
    const [classType, setClassType] = useState('');
    const [subjectId, setSubjectId] = useState('');

    const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();

    const createSchoolClass = async (data) => {
        try {
            let response = await schoolClassApi.create(data)
            if (!response.isError) {
                schoolClassDispatch(appendSchoolClass(response.data.data));
            }
            else
                console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal title="Add New Class" open={open} onOk={onOk} onCancel={onCancel}>
            <Form>
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input value={name} onChange={(e) => { setName(e.target.value) }} />
                </Form.Item>
                <Form.Item label="Room" name="room" rules={[{ required: true }]}>
                    <Input value={room} onChange={(e) => { setRoom(e.target.value) }} />
                </Form.Item>
                <Form.Item label="Program" name="program" rules={[{ required: true }]}>
                    <Input value={program} onChange={(e) => { setProgram(e.target.value) }} />
                </Form.Item>
                <Form.Item label="Class Type" name="class_type" rules={[{ required: true }]}>
                    <Input value={classType} onChange={(e) => { setClassType(e.target.value) }} />
                </Form.Item>
                <Form.Item label="SubjectID" name="sucject_id" rules={[{ required: true }]}>
                    <Input value={subjectId} onChange={(e) => { setSubjectId(e.target.value) }} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateClassModal;
