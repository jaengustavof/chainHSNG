import React from 'react';
import './footer.scss';
import Logo from '../../assets/imgs/logo.svg';
import Facebook from '../../assets/icons/social/001-facebook.svg';
import Twitter from '../../assets/icons/social/003-twitter.svg';
import Instagram from '../../assets/icons/social/004-instagram.svg';

const Footer = () => {
    return (
        <footer>
            <div className='appContainer'>
                <section className='footer-header'>
                    <h2 className='footer-header_title'>Make your dreams a <span className='footer-header_title-span'>reality</span></h2>
                    <div className='work-with-us'>
                        <span>Work with us</span>
                    </div>
                </section>
                <hr className='separator'/>
                <section className='footer-links'>
                    <div className='footer-links_social'>
                        <div className='logo'><img src={Logo} alt="fake log" height='65px' /></div>
                        <div className='icons-container'>
                            <img src={Facebook} alt="fake log" height='20px' />
                            <img src={Twitter} alt="fake log" height='20px' />
                            <img src={Instagram} alt="fake log" height='20px' />
                        </div>
                    </div>
                    <div className='footer-links_columns'>
                        <p className='columns-heading'>Column Heading</p>
                        <p className='columns-link'>Column Link</p>
                        <p className='columns-link'>Column Link</p>
                        <p className='columns-link'>Column Link</p>
                    </div>
                    <div className='footer-links_columns'>
                        <p className='columns-heading'>Column Heading</p>
                        <p className='columns-link'>Column Link</p>
                        <p className='columns-link'>Column Link</p>
                        <p className='columns-link'>Column Link</p>
                    </div>
                    <div className='footer-links_columns'>
                        <p className='columns-heading'>Column Heading</p>
                        <p className='columns-link'>Column Link</p>
                        <p className='columns-link'>Column Link</p>
                        <p className='columns-link'>Column Link</p>
                    </div>
                </section>
            </div>
        </footer>
    );
}

export default Footer;
