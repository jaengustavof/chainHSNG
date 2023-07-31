import React, { useEffect } from 'react';
import './homestrengths.scss';
import {StrengthEffects} from './homestrengths.js';
import strengths from '../../assets/imgs/strenghs/strength.webp';

const HomeStrengths = () => {

    useEffect(()=> {

        StrengthEffects();

    }, []);

    return (
        <div id='home-strengths'>
            <div className='home-strengths_text'></div>
            <div className='home-strengths_img'>
                <img id='strenghtsImage' className='' src={strengths} alt=''/>
            </div>

            <div className='appContainer'>
                <div className='appContainer-left'>
                    <div id="strength-pre" className="separator"></div>
                    <h2 className='appContainer-left_heading'>You’re in good hands</h2>
                    <p className='appContainer-left_text'>Torquatos nostros? quos dolores eos, qui dolorem ipsum per se texit, ne ferae quidem se repellere, idque instituit docere sic: omne animal, simul atque integre iudicante itaque aiunt hanc quasi involuta aperiri, altera occulta quaedam et voluptatem accusantium doloremque.</p>
                    <div className='appContainer-left_button'>
                        <span>
                            Learn more 
                        </span>
                    </div>
                </div>
                <div className='appContainer-right'></div>
            </div>
        
        </div>
    );
}

export default HomeStrengths;
