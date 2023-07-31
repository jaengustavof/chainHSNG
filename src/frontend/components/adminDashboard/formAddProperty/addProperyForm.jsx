import { useForm } from "react-hook-form";
import './addPropertyForm.scss'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import Context from '../../../context';
import { useState, useEffect, useContext } from 'react';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { ethers } from "ethers";

const projectId = '*********';
const projectSecret = '*********';
const credentials = projectId + ':' + projectSecret;
const encodedCredentials = btoa(credentials);
const authHeader = 'Basic ' + encodedCredentials;
const client = ipfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: {
    authorization: authHeader}}); //nodo infura para conectar cliente IPFS

export default function AddPropertyForm({handleClose}) {

    const { chainHousing, contractBalance, setContractBalance, tokenBalance, setTokenBalance, propertyList, setPropertyList } = useContext(Context);
    const [image, setImage] = useState('');

    const schema = yup.object({

    name: yup.string().required(),
    location: yup.string().required(),
    image: yup.string().required(),
    baths: yup.number().positive().integer().required(),
    rooms: yup.number().positive().integer().required(),
    m2: yup.number().positive().integer().required(),
    price: yup.number().positive().integer().required(),

    }).required()

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema),
    });

    const uploadToIPFS = async (event) =>{
        event.preventDefault();
        const file = event.target.files[0];
        
        if(typeof file !== 'undefined') {
            try {
                const result = await client.add(file);
                console.log(result);
                setImage(`https://gustest.infura-ipfs.io/ipfs/${result.path}`);
                console.log(image)
            } catch (error) {
                console.log("ipfs image upload error: ", error);
                
            }
        }
    }

    const addProperty = async (data, image) =>{
        const {name, location, baths, rooms, m2, price} = data;
        await (await chainHousing.listProperty(name, location, image, baths, rooms, m2, price)).wait().then(getPropertiesId());
    }

    const getPropertiesId = async ()=>{
        const property = await chainHousing.getAllProperties();
        setPropertyList(property) ;
        handleClose()
    }
    const onSubmit = (data) => {
        addProperty(data,image);
    }

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)} className="add-property-form">

        <label>Property Name</label>
        <input type="text" placeholder="ei: Luxor Apt" {...register("name", { required: true })   }  />
        {errors.name && <span>This field is required</span>}

        <label>Property location</label>
        <input type="text" placeholder="ei: 842 Meridian Ave." {...register("location", { required: true })} />
        {errors.location && <span>This field is required</span>}

        <label>Property Image</label>
        <input type="file" placeholder="address of IPFS img" {...register("image", { required: true })} onChange={uploadToIPFS}/>
        {errors.image && <span>This field is required</span>}

        <div className="amenities-container">
            <div>
                <label>Baths</label>
                <input type="number" placeholder="ei: 2" {...register("baths", { required: true })} />
                {errors.baths && <span>This field is required</span>}
            </div>
            <div>
                <label>Rooms</label>
                <input type="number" placeholder="ei: 4" {...register("rooms", { required: true })} />
                {errors.rooms && <span>This field is required</span>}
            </div>
            <div>
                <label>M2</label>
                <input type="number" placeholder="ei: 120" {...register("m2", { required: true })} />
                {errors.m2 && <span>This field is required</span>}
            </div>
        </div> 
        
        <label>Property Price</label>
        <input type="number" placeholder="ei: 240000" {...register("price", { required: true })} />
        {errors.price && <span>This field is required</span>}

        <input type="submit" value="Add New Property"  className="add-property-form-button"/>
        </form>
    )
}