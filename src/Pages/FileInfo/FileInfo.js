import React from 'react'
import { Button, Card, Container, Image } from 'react-bootstrap'
import './FileInfo.css'
import NavBar from '../../Components/Templates/NavBar/NavBar'
import PageStyle from '../../Components/Modules/PageStyle/PageStyle'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import Loader from '../../Components/Modules/Loader/Loader'
export default function FileInfo() {

    const [fileUrl, setFileUrl] = useState([])
    const [fileName, setFileName] = useState([])
    const [fileFormat, setFileFormat] = useState([])
    const [fileSize, setFileSize] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const { fileID } = useParams()
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        fetch(`http://fastdrive.pythonanywhere.com/api/media/${fileID}/`, {
            headers: {
                'Authorization': `Token ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then(fileDatas => {
                setFileUrl(fileDatas.file)
                setFileFormat(fileDatas.file_format)
                setFileName(fileDatas.file_name)
                setFileSize(fileDatas.file_size)
                setIsLoading(false)
            })
    }, [])


    return (
        <Container >
            <NavBar />
            <PageStyle />

            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className=" d-flex justify-content-center align-items-center FileInfo-height ">
                        <div className="row overflow-hidden">
                            <div className=" col-12 col-md-6 ">
                                <img className=' w-100  rounded-5 ' src={fileUrl} />
                            </div>
                            <div className="col mt-4 mt-md-0 ">
                                <div className=" d-flex justify-content-between align-items-center p-2 ">
                                    <label className=' text-primary'>name: </label>
                                    <h5 className='  '>{fileName}</h5>
                                </div>
                                <div className=" d-flex justify-content-between align-items-center p-2">
                                    <label className=' text-primary '>format: </label>
                                    <h5 className='  '>{fileFormat}</h5>
                                </div>
                                <div className=" d-flex justify-content-between align-items-center p-2 ">
                                    <label className=' text-primary '>size: </label>
                                    <h5 className=' '>{fileSize}</h5>
                                </div>
                                <a href={fileUrl}>
                                    <Button className=' w-100 rounded-5'>Download</Button>
                                </a>
                            </div>
                        </div>
                    </div>
                )
            }
        </Container>
    )
}
