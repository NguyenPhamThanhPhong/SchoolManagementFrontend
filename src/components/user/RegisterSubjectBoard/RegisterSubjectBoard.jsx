import { FloatButton, Table, message } from 'antd';
import React from 'react';
import SearchBox from '../SearchBox/SearchBox';
import { DateOfWeek } from '../../../data-api';
import Search from "antd/es/input/Search";

const columns = [
    {
        title: 'Subject Id',
        dataIndex: ['subject', 'id'],
        key: 'id',
    },
    {
        title: 'Subject name',
        render: (_, record) => (
            <div>{record?.id + "-" + record?.name}</div>
        ),
        key: 'id',
    },
    {
        title: 'Date start',
        render: (_, record) => (
            <div>{`${DateOfWeek.GetDateOfWeek(record?.schedule?.DateOfWeek)} 
            ${record?.schedule?.startTime} - ${record?.schedule?.endTime} 
            ${record?.schedule?.beginTime} - ${record?.schedule?.finalTime} `}</div>
        ),
        key: 'id',
    },
    {
        title: 'Lecturer name',
        dataIndex: ['lecturer', 'name'],
        key: 'id',
    }
];


function RegisterSubjectBoard(props) {

    let setSelectedRowKeys = props.setSelectedRowKeys || (() => { });
    let handleRegistration = props.handleRegistration || (() => { });
    let setSearch = props.setSearch || (() => { });


    //
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
        },
        onselect: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
        }

    };

    //

    const data = props.data;
    return (
        <div className='TableContain'>
            <Search size="large" value={props.searchText} onChange={(e) => { props.setSearch(e.target.value) }} placeholder="Search..." enterButton />
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
                dataSource={props?.myClasses || []}
                scroll={{
                    y: 300,
                }}
                rowKey='id'
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
                onClick={handleRegistration}
            />
        </div>

    );
}
export default RegisterSubjectBoard;