import './CheckAttendanceBoard.scss'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Table } from 'antd';


const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: false,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};
const CheckAttendanceBoard = () => {
    const [dataSource, setDataSource] = useState([
        {
            key: '0',
            name: 'Tran Van A',
            MSSV: '32',
            week: '',
        },
        {
            key: '1',
            name: 'Ten gi do',
            MSSV: '21155',
            week: '',
        },
    ]);

    const defaultColumns = [
        {
            title: 'MSSV',
            dataIndex: 'MSSV',
            fixed: 'left',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            fixed: 'left',
        },
        {
            title: 'Week 1',
            dataIndex: 'week_1',
            editable: true,
            align: 'center'

        },
        {
            title: 'Week 2',
            dataIndex: 'week_2',
            editable: true,
            align: 'center'
        },
        {
            title: 'Week 3',
            dataIndex: 'week_3',
            editable: true,
            align: 'center'
        },
        {
            title: 'Week 4',
            dataIndex: 'week_4',
            editable: true,
            align: 'center'
        },
        {
            title: 'Week 5',
            dataIndex: 'week_5',
            editable: true,
            align: 'center'
        },
        {
            title: 'Week 6',
            dataIndex: 'week_6',
            editable: true,
            align: 'center'
        },
        {
            title: 'Week 7',
            dataIndex: 'week_7',
            editable: true,
            align: 'center'
        },
        {
            title: 'Week 8',
            dataIndex: 'week_8',
            editable: true,
            align: 'center'
        },
        {
            title: 'Week 9',
            dataIndex: 'week_9',
            editable: true,
            align: 'center'
        },
        {
            title: 'Week 10',
            dataIndex: 'week_10',
            editable: true,
            align: 'center'
        },
        {
            title: 'Week 11',
            dataIndex: 'week_11',
            editable: true,
            align: 'center'
        },
        {
            title: 'Week 12',
            dataIndex: 'week_12',
            editable: true,
            align: 'center'
        },
        {
            title: 'Week 13',
            dataIndex: 'week_13',
            editable: true,
            align: 'center'
        },
        {
            title: 'Week 14',
            dataIndex: 'week_14',
            editable: true,
            align: 'center'
        },
        {
            title: 'Week 15',
            dataIndex: 'week_15',
            editable: true,
            align: 'center'
        },
    ];
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    return (
        <div>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={{ position: ['none'], }}
                scroll={{
                    x: 1300,
                }}
            />
            <br></br>
            <Button className='SaveScore'  >Save</Button>
        </div>
    );
};
export default CheckAttendanceBoard;