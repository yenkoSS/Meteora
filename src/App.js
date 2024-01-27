//https://api.weatherapi.com/v1/forecast.json?key=38c3d0784865490ba4d140655241101&q=Bucuresti&days=3&aqi=no&alerts=no//

import { useState } from 'react'
import './App.css'
import icon from './icon.jpg'

const data = [{ id: 1,
                location:'Miercurea Ciuc',
                country:'Romania',
                date: '2024-01-13',
                curr_temp: '10',
                condition: 'Sunny',
                min: '-6',
                max: '2',
                humidity: '40',
                precipitation: '10',
                wind: '80',
                icon: icon },

                {id: 2,
                location:'Miercurea Ciuc',
                country:'Romania',
                date: '2024-01-14',
                curr_temp: '12',
                condition: 'Cloudy',
                min: '-2',
                max: '4',
                humidity: '40',
                precipitation: '10',
                wind: '80',
                icon: icon},

                {id: 3,
                location:'Miercurea Ciuc',
                country:'Romania',
                date: '2024-01-15',
                curr_temp: '16',
                condition: 'Sunny',
                min: '3',
                max: '9',
                humidity: '40',
                precipitation: '10',
                wind: '80',
                icon: icon },
                            
    ]


export default function App () {

    const [firstDay, setFirstDay] = useState()
    const [secondDay, setSecondDay] = useState()
    const [thirdDay, setThirdDay] = useState()
    const [currentDay, setCurrentDay] = useState(firstDay)
 
    return (
        <div className="container">
            <div className='app'>
                <NavBar>
                    <Logo/>
                    <Search />
                </NavBar>
                <Main>
                    <Box>
                        <LeftBox />
                        <RightBox />
                    </Box>
                    <MoreDetailsBox />
                    <Box>    
                        <ForecastBox />
                        <ForecastBox /> 
                        <ForecastBox />              
                    </Box>
                </Main>
                <Footer/>
            </div>
        </div>
    )
}


function NavBar ({children}) {
    return (
        <div className='nav-bar'>
            {children}
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

function Search ({}) {
    return (
        <form >
            <input className='search' type='text' placeholder='Enter city name...'  ></input>
        </form>
        
    )
}

function Main ({children}) {

    return (
        <div className='main'>
            {children}  
        </div>
    )
}

function Box ({children}) {
    return (
        <div className='box'>
            {children}                     
        </div>
    )
}

function LeftBox ({}) {
    return (
        <div className='left-box'>
            <p className='text-today'></p>
            <p className='text-current-date'></p>
            <p className='text-location'></p>
        </div>
    )
}

function RightBox () {
    return (
        <div className='right-box'>
            <img className='weather-icon-big' src={icon}></img>
            <p className='text-temperature'></p>
            <p className='text-condition'></p>
        </div>
    )
}

function Footer () {
    return (
        <footer>
            <p className='text-footer'>Copyright reserved to Stefan Petru-Cornel</p>
        </footer>
    )
}


function MoreDetailsBox () {
    
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='more-details-box'>
            <button className='btn-details' onClick={()=>setIsOpen(!isOpen)}>{!isOpen ? 'More' : 'Less'}</button>
                {isOpen && (
                    <div className='more-details'>
                        <div className='details-feature-box'>
                            <p className='text-details'>Min temp:</p>
                            <p className='text-details'>{new Intl.NumberFormat('en-US', {style: 'unit', unit:'celsius'}).format()}</p>
                        </div>
                        <div className='details-feature-box'>
                            <p className='text-details'>Max temp:</p>
                            <p className='text-details'>{new Intl.NumberFormat('en-US', {style: 'unit', unit:'celsius'}).format()}</p>
                        </div>
                        <div className='details-feature-box'>
                            <p className='text-details'>Humidity:</p>
                            <p className='text-details'>{new Intl.NumberFormat('en-US', {style: 'unit', unit:'percent'}).format()}</p>
                        </div>
                        <div className='details-feature-box'>
                            <p className='text-details'>Precipitation:</p>
                            <p className='text-details'>{new Intl.NumberFormat('en-US', {style: 'unit', unit:'celsius'}).format()}</p>
                        </div>
                        <div className='details-feature-box'>
                            <p className='text-details'>Wind:</p>
                            <p className='text-details'>{new Intl.NumberFormat('en-US', {style: 'unit', unit:'kilometer-per-hour'}).format()}</p>
                        </div>
                    </div>
                )}
        </div>
    )
}

function ForecastBox ({forecastData, setCurrentDay}) {
    return (
        <div className='forecast-box'  onClick={()=>setCurrentDay(forecastData)}>
            <img className='icon' src='icon.jpg'></img>
            <p className='text-location'>{new Date().toLocaleDateString('en-EN', { weekday: 'short' })}</p>
            <p className='text-current-date'>{new Intl.NumberFormat('en-US', {style: 'unit', unit:'celsius'}).format()}</p>     
        </div>
    )
}