import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import SectionHeader from '../../Components/Modules/SectionHeader/SectionHeader'
import PageStyle from '../../Components/Modules/PageStyle/PageStyle'
import NavBar from '../../Components/Templates/NavBar/NavBar'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import FileBox from '../../Components/Modules/FileBox/FileBox'
import SearchBox from '../../Components/Modules/SearchBox/SearchBox'
import apiRequest from '../../Services/Axios/Configs/config'
export default function Search() {
    const [searchResults, setSearchResults] = useState([])
    const { searchID } = useParams()

    const getSearchData = async () => {
        const res = await apiRequest.get(`/search/?q=${searchID}`)
        setSearchResults(res.data)
    }

    useEffect(() => {
        getSearchData()
    }, [searchID])


    return (
        <Container>
            <NavBar />
            <PageStyle />
            <SectionHeader title={"Search result:"} />
            {
                searchResults.map(searchResult => (
                    <SearchBox key={searchResult.id} type={searchResult.type} id={searchResult.id} title={searchResult.title} />
                ))
            }
        </Container>
    )
}
