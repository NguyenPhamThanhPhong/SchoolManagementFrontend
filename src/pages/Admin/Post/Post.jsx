import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Input, Card, Pagination, Select, message } from 'antd';
import { SearchOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { usePostContext, setPosts, appendPost, removePost } from '../../../data-store';
import { PostApi } from '../../../data-api';

import CreatePostModal from '../../../components/Admin/Modal/CreatePostModal';

const { Search } = Input;
const { Option } = Select;

const Post = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [postState, setPostState] = usePostContext();

    const [filtredPosts, setFiltredPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);


    useEffect(() => {
        setFiltredPosts(postState?.posts);
    }, [postState?.posts]);




    const dataSource = filtredPosts || [];

    const pageSize = 5;

    const currentData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCloseCreate = () => {
        setIsCreateModalOpen(false);
        setSelectedPost(null)
    }

    const handleDelete = async (id, title, urls) => {
        try {
            let fileUrls = [];
            for (let [key, value] of Object.entries(urls)) {
                fileUrls.push(value);
            }
            const response = await PostApi.postDelete(id, fileUrls,);
            if (!response.isError) {
                setPostState(removePost(id));
                message.success(`delete post successfully:${title}`)
            }
            else
                message.error(`delete post failed: ${response?.data}`)
        }
        catch (error) {
            console.log(JSON.stringify(error));
        }
    }

    const handleEdit = (record) => {
        setSelectedPost(record);
        setIsCreateModalOpen(true)
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'File đính kèm',
            render: (_, record) => {
                if (record?.fileUrls === undefined || record?.fileUrls === null || record?.fileUrls.length === 0)
                    return <div></div>
                return (
                    <div>
                        {
                            Object.entries(record.fileUrls).map(([key, value]) => (
                                <div key={key}>
                                    <a href={value} download={value}>{key}</a>
                                </div>
                            ))
                        }
                    </div>
                )
            },
            key: 'fileUrls',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => { handleEdit(record) }} icon={<EditOutlined />} />
                    <Button onClick={() => { handleDelete(record?.id, record?.title, record?.fileUrls) }} icon={<DeleteOutlined />} />
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
                    <Button type="primary" onClick={() => { setIsCreateModalOpen(true) }}>
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
                        selectedRowKeys,
                        onChange: (selectedRowKeys, selectedRows) => {
                            setSelectedRowKeys(selectedRowKeys);
                            setSelectedRows(selectedRows);
                        },
                    }}
                    rowKey='id'
                />
            </Card>

            <CreatePostModal
                isOpen={isCreateModalOpen}
                selectedPost={selectedPost}
                handleOk={handleCloseCreate}
                handleCancel={handleCloseCreate}
            />
        </div>
    );
};

export default Post;
