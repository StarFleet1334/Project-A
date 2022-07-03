import React from 'react'
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import {
    Home,
    Products,
    SinglProduct,
    About,
    Cart,
    Error,
    Checkout,
    PrivateRoute,
    Contact
} from './pages'

import ChatBot from './chat-system/ChatBot'
import AuthWrapper from './pages/AuthWrapper'

function App() {
    return (
        <AuthWrapper >
            <Router>
                <Navbar />
                <Sidebar />
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/products' element={<Products />}></Route>
                    <Route path='/products/:id' element={<SinglProduct />}></Route>
                    <Route path='/about' element={<About />}></Route>
                    <Route path='/cart' element={<Cart />}></Route>
                    <Route exact path='/checkout' element={<Checkout />}></Route>
                    <Route path='/*' element={<Error />}></Route>
                    <Route path='/contact-us' element={<Contact />}></Route>
                </Routes>
                <ChatBot />
                <Footer />
            </Router>
        </AuthWrapper>
    )
}

export default App