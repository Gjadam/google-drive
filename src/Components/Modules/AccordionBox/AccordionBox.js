import React from 'react'
import { Accordion } from 'react-bootstrap'

export default function AccordionBox({ eventKey, header, body }) {
    return (
        <>
            <Accordion.Item eventKey={eventKey}>
                <Accordion.Header className=''>{header}</Accordion.Header>
                <Accordion.Body className=' lh-lg text-secondary  '>{body}</Accordion.Body>
            </Accordion.Item>
        </>
    )
}
