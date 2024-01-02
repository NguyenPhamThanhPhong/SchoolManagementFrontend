import { Drawer, List, Space, Typography, Divider } from 'antd';

const Title = Typography.Title;

const ShowSubjectDrawer = ({ open, onClose, selectedSubject }) => {



    const classesData = [
        {
            key: 'zccc',
            id: '1',
            name: 'SE001.O11.PMCL',
            room: '101',
            lecturer: {
                id: '1',
                name: 'John Doe'
            },
        },
        {
            key: '2',
            id: '2',
            name: 'SE001.O12.PMCL',
            room: '102',
            lecturer: {
                id: '2',
                name: 'John Doe'
            },
        },
        {
            key: '3',
            id: '3',
            name: 'SE001.O13.PMCL',
            room: '102',
            lecturer: {
                id: '3',
                name: 'John Doe'
            },
        },
    ];
    return (
        <Drawer title={`Chi tiết môn ${selectedSubject?.name}`} placement="right" onClose={onClose} open={open}>
            <Space direction="vertical">
                <Title level={3}>SubjectID: {selectedSubject?.id}</Title>
                <Title level={5}>Name: {selectedSubject?.name}</Title>
                <Title level={5}>Prequisite Subject: {selectedSubject?.prequisiteId}</Title>
                <Title level={5}>Previous Subject: {selectedSubject?.previousSubjectId}</Title>
            </Space>
            <Divider>Danh sách lớp</Divider>
            <List
                dataSource={classesData}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            key={index}
                            title={<a href={`/admin/class/detail/${item.id}`}>{item.id + "-" + item.name}</a>}
                            description={` Room: ${item.room}, Lecturer: `}
                        />
                        <a href={`/admin/lecturer/detail/${item.lecturer.id}`}>
                            {item.lecturer.id + "-" + item.lecturer.name}
                        </a>
                    </List.Item>
                )}
            />
        </Drawer>
    );
};

export default ShowSubjectDrawer;
