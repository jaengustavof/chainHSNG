import React from 'react';
import './homelisting.scss';
import HomeListingFilters from '../homeListingFilters/HomeListingFilters';
import HomeListingResults from '../homeListingResults/HomeListingResults';



const HomeListing = () => {
    return (
        
        <section id='home-listing'>
            <div className='appContainer'>
                <div className='home-listing'>
                    <div className='home-listing-header'>
                        <div className='home-listing-header_pre'></div>
                        <h2 className='home-listing-header_heading'>Find your next place to live</h2>
                    </div>
                    <HomeListingFilters></HomeListingFilters>
                    <HomeListingResults></HomeListingResults>
                </div>
            </div>
        </section>
    );
}

export default HomeListing;
