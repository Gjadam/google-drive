import React, { useContext } from 'react'
import { Button, Container, Form, Image, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap'
import { FaCircleUser } from "react-icons/fa6";
import './NavBar.css'
import AuthContext from '../../../context/authContext';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
export default function NavBar() {

  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  const logOut = () => {
    Swal.fire({
      title: "Do you want to Log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "You have successfully logged out.",
          icon: "success"
        }).then(() => {
          authContext.logout()
          navigate('/')
        })
      }
    });
  }

  return (
    <>
      <Navbar expand="lg" className=" bg-white ">
        <Container>
          <Navbar.Brand>
            <Link to="/fast-drive">
              <img src="/images/svgs/logo.svg" alt="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Form className=" w-100 ">
                  <Form.Control
                    type="search"
                    placeholder="Search Drive"
                    className=" rounded-5 py-2 "
                  />
                </Form>
              </Nav>
            </Nav>
            <div className="d-flex align-items-center mt-lg-0 mt-3  ">
              <FaCircleUser className=' text-primary fs-1 ' />
              <h6 className='m-2 fw-bold '>{authContext.userInfos.username}</h6>
              <Button variant='outline-danger' size='sm' className=' ms-2' onClick={logOut}>Logout</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
