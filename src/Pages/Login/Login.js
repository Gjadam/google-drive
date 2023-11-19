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
            }, 2000)

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
                        Swal.fire({
                            icon: "success",
                            title: "You have successfully logged in",
                            text: "Go to Drive",
                        }).then(() => {
                            navigate('/fast-drive')
                        })
                        return res.json()
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "No user found!",
                            text: "Try again"
                        })
                    }
                }).then(result => {
                    if (result) {
                        authContext.login(result.token)
                    }
                })
        },
        validate: (values) => {
            const errors = {}
            if (values.username === '') {
                errors.username = 'Username is required!'
            } else if (values.username.length < 4) {
                errors.username = 'Username must be at least 4 characters long!'
            }

            if (values.password === '') {
                errors.password = 'Password is required!'
            } else if (values.password.length < 8) {
                errors.password = 'Password must be at least 8 characters long!'
            }
            return errors
        }
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
                        <h2 className=' fw-bold mt-2 '>Login to your Account</h2>
                        <h6 className=' text-black-50 lh-base '>Welcome to Fast Drive! Please enter your login credentials to access your account.</h6>
                        <form className=' mt-4 ' onSubmit={form.handleSubmit}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="User Name"
                                className="mb-3"
                            >
                                <Form.Control type="text" name='username' aria-describedby="passwordHelpBlock" value={form.values.username} onChange={form.handleChange} onBlur={form.handleBlur} placeholder="Username" required />
                                {form.errors.username && form.touched.username && <Form.Text className=' ms-1 ' id="passwordHelpBlock" muted>{form.errors.username}</Form.Text>}
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" name='password' value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur} placeholder="Password" required />
                                {form.errors.password && form.touched.password && <Form.Text className=' ms-1 ' id="passwordHelpBlock" muted>{form.errors.password}</Form.Text>}
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