import React, {useState} from 'react';
import './buyContainer.scss';
import BuyFilters from './buyFilters/buyFilters'
import BuyResults from './buyResults/buyResults';

const BuyContainer = () => {

    return (
        <main id='buy-section'>
            <BuyFilters/>
            <section className='buy-section-results'>
            <BuyResults/>
            </section>
        </main>
    );
}

export default BuyContainer;
