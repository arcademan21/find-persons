'use client'
import { useEffect } from "react"

const VantaGlobe = ( { el }) => {

    useEffect(() => {

        // detectando pantalla mobile
        let config = null
        if ( window.screen.width < 768 ) {
            config = {
                width: 50,
                height: 50
            }
        } 

        else {
            config = {
                width: 1000.00,
                height: 1000.00
            }
        }

       
        window.VANTA.GLOBE({
            el: el,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: config.height || 1000.00,
            minWidth: config.width || 1000.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: '#5848f6',
            color2: '#5848f6',
            backgroundColor: 0xffffff,
        })
        
        
       

    }, [el])

   

}

export default VantaGlobe
