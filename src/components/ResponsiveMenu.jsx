'use client'
import { useState,  useEffect } from 'react'
import MenuButtons from './MenuButtons'
import $ from 'jquery'
import './css/responsive-menu.css'
import { FaTimes, FaBars } from 'react-icons/fa'

const ResponsiveMenu = () => {
    
    const [ menu, setMenu ] = useState(false)

    useEffect(() => {
        
        const menu = $('.menu-responsive')

        $(document).on('click', '.menu-responsive-btn', () => {
            $(menu).toggleClass('active')
            document.body.style.overflow = 'hidden'
            setMenu( !menu )
        })

        $(document).on('click', '.close-responsive-btn', () => {
            $(menu).removeClass('active')
            document.body.style.overflow = 'auto'
            setMenu( !menu )
        })

    }, [])

    return (<>
        
        <div className='menu-responsive-button'>
            <button className="navbar-toggler menu-responsive-btn" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <FaBars />
            </button>
        </div>
        
        <div className="menu-responsive">
            
            <div className="close-responsive-btn">
                
                <FaTimes />
                
            </div>


            <div className="menu-responsive-items">
                <MenuButtons />
            </div>

        </div>

    </>)

}



export default ResponsiveMenu