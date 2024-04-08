'use client'
import { useState,  useEffect } from 'react'
import MenuButtons from './MenuButtons'
import $ from 'jquery'
import './css/responsive-menu.css'

const ResponsiveMenu = () => {
    
    const [ menu, setMenu ] = useState(false)

    useEffect(() => {
        
        const menu = $('.menu-responsive')

        $(document).on('click', '.menu-responsive-btn', () => {
            $(menu).toggleClass('active')
            setMenu( !menu )
        })

        $(document).on('click', '.close-responsive-btn', () => {
            $(menu).removeClass('active')
            setMenu( !menu )
        })

    }, [])

    return (<>
        
        <div className='menu-responsive-button'>
            <button className="navbar-toggler menu-responsive-btn" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars"></i>
            </button>
        </div>
        
        <div className="menu-responsive">
            
            <div className="close-responsive-btn">
                <i className="fas fa-times"></i>
            </div>


            <div className="menu-responsive-items">
                <MenuButtons />
            </div>

        </div>

    </>)

}



export default ResponsiveMenu