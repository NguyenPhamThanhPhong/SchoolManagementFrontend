import React from 'react';
import { Drawer, Descriptions, Badge } from 'antd';

function ShowlecturerDrawer({ open, onClose, selectedStudent }) {
    const items = [
        {
            key: '1',
            label: 'Họ và tên',
            children: 'Nguyen Hoang Long',
        },
        {
            key: '2',
            label: 'MSSV',
            children: '2122034556',
        },
        {
            key: '3',
            label: 'Password',
            children: '123456',
        },
        {
            key: '4',
            label: 'Bậc đào tạo',
            children: 'Đại học',
        },
        {
            key: '5',
            label: 'Ngày sinh:',
            children: '2019-04-24 18:00:00',
        },
        {
            key: '6',
            label: 'Lớp sinh hoạt',
            children: <Badge status="processing" text="Running" />,
        },
        {
            key: '7',
            label: 'Program',
            children: 'CLC',
        },
        {
            key: '8',
            label: 'Giới tính',
            children: 'Nam',
        },
        {
            key: '9',
            label: 'Khoa',
            children: '............................',
        },
    ];

    return (
        <Drawer title="Lecturer Details" width={720} placement="right" onClose={() => onClose(false)} open={open}>
            {/* {selectedStudent && (
                <div>
                    <p>
                        <strong>MSSV:</strong> {selectedStudent.mssv}
                    </p>
                    <p>
                        <strong>Name:</strong> {selectedStudent.name}
                    </p>
                </div>
            )} */}
            <Descriptions bordered items={items} />
        </Drawer>
    );
}

export default ShowlecturerDrawer;
