import React from 'react'
import { Button, Container, Form, Image, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap'
import { FaCircleUser } from "react-icons/fa6";
import './NavBar.css'
export default function NavBar() {
  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">
              <div className="">
                <img src="/images/svgs/logo.svg" alt="logo" />
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <div className="">
                    <img src="/images/svgs/logo.svg" alt="logo" />
                  </div>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search Drive"
                    className="mr-sm-2 rounded-5 search-box-width py-2 "
                  />
                </Form>
                </Nav>
                <div className="d-flex align-items-center mt-lg-0 mt-1  ">
                  <h6 className='m-2'>TheGjad</h6>
                  <FaCircleUser className=' text-primary fs-1 '/>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  )
}
