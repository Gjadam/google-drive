import React from 'react'
import { Container, FloatingLabel, Form, Image, Button } from 'react-bootstrap'
import './SignUp.css'
import { RiLoginCircleLine } from "react-icons/ri";
export default function SignUp() {
    return (
        <div className=" bg-primary  d-flex justify-content-center align-items-center " style={{ height: "100vh" }}>
            <Container>
                <div className=" signup__box-height  row  justify-content-center align-items-center rounded-5  gap-3 bg-white position-relative overflow-hidden  ">
                    <div className="col p-4  ">
                        <img src="/images/png/signup-style.png" className='signup__style-image' alt="image" />
                        <img src="/images/svgs/logo.svg" alt="logo" />
                        <h2 className=' fw-bold mt-2 '>Create your Account</h2>
                        <h6 className=' text-black-50 lh-base '>Sign up now and unlock a world of possibilities. Let's get started on this exciting journey together!</h6>
                        <form className=' mt-4 '>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control type="email" placeholder="name@example.com" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" placeholder="Password" />
                            </FloatingLabel>
                            <Button className=' mt-2 w-100 '>SignUp <RiLoginCircleLine className=' fs-4 ' /></Button>
                        </form>
                    </div>
                    <div className="signup__image col col-xl-7  d-none d-lg-flex justify-content-center align-items-center  ">

                    </div>
                </div>
            </Container>
        </div>
    )
}
