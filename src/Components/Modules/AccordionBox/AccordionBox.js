import React from 'react'
import { Accordion } from 'react-bootstrap'

export default function AccordionBox({ eventKey, header, body }) {
    return (
        <>
            <Accordion.Item eventKey={eventKey}>
                <Accordion.Header >{header}</Accordion.Header>
                <Accordion.Body className=' lh-lg '>{body}</Accordion.Body>
            </Accordion.Item>
        </>
    )
}
