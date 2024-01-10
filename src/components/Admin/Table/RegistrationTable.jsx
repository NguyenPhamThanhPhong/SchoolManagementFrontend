import React, { useEffect, useState } from 'react';
import { Table, Button, List, DatePicker, Drawer, Form, Input, Row, Col, Select, Space, Divider, message } from 'antd';
import moment from 'moment';
import { registrationApi } from '../../../data-api';


const { Option } = Select;
const RegistrationTable = ({ registrations, semesters, schoolClasses, allRegistrations, setAllRegistrations }) => {
    const dateFormat = 'DD/MM/YYYY';
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);


    const [tableData, setTableData] = useState([]);
    const [unselectedClasses, setUnselectedClasses] = useState(schoolClasses || []);

    useEffect(() => {
        if (selectedRecord) {
            let classData = schoolClasses.filter((item) => !selectedRecord.classIds.includes(item));
            setTableData(classData);
            setUnselectedClasses(schoolClasses.filter((item) => selectedRecord.classIds.includes(item)));
            form.setFieldsValue({
                name: selectedRecord.name,
                startTime: moment(selectedRecord?.startTime, dateFormat),
                endTime: moment(selectedRecord?.endTime, dateFormat),
                semester: selectedRecord.semesterId,
            });
        }
    }, [selectedRecord])

    const handleUpdate = async () => {
        form.validateFields().then(async (values) => {
            const { name, startTime, endTime, semester } = values;
            const registration = {
                id: selectedRecord.id,
                name: name,
                startTime: startTime.format(dateFormat),
                endTime: endTime.format(dateFormat),
                semesterId: semester,
                classIds: tableData.map((item) => item.id),
            };
            try {
                let response = await registrationApi.update(registration);
                if (!response.isError) {
                    let registrationIndex = allRegistrations.findIndex((item) => item.id === registration.id);
                    if (registrationIndex !== -1) {
                        allRegistrations[registrationIndex] = registration;
                        setAllRegistrations([...allRegistrations]);
                        message.success("Update registration successfully");
                    }
                } else {
                    message.error(response.message);
                }
            } catch (err) {
                message.error(err.message);
            }
        }).catch((err) => {
            message.error(err.message);
        });
    }

    const handleDelete = async (record) => {
        try {
            let response = await registrationApi.deleteInstance(record.id);
            if (!response.isError) {
                setAllRegistrations(allRegistrations.filter((item) => item.id !== record.id));
                message.success("Delete registration successfully");
            } else {
                message.error(response.message);
            }
        } catch (err) {
            message.error(err.message);
        }
    }

    const showDrawer = (record) => {
        setOpen(true);
        setSelectedRecord(record);
    };

    const onClose = () => {
        setOpen(false);
        setSelectedRecord(null);
    };

    let updatedRegistrations = registrations?.map((registration, index) => ({ stt: index + 1, key: index, ...registration }));
    const dataSource = updatedRegistrations || [
        { stt: 1, name: 'Học kì 1 2022 - 2023', startTime: '1/1/2022', end: '30/06/2022' },
    ];

    const pageSize = 10;
    const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const semesterColumns = [
        {
            title: 'Stt',
            dataIndex: 'stt',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'id',
        },
        {
            title: 'startTime',
            dataIndex: 'startTime',
            key: 'id',
        },
        {
            title: 'End',
            dataIndex: 'endTime',
            key: 'id',
        },
        {
            title: 'Semester',
            dataIndex: 'semesterId',
            key: 'id',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showDrawer(record)}>
                        Detail
                    </Button>
                    <Button onClick={() => { handleDelete(record) }} type="primary" danger>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleClassChange = (value) => {
        const selectedClassData = unselectedClasses?.find((item) => item.id === value);
        // Update the tableData with the selected class information without removing existing data
        if (selectedClassData) {
            setTableData((prevData) => [...prevData, selectedClassData]);
            setUnselectedClasses(unselectedClasses.filter((item) => item.id !== value));
        }
    };
    const handleClassRemove = (value) => {
        if (value) {
            setTableData(tableData.filter((item) => item.id !== value.id));
            if (!unselectedClasses.includes(value))
                setUnselectedClasses((prevData) => [...prevData, value]);
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Class Name',
            dataIndex: 'name',
            key: 'id',
        },
        {
            title: 'Subject',
            dataIndex: ['subject', 'id'],
            key: 'id',
        },
        {
            tilte: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button onClick={() => { handleClassRemove(record) }} type="primary" danger>
                    Delete
                </Button>
            ),
        }
    ];
    return (
        <>
            <Table
                dataSource={currentData}
                columns={semesterColumns}
                pagination={{
                    current: currentPage,
                    total: dataSource.length,
                    pageSize,
                    onChange: handlePageChange,
                }}
            />
            <Drawer
                title="Registration Detail"
                width={480}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={handleUpdate} type="primary">
                            Save
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Name"
                        name="name"
                        style={{ width: '100%', }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="startTime Date" name="startTime">
                        <DatePicker format={'DD-MM-YYYY'} style={{ width: '100%', }} />
                    </Form.Item>
                    <Form.Item label="End Date" name="endTime">
                        <DatePicker format={'DD-MM-YYYY'}
                            style={{ width: '100%', }}
                        />
                    </Form.Item>
                    <Form.Item label="Semester" name="semester">
                        <Select allowClear>
                            {
                                semesters.map((semester) => {
                                    return <Option value={semester.id}>{semester.id}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Classes"
                        name="selectedClass"
                        style={{ width: '100%' }}
                    >
                        <Select allowClear onChange={handleClassChange}>
                            {
                                unselectedClasses?.map((schoolClass) => (
                                    <Option key={schoolClass.id} value={schoolClass.id}>
                                        {schoolClass.id}
                                    </Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Table dataSource={tableData} columns={columns} pagination={false} />
                </Form>

            </Drawer>
        </>
    );
};

export default RegistrationTable;