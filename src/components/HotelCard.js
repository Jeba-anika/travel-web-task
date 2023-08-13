import Image from 'next/image';
import React from 'react';
import { AiFillStar } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { FiHome } from "react-icons/fi";
import Carousel from 'react-multi-carousel';

const HotelCard = ({ hotel }) => {
    console.log(hotel)
    const { property_name, display_facilities, discount_percent, black_price, images, short_address, red_price, class_rating
    } = hotel

    const responsive = {
        allDevice: {
            breakpoint: { max: 4000, min: 0 },
            items: 1,
        }
    };
    return (
        <div className='w-[280px] h-[500px] rounded-lg shadow-xl'>
            <Carousel responsive={responsive}>
                {images.map(image => <Image key={image} className='max-h-[205px] min-h-[205px] rounded-t-lg' src={image} alt={property_name} width={280} height={205}></Image>)
                }
            </Carousel>
            <div className='p-4'>
                <div className='flex justify-between font-semibold mb-2'>
                    <h4 className='text-base'>{property_name}</h4>
                    <h4 className='flex '><AiFillStar className='text-yellow-500 w-6 h-6'></AiFillStar>{class_rating}</h4>
                </div>
                <div className='text-sm mb-2'><GrLocation className='mr-2 inline'></GrLocation>{short_address}</div>
                <div className='  text-sm  mb-2'><FiHome className='mr-2 inline' />< >{display_facilities.map((facility, index) => <span key={facility.name}>{facility?.name}{(display_facilities?.length - 1) !== index && <>,</>} </span>)}</></div>
                <div className='text-center text-sm'>Checkout Price:</div>
                <div className='text-center text-base'>{red_price.toFixed()} BDT  <del className='text-gray-500'>{black_price} BDT</del></div>
            </div>
        </div>
    );
};

export default HotelCard;