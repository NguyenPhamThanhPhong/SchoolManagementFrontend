import React, { useState, useEffect } from 'react';
import { Table, Button, List, DatePicker, Drawer, Form, Input, Row, Col, Select, Space, Divider, message } from 'antd';
import { SemesterApi, Semester, formatDate } from '../../../data-api';
import { useSemesterContext, useSchoolClassContext, setSemesters } from '../../../data-store';
import moment from 'moment';

const { Option } = Select;



function SemesterTable(props) {
    const dateFormat = 'DD/MM/YYYY';
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);

    const [open, setOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const [semesterState, semesterDispatch] = useSemesterContext();
    const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();

    const showDrawer = (record) => {
        setOpen(true);
        setSelectedRecord(record);
    };

    const onClose = () => {
        setOpen(false);
        setSelectedRecord(null);
    };

    const handleUpdate = async (semester) => {
        try {
            const response = await SemesterApi.updateSemester(semester)
            if (!response.isError) {
                const updatedSemester = semester;
                const { semesters } = semesterState;
                const index = semesters.findIndex((semester) => semester.id === updatedSemester.id);
                if (index !== -1) {
                    semesters[index] = updatedSemester;
                    semesterDispatch(setSemesters([...semesters]));
                    message.success('update semester successfully');
                    return true;
                }
            }
            else {
                message.error(response.message);
            }
        }
        catch (error) {
            console.log(error);
            message.error('failed to update semester')
        }
        return false;
    }
    const handleSave = async () => {
        try {
            let { name, startTime, endTime } = form.getFieldsValue();
            const semester = {
                id: name,
                name: name,
                startTime: startTime.format(dateFormat) === "Invalid date" ? '' : startTime.format(dateFormat),
                endTime: endTime.format(dateFormat) === "Invalid date" ? '' : endTime.format(dateFormat),
            }
            console.log(semester);
            let isUpdated = await handleUpdate(semester);
            if (isUpdated)
                onClose();
        }
        catch (error) {
            message.error('failed to save semester')
        }
    }


    useEffect(() => {
        if (selectedRecord !== null && selectedRecord !== undefined) {
            form.setFieldsValue({
                name: selectedRecord?.id || '',
                startTime: moment(selectedRecord?.startTime, dateFormat) || '',
                endTime: moment(selectedRecord?.endTime, dateFormat) || '',
            });
        }
    }, [selectedRecord]);

    const { handleDelete, handleEdit } = props;


    let dataSource = props.semesters || [];


    const pageSize = 10;
    const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    let filteredClasses = schoolClassState.schoolClasses?.filter((schoolClass) => schoolClass.semesterId === selectedRecord?.id) || [];

    let classesData = filteredClasses.map((schoolClass, index) => {
        return {
            id: schoolClass?.id,
            name: schoolClass?.name,
            room: schoolClass?.roomName,
            lecturerId: schoolClass?.lecturer?.id === undefined ? '' : schoolClass?.lecturer?.id,
            lecturer: schoolClass?.lecturer?.name || '',
        }
    });

    const semesterColumns = [
        {
            title: '',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'startTime',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'endTime',
            dataIndex: 'endTime',
            key: 'endTime',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showDrawer(record)}>
                        Detail
                    </Button>
                    <Button onClick={async () => { await handleDelete(record.id) }} type="primary" danger>
                        Delete
                    </Button>
                </Space>
            ),
        },
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
                title="Semester Detail"
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
                        <Button onClick={handleSave} type="primary">
                            Save
                        </Button>
                    </Space>
                }
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Name"
                        name="name"
                        style={{
                            width: '100%',
                        }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Start Date" name="startTime">
                        <DatePicker format={dateFormat}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="End Date" name="endTime">
                        <DatePicker format={dateFormat}
                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>
                </Form>
                <Divider>Danh sách lớp</Divider>
                <List
                    dataSource={classesData}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                key={index}
                                title={
                                    <div>
                                        <span><a href={`/admin/class/detail-class/${item.id}`}>{item.name}</a></span>
                                        <span> -  </span>
                                        <span>{item.lecturer + ' ' + item.lecturerId}</span>
                                        {/* && item.lecturerId && (<a href={`/admin/lecturer/detail-lecturer/${lecturerId}`}></a>) */}
                                    </div>
                                }
                                description={`Room: ${item.room}`}
                            />
                        </List.Item>
                    )}
                />
            </Drawer>
        </>
    );
}

export default SemesterTable;
