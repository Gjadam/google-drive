import React from 'react'
import './LandingPageSection.css'
export default function LandingPageSection({title, text, image, dir}) {
  return (
    <div className={`${dir === 'reverse' ? 'flex-row-reverse ' : 'flex-row'} row  d-flex justify-content-center align-items-center flex-wrap  mt-5 m-auto `} data-aos="fade-up">
        <div className="col d-flex mb-4  mb-sm-0   ">
            <img src={image} alt="image" className='landing__image-height m-auto' />
        </div>
        <div className="col d-flex flex-column align-items-center  ">
            <h2 className='landing-page-section__title'>{title}</h2>
            <h6  className='landing-page-section__text lh-base  text-black-50 '>{text}</h6>
        </div>
    </div>

  )
}
