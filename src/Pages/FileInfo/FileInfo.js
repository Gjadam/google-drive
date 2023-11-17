import React from 'react'
import { Button, Card, Container, Image } from 'react-bootstrap'
import './FileInfo.css'
export default function FileInfo() {
    return (
        <Container >
            <Card className=' my-5 '>
                <Card.Img variant="top" className='card-mage__height' src="/images/svgs/logo.svg" />
                <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in
                        to additional content. This content is a little bit longer.
                    </Card.Text>
                </Card.Body>
                <Card.Footer className=' d-flex justify-content-between '>
                    <Button >Download</Button>
                    <Button variant='danger'>Delete</Button>
                </Card.Footer>
            </Card>
        </Container>
    )
}
