import React, { useState } from 'react';
import { Modal, Form, Row, Col, InputNumber, Divider, Button, message } from 'antd';
import { SemesterApi, Semester } from '../../../data-api';
import { setSemesters } from '../../../data-store';

const AutoGenerateModal = ({ isAutoGenerateOpen, setIsAutoGenerateOpen, semesters, semesterDispatch }) => {
    const [form] = Form.useForm();
    const [leftValue, setLeftValue] = useState(0);
    const [rightValue, setRightValue] = useState(0);

    const handleLeftChange = (value) => {
        setLeftValue(value);
        setRightValue(value + 1);
        form.setFieldsValue({ rightInput: value + 1 }); // Update form values
    };

    const handleRightChange = (value) => {
        setRightValue(value);
        setLeftValue(value - 1);
        form.setFieldsValue({ leftInput: value - 1 }); // Update form values
    };

    const convertNumberToSemester = (i, leftInput, rightInput) => {
        switch (i) {
            case 0:
                return new Semester(`HK I ${leftInput}-${rightInput}`, null, null);
            case 1:
                return new Semester(`HK II ${leftInput}-${rightInput}`, null, null);
            default:
                return new Semester(`HK III ${leftInput}-${rightInput}`, null, null);
        }
    }

    const onFinish = async () => {
        form.validateFields()
            .then(async (values) => {
                let { leftInput, rightInput } = values;
                let semesterList = [];
                for (var i = 0; i < 3; i++) {
                    let semester = convertNumberToSemester(i, leftInput, rightInput);
                    if (semesters.some((item) => item.id === semester.id)) {
                        message.warning(`Semester ${semester.id} already exist`);
                    }
                    else {
                        semesterList.push(semester);
                    }
                }
                try {
                    console.log(semesterList)
                    let response = await SemesterApi.autoGenerateSemester(semesterList)
                    if (!response.isError) {
                        semesterDispatch(setSemesters([...semesters, ...semesterList]));
                        message.success(`Create semester ${semesterList.map((semester) => semester.id)} successfully!}`);
                        form.resetFields();
                        setIsAutoGenerateOpen(false);
                    }
                }
                catch (error) {
                    message.error(`Create semester failed! ${error}`);
                }
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
                message.error(`Validation failed ${errorInfo}`);
            });
    };

    return (
        <Modal title="Create Faculty" visible={isAutoGenerateOpen} onCancel={() => { setIsAutoGenerateOpen(false) }} footer={[
            <Button key="cancel" onClick={() => { setIsAutoGenerateOpen(false) }}>
                Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={onFinish}>
                Auto Generate
            </Button>,
        ]}>
            <Form form={form}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Left Input"
                            name="leftInput"
                            rules={[
                                { required: true, message: 'Please input a value' },
                                { type: 'integer', message: 'Please enter a valid integer' },
                                { validator: (_, value) => value >= 0 ? Promise.resolve() : Promise.reject('Value must be greater than or equal to 0') },
                            ]}
                        >
                            <InputNumber value={leftValue} onChange={handleLeftChange} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Right Input"
                            name="rightInput"
                            rules={[
                                { required: true, message: 'Please input a value' },
                                { type: 'integer', message: 'Please enter a valid integer' },
                                { validator: (_, value) => value >= 0 ? Promise.resolve() : Promise.reject('Value must be greater than or equal to 0') },
                            ]}
                        >
                            <InputNumber value={rightValue} onChange={handleRightChange} />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider type="vertical" />
            </Form>
        </Modal>
    );
};

export default AutoGenerateModal;
