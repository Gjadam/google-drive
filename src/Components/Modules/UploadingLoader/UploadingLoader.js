import React from 'react'
import './UploadingLoader.css'
import { BiLoaderCircle } from "react-icons/bi";
import { Spinner } from 'react-bootstrap';
export default function UploadingLoader() {
  return (
    <div className=' d-flex justify-content-start align-items-center  position-fixed shadow p-4   bg-white rounded-2 border-primary border-bottom border-2  uploading-loader__wrapper  '>
      <div className=" d-flex align-items-center fs-6 ">
        <Spinner animation='border' size='sm' className='me-2  text-primary'/>
        <span className=' text-black ' >Uploading file...</span>
      </div>
    </div>
  )
}
