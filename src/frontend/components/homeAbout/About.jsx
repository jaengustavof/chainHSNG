import React, {useEffect} from 'react';
import './abount.scss';
import trust from '../../assets/imgs/about/trust.webp';
import {AboutEffects} from './about.js'

const About = () => {

    useEffect(() => {

        AboutEffects();
    }, []);


    return (
        <div id='about-container'>
            <div className='image-container' >
                <img src={trust} alt='trust us' className='image-container_img' id='aboutImage'/>
            </div>
            <div className='text-container'>
                <div className='appContainer'>
                    <div className='text-container-info'>
                        <div className='text-container-info_pre' id='pre'></div>
                        <h2 className='text-container-info_heading'>You’re in good hands</h2>
                        <p className='text-container-info_text'>Torquatos nostros? quos dolores eos, qui dolorem ipsum per se texit, ne ferae quidem se repellere, idque instituit docere sic: omne animal, simul atque integre iudicante itaque aiunt hanc quasi involuta aperiri, altera occulta quaedam et voluptatem accusantium doloremque.</p>
                        <div className='text-container-info_button'>
                            <span>
                               Learn more 
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
