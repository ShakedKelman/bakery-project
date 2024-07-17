import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home'
import ContactForm from '../ContactForm'
import Menu from '../Menu'
import OrderList from '../OrderList'

const SiteRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/contact' element={<ContactForm />} />
                <Route path='/' element={<Home />} />
                <Route path='/orders' element={<OrderList />} /> {/* Route for displaying OrderList */}
                <Route path='/menu' element={<Menu />} />
            </Routes>
        </div>
    )
}

export default SiteRoutes