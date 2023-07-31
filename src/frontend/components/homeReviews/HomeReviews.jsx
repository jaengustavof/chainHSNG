import React, {useEffect} from 'react';
import './homeReviews.scss';
import review1 from '../../assets/imgs/testImages/reviews/review1-transformed .webp';
import review2 from '../../assets/imgs/testImages/reviews/review2-transformed.webp';
import review3 from '../../assets/imgs/testImages/reviews/review3-transformed.webp';
import {ReviewsEffects} from './homeReviews.js';


const HomeReviews = () => {

    useEffect(() => {
        ReviewsEffects();
    }, []);

    return (

        <section id='reviews'>
            <div className='appContainer'>
                <h3 className='reviews-heading'>Empowering Success Stories</h3>
                
                <div className='carousel-container'>
                    <div className='reviews-carousel'>
                        <div className='reviews-carrusel_message'>
                            <p className='message-text'>“Certe, inquam, pertinax non existimant oportere exquisitis rationibus conquisitis de quo enim ipsam. Torquem detraxit hosti et quidem faciunt, ut aut.”</p>
                            <div className='message-info'>
                                <img src={review1} className='message-info_img' alt=''/>
                                <div className='message-info_client'>
                                    <h5 className='client-name'>Peter McNamara</h5>
                                    <p className='client-status'>Client</p>
                                </div>
                            </div>
                        </div> 

                        <div className='reviews-carrusel_message'>
                            <p className='message-text'>“Certe, inquam, pertinax non existimant oportere exquisitis rationibus conquisitis de quo enim ipsam. Torquem detraxit hosti et quidem faciunt, ut aut.”</p>
                            <div className='message-info'>
                                <img src={review3} className='message-info_img' alt=''/>
                                <div className='message-info_client'>
                                    <h5 className='client-name'>Peter McNamara</h5>
                                    <p className='client-status'>Client</p>
                                </div>
                            </div>
                        </div>   
                        <div className='reviews-carrusel_message'>
                            <p className='message-text'>“Certe, inquam, pertinax non existimant oportere exquisitis rationibus conquisitis de quo enim ipsam. Torquem detraxit hosti et quidem faciunt, ut aut.”</p>
                            <div className='message-info'>
                                <img src={review2} className='message-info_img' alt=''/>
                                <div className='message-info_client'>
                                    <h5 className='client-name'>Peter McNamara</h5>
                                    <p className='client-status'>Client</p>
                                </div>
                            </div>
                        </div>     
                        <div className='reviews-carrusel_message'>
                            <p className='message-text'>“Certe, inquam, pertinax non existimant oportere exquisitis rationibus conquisitis de quo enim ipsam. Torquem detraxit hosti et quidem faciunt, ut aut.”</p>
                            <div className='message-info'>
                                <img src={review1} className='message-info_img' alt=''/>
                                <div className='message-info_client'>
                                    <h5 className='client-name'>Peter McNamara</h5>
                                    <p className='client-status'>Client</p>
                                </div>
                            </div>
                        </div>  
                        <div className='reviews-carrusel_message'>
                            <p className='message-text'>“Certe, inquam, pertinax non existimant oportere exquisitis rationibus conquisitis de quo enim ipsam. Torquem detraxit hosti et quidem faciunt, ut aut.”</p>
                            <div className='message-info'>
                                <img src={review1} className='message-info_img' alt=''/>
                                <div className='message-info_client'>
                                    <h5 className='client-name'>Peter McNamara</h5>
                                    <p className='client-status'>Client</p>
                                </div>
                            </div>
                        </div>  
                        <div className='reviews-carrusel_message'>
                            <p className='message-text'>“Certe, inquam, pertinax non existimant oportere exquisitis rationibus conquisitis de quo enim ipsam. Torquem detraxit hosti et quidem faciunt, ut aut.”</p>
                            <div className='message-info'>
                                <img src={review1} className='message-info_img' alt=''/>
                                <div className='message-info_client'>
                                    <h5 className='client-name'>Peter McNamara</h5>
                                    <p className='client-status'>Client</p>
                                </div>
                            </div>
                        </div>  
                        <div className='reviews-carrusel_message'>
                            <p className='message-text'>“Certe, inquam, pertinax non existimant oportere exquisitis rationibus conquisitis de quo enim ipsam. Torquem detraxit hosti et quidem faciunt, ut aut.”</p>
                            <div className='message-info'>
                                <img src={review1} className='message-info_img' alt=''/>
                                <div className='message-info_client'>
                                    <h5 className='client-name'>Peter McNamara</h5>
                                    <p className='client-status'>Client</p>
                                </div>
                            </div>
                        </div> 
                        <div className='reviews-carrusel_message'>
                            <p className='message-text'>“Certe, inquam, pertinax non existimant oportere exquisitis rationibus conquisitis de quo enim ipsam. Torquem detraxit hosti et quidem faciunt, ut aut.”</p>
                            <div className='message-info'>
                                <img src={review1} className='message-info_img' alt=''/>
                                <div className='message-info_client'>
                                    <h5 className='client-name'>Peter McNamara</h5>
                                    <p className='client-status'>Client</p>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                <div className='carousel-controls'>
                    <div className='carousel-controls_pagination'>
                        <div className='page'></div>
                        <div className='page'></div>
                        <div className='page'></div>
                    </div>
                </div>
            </div>
        </section>
        
    );
}

export default HomeReviews;
