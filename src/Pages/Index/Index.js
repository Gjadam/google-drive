import React, { useEffect, useState } from 'react'
import './Index.css'
import { Alert, ButtonGroup, Container, Dropdown, DropdownButton, Table } from 'react-bootstrap'
import { HiPlus } from "react-icons/hi";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import SectionHeader from '../../Components/Modules/SectionHeader/SectionHeader';
import FileBox from '../../Components/Modules/FileBox/FileBox';
import { Link } from 'react-router-dom';
import NavBar from '../../Components/Templates/NavBar/NavBar';
import PageStyle from '../../Components/Modules/PageStyle/PageStyle'
import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Loader from '../../Components/Modules/Loader/Loader';
import UploadingLoader from '../../Components/Modules/UploadingLoader/UploadingLoader';
import apiRequest from '../../Services/Axios/Configs/config';
export default function Index() {

  const queryClient = useQueryClient()

  // Create Toast Styles 
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });


  // Get All Folders From Server
  const { data: folders } = useQuery("folders", async () => {
    const res = await apiRequest.get("/folders/")
    return res.data

  })

  // Get All Files From Server
  const { data: files } = useQuery("files", async () => {
    const res = await apiRequest.get("/media/")
    return res.data
  })

  // Get Recent Files
  const { data: recentFiles } = useQuery("recentFiles", async () => {
    const res = await apiRequest.get("/media/recent/")

    return res.data
  })

  // Add New Folders 
  const { mutate: newFolderMutate } = useMutation((folderName) => {
    apiRequest.post("/folders/", {
      title: folderName
    })
  },
    {
      onSuccess: () => {
        Toast.fire({
          icon: "success",
          title: "New folder Added."
        })
        queryClient.invalidateQueries(["folders"])
      }
    })

  const addNewFolder = async () => {
    const { value: folderName } = await Swal.fire({
      title: "Add new folder",
      input: "text",
      inputLabel: "Please enter a name:",
      inputPlaceholder: "Enter your folder name"
    });
    if (folderName) {
      newFolderMutate(folderName)
    }
  }

  // Delete Folder
  const { mutate: removeFolderMutate } = useMutation((folderID) => {
    return apiRequest.delete(`/folders/${folderID}/`)
  },
    {
      onSuccess: () => {
        Toast.fire({
          icon: "success",
          title: "Folder deleted successfully."
        })
        queryClient.invalidateQueries(["folders"])
      }
    })
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
        removeFolderMutate(folderID)
      }
    });
  }


  // Upload File 
  const { mutate: uploadFileMutate, isLoading } = useMutation((formData) => {
    return apiRequest.post("/media/", formData)
  },
    {
      onSuccess: () => {
        Toast.fire({
          icon: "success",
          title: "New file Added."
        })
        queryClient.invalidateQueries(["recentFiles"])
        queryClient.invalidateQueries(["files"])
      }
    })

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('files', file);
    uploadFileMutate(formData)
  }

  // Delete File
  const { mutate: removeFileMutate } = useMutation((fileID) => {
    return apiRequest.delete(`/media/${fileID}`)
  },
    {
      onSuccess: () => {
        Toast.fire({
          icon: "success",
          title: "File deleted successfully."
        })
        queryClient.invalidateQueries(["recentFiles"])
        queryClient.invalidateQueries(["files"])
      }
    })
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
        removeFileMutate(fileID)
      }
    });
  }


  return (
    <Container>
      <NavBar />
      <PageStyle />
      {
        isLoading && <UploadingLoader />
      }
      <>
        {/* Start Add Drive */}
        <div className="d-flex align-items-center mt-5">
          <h1 className=' fw-bold '>My Drive</h1>
          <form className='ms-3 mb-1  ' method="POST" encType="multipart/form-data">
            <Dropdown as={ButtonGroup}>
              <label htmlFor="files" className='btn btn-primary d-flex align-items-center  '><HiPlus /></label>
              <input id="files" className='d-none' type="file" onChange={(event) => uploadFile(event.target.files[0])} />
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
          recentFiles?.length ? (
            <div className=" d-flex justify-content-around align-items-centerf flex-wrap gap-1  mt-4  ">
              {
                recentFiles.slice(0, 4).map(recentFile => (
                  <Link to={`/file-info/${recentFile.id}`} className='text-decoration-none ' key={recentFile.id}>
                    <FileBox fileName={recentFile.file_name} format={recentFile.file_format} fileImg={recentFile.file} />
                  </Link>
                ))
              }
            </div>
          ) : (
            <Alert variant='primary' >There are no files to Show !</Alert>
          )
        }


        {/* End Recent Files */}
        <SectionHeader title="All Files" />
        {/* Start All Files  */}
        {
          folders?.length || files?.length ? (
            <>
              <div className=' mb-5'>
                {
                  folders?.map(folder => (
                    <div key={folder.id} className=" d-flex justify-content-between align-items-center my-3 border-bottom  ">
                      <div>
                        <img src="/images/png/folder-icon.png" alt="icon" />
                        <Link to={`/folder-info/${folder.id}`} className=' text-decoration-none '>
                          <span className=' ms-2'>{folder.title.slice(0, 10)}{folder.title.length > 10 && "..."}</span>
                        </Link>
                      </div>
                      <div >
                        <DropdownButton variant='none'>
                          <Dropdown.Item className='d-flex justify-content-center align-items-center text-danger ' onClick={() => removeFolder(folder.id)}><FaTrash className=' me-1 ' />Delete</Dropdown.Item>
                        </DropdownButton>
                      </div>
                    </div>
                  ))
                }
                {
                  files?.map(file => (
                    <div key={file.id} className=" d-flex justify-content-between align-items-center my-3 border-bottom  ">
                      <div>
                        <img src="/images/png/file-icon.png" alt="icon" />
                        <Link to={`/file-info/${file.id}`} className=' text-decoration-none '>
                          <span className=' ms-2'>{file.file_name.slice(0, 10)}{file.file_name.length > 10 && "..."}</span>
                        </Link>
                      </div>
                      <div>
                        <DropdownButton variant='none'>
                          <Dropdown.Item className=' d-flex justify-content-center align-items-center text-danger ' onClick={() => removeFile(file.id)}><FaTrash className=' me-1 ' />Delete</Dropdown.Item>
                        </DropdownButton>
                      </div>
                    </div>
                  ))
                }


              </div>
            </>
          ) : (
            <Alert variant='primary' >There are no files or folders to Show !</Alert>
          )
        }
        {/* End All Files  */}

      </>

    </Container>
  )
}
