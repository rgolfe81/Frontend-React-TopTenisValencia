import React from 'react'
import "./Footer.css"
import { BsGithub, BsLinkedin } from 'react-icons/bs'

export const Footer = () => {
  return (
    <div className='footerDesign'>
        <div className='boxTriSection'>
            <div className='textTTV'>Top Tenis Valencia</div>
            <div>
                <div>Rubén Golfe Silvestre</div>
                <div>Vilamarxant - Valencia</div>
            </div>
            <div>
                <div>
                    <BsGithub className='iconFooter'/> <a href="https://github.com/rgolfe81" className='text-white text-decoration-none' target="_blank">  GitHub</a>
                </div>
                <div>
                    <BsLinkedin className='iconFooter'/> <a href="https://www.linkedin.com/in/ruben-golfe/" className='text-white text-decoration-none' target="_blank">  LinkedIn</a>
                </div>
            </div>
        </div>
        <div className='textGHA'>Proyecto final de formación bootcamp Full Stack Developer en GeeksHubs Academy</div>

    </div>
  )
}
