import React from 'react'
import { FeaturedProducts, Hero, Services, Contact } from '../components'
import Slider from '../reviews/Slider'

const HomePage = () => {


    return (
        <main>
            <Hero />
            <FeaturedProducts />
            <Slider />
            <Services />
            <Contact />
        </main>
    )


}

export default HomePage