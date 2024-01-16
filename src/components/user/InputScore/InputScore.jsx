import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Table, Modal, Button, Select, message, FloatButton } from 'antd';
import './InputScore.scss'
import { EditOutlined, CheckOutlined, UserDeleteOutlined, CloseOutlined } from '@ant-design/icons'
import { schoolClassApi } from '../../../data-api';


const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    const inputNode = inputType === 'number' ? <InputNumber min={0}
        max={10}
        step={0.1}
    />
        : <Input min={0} max={10} />;
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
                            message: `Please input ${title}!`,
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

const InputScore = ({ classListData, classId }) => {
    const [form] = Form.useForm();

    const [data, setData] = useState(classListData);
    const [editingKey, setEditingKey] = useState('');

    // useEffect(() => {
    //     setData(classListData);
    // }, [classListData]);


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

                const newRow = {
                    ...item,
                    ...row,
                }

                newData.splice(index, 1, newRow);

                setData(newData);
                setEditingKey('');
                console.log(JSON.stringify(newData));//data mới
            }

        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleSave = async () => {
        try {
            const res = await schoolClassApi.saveScores(classId, data)
            if (!res.isError) {

                message.success("Save successfully");
            }
            else
                message.warning("Network error");
        }
        catch (err) {
            message.warning("Save failed");
        }
    }
    const handleSubmit = async () => {
        try {
            const res = await schoolClassApi.submitScores(classId, data)
            if (!res.isError) {

                message.success("Submit successfully");
            }
            else
                message.warning("Network error");
        }
        catch (err) {
            message.warning("Submit failed");
        }
    }

    const columns = [
        {
            title: 'Student ID',
            dataIndex: 'id',
            width: '10%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: '25%',
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            width: '10%',
            editable: true,
        },
        {
            title: 'Midterm',
            dataIndex: 'midterm',
            width: '10%',
            editable: true,
        },
        {
            title: 'Practice',
            dataIndex: 'practice',
            width: '10%',
            editable: true,
        },
        {
            title: 'Final',
            dataIndex: 'final',
            width: '10%',
            editable: true,
        },
        {
            title: 'GPA',
            render: (text, record) => (record.progress * 0.1 + record.midterm * 0.2 + record.practice * 0.2 + record.final * 0.5).toFixed(2),
            width: '10%',
        },
        {
            title: 'Action',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <>
                        <CheckOutlined style={{ color: "green" }}
                            onClick={() => save(record.id)} />
                        <CloseOutlined style={{ color: "gray", marginLeft: 12 }}
                            onClick={cancel}
                        />
                    </>
                ) : (
                    <>
                        <EditOutlined style={{ color: "blue" }}
                            onClick={() => { edit(record); }} />
                    </>
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
                dataIndex: col.dataIndex,
                inputType: col.dataIndex !== 'id' && col.dataIndex !== 'tenSV' ? 'number' : 'text',
                title: col.title,
                editing: isEditing(record),
                min: col.dataIndex === 'minValue' ? 0 : undefined,
                max: col.dataIndex === 'maxValue' ? 10 : undefined,
            }),
        };
    });



    // end

    return (
        <div className='InputScoreContain'>
            {/* <button onClick={handleSave}>Save </button>
            <button onClick={handleSubmit} >Submit</button> */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
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
            <div style={{ float: 'right', marginTop: '1%', width: '211px' }}>
                <Button onClick={handleSave} style={{ width: '100px', backgroundColor: '#2f88ff', color: 'white' }}>Save</Button>
                <Button onClick={handleSubmit} style={{ width: '100px', backgroundColor: 'green', color: 'white', marginLeft: '5%' }}>Submit</Button>
            </div>
        </div>
    );
};

export default InputScore;
