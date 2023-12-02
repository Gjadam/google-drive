import { useFormik } from 'formik'
import React, { useContext } from 'react'
import './Login.css'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import { RiLoginCircleLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import AuthContext from '../../context/authContext'
export default function Login() {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    const form = useFormik({
        initialValues: { username: '', password: '' },
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                setSubmitting(false)
            }, 3000)

            const userData = {
                password: values.password,
                username: values.username,
            }
            fetch(`http://fastdrive.pythonanywhere.com/api/users/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            })
                .then(res => {
                    if (res.ok) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "success",
                            title: "logged in successfully"
                        }).then(() => {
                            navigate('/fast-drive')
                        })
                        return res.json()
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "User not found!",
                            text: "there is no user with this username! Please try again."
                        })
                    }
                }).then(result => {
                    if (result) {
                        authContext.login(result.token)
                    }
                })
        },
    })

    return (
        <div className=" bg-primary  d-flex justify-content-center align-items-center " style={{ height: "100vh" }}>
            <Container>
                <div className=" login__box-height  row  justify-content-center align-items-center rounded-5  gap-3 bg-white position-relative overflow-hidden  ">
                    <div className="login__image col col-xl-7 bg-primary  d-none d-lg-flex justify-content-center align-items-center  ">

                    </div>
                    <div className="col p-4  ">
                        <img src="/images/png/signup-style.png" className='signup__style-image d-sm-none ' alt="image" />
                        <img src="/images/svgs/logo.svg" alt="logo" />
                        <h2 className=' fw-bold mt-2 text-black  '>Login to your Account</h2>
                        <h6 className=' text-black-50 lh-base '>Welcome to Fast Drive! Please enter your login credentials to access your account.</h6>
                        <form className=' mt-4 ' onSubmit={form.handleSubmit}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="User Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" name='username' aria-describedby="passwordHelpBlock" value={form.values.username} onChange={form.handleChange} onBlur={form.handleBlur} placeholder="Username" required />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" name='password' value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur} placeholder="Password" required />
                            </FloatingLabel>
                            <Button type='Submit' className=' mt-2 w-100 ' disabled={form.isSubmitting} >Login <RiLoginCircleLine className=' fs-4 ' /></Button>
                            <span className=' text-center d-flex justify-content-center mt-5 text-black-50 '>Don't have an account? <Link to="/sign-up" className=' ms-1 '> Sign up</Link></span>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    )
}
