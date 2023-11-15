import React from 'react'
import './Index.css'
import { ButtonGroup, Container, Dropdown } from 'react-bootstrap'
import { HiPlus } from "react-icons/hi";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import NavBar from '../../Components/Templates/NavBar/NavBar'
import SectionHeader from '../../Components/Modules/SectionHeader/SectionHeader';
import FileBox from '../../Components/Modules/FileBox/FileBox';
export default function Index() {
  return (
    <Container>
      <NavBar />
      {/* Two Element in right and left side with fixed position */}
      <span className='index-style d-none d-xxl-block  '></span>
      {/* Start Add Drive */}
      <div className="d-flex align-items-center mt-5">
        <h1 className=' fw-bold '>My Drive</h1>
        <form className='ms-3 ' method="POST" enctype="multipart/form-data">
          <Dropdown as={ButtonGroup}>
            <label for="files" className='btn btn-primary d-flex align-items-center  '><HiPlus /></label>
            <input id="files" className='d-none' type="file" />
            <Dropdown.Toggle split id="dropdown-custom-2" />
            <Dropdown.Menu >
              <Dropdown.Item eventKey="1" className=' d-flex justify-content-center align-items-center '><MdOutlineCreateNewFolder className=' me-1 ' />New Folder</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </form>
      </div>
      {/* End Add Drive */}
      <SectionHeader title="Recent Files" />
      {/* Start File Boxes */}
      <div className=" d-flex justify-content-around align-items-centerf flex-wrap gap-3 mt-4  ">
        <FileBox />
        <FileBox />
        <FileBox />
        <FileBox />
      </div>
      {/* End File Boxes */}
      <SectionHeader title="All Files" />

    </Container>
  )
}
