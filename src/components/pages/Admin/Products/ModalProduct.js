import React from 'react'
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

export function ModalProduct(props) {
    const { size, show, onHide, title, body } = props

    return (
        // Live demo
        // https://react-bootstrap.netlify.app/components/modal/#live-demo
        // Optional Sizes
        // https://react-bootstrap.netlify.app/components/modal/#optional-sizes

        <Modal size={size} show={show} onHide={onHide}>
            <Modal.Header closeButton>
                {title && <Modal.Title>{title}</Modal.Title>}
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            {/*
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={onHide}>
                    Save Changes
                </Button>
            </Modal.Footer>
            */}
        </Modal>
    )
}
