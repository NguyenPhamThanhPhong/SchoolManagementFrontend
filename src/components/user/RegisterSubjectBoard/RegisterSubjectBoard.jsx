import { FloatButton, Table, message } from 'antd';
import React from 'react';
import SearchBox from '../SearchBox/SearchBox';

function RegisterSubjectBoard(props) {

    const columns = [
        {
            title: 'No.',
            dataIndex: 'No_',
            key: 'No_'
        },
        {
            title: 'Subject Id',
            dataIndex: 'subjectId',
            key: 'subjectId',
        },
        {
            title: 'Subject name',
            dataIndex: 'subject_name',
            key: 'subject_name',
        },
        {
            title: 'Date start',
            dataIndex: 'date_start',
            key: 'date_start',
        },
        {
            title: 'Date end',
            dataIndex: 'date_end',
            key: 'date_end',
        },
        {
            title: 'Lecturer name',
            dataIndex: 'lecturer_name',
            key: 'lecturer_name',
        },
        {
            title: 'Class period',
            dataIndex: 'class_period',
            key: 'class_period',
        },
    ];

    //
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            message.info('You have selected ' + selectedRowKeys + ' items')
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };

    //

    const data = props.data;
    return (
        <div className='TableContain'>
            <SearchBox></SearchBox>
            <br></br>
            <br></br>
            <div>Choose subject to register</div>
            <br></br>
            <Table
                columns={columns}
                rowSelection={{
                    ...rowSelection,
                }}
                pagination={{ position: ['none'], }}
                dataSource={data}
                scroll={{
                    y: 300,
                }}
            />
            <br></br>
            <FloatButton
                shape="square"
                description='Comfirm'
                type="primary"
                style={{
                    right: '5%',
                    bottom: '2%',
                    width: '150px',
                }}

            />
        </div>

    );
}
export default RegisterSubjectBoard;