import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import './styles.css'

const Navbar = () => {

    const [opacity, setOpacity] = useState(.5)

    const handleScroll = () => {
        const opacity = window.scrollY > 100 ? 0 : .5
        setOpacity(opacity)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    //opening fade in
    const navCTA = useRef(null)
    useEffect(() => {
        gsap.fromTo(navCTA.current, { opacity: 0 }, { opacity: .4, duration: .8, delay: 2.2 })
    }, [])

    return (
        <div id='nav'>
        <ul className={'nav-list'}><li>
            <p id="nav-cta" style={{ 'opacity': opacity }} ref={navCTA}>
            About
        </p></li>
            <li><p id="nav-cta" style={{ 'opacity': opacity }} ref={navCTA}>
            Contact
        </p></li>
        </ul>
        </div>
    )
}

export default Navbar