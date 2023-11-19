import React from 'react'
import './Index.css'
import { ButtonGroup, Container, Dropdown, Table } from 'react-bootstrap'
import { HiPlus } from "react-icons/hi";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import SectionHeader from '../../Components/Modules/SectionHeader/SectionHeader';
import FileBox from '../../Components/Modules/FileBox/FileBox';
import { Link } from 'react-router-dom';
import { AiFillEye } from "react-icons/ai";
import NavBar from '../../Components/Templates/NavBar/NavBar';
import PageStyle from '../../Components/Modules/PageStyle/PageStyle'
import Swal from 'sweetalert2';
export default function Index() {

  
  
  const addNewFolder = async  () => {
    const { value: folderName } = await Swal.fire({
      title: "Add new folder",
      input: "text",
      inputLabel: "Please enter a name:",
      inputPlaceholder: "Enter your folder name"
    });
    if(folderName) {
      const localStorageData = JSON.parse(localStorage.getItem("user"))
      fetch(`http://fastdrive.pythonanywhere.com/api/folders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${localStorageData.token}`
        },
        body: JSON.stringify({
          title: folderName
        })
      }).then(res => console.log(res))
    }
  }


  return (
    <Container>
      <NavBar />
      <PageStyle />
      {/* Start Add Drive */}
      <div className="d-flex align-items-center mt-5">
        <h1 className=' fw-bold '>My Drive</h1>
        <form className='ms-3 mb-1  ' method="POST" encType="multipart/form-data">
          <Dropdown as={ButtonGroup}>
            <label htmlFor="files" className='btn btn-primary d-flex align-items-center  '><HiPlus /></label>
            <input id="files" className='d-none' type="file" />
            <Dropdown.Toggle split id="dropdown-custom-2" />
            <Dropdown.Menu >
              <Dropdown.Item eventKey="1" className=' d-flex justify-content-center align-items-center' onClick={addNewFolder}><MdOutlineCreateNewFolder className=' me-1 ' />New Folder</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </form>
      </div>
      {/* End Add Drive */}
      <SectionHeader title="Recent Files" />
      {/* Start Recent Files */}
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
      {/* End Recent Files */}
      <SectionHeader title="All Files" />
      {/* Start All Files  */}
      <div>
        <Table borderless responsive hover>
          <thead>
            <tr >
              <th className='text-black-50'>Name</th>
              <th className='text-black-50'>Last Modified</th>
              <th className='text-black-50'>Size</th>
              <th className='text-black-50'>Type</th>
              <th className='text-black-50'>View</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src="/images/png/pdf-icon.png" alt="icon" />
                <span className=' ms-2 '>pdf file test</span>
              </td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>
                <Link to="/file-info/1">
                  <AiFillEye className=' fs-4 ' />
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <img src="/images/png/pdf-icon.png" alt="icon" />
                <span className=' ms-2 '>pdf file test</span>
              </td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>
                <Link to="/file-info/1">
                  <AiFillEye className=' fs-4 ' />
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <img src="/images/png/pdf-icon.png" alt="icon" />
                <span className=' ms-2 '>pdf file test</span>
              </td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>
                <Link to="/file-info/1">
                  <AiFillEye className=' fs-4 ' />
                </Link>
              </td>
            </tr>
            <tr>
              <td>
                <img src="/images/png/pdf-icon.png" alt="icon" />
                <span className=' ms-2 '>pdf file test</span>
              </td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>
                <Link to="/file-info/1">
                  <AiFillEye className=' fs-4 ' />
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      {/* End All Files  */}

    </Container>
  )
}
