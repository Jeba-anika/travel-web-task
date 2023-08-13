import Image from 'next/image';
import React from 'react';

const HotelCard = ({hotel}) => {
    const {property_name, display_facilities,discount_percent,black_price,images,short_address,red_price,} = hotel
    return (
        <div>
            <Image src={images[0]} alt={property_name} width={100} height={100}></Image>
        </div>
    );
};

export default HotelCard;