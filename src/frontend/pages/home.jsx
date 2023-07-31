import React from 'react';
import Header from '../components/header/Header';
import About from '../components/homeAbout/About';
import HomeListing from '../components/homeListing/HomeListing';
import HomeStrengths from '../components/homeStrenghts/HomeStrengths';
import HomeWhyUs from '../components/homeWhyUs/HomeWhyUs';
import HomeReviews from '../components/homeReviews/HomeReviews';

const Home = ({ chainHousing }) => {

    
    return (
        <>
            <Header></Header>
            <About></About>
            <HomeListing></HomeListing>
            <HomeStrengths></HomeStrengths>
            <HomeWhyUs></HomeWhyUs>
            <HomeReviews></HomeReviews>
            
           
    
        </>
    );
}

export default Home;
