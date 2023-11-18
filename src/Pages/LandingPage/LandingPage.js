import React from 'react'
import './LandingPage.css'

import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import LandingPageSection from '../../Components/Modules/LandingPageSection/LandingPageSection';
export default function LandingPage() {
    return (
        <>
            <div className=" bg-primary rounded-bottom-5 p-5  ">
                <Container >
                    <div className=' d-flex justify-content-center align-items-center flex-column  text-white  text-center  ' >
                        <img src="/images/svgs/logo.svg" className='landing__image-height rounded mb-2 ' alt="image" />
                        <h1 className=' fw-bold '>Easy and secure access to your content</h1>
                        <h5 className=' my-3 '>Store, share, and collaborate on files and folders from your mobile device, tablet, or computer Try Drive for Work </h5>
                        <div className=" d-flex justify-content-center align-items-center gap-3 ">
                            <Link to="/sign-up">
                                <Button className=' rounded-5 px-5 ' variant='light' size='lg'>Sign up</Button>
                            </Link>
                            <Button className=' rounded-5 px-5 ' variant='outline-light' size='lg'>Log in</Button>
                        </div>
                    </div>
                </Container>
            </div>
            <Container>
                <LandingPageSection title={'Built-in protections against malware, spam, and ransomware'} text={'Drive can provide encrypted and secure access to your files. Files shared with you can be proactively scanned and removed when malware, spam, ransomware, or phishing is detected. And Drive is cloud-native, which eliminates the need for local files and can minimize risk to your devices.'} image={'/images/jpg/landing-section-1.jpg'} dir={''} />
                <LandingPageSection title={'People-first collaboration apps to supercharge teamwork'} text={'Drive integrates with Docs, Sheets, and Slides, cloud-native collaboration apps that enable your team to create content and collaborate more effectively in real time.'} image={'/images/jpg/landing-section-2.jpg'} dir={'reverse'} />
                <LandingPageSection title={'Integration with the tools and apps your team is already using'} text={'Drive integrates with and complements your team’s existing technology. Collaborate in Microsoft Office files without the need to convert file formats, and edit and store over 100 additional file types, including PDFs, CAD files, images, and more.'} image={'/images/jpg/landing-section-3.jpg'} dir={''} />
                <LandingPageSection title={'Google’s Search and AI technology helps your team move faster'} text={'Google’s powerful search capabilities are embedded in Drive and offer speed, reliability, and collaboration. And features like Drive search chips help your team find files fast by quickly surfacing more relevant results.'} image={'/images/jpg/landing-section-4.jpg'} dir={'reverse'} />
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
