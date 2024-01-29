import React,{ useEffect, useState } from 'react'
import { Button, Card, Container, Image } from 'react-bootstrap'
import './FileInfo.css'
import NavBar from '../../Components/Templates/NavBar/NavBar'
import PageStyle from '../../Components/Modules/PageStyle/PageStyle'
import { useParams } from 'react-router-dom'
import { RiDownloadCloud2Fill } from "react-icons/ri";
import Loader from '../../Components/Modules/Loader/Loader'
import { useQuery } from 'react-query'
export default function FileInfo() {
    
    
    const [fileImage, setFileImage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const { fileID } = useParams()
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    // Get Single File
    const { data: fileData } = useQuery(["single-file", fileID], () => {
        return fetch(`http://fastdrivev2.pythonanywhere.com/api/media/${fileID}/`, {
            headers: {
                'Authorization': `Token ${localStorageData.token}`
            }
        })
            .then(res => res.json())
    },
    {
        onSuccess: () => {
            setIsLoading(false)
        }
    })



    useEffect(() => {
  
      switch (fileData?.file_format) {
        case "pdf":
          setFileImage(<img src='/images/jpg/pdf-image.jpeg' className=' w-100  rounded-5  ' alt="image" />)
          break
        case "jpg":
          setFileImage(<img src={fileData?.file} className=' w-100 rounded-5' alt="image" />)
          break
        case "svg":
          setFileImage(<img src={fileData?.file} className=' w-100 rounded-5 ' alt="image" />)
          break
        case "png":
          setFileImage(<img src={fileData?.file} className=' w-100 rounded-5 ' alt="image" />)
          break
        case "mp4":
          setFileImage(<img src='/images/jpg/video-image.jpg' className=' w-100 rounded-5   ' alt="image" />)
          break
      }
})

    return (
        <Container >
            <NavBar />
            <PageStyle />
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className="FileInfo-height  d-flex justify-content-center align-items-center ">
                        <div className="row overflow-hidden">
                            <div className="FileInfo__image-height  col-12 col-md-6 ">
                                {fileImage}
                            </div>
                            <div className="col mt-3 mt-md-0  ">
                                <div className=" d-flex justify-content-between align-items-center p-2 ">
                                    <label className=' text-primary'>name: </label>
                                    <h5 className='  '>{fileData?.file_name.slice(0, 20)}...</h5>
                                </div>
                                <div className=" d-flex justify-content-between align-items-center p-2">
                                    <label className=' text-primary '>format: </label>
                                    <h5 className='  '>{fileData?.file_format}</h5>
                                </div>
                                <div className=" d-flex justify-content-between align-items-center p-2 ">
                                    <label className=' text-primary '>size: </label>
                                    <h5 className=' '>{fileData?.file_size}</h5>
                                </div>
                                <a href={fileData?.file} className=' text-decoration-none '>
                                    <Button className=' d-flex justify-content-center  align-items-center   w-100 rounded-5 '><RiDownloadCloud2Fill className='fs-5  me-1 ' />Download</Button>
                                </a>
                            </div>
                        </div>
                    </div>
                )
            }
        </Container>
    )
}
