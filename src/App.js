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

    const [firstDay, setFirstDay] = useState(data[0])
    const [secondDay, setSecondDay] = useState(data[1])
    const [thirdDay, setThirdDay] = useState(data[2])
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
                        <LeftBox currentData={currentDay}/>
                        <RightBox currentData={currentDay}/>
                    </Box>
                    <MoreDetailsBox currentData={currentDay}/>
                    <Box>    
                        <ForecastBox forecastData={firstDay} setCurrentDay={setCurrentDay}/>
                        <ForecastBox forecastData={secondDay} setCurrentDay={setCurrentDay}/> 
                        <ForecastBox forecastData={thirdDay} setCurrentDay={setCurrentDay}/>              
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

function Search () {
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

function LeftBox ({currentData}) {
    return (
        <div className='left-box'>
            <p className='text-today'>{new Date(currentData.date).toLocaleDateString('en-EN', { weekday: 'long' })}</p>
            <p className='text-current-date'>{currentData.date}</p>
            <p className='text-location'>{currentData.location}</p>
        </div>
    )
}

function RightBox ({currentData}) {
    return (
        <div className='right-box'>
            <img className='weather-icon-big' src={currentData.icon}></img>
            <p className='text-temperature'>{new Intl.NumberFormat('en-US', {style: 'unit', unit: 'celsius'}).format(currentData.curr_temp)}</p>
            <p className='text-condition'>{currentData.condition}</p>
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


function MoreDetailsBox ({currentData}) {
    
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='more-details-box'>
            <button className='btn-details' onClick={()=>setIsOpen(!isOpen)}>{!isOpen ? 'More' : 'Less'}</button>
                {isOpen && (
                    <div className='more-details'>
                        <div className='details-feature-box'>
                            <p className='text-details'>Min temp:</p>
                            <p className='text-details'>{new Intl.NumberFormat('en-US', {style: 'unit', unit:'celsius'}).format(currentData.min)}</p>
                        </div>
                        <div className='details-feature-box'>
                            <p className='text-details'>Max temp:</p>
                            <p className='text-details'>{new Intl.NumberFormat('en-US', {style: 'unit', unit:'celsius'}).format(currentData.max)}</p>
                        </div>
                        <div className='details-feature-box'>
                            <p className='text-details'>Humidity:</p>
                            <p className='text-details'>{new Intl.NumberFormat('en-US', {style: 'unit', unit:'percent'}).format(currentData.humidity)}</p>
                        </div>
                        <div className='details-feature-box'>
                            <p className='text-details'>Precipitation:</p>
                            <p className='text-details'>{new Intl.NumberFormat('en-US', {style: 'unit', unit:'percent'}).format(currentData.precipitation)}</p>
                        </div>
                        <div className='details-feature-box'>
                            <p className='text-details'>Wind:</p>
                            <p className='text-details'>{new Intl.NumberFormat('en-US', {style: 'unit', unit:'kilometer-per-hour'}).format(currentData.wind)}</p>
                        </div>
                    </div>
                )}
        </div>
    )
}

function ForecastBox ({forecastData, setCurrentDay}) {
    return (
        <div className='forecast-box' onClick={()=>setCurrentDay(forecastData)}>
            <img className='icon' src={icon}></img>
            <p className='text-location'>{new Date(forecastData.date).toLocaleDateString('en-EN', { weekday: 'short' })}</p>
            <p className='text-current-date'>{new Intl.NumberFormat('en-US', {style: 'unit', unit:'celsius'}).format(forecastData.curr_temp)}</p>     
        </div>
    )
}