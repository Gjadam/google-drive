import React, { useEffect, useState } from 'react'
import './Index.css'
import { Alert, ButtonGroup, Container, Dropdown, Table } from 'react-bootstrap'
import { HiPlus } from "react-icons/hi";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { MdDeleteOutline } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import SectionHeader from '../../Components/Modules/SectionHeader/SectionHeader';
import FileBox from '../../Components/Modules/FileBox/FileBox';
import { Link } from 'react-router-dom';
import { BiShowAlt } from "react-icons/bi";
import NavBar from '../../Components/Templates/NavBar/NavBar';
import PageStyle from '../../Components/Modules/PageStyle/PageStyle'
import Swal from 'sweetalert2';
export default function Index() {

  const [folders, setFolders] = useState([])
  const [files, setFiles] = useState([])
  const [recentFiles, setRecentFiles] = useState([])

  const localStorageData = JSON.parse(localStorage.getItem("user"))

  // Create Toast Styles 
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  useEffect(() => {
    getAllFiles()
    getAllFolders()
    getRecentFiles()
  }, [])

  // Get All Folders From Server
  function getAllFolders() {
    fetch(`http://fastdrive.pythonanywhere.com/api/folders/`, {
      headers: {
        'Authorization': `Token ${localStorageData.token}`
      }
    })
      .then(res => res.json())
      .then(allFolders => {
        setFolders(allFolders)
      })
  }

  // Get All Files From Server
  function getAllFiles() {
    fetch(`http://fastdrive.pythonanywhere.com/api/media/`, {
      headers: {
        'Authorization': `Token ${localStorageData.token}`
      }
    })
      .then(res => res.json())
      .then(allFiles => {
        setFiles(allFiles)
      })
  }

  // Get Recent Files
  function getRecentFiles() {
    fetch(`http://fastdrive.pythonanywhere.com/api/media/recent/`, {
      headers: {
        'Authorization': `Token ${localStorageData.token}`
      }
    })
      .then(res => res.json())
      .then(resentData => {
        setRecentFiles(resentData)
      })

  }

  // Add New Folders 
  const addNewFolder = async () => {
    const { value: folderName } = await Swal.fire({
      title: "Add new folder",
      input: "text",
      inputLabel: "Please enter a name:",
      inputPlaceholder: "Enter your folder name"
    });
    if (folderName) {
      fetch(`http://fastdrive.pythonanywhere.com/api/folders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${localStorageData.token}`
        },
        body: JSON.stringify({
          title: folderName
        })
      }).then(res => {
        if (res.ok) {
          Toast.fire({
            icon: "success",
            title: "New folder Added"
          }).then(() => {
            getAllFolders()
          })
        }
      })
    }
  }

  // Delete Folder
  const removeFolder = (folderID) => {
    Swal.fire({
      title: "Do you want to delete this folder?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://fastdrive.pythonanywhere.com/api/folders/${folderID}/`, {
          method: "DELETE",
          headers: {
            'Authorization': `Token ${localStorageData.token}`
          }
        })
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Folder deleted successfully."
            }).then(() => {
              getAllFolders()
            })
          })
      }
    });
  }

  // Rename Folder
  const updateFolder = async (folderID) => {
    const { value: newFolderName } = await Swal.fire({
      title: "Rename the folder",
      input: "text",
      inputLabel: "Please enter a name:",
      inputPlaceholder: "Enter your folder name"
    });
    if (newFolderName) {
      fetch(`http://fastdrive.pythonanywhere.com/api/folders/${folderID}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${localStorageData.token}`
        },
        body: JSON.stringify({
          title: newFolderName
        })
      }).then(res => {
        if (res.ok) {
          Toast.fire({
            icon: "success",
            title: "New folder name changed"
          }).then(() => {
            getAllFolders()
          })
        }
      })
    }
  }


  const uploadFile = async (file) => {
    const formData = new FormData()

    formData.append('files', file);

    fetch(`http://fastdrive.pythonanywhere.com/api/media/`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorageData.token}`
      },
      body: formData
    })
      .then(res => {
        if (res.ok) {
          Toast.fire({
            icon: "success",
            title: "File Added successfully."
          }).then(() => {
            getAllFiles()
            getRecentFiles()
          })
        }
      })
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  // Delete File
  const removeFile = (fileID) => {
    Swal.fire({
      title: "Do you want to delete this file?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://fastdrive.pythonanywhere.com/api/media/${fileID}/`, {
          method: "DELETE",
          headers: {
            'Authorization': `Token ${localStorageData.token}`
          }
        })
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "File deleted successfully."
            }).then(() => {
              getAllFiles()
              getRecentFiles()
            })
          })
      }
    });
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
            <input id="files" className='d-none' type="file" onChange={handleFileChange} />
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
      {
        recentFiles.length ? (
          <div className=" d-flex justify-content-around align-items-centerf flex-wrap gap-3 mt-4  ">
            {
              recentFiles.map(recentFile => (
                <Link to={`/file-info/${recentFile.id}`} className='text-decoration-none '>
                  <FileBox fileName={recentFile.file_name} format={recentFile.file_format} />
                </Link>
              ))
            }
          </div>
        ) : (
          <Alert variant='primary' >There are no files or folders to Show !</Alert>
        )
      }


      {/* End Recent Files */}
      <SectionHeader title="All Files" />
      {/* Start All Files  */}
      {
        folders.length || files.length ? (
          <>
            <div>
              <Table borderless responsive hover>
                <thead>
                  <tr >
                    <th>Name</th>
                    <th></th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    folders.map(folder => (
                      <tr key={folder.id}>
                        <td>
                          <img src="/images/png/folder-icon.png" alt="icon" />
                          <span className=' ms-2 '>{folder.title}</span>
                        </td>
                        <td></td>
                        <td>
                          <abbr title="View">
                            <Link to={`/folder-info/${folder.id}`}>
                              <BiShowAlt className=' fs-4 ' />
                            </Link>
                          </abbr>
                          <abbr title="Rename">
                            <Link >
                              <MdDriveFileRenameOutline className=' fs-5 mx-3' onClick={() => updateFolder(folder.id)} />
                            </Link>
                          </abbr>
                          <abbr title="Delete">
                            <Link>
                              <MdDeleteOutline className=' text-danger fs-5 ' onClick={() => removeFolder(folder.id)} />
                            </Link>
                          </abbr>
                        </td>
                      </tr>
                    ))
                  }
                  {
                    files.map(file => (
                      <tr key={file.id}>
                        <td>
                          <img src="/images/png/file-icon.png" alt="icon" />
                          <span className=' ms-2 '>{file.file_name.slice(0, 10)}...</span>
                        </td>
                        <td></td>
                        <td>
                          <abbr title="View">
                            <Link to={`/file-info/${file.id}`}>
                              <BiShowAlt className=' fs-4 me-3 ' />
                            </Link>
                          </abbr>
                          <abbr title="Delete">
                            <Link>
                              <MdDeleteOutline className=' text-danger fs-5 ' onClick={() => removeFile(file.id)} />
                            </Link>
                          </abbr>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </div>
          </>
        ) : (
          <Alert variant='primary' >There are no files or folders to Show !</Alert>
        )
      }
      {/* End All Files  */}

    </Container>
  )
}
