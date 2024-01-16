import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import 'boxicons/css/boxicons.min.css';


import './AddMaterial.scss'

const { Dragger } = Upload;

const AddMaterial = (props) => {

    let onDone = props.onDone || (() => { });


    const imageDrops = {
        name: 'file',
        multiple: true,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {

            }
            if (status === 'done') {
                onDone(info.fileList);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
    };


    return (
        <>
            <div className='AddMarterialCont'>
                <Dragger {...imageDrops}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">

                    </p>
                </Dragger>
            </div>
        </>
    )

}
export default AddMaterial;