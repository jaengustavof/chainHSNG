import React from 'react';
import './homeWhyUs.scss';
import forbes from '../../assets/icons/press/forbes.png';
import bloomberg from '../../assets/icons/press/bloomberg.png';
import entrepreneur from '../../assets/icons/press/entrepreneur.png';
import nbc from '../../assets/icons/press/nbc.png';
import rg from '../../assets/icons/press/rg.png';
import theEc from '../../assets/icons/press/the-economist.png';
import nyt from '../../assets/icons/press/nytimes.png';

const HomeWhyUs = () => {
    return (
        <div id='why-us'>
            <div className='appContainer'>
                <div className='separator'></div>
                <h2 className='whyUsHeading'>Our Company Makes Headlines</h2>
                <section className='pressContainer'>
                    <img className='pressContainer_icon bloom' src={bloomberg} alt='bloomberg' />
                    <img className='pressContainer_icon' src={entrepreneur} alt='entrepreneur' />
                    <img className='pressContainer_icon high' src={nbc} alt='nbc' />
                    <img className='pressContainer_icon high' src={rg} alt='rg' />
                    <img className='pressContainer_icon forbes' src={forbes} alt='forbes' />
                    <img className='pressContainer_icon high' src={theEc} alt='theEc' />
                    <img className='pressContainer_icon' src={nyt} alt='nyt' />
                </section>
            </div>
        </div>
    );
}

export default HomeWhyUs;
