import { Modal, Form, Input, message } from 'antd';
import { FacultyApi, Faculty } from '../../../data-api/index';
import { appendFaculty } from '../../../data-store/index';

function CreateFacultyModal({ isModalFacultyOpen, setIsModalFacultyOpen, faculties, facultyDispatch }) {
    let [form] = Form.useForm();
    const validateId = (rule, value, callback) => {
        if (faculties.some((faculty) => faculty.id === value)) {
            callback(`faculty "${value}" already exist`);
        } else {
            callback();
        }
    };

    const handleSubmit = async () => {
        form.validateFields().then(
            async (values) => {
                let { id, name, description } = values;
                let faculty = new Faculty(id, name, description)
                try {
                    const response = await FacultyApi.createFaculty(faculty);
                    if (!response.isError) {
                        facultyDispatch(appendFaculty(response.data.data));
                        message.success(`Create subject successfully! ${faculty.id}`);
                        form.resetFields();
                        setIsModalFacultyOpen(false);
                    } else {
                        message.error(`Create subject failed! ${response.data}`);
                        message.error(`${JSON.stringify(faculty)}`);
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
        setIsModalFacultyOpen(false);
    }


    return (
        <Modal title="Create Faculty" visible={isModalFacultyOpen} onOk={handleSubmit} onCancel={handleCancel}>
            <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 20 }} >
                <Form.Item
                    label="Faculty ID"
                    name="id"
                    initialValues={{ id: '' }}
                    rules={[{ required: true, message: 'Please enter an ID!' },
                    { validator: validateId }]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Faculty Name"
                    name="name"
                    initialValues={{ name: '' }}
                    rules={[{ required: true, message: 'Please enter a name!' },
                    ]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    initialValues={{ description: '' }}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateFacultyModal;