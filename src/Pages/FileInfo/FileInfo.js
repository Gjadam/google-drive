import React from 'react'
import { Button, Card, Container, Image } from 'react-bootstrap'
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
                    <div className="row  my-5 overflow-hidden">
                        <div className="card-image__size col-12 col-md-6 ">
                                <img className=' w-100  rounded-5 ' src={fileUrl} />
                        </div>
                        <div className="col p-4 ">
                            <label className=' text-primary'>name: </label>
                            <h5 className=' p-2 '>{fileName}</h5>
                            <label className=' text-primary '>format: </label>
                            <h5 className=' p-2 '>{fileFormat}</h5>
                            <label className=' text-primary '>size: </label>
                            <h5 className=' p-2 '>{fileSize}</h5>
                            <a href={fileUrl}>
                                <Button className=' w-100 rounded-5 '>Download</Button>
                            </a>
                        </div>
                    </div>
                    // <Card className=' my-5 rounded-5 overflow-hidden'>
                    //     <div className=" d-flex justify-content-center align-items-center ">
                    //         <Card.Img variant="top" className='card-image__size' src={fileData} />
                    //     </div>
                    //     <Card.Title>Card Title</Card.Title>
                    //     <Card.Footer className=' w-100 '>
                    //         <a href={fileData}>
                    //             <Button className=' rounded-bottom-5 w-100 '>Download</Button>
                    //         </a>
                    //     </Card.Footer>
                    // </Card>

                )
            }
        </Container>
    )
}
