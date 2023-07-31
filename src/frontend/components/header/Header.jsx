import React, {useEffect} from 'react';
import './header.scss';
import { headerEffects } from './header';

const Header = () => {
    useEffect(() => {
        headerEffects(); 
    }, []);
    
    return (
        <header>
            <div className='appContainer'>

                <div id='header-container'>
                    <h1 className='header-title no-opacity' id='headerTitle'>Beautiful homes made for you</h1>
                    <p className='header-text no-opacity' id='headerText'>
                        Talented, team-oriented, and driven to help our agents succeed, we’re the team at Keller Williams. Headquartered in the heart of Texas, we’re lucky to call Austin home. Our agent-centric model combined with our proprietary technology makes us the only real estate company that offers customers the experience they want.
                    </p>

                </div>

            </div>
            <div className='see-listings'>
                <span>See all listings</span>
            </div>
        </header>
    );
}

export default Header;
