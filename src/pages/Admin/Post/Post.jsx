import React, { useState } from 'react';
import { Space, Table, Button, Input, Modal, Card, Pagination } from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Search } = Input;

const Post = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const showCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateModalOk = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateModalCancel = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreate = () => {
        showCreateModal();
    };

    const dataSource = [
        {
            key: '1',
            id: '1',
            title: 'Tiêu đề 1',
            content: 'Nội dung 1',
            date: '01/01/2023',
            attachment: 'file1.txt',
        },
        {
            key: '2',
            id: '2',
            title: 'Tiêu đề 2',
            content: 'Nội dung 2',
            date: '02/01/2023',
            attachment: 'file2.txt',
        },
        {
            key: '3',
            id: '2',
            title: 'Tiêu đề 3',
            content: 'Nội dung 2',
            date: '02/01/2023',
            attachment: 'file2.txt',
        },
        {
            key: '4',
            id: '2',
            title: 'Tiêu đề 4',
            content: 'Nội dung 2',
            date: '02/01/2023',
            attachment: 'file2.txt',
        },
        {
            key: '5',
            id: '2',
            title: 'Tiêu đề 5',
            content: 'Nội dung 2',
            date: '02/01/2023',
            attachment: 'file2.txt',
        },
        {
            key: '6',
            id: '2',
            title: 'Tiêu đề 6',
            content: 'Nội dung 2',
            date: '02/01/2023',
            attachment: 'file2.txt',
        },
    ];

    const pageSize = 5;

    const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'File đính kèm',
            dataIndex: 'attachment',
            key: 'attachment',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<PlusOutlined />} />
                    <Button icon={<EditOutlined />} />
                    <Button icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Card>
                <div>
                    <h5>Quản lý bài viết</h5>
                </div>
                <Space style={{ marginBottom: 16 }}>
                    <Search
                        placeholder="Search..."
                        onSearch={(value) => console.log(value)}
                        style={{ width: 200 }}
                        prefix={<SearchOutlined />}
                    />

                    <Button type="primary" onClick={handleCreate}>
                        Thêm mới
                    </Button>
                </Space>
                <Table
                    pagination={{
                        current: currentPage,
                        total: dataSource.length,
                        pageSize,
                        onChange: handlePageChange,
                    }}
                    columns={columns}
                    dataSource={currentData}
                    rowSelection={{
                        type: 'checkbox',
                    }}
                />
            </Card>

            <Modal
                title="Thêm mới môn học"
                open={isCreateModalOpen}
                onOk={handleCreateModalOk}
                onCancel={handleCreateModalCancel}
            ></Modal>
        </div>
    );
};

export default Post;
