import React from 'react'
import { Container, Form, Image } from 'react-bootstrap'
import './NavBar.css'
export default function NavBar() {
  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="">
          <img src="/images/svgs/logo.svg" alt="asdad" />
        </div>
        <div className="">
          <Form.Control
            type="search"
            placeholder="Search Drive"
            className="mr-sm-2 rounded-5 search-box-width py-2 "
          />
        </div>
        <div className="d-flex align-items-center ">
          <h6 className='m-2'>TheGjad</h6>
          <Image src="/images/user-image/user.jpg" className='user-image' alt="user-image" roundedCircle />
        </div>
      </div>
    </Container>
  )
}
