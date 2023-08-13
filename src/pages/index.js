import Image from "next/image";
import propertyTypes from "../../propertyType.json";
import { useEffect, useState } from "react";
import HotelCard from "@/components/HotelCard";
export default function Home({ propertyTypes }) {
  const [selectedProperty, setSelectedProperty] = useState({});
  const [allHotels, setAllHotels] = useState([])

  const getAllHotels = async()=>{
    const result = await fetch('https://dev.ghuddy.link/api/v1/open/hotels')
    const data = await result.json()
    setAllHotels(data)
  }

  useEffect(()=>{
    getAllHotels()
  },[])

  const getAllHotelsByPropertyType = async(property)=>{
    const formattedPropertyLabel = property.label.split(' ').length>1 ? property.label.split(' ').join('%20') : property.label
    const result = await fetch(`https://dev.ghuddy.link/api/v1/open/hotels?propertyType=${formattedPropertyLabel}`)
    const data = await result.json()
    setAllHotels(data)
  }

  const handleSelectedProperty = (property) => {
    if (selectedProperty?.label === property?.label) {
      setSelectedProperty({});
      getAllHotels()
    } else {
      setSelectedProperty(property);
      getAllHotelsByPropertyType(property)
    }
  };

  return (
    <div>
      <div className="flex gap-10">
        {propertyTypes.map((property) => (
          <button
            onClick={() => handleSelectedProperty(property)}
            className={`hover:text-yellow-400 ${
              selectedProperty.label === property.label && "text-yellow-400"
            }`}
            key={property.label}
          >
            <Image
              src={property.iconUrl}
              alt={property.label}
              width={30}
              height={30}
            ></Image>
            <div>{property.label}</div>
          </button>
        ))}
      </div>

      <div>
        {allHotels?.esHotelCardList?.map(hotel => <HotelCard key={hotel.property_name} hotel={hotel}></HotelCard>)}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      propertyTypes,
    },
  };
}
