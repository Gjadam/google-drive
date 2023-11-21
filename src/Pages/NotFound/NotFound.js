import React from 'react'
import './NotFound.css'
import { Button, Container } from 'react-bootstrap'
import NavBar from '../../Components/Templates/NavBar/NavBar'
import { FaGoogleDrive } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import PageStyle from '../../Components/Modules/PageStyle/PageStyle';

export default function NotFound() {
  return (
    <>
      <NavBar />
      <PageStyle />
      <Container>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <img src="/images/png/not-found.png" className='not-found__image-width my-5 ' alt="not-found" />
          <Link to="/fast-drive" className='text-decoration-none '>
            <Button className=' rounded-5 px-4 d-flex justify-content-center align-items-center ' variant='light' size='lg'><FaGoogleDrive className=' me-2 text-primary ' />Go to Drive</Button>
          </Link>
        </div>
      </Container>
    </>
  )
}
