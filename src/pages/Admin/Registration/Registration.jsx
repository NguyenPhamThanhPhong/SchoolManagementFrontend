import React, { useEffect, useState } from 'react';
import { Card, Button, Input, DatePicker, Form, Space, Select, Modal, Table, message } from 'antd';
import RegistrationTable from '../../../components/Admin/Table/RegistrationTable';
import { SearchOutlined } from '@ant-design/icons';
import { useSemesterContext, useSchoolClassContext } from '../../../data-store';
import { registrationApi } from '../../../data-api';
import moment from 'moment';
const { Search } = Input;
const { Option } = Select;




function Registration() {
    const dateFormat = 'DD/MM/YYYY';
    const [form] = Form.useForm(); // Form hook
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [tableData, setTableData] = useState([]);

    const [semesterState, semesterDispatch] = useSemesterContext();
    const [schoolClassState, schoolClassDispatch] = useSchoolClassContext();

    const [unselectedClasses, setUnselectedClasses] = useState([]);

    const [registrations, setRegistrations] = useState([]);
    const [filteredRegistrations, setFilteredRegistrations] = useState([]);

    const fetchRegistrations = async () => {
        try {
            let response = await registrationApi.getAll();
            if (!response.isError) {
                setRegistrations(response.data?.data);
                setFilteredRegistrations(response.data?.data);
            }
            else {
                message.error("Get registration failed");
            }
        }
        catch (err) {
            message.error("Get registration failed");
        }
    }
    useEffect(() => {
        fetchRegistrations();
        console.log(registrations);
    }, []);


    const handleOk = (myForm) => {
        myForm.validateFields().then((values) => {
            const { name, start, end, semester } = myForm.getFieldsValue();
            let classIds = tableData ? tableData.map((item) => item.id) : [];
            const registration = {
                name: name,
                startTime: start.format(dateFormat),
                endTime: end.format(dateFormat),
                semesterId: semester,
                classIds: classIds
            };
            try {
                let response = registrationApi.create(registration)
                if (!response.isError) {
                    setRegistrations([response.data?.data, ...registrations]);
                    message.success("Create registration successfully");
                    form.resetFields();
                    setIsModalOpen(false);
                }
                else {
                    message.error("Network error");
                }
            }
            catch (err) {
                message.error("Create registration failed");
            }
        }).catch((err) => {
            message.error(err.errorFields[0].errors[0]);
        });

    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    useEffect(() => {
        if (schoolClassState?.schoolClasses !== undefined && schoolClassState?.schoolClasses !== null) {
            setUnselectedClasses(schoolClassState?.schoolClasses);
            setTableData([])
        };
    }, [schoolClassState?.schoolClasses])


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
                    Remove
                </Button>
            ),
        }
    ];

    return (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Card title="Registration" style={{ flex: 1, width: '50%' }}>
                <Space>
                    <Search
                        placeholder="Search..."
                        onSearch={(value) => console.log(value)}
                        style={{ width: '30vw' }}
                        prefix={<SearchOutlined />}
                    />
                    <Button type="primary" onClick={() => { setIsModalOpen(true); }}>
                        Create
                    </Button>
                    <Button type="primary">Auto Create</Button>
                </Space>
                <RegistrationTable semesters={semesterState?.semesters || []} allRegistrations={registrations || []} setAllRegistrations={setRegistrations}
                    schoolClasses={schoolClassState?.schoolClasses || []}
                    registrations={filteredRegistrations} />

            </Card>
            <Modal
                title="Create Registration"
                width={720}
                visible={isModalOpen}
                onOk={() => { handleOk(form) }}
                onCancel={handleCancel}
            >
                <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 20 }}>
                    <Space direction="vertical"  >
                        <Form.Item
                            style={{ width: '620px' }}
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter a name' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Start"
                            name="start"
                            rules={[{ required: true, message: 'Please select a start date' }]}
                            style={{ width: '620px' }}
                            initialValue={new moment()}
                        >
                            <DatePicker format={'DD-MM-YYYY'} />
                        </Form.Item>
                        <Form.Item
                            label="End"
                            name="end"
                            rules={[{ required: true, message: 'Please select an end date' }]}
                            style={{ width: '620px' }}
                            initialValue={new moment()}
                        >
                            <DatePicker format={'DD-MM-YYYY'} />
                        </Form.Item>
                        <Form.Item
                            label="Semester"
                            name="semester"
                            rules={[{ required: true, message: 'Please select a semester' }]}
                            style={{ width: '620px' }}
                        >
                            <Select mode="single" showSearch optionFilterProp="children" allowClear>
                                {
                                    semesterState?.semesters?.map((semester) => (
                                        <Option key={semester.id} value={semester.id}>
                                            {semester.id}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Classes"
                            name="selectedClass"
                            style={{ width: '620px' }}
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
                    </Space>
                </Form>
            </Modal>
        </div>
    );
}

export default Registration;