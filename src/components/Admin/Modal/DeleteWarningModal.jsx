import React from 'react';
import { Modal, Button } from 'antd';

function DeleteWarningModal(props) {
    const { visible, onOk, onCancel } = props;

    return (
        <Modal
            title="Delete Warning"
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            footer={[
                <Button key="ok" type="primary" danger onClick={onOk}>
                    Delete
                </Button>,
                <Button key="cancel" type="primary" onClick={onCancel}>
                    No
                </Button>,
            ]}
        >
            <h5>Are you sure you want to delete these item?</h5>
            {
                props.children
            }
        </Modal>
    );
}

export default DeleteWarningModal;
