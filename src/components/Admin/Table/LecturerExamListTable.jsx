import React, { useState } from 'react';
import { Form, Input, InputNumber, Table, Typography, Button } from 'antd';

const examListData = [
    { id: 1, name: 'Exam 1', date: '2023-01-01', room: 'Room A', duration: '2 hours', notes: 'Notes for Exam 1' },
    { id: 2, name: 'Exam 2', date: '2023-02-01', room: 'Room B', duration: '3 hours', notes: 'Notes for Exam 2' },
];

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

const LecturerExamListTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(examListData);
    const [editingKey, setEditingKey] = useState('');

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
            title: 'Date',
            dataIndex: 'date',
            width: '15%',
            editable: true,
        },
        {
            title: 'Room',
            dataIndex: 'room',
            width: '15%',
            editable: true,
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            width: '15%',
            editable: true,
        },
        {
            title: 'Notes',
            dataIndex: 'notes',
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
                            }}
                        >
                            <Button type="primary">Save</Button>
                        </Typography.Link>
                        <Typography.Link
                            onClick={cancel}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            <Button type="primary" danger>
                                Cancel
                            </Button>
                        </Typography.Link>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        <Button type="primary">Edit</Button>
                    </Typography.Link>
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
                inputType: col.dataIndex === 'duration' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
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
    );
};

export default LecturerExamListTable;
