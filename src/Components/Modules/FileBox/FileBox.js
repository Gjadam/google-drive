import React, { useEffect, useState } from 'react'
import './FileBox.css'
import { FaRegImage } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { PiVideoFill } from "react-icons/pi";
export default function FileBox({ fileName, format, fileImg }) {

  const [fileIcon, setFileIcon] = useState("")
  const [fileImage, setFileImage] = useState("")

  useEffect(() => {

    switch (format) {
      case "pdf":
        setFileIcon(<FaFilePdf className=' px-1 fs-3 ' />)
        setFileImage(<img src='/images/jpg/pdf-image.jpeg' className=' w-100   ' alt="image" />)
        break
      case "jpg":
        setFileIcon(<FaRegImage className=' px-1 fs-3 ' />)
        setFileImage(<img src={fileImg} className=' w-100' alt="image" />)
        break
      case "svg":
        setFileIcon(<FaRegImage className=' px-1 fs-3 ' />)
        setFileImage(<img src={fileImg} className=' w-100 ' alt="image" />)
        break
      case "png":
        setFileIcon(<FaRegImage className=' px-1 fs-3 ' />)
        setFileImage(<img src={fileImg} className=' w-100 ' alt="image" />)
        break
      case "mp4":
        setFileIcon(<PiVideoFill className=' px-1 fs-2 ' />)
        setFileImage(<img src='/images/jpg/video-image.jpg' className=' w-100   ' alt="image" />)
        break
    }
  }, [])

  return (
    <div className='file-box__size d-flex justify-content-between align-items-center flex-column rounded-5 border overflow-hidden shadow mb-3 '>
      <div className=" overflow-hidden ">
          {fileImage}
      </div>
      <div className="file-box__content d-flex justify-content-between w-100  px-3 py-2   border-top ">
        <span>{fileName.slice(0, 10)}...</span>
        {fileIcon}
      </div>
    </div>
  )
}
