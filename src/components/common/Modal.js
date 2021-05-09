import React from 'react'
import { Container, Row, Col, Modal as MainModal, Button} from 'react-bootstrap';
export default function Modal(props) {
    return (
        <div>
            <MainModal {...props} aria-labelledby="contained-modal-title-vcenter">
                <MainModal.Header closeButton>
                    <MainModal.Title id="contained-modal-title-vcenter">
                        {props.title}
                    </MainModal.Title>
                </MainModal.Header>
                <MainModal.Body className="show-grid">
                    <Container>
                        {props.children}
                    </Container>
                </MainModal.Body>
                <MainModal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    { props.submitText ? <Button variant="danger" onClick={props.onSubmit}>{props.submitText}</Button> : ""}
                </MainModal.Footer>
                </MainModal>
        </div>
    )
}
