import React from 'react'
import './FileBox.css'
import { TbPdf } from "react-icons/tb";
export default function FileBox() {
  return (
    <div className='file-box__size d-flex justify-content-center align-items-center flex-column p-3 rounded-5 border'>
        <img src="/images/svgs/logo.svg" className='file-box-image' alt="image" />
        <div className="file-box__content d-flex justify-content-between w-100">
            <h6 >file.pdf</h6>
            <TbPdf className=' bg-primary text-white rounded-3 px-1 fs-3 '/>
        </div>
    </div>
  )
}
