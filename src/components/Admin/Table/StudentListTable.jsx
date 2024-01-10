import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Table, Typography, Button, Select, message } from 'antd';
import { useStudentContext } from '../../../data-store';
import { useSchoolClassContext } from '../../../data-store';
import { useParams } from 'react-router-dom';

import { schoolClassApi } from '../../../data-api';
import { setSchoolClasses } from '../../../data-store';

const classListData = [
    { id: 1, name: 'Student 1', progress: 80, midterm: 75, practice: 90, final: 85, GPA: 85 },
    { id: 2, name: 'Student 2', progress: 70, midterm: 80, practice: 85, final: 78, GPA: 78 },
];
const { Option } = Select;

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const StudentListTable = () => {
    const [formSearch] = Form.useForm();
    const [form] = Form.useForm();

    const [data, setData] = useState(classListData);
    const [editingKey, setEditingKey] = useState('');

    const [studentState, studentDispatch] = useStudentContext();
    const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();


    const { id } = useParams();

    useEffect(() => {
        if (id !== null && id !== undefined && schoolClassState?.schoolClasses !== undefined && schoolClassState?.schoolClasses !== null) {
            const schoolClass = schoolClassState?.schoolClasses?.find((schoolClass) => schoolClass.id === id);
            if (schoolClass) {
                const studentList = schoolClass?.studentLogs?.map((student) => {
                    let scores = student?.scores;
                    return {
                        id: student?.id,
                        name: student?.id,
                        progress: scores[0] || -1,
                        midterm: scores[1] || -1,
                        practice: scores[2] || -1,
                        final: scores[3] || -1,
                        GPA: scores[4] || -1,
                    }
                })
                setData(studentList);
            }
        }
    }, []);

    const handleAddStudent = async (option) => {
        formSearch.validateFields().then(
            async (values) => {
                try {
                    const { student } = formSearch.getFieldsValue();
                    console.log(student)
                    let response = await schoolClassApi.classStudentRegistration(id, option, student);
                    if (!response.isError) {
                        message.success(`Add student successfully! ${values.student}`);
                        formSearch.resetFields();
                        setData([...data, {
                            id: student,
                            name: student,
                            progress: -1,
                            midterm: -1,
                            practice: -1,
                            final: -1,
                            GPA: -1,
                        }]);
                    } else {
                        message.error(`Add student failed! ${response.data}`);
                    }
                } catch (error) {
                    message.error(`Add student failed! ${error}`);
                }
            },
            (reason) => {
                const errorMessage = reason.errorFields
                    ? `Add student failed: ${reason.errorFields[0].name} - ${reason.errorFields[0].errors[0]}`
                    : 'Add student failed. Please check the form inputs.';
                message.error(errorMessage);
            }
        );
    }

    const handleDeleteStudent = async (studentId) => {
        try {
            let response = await schoolClassApi.classStudentRegistration(id, 2, studentId);
            if (!response.isError) {
                message.success(`Delete student successfully! ${studentId}`);
                setData(data.filter((student) => student.id !== studentId));
            } else {
                message.error(`Delete student failed! ${response.data}`);
            }
        }
        catch (error) {
            message.error(`Delete student failed! ${error}`);
        }
    }


    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (id) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => id === item.id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push({
                    id,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            }
            console.log(data)
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            width: '15%',
            editable: true,
        },
        {
            title: 'Midterm',
            dataIndex: 'midterm',
            width: '15%',
            editable: true,
        },
        {
            title: 'Practice',
            dataIndex: 'practice',
            width: '15%',
            editable: true,
        },
        {
            title: 'Final',
            dataIndex: 'final',
            width: '15%',
            editable: true,
        },
        {
            title: 'GPA',
            dataIndex: 'GPA',
            width: '15%',
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.id)}
                            style={{
                                marginRight: 8,
                            }}>
                            <Button type="primary">Save</Button>
                        </Typography.Link>
                        <Typography.Link
                            onClick={cancel}
                            style={{
                                marginRight: 8,
                            }}>
                            <Button type="primary" danger>
                                Cancel
                            </Button>
                        </Typography.Link>
                    </span>
                ) : (
                    <span>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <Button type="primary">Edit</Button>
                        </Typography.Link>
                        <Typography.Link disabled={editingKey !== ''} onClick={async () => { await handleDeleteStudent(record?.id) }}>
                            <Button type="primary" danger>Delete</Button>
                        </Typography.Link>
                    </span>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'progress' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{ width: '100%', display: 'flex' }}>
                <Form form={formSearch} component={false} layout='inline'   >
                    <Form.Item label="Student" name="student" defaultValue="" style={{ width: '80%' }}>
                        <Select mode="single" showSearch optionFilterProp="children" allowClear style={{ width: '100%' }}>
                            {
                                studentState?.students.map((student) => {
                                    const isStudentSelected = data.some(item => item.id === student.id);
                                    if (!isStudentSelected) {
                                        return (
                                            <Option key={student.id} value={student.id}>
                                                {student.id + " - " + student?.personalInfo?.name}
                                            </Option>
                                        );
                                    }
                                    return null;
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
                <Button onClick={() => { handleAddStudent(1) }} style={{ marginLeft: '20px' }}>
                    Add Student
                </Button>
            </div>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                />
            </Form>
        </div>
    );
};

export default StudentListTable;
