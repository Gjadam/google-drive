import React, { useContext } from 'react'
import './LandingPage.css'
import AuthContext from '../../context/authContext';
import { Accordion, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Slider from 'react-infinite-logo-slider'
import { FaGoogleDrive } from "react-icons/fa6";
import LandingPageSection from '../../Components/Modules/LandingPageSection/LandingPageSection';
import AccordionBox from '../../Components/Modules/AccordionBox/AccordionBox';
import NavBar from '../../Components/Templates/NavBar/NavBar';
export default function LandingPage() {

    const authContext = useContext(AuthContext)

    return (
        <>
            <NavBar />
            <div className=" bg-primary rounded-bottom-5 p-5  ">
                <Container >
                    <div className=' d-flex justify-content-center align-items-center flex-column  text-white  text-center  '>
                        <img src="/images/png/landing-header-bg.png" className='landing__image-height rounded mb-2 ' alt="image" />
                        <h2 className=' fw-bold'>Easy and secure access to your content</h2>
                        <h6 className=' my-3 '>Store, share, and collaborate on files and folders from your mobile device, tablet, or computer Try Drive for Work </h6>
                        <div className=" d-flex justify-content-center align-items-center gap-3 mt-2 ">
                            {
                                authContext.isLoggedIn ? (
                                    <Link to="/fast-drive" className=' text-decoration-none '>
                                        <Button className=' rounded-5 px-4 d-flex justify-content-center align-items-center ' variant='light' size='lg'><FaGoogleDrive className=' me-2 text-primary ' />Go to Drive</Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/sign-up">
                                            <Button className=' rounded-5 px-4 ' variant='light' size='lg'>Sign up</Button>
                                        </Link>
                                        <Link to="/login">
                                            <Button className=' rounded-5 px-4 ' variant='outline-light' size='lg'>Log in</Button>
                                        </Link>

                                    </>
                                )
                            }
                        </div>
                    </div>
                </Container>
            </div>
            <div className=" my-5 asdasd ">
                <Slider
                    width="300px"
                    duration={20}
                    pauseOnHover={true}
                    blurBorders={false}
                    blurBoderColor={'#fff'}
                >
                    <Slider.Slide>
                        <img src={"/images/svgs/landing-slider-1.svg"} className='slider-image__width' alt="any" />
                    </Slider.Slide>
                    <Slider.Slide>
                        <img src={"/images/svgs/landing-slider-2.svg"} className='slider-image__width' alt="any" />
                    </Slider.Slide>
                    <Slider.Slide>
                        <img src={"/images/svgs/landing-slider-3.svg"} className='slider-image__width' alt="any" />
                    </Slider.Slide>
                </Slider>
            </div>
            <div className=" position-relative ">
                <img src="/images/png/signup-style.png" className='image-style-1' alt="image-style" />
                <img src="/images/png/signup-style.png" className='image-style-2' alt="image-style" />
                <Container>
                    <LandingPageSection title={'Built-in protections against malware, spam, and ransomware'} text={'Drive can provide encrypted and secure access to your files. Files shared with you can be proactively scanned and removed when malware, spam, ransomware, or phishing is detected. And Drive is cloud-native, which eliminates the need for local files and can minimize risk to your devices.'} image={'/images/png/landing-section-1.png'} dir={''} />
                    <LandingPageSection title={'People-first collaboration apps to supercharge teamwork'} text={'Drive integrates with Docs, Sheets, and Slides, cloud-native collaboration apps that enable your team to create content and collaborate more effectively in real time.'} image={'/images/png/landing-section-2.png'} dir={'reverse'} />
                    <LandingPageSection title={'Integration with the tools and apps your team is already using'} text={'Drive integrates with and complements your team’s existing technology. Collaborate in Microsoft Office files without the need to convert file formats, and edit and store over 100 additional file types, including PDFs, CAD files, images, and more.'} image={'/images/png/landing-section-3.png'} dir={''} />
                    <LandingPageSection title={'Google’s Search and AI technology helps your team move faster'} text={'Google’s powerful search capabilities are embedded in Drive and offer speed, reliability, and collaboration. And features like Drive search chips help your team find files fast by quickly surfacing more relevant results.'} image={'/images/png/landing-section-4.png'} dir={'reverse'} />
                </Container>
            </div>
            <Container className=' mt-5 ' data-aos="fade-up" data-aos-duration="1500">
                <Accordion defaultActiveKey="0">
                    <AccordionBox eventKey={"0"} header={"What is special about Fast Drive?"} body={"Significant features of Fast Drive Fast Drive integrates with several first-party and third-party external web applications that users can add from the Chrome Web Store. Users can sign documents, create flowcharts, store music files and complete other tasks using these apps."} />
                    <AccordionBox eventKey={"1"} header={"What is one fact about Fast Drive?"} body={"Fast Drive is a cloud based document storage platform. Drive facilitates file sharing option with others. It can be integrated with third party applications also. Supporting all types of files i.e. Archive files, Audio files, Image files, Markup/code, Text files, Video files."} />
                    <AccordionBox eventKey={"2"} header={"Is there a folder limit on Google Drive?"} body={"  File and folder limits in shared drives A shared drive can contain a maximum of 400,000 items, including files, folders, and shortcuts. Note: This limit is based on item count, not storage use."} />
                </Accordion>
            </Container>
            <div className="footer__bg-image d-flex justify-content-center align-items-center flex-column bg-light text-center mt-5 rounded-top-5 ">
                <h3 className=' text-white fw-bold '>Our GitHub links</h3>
                <div className=" d-flex ">
                    <a href="https://github.com/Gjadam" className=' me-2  link-offset-2 '>Gjadam </a>
                    <a href="https://github.com/alirahmnicode" className=' link-offset-2 '>AliRahmaniCode</a>
                </div>
            </div>
            <div className=" bg-black text-center text-white  p-3  ">
                <h6> &copy; 2023 Created By <span className='fw-bold '>TheGjad</span> & <span className='fw-bold'>AliRahmaniCode</span></h6>
            </div>

        </>
    )
}
