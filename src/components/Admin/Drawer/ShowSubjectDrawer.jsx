import { Drawer, List, Space, Typography, Divider } from 'antd';

const Title = Typography.Title;

const ShowSubjectDrawer = ({ open, onClose, selectedSubject }) => {



    const classesData = [
        {
            key: '1',
            class_id: '1',
            name: 'SE001.O11.PMCL',
            room: '101',
            program: 'John Doe',
            class_type: '30',
            subject_id: '90',
        },
        {
            key: '2',
            class_id: '2',
            name: 'SE001.O12.PMCL',
            room: '102',
            program: 'Jane Smith',
            class_type: '25',
            subject_id: '120',
        },
        {
            key: '3',
            class_id: '3',
            name: 'SE001.O13.PMCL',
            room: '102',
            program: 'Jane Smith',
            class_type: '25',
            subject_id: '120',
        },
    ];
    return (
        <Drawer title={`Chi tiết môn ${selectedSubject?.name}`} placement="right" onClose={onClose} open={open}>
            <Space direction="vertical">
                <Title level={3}>SubjectID: {selectedSubject?.id}</Title>
                <Title level={5}>Name: {selectedSubject?.name}</Title>
                <Title level={5}>Prerequisite Subject: {selectedSubject?.prequisiteId}</Title>
                <Title level={5}>Previos Subject: {selectedSubject?.previousSubjectId}</Title>
            </Space>
            <Divider>Danh sách lớp</Divider>
            <List
                dataSource={classesData}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            key={index}
                            title={<a href="/admin/class/detail">{item.name}</a>}
                            description={`Room: ${item.room}`}
                        />
                    </List.Item>
                )}
            />
        </Drawer>
    );
};

export default ShowSubjectDrawer;
