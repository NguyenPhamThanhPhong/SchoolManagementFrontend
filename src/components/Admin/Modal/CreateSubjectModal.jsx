import { Modal, Form, Input } from 'antd';
import { useState } from 'react';

import { Subject, subjectApi } from '../../../data-api';


const CreateSubjectModal = ({ open, onCancel, onOk, deleteSubject, createSubject }) => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [prequisiteSubject, setPrequisiteSubject] = useState('');
    const [previousSubject, setPreviousSubject] = useState('');

    const handleCreate = async () => {
        let subject = new Subject(id, name, prequisiteSubject, previousSubject, []);
        await createSubject(subject);
    }

    const createForm = (
        <Form>
            <Form.Item label="Id" name="id">
                <Input value={id} onChange={(event) => { setId(event.target.value) }} />
            </Form.Item>
            <Form.Item label="Name" name="name">
                <Input value={name} onChange={(event) => { setName(event.target.value) }} />
            </Form.Item>
            <Form.Item label="prequisite Subject" name="prequisite subject">
                <Input value={prequisiteSubject} onChange={(event) => { setPrequisiteSubject(event.target.value) }} />
            </Form.Item>
            <Form.Item label="Previous Subject" name="Previous subject">
                <Input value={previousSubject} onChange={(event) => { setPreviousSubject(event.target.value) }} />
            </Form.Item>
        </Form>
    );

    return (
        <Modal title="Thêm mới môn học" open={open} onOk={handleCreate} onCancel={onCancel}>
            {createForm}
        </Modal>
    );
};

export default CreateSubjectModal;
