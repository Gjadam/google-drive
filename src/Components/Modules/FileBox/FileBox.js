import React from 'react'
import './FileBox.css'
import { FaRegImage } from "react-icons/fa6";
export default function FileBox({ fileName, format, fileImg }) {
  return (
    <div className='file-box__size d-flex justify-content-between align-items-center flex-column rounded-5 border overflow-hidden shadow '>
      <div className=" overflow-hidden ">
      <img src={fileImg} className=' w-100 ' alt="image" />
      </div>
      
      <div className="file-box__content d-flex justify-content-between w-100  p-3  border-top ">
        <span>{fileName.slice(0, 10)}...</span>
        {
          format === "svg" || "jpg" || "png" ? <FaRegImage className=' px-1 fs-3 ' /> : null
        }
      </div>
    </div>
  )
}
