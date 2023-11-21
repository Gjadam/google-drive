import React from 'react'
import { Container } from 'react-bootstrap'
import NavBar from '../../Components/Templates/NavBar/NavBar'
import PageStyle from '../../Components/Modules/PageStyle/PageStyle'
import SectionHeader from '../../Components/Modules/SectionHeader/SectionHeader'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import FileBox from '../../Components/Modules/FileBox/FileBox'

export default function FolderInfo() {

    const [folderData, setFolderData] = useState([])

    const { folderID } = useParams()
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        // Get Single Folder From Server
        fetch(`http://fastdrive.pythonanywhere.com/api/folders/${folderID}/`, {
            headers: {
                'Authorization': `Token ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then(folderDatas => {
                setFolderData(folderDatas)
            })
    }, [])
    
    return (
        <Container>
            <NavBar />
            <PageStyle />
            <SectionHeader title={folderData.title} />
            <div className=" d-flex justify-content-around align-items-centerf flex-wrap gap-3 mt-4  ">
                <Link to="/file-info/1" className='text-decoration-none '>
                    <FileBox />
                </Link>
                <Link to="/file-info/1" className='text-decoration-none '>
                    <FileBox />
                </Link>
                <Link to="/file-info/1" className='text-decoration-none '>
                    <FileBox />
                </Link>
                <Link to="/file-info/1" className='text-decoration-none '>
                    <FileBox />
                </Link>

            </div>
        </Container>
    )
}
