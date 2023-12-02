import React,{ useState } from 'react'
import { Button, Card, Container, Image } from 'react-bootstrap'
import './FileInfo.css'
import NavBar from '../../Components/Templates/NavBar/NavBar'
import PageStyle from '../../Components/Modules/PageStyle/PageStyle'
import { useParams } from 'react-router-dom'
import { RiDownloadCloud2Fill } from "react-icons/ri";
import Loader from '../../Components/Modules/Loader/Loader'
import { useQuery } from 'react-query'
export default function FileInfo() {


    const [isLoading, setIsLoading] = useState(true)
    const { fileID } = useParams()
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    // Get Single File
    const { data: fileData } = useQuery(["single-file", fileID], () => {
        return fetch(`http://fastdrive.pythonanywhere.com/api/media/${fileID}/`, {
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
                                <img className=' w-100 rounded-5 ' src={fileData?.file} />
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
