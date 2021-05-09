import React from 'react'
import {Spinner} from 'react-bootstrap';

export default function Spinners() {
    return (
        <div className="spinners-center mt-10">
            {/* <Spinner animation="border" variant="primary" /> */}
            <Spinner animation="grow" variant="primary" />
            <strong className="status-text"> Loading ...</strong>
        </div>
    )
}
