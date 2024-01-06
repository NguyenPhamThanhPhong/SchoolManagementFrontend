import { Modal, Form, Input, DatePicker, message } from 'antd';
import { SemesterApi, Semester } from '../../../data-api';
import { appendSemester } from '../../../data-store';


function CreateSemesterModal({ isSemesterModalOpen, setIsSemesterModalOpen, semesters, semesterDispatch }) {

    const [form] = Form.useForm();
    const validateId = (rule, value, callback) => {
        if (semesters.some((semester) => semester.id === value)) {
            callback(`semester "${value}" already exist`);
        } else {
            callback();
        }
    };

    const handleSubmit = async () => {
        form.validateFields().then(
            async (values) => {
                let { id, start, end } = values;
                const formatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
                start = new Date(start).toLocaleDateString('en-GB', formatOptions);
                end = new Date(end).toLocaleDateString('en-GB', formatOptions);
                let semester = new Semester(id, start || null, end || null)
                try {
                    const response = await SemesterApi.createSemester(semester);
                    if (!response.isError) {
                        semesterDispatch(appendSemester(response.data.data));
                        message.success(`Create subject successfully! ${semester.id}`);
                        form.resetFields();
                        setIsSemesterModalOpen(false);
                    } else {
                        message.error(`Create subject failed! ${response.data}`);
                        message.error(`${JSON.stringify(semester)}`);
                    }
                } catch (error) {
                    message.error(`Create subject failed! ${error}`);
                }
            },
            (reason) => {
                const errorMessage = reason.errorFields
                    ? `Create subject failed: ${reason.errorFields[0].name} - ${reason.errorFields[0].errors[0]}`
                    : 'Create subject failed. Please check the form inputs.';
                message.error(errorMessage);
            }
        );
    }

    const handleCancel = () => {
        form.resetFields();
        setIsSemesterModalOpen(false);
    }

    return (
        <Modal title="Create Semester" visible={isSemesterModalOpen} onOk={handleSubmit} onCancel={handleCancel}>
            <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                <Form.Item
                    label="Name"
                    name="id"
                    rules={[{ required: true, message: 'Please enter a semester name!' },
                    { validator: validateId }]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Start time"
                    name="start"
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="End time"
                    name="end"
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

            </Form>
        </Modal>
    );
}

export default CreateSemesterModal;