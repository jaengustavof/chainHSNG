import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../../context';
import './buyResults.scss';
import Beds from '../../../assets/icons/Bed.svg';
import Showers from '../../../assets/icons/Shower.svg';
import Size from '../../../assets/icons/Size.svg';


const BuyResults = () => {
    const [homeListing, setHomeListing] = useState();
    const {propertyList, setSelectedProperty} = useContext(Context);
    const navigate = useNavigate();
    
    const showDetails = (propertyId) => {
        setSelectedProperty(propertyId);
        navigate('/property');
    }
    const buildHomeListing = () => {
        
        let result = '';

        result = propertyList.map((property) =>(
            <div className='home-container' onClick={()=>showDetails(property)}>
                <img className='home-container_img' src={property.images[0]} alt='img-'/>
                <h3 className='home-container_title'>{property.name}</h3>
                <p className='home-container_location'>{property.location}</p>
                <div className='home-container_facilities'>
                    <div className='facilities-rooms'>
                        <img src={Beds} alt='Number of Beds'/>
                        <p className='facilities-rooms_beds'>{(property.rooms).toString()}</p>
                    </div>
                    <div className='facilities-baths'>
                        <img src={Showers} alt='Number of Baths'/>
                        <p className='facilities-rooms_showers'>{(property.baths).toString()}</p>
                    </div>
                    <div className='facilities-others'>
                    <img src={Size} alt='Number of Beds'/>
                        <p className='facilities-rooms_showers'>{(property.m2).toString()}</p>
                    </div>
                </div>
            </div>
        ));

        return result;
    }

    useEffect(() => {
        setHomeListing(buildHomeListing());
    }, [propertyList]);

    return (
        <div id='buy-results'> 
            {homeListing}
        </div>
    );
}

export default BuyResults;
