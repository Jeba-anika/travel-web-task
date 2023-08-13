import Image from "next/image";
import propertyTypes from "../../propertyType.json";
import { useEffect, useState } from "react";
import HotelCard from "@/components/HotelCard";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';



export default function Home({ propertyTypes }) {
  const [selectedProperty, setSelectedProperty] = useState({});
  const [allHotels, setAllHotels] = useState([])

  const getAllHotels = async () => {
    const result = await fetch('https://dev.ghuddy.link/api/v1/open/hotels')
    const data = await result.json()
    setAllHotels(data.esHotelCardList)
  }

  useEffect(() => {
    getAllHotels()
  }, [])

  const getAllHotelsByPropertyType = async (property) => {
    const formattedPropertyLabel = property.label.split(' ').length > 1 ? property.label.split(' ').join('%20') : property.label
    const result = await fetch(`https://dev.ghuddy.link/api/v1/open/hotels?propertyType=${formattedPropertyLabel}`)
    const data = await result.json()
    setAllHotels(data?.esHotelCardList)
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


  // const responsive = {
  //   superLargeDesktop: {
  //     // the naming can be any, depends on you.
  //     breakpoint: { max: 4000, min: 1281 },
  //     items: 5,
  //     partialVisibilityGutter: 50
  //   },
  //   desktop: {
  //     breakpoint: { max: 1280, min: 1024 },
  //     items: 3,
  //     partialVisibilityGutter: 50
  //   },
  //   tablet: {
  //     breakpoint: { max: 1023, min: 768 },
  //     items: 2,
  //     partialVisibilityGutter: 20
  //   },
  //   mobile: {
  //     breakpoint: { max: 767, min: 641 },
  //     items: 1,
  //     partialVisibilityGutter: 80
  //   },
  //   extraSmall: {
  //     breakpoint: {max: 640, min:0},
  //     items:1,
  //     partialVisibilityGutter:50
  //   }
  // };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      partialVisibilityGutter: 50
    },
    desktop: {
      breakpoint: { max: 3000, min: 1161 },
      items: 3,
      partialVisibilityGutter: 50
    },
    tablet: {
      breakpoint: { max: 1160, min: 671 },
      items: 2,
      partialVisibilityGutter: 20
    },
    mobile: {
      breakpoint: { max: 670, min: 401 },
      items: 1,
      partialVisibilityGutter: 80
    },
    extraSmall: {
      breakpoint: { max: 400, min: 0 },
      items: 1,
      partialVisibilityGutter: 50
    }
  };

  const customItemClass = 'w-[200px]'

  return (
    <div className="md:mx-20 lg:mx-20 xl:mx-36 sm:mx-8 mx-4 my-8">
      <div>
        <div className="flex gap-6 justify-center flex-wrap mb-8 text-xs text-center">
          {propertyTypes.map((property) => (
            <button
              onClick={() => handleSelectedProperty(property)}
              className={`hover:font-bold  ${selectedProperty.label === property.label && "font-bold"
                }`}
              key={property.label}
            >
              <Image
              className="mx-auto"
                src={property.iconUrl}
                alt={property.label}
                width={30}
                height={30}
              ></Image>
              <div>{property.label}</div>
            </button>
          ))}
        </div>

        {/* <div className="flex gap-2">
        {allHotels?.esHotelCardList?.map(hotel => <HotelCard key={hotel.property_name} hotel={hotel}></HotelCard>)}
      </div> */}

        <div >
          {
            allHotels.length > 0 ?
              <Carousel
                partialVisible={true}
                responsive={responsive}
              >
                {allHotels?.map(hotel => <HotelCard key={hotel.property_name} hotel={hotel}></HotelCard>)}
              </Carousel> : <div>No hotels to show</div>
          }
        </div>

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
