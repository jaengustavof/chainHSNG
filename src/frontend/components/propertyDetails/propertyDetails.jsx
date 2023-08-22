import React from 'react';
import './propertyDetails.scss'
import PropertyPurchaseForm from './propertyPurchaseForm/propertyPurchaseForm';
import TokenIcon from '@mui/icons-material/Token';
import Beds from '../../assets/icons/Bed.svg';
import Showers from '../../assets/icons/Shower.svg';
import Size from '../../assets/icons/Size.svg';
import Context from '../../context';
import { useEffect, useContext } from 'react';

const PropertyDetails = () => {

    const {selectedProperty} = useContext(Context);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <section id="prop-details" className='property-details'>
            <div className='property-details_header'>
                <div className='appContainer'>
                    <div className='header-info'>
                        <div className='header-info_title'>
                            <h2 className='title-heading'>{selectedProperty.name}</h2>
                            <p className='title-location'>{selectedProperty.location}</p>
                        </div>
                        <div className='header-info_price'>
                            <h2 className='price-tokens'><TokenIcon style={{fontSize: '40px'}}/>{(selectedProperty.price).toString()}</h2>
                            <p className='price-sqFt'><TokenIcon/> {((selectedProperty.price).toString() / (selectedProperty.m2).toString()).toFixed(2)} / m2</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='property-details_form-container'>
                <div className='appContainer'>
                    <div className='property-form-container'>
                        <div className='property-form-container_image'>
                            <img src={selectedProperty.images[0]} alt=''/>
                        </div>
                        <PropertyPurchaseForm/>
                    </div>
                </div>
            </div>
            {
                /*
                            <div className='property-details_text'>
                <div className='appContainer'>
                    <div className='details-container'>
                        <div className='details-title'>
                            <h5 className='title-header'>Details</h5>
                        </div>
                        <div className='details-ammenities'>
                            <div className='details-ammenities_icon'>
                                <img src={Beds} alt='bed-icon'/> <p className='icon-rooms'>4</p>
                            </div>
                            <div className='details-ammenities_icon'>
                                <img src={Showers} alt='bed-icon'/> <p className='icon-baths'>4</p>
                            </div>
                            <div className='details-ammenities_icon'>
                                <img src={Size} alt='bed-icon'/> <p className='icon-m2'>100</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                */
            }


            <div className='property-details_description'>
                <div className='appContainer'>
                    <div className='details-container'>
                        <div className='details-title'>
                            <h5 className='title-header'>Description</h5>
                        </div>
                        <div className='details-text'>
                            <p>At vero eos et iusto odio dignissimos ducimus, qui haec putat, ut ipsi auctori huius disciplinae placet: constituam, quid sit numeranda nec me ab illo inventore veritatis et expedita distinctio nam libero tempore, cum memoriter, tum etiam ac ratione.</p>

                            <p>Si sine metu degendae praesidia firmissima filium morte multavit si sine causa? quae fuerit causa, mox videro; interea hoc tenebo, si ob rem voluptas assumenda est, quid sit extremum et inter mediocrem animadversionem atque natum sit, a natura incorrupte.</p>

                            <p>Omne animal, simul atque in sanguinem suum tam inportuno tamque crudeli; sin, ut earum motus et accusamus et argumentandum et dolore suo sanciret militaris imperii disciplinam exercitumque in liberos atque haec ratio late patet in quo pertineant non possim.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PropertyDetails;
