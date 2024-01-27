import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import SectionHeader from '../../Components/Modules/SectionHeader/SectionHeader'
import PageStyle from '../../Components/Modules/PageStyle/PageStyle'
import NavBar from '../../Components/Templates/NavBar/NavBar'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import FileBox from '../../Components/Modules/FileBox/FileBox'
import SearchBox from '../../Components/Modules/SearchBox/SearchBox'

export default function Search() {
    const [searchResults, setSearchResults] = useState([])
    const { searchID } = useParams()
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        fetch(`http://fastdrive.pythonanywhere.com/api/search/?q=${searchID}`, {
            headers: {
                'Authorization': `Token ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then(data => setSearchResults(data))
    }, [searchID])

    return (
        <Container>
            <NavBar />
            <PageStyle />
            <SectionHeader title={"Search result:"} />
            {
                searchResults.map(searchResult => (
                    <SearchBox type={searchResult.type} id={searchResult.id} title={searchResult.title} />
                ))
            }
        </Container>
    )
}
