import { useState } from 'react'
import './App.css'

export default function App () {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="container">
            <div className='app'>
                <NavBar/>
                <Main/>
                <Footer/>
            </div>
        </div>
    )
}

function NavBar () {
    return (
        <div className='nav-bar'>
            <div className='logo'>
                <p className='text-logo'>Meteora</p>
            </div>
            <input className='search' type='text' placeholder='Enter city name...'></input>
        </div>
    )
}

function Main () {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='main'>
            <div className='box'>
                <div className='left-box'>
                    <p className='text-today'>Tuesday</p>
                    <p className='text-current-date'>19 Jan 2024</p>
                    <p className='text-location'>Miercurea-Ciuc, Romania</p>
                </div>
                <div className='right-box'>
                    <img className='weather-icon-big' src='icon.jpeg'></img>
                    <p className='text-temperature'>29C</p>
                    <p className='text-condition'>Sunny</p>
                </div>                     
            </div>
            <div className='more-details-box'>
                <button className='btn-details' onClick={()=>setIsOpen(!isOpen)}>{!isOpen ? 'More' : 'Less'}</button>
                    {isOpen && (
                        <div className='more-details'>
                            <div className='details-feature-box'>
                                <p className='text-details'>Min temp:</p>
                                <p className='text-details'>-6C</p>
                            </div>
                            <div className='details-feature-box'>
                                <p className='text-details'>Max temp:</p>
                                <p className='text-details'>6C</p>
                            </div>
                            <div className='details-feature-box'>
                                <p className='text-details'>Humidity:</p>
                                <p className='text-details'>6%</p>
                            </div>
                            <div className='details-feature-box'>
                                <p className='text-details'>Precipitation:</p>
                                <p className='text-details'>25%</p>
                            </div>
                            <div className='details-feature-box'>
                                <p className='text-details'>Wind:</p>
                                <p className='text-details'>20 km/h</p>
                            </div>
                        </div>
                    )}
            </div>
            <div className='box'>
                <div className='forecast-box'>
                    <img className='icon' src='icon.jpg'></img>
                    <p className='text-location'>Tue</p>
                    <p className='text-current-date'>12C</p>     
                </div>
                <div className='forecast-box'>
                    <img className='icon' src='icon.jpg'></img>
                    <p className='text-location'>Tue</p>
                    <p className='text-current-date'>12C</p>     
                </div>
                <div className='forecast-box'>
                    <img className='icon' src='icon.jpg'></img>
                    <p className='text-location'>Tue</p>
                    <p className='text-current-date'>12C</p>     
                </div>
            
            </div>
            
        </div>
    )
}

function Footer () {
    return (
        <footer>
            <p>Copyright reserved to Stefan Petru-Cornel</p>
        </footer>
    )
}

function Box (children) {
    return (
        {children}
    )
}

function ForecastBox () {
    return (
        <div className='forecast-box'>
            <img className='icon' src='icon.jpg'></img>
            <p className='text-location'>Tue</p>
            <p className='text-current-date'>12C</p>     
        </div>
    )
}

function Logo () {
    return (
        <div className='logo'>
            <p className='text-logo'>Meteora</p>
        </div>
    )
}