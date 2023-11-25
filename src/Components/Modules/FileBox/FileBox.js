import React from 'react'
import './FileBox.css'
import { FaRegImage } from "react-icons/fa6";
export default function FileBox({ fileName, format }) {
  return (
    <div className='file-box__size d-flex justify-content-center align-items-center flex-column p-3 rounded-5 border'>
      <img src="/images/svgs/logo.svg" className='file-box-image' alt="image" />
      <div className="file-box__content d-flex justify-content-between w-100">
        <span >{fileName.slice(0, 10)}...</span>
        {
          format === "svg" || "jpg" || "png" ? <FaRegImage className=' px-1 fs-3 ' /> : null
        }
      </div>
    </div>
  )
}
