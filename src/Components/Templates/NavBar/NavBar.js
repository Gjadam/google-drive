import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Image, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap'
import { FaCircleUser } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import './NavBar.css'
import AuthContext from '../../../context/authContext';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import SearchBox from '../../Modules/SearchBox/SearchBox';
export default function NavBar() {

  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isDisable, setIsDisable] = useState(true)
  const [flag, setFlag] = useState(true)
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const localStorageData = JSON.parse(localStorage.getItem("user"))

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

  const darkModeBtn = () => {
    let bodyElement = document.body
    if (flag) {
      localStorage.setItem('theme', 'dark')
      bodyElement.dataset.bsTheme = "dark"
      setFlag(false)
    } else {
      localStorage.setItem('theme', 'light')
      bodyElement.dataset.bsTheme = "light"
      setFlag(true)
    }
  }

  useEffect(() => {
    window.onload = function () {
      let bodyElement = document.body
      const getLocalStorageTheme = localStorage.getItem("theme")
      if (getLocalStorageTheme == "dark") {
        bodyElement.dataset.bsTheme = "dark"
      } else {
        bodyElement.dataset.bsTheme = "light"
      }
    }

    if(authContext.isLoggedIn) {
      setIsDisable(false)
    } else {
      setIsDisable(true)
    }

  }, [])

  useEffect(() => {
    // Get Search Datas from server
    if (searchValue.length > 0) {
      fetch(`http://fastdrive.pythonanywhere.com/api/search/?q=${searchValue}`, {
        headers: {
          'Authorization': `Token ${localStorageData.token}`
        }
      })
        .then(res => res.json())
        .then(searchDatas => setSearchResults(searchDatas))
    }
  }, [searchValue])



  const searchSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/${searchValue}`)
  }

  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img src="/images/svgs/logo.svg" alt="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Form className=" position-relative  w-100 " onSubmit={(e) => searchSubmit(e)}>
                  <Form.Control
                    type="search"
                    placeholder="Search Drive"
                    className=" rounded-5 py-2 "
                    onChange={(e) => setSearchValue(e.target.value)}
                    disabled={isDisable}
                  />
                  {
                    searchValue.length > 0 &&
                    <div className="searchBox w-100  d-flex flex-column  p-3 ms-2  rounded-2 z-3 shadow-sm bg-light-subtle ">
                      {
                        searchResults.map(searchResult => (
                          <SearchBox key={searchResult.id} type={searchResult.type} id={searchResult.id} title={searchResult.title} />
                        ))
                      }
                    </div>
                  }
                </Form>
              </Nav>
              <div className="">
                <input type="checkbox" className="theme-checkbox mt-lg-1 mt-3" onClick={darkModeBtn} />
              </div>
            </Nav>
            {
              authContext.isLoggedIn ? (
                <div className="d-flex align-items-center mt-lg-0 mt-3  ">
                  <FaCircleUser className=' text-primary fs-1 ' />
                  <h6 className='m-2 fw-bold '>{authContext.userInfos.username}</h6>
                  <Button variant='outline-danger' size='sm' className='rounded-5 p-2' onClick={logOut}><IoMdLogOut className=' fs-4 ' /></Button>
                </div>
              ) : (
                <>
                  <Link to="/sign-up">
                    <Button className=' rounded-5 px-4 ' size='lg'>Sign up</Button>
                  </Link>
                  <Link to="/login">
                    <Button className=' rounded-5 px-4 ' variant='outline' size='lg'>Log in</Button>
                  </Link>
                </>
              )
            }

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
