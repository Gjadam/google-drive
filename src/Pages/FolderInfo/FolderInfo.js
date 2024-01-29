import React from 'react'
import { Container } from 'react-bootstrap'
import NavBar from '../../Components/Templates/NavBar/NavBar'
import PageStyle from '../../Components/Modules/PageStyle/PageStyle'
import SectionHeader from '../../Components/Modules/SectionHeader/SectionHeader'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'

export default function FolderInfo() {


    const { folderID } = useParams()
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    // Get Single Folder
    const { data: folderData } = useQuery("single-folder", () => {
        return fetch(`http://fastdrivev2.pythonanywhere.com/api/folders/${folderID}/`, {
            headers: {
                'Authorization': `Token ${localStorageData.token}`
            }
        })
            .then(res => res.json())
    })

    return (
        <Container>
            <NavBar />
            <PageStyle />
            <SectionHeader title={folderData?.title} />
            <div className="d-flex align-items-center">
                <form className=' ' method="POST" encType="multipart/form-data">
                    <label htmlFor="files" className='btn btn-primary d-flex align-items-center '>Upload file</label>
                    <input id="files" className='d-none' type="file" />
                </form>
            </div>

            <div className=" d-flex justify-content-around align-items-centerf flex-wrap gap-3 mt-4  ">
                {/* <Link to="/file-info/1" className='text-decoration-none '>
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
                </Link> */}

            </div>
        </Container>
    )
}
