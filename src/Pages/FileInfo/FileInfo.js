import React from 'react'
import { Button, Card, Container, Image } from 'react-bootstrap'
import './FileInfo.css'
import NavBar from '../../Components/Templates/NavBar/NavBar'
import PageStyle from '../../Components/Modules/PageStyle/PageStyle'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
export default function FileInfo() {

    const [fileData, setFileData] = useState([])
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
                setFileData(fileDatas.file)
            })
    }, [])

    return (
        <Container >
            <NavBar />
            <PageStyle />
            <Card className=' my-5 rounded-5 overflow-hidden'>
                <div className=" d-flex justify-content-center align-items-center ">
                    <Card.Img variant="top" className='card-image__size' src={fileData} />
                </div>
                <Card.Footer className=' w-100 '>
                    <a href={fileData}>
                        <Button className=' rounded-bottom-5 w-100 '>Download</Button>
                    </a>
                </Card.Footer>
            </Card>
        </Container>
    )
}
