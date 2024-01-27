import React from 'react'
import { Link } from 'react-router-dom'

export default function SearchBox({ type, id, title }) {
    return (
        <>
            <div className=" d-flex justify-content-start align-items-center my-3 ">
                <img src={type === "file" ? '/images/png/file-icon.png' : '/images/png/folder-icon.png'} alt="icon" />
                <Link to={type === "file" ? `/file-info/${id}` : `/folder-info/${id}`} className=' text-decoration-none '>
                    <span className=' ms-2'>{title.slice(0, 10)}{title.length > 10 && "..."}</span>
                </Link>
            </div>
        </>
    )
}
