import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import SectionTitle from "../../components/SectionTitle";
import useFetchData from "../../hooks/useFetchData";

const OurCollaboration = () => {
  const [collaborators, isLoading] = useFetchData(
    "/collaborations",
    "collaborations"
  );

  return (
    <div className="my-12">
      <SectionTitle
        heading="Collaborators"
        subHeading="Our Collaboration Partners"
      />

      <div className="bg-dark-300 dark:bg-gray-900 rounded-xl py-5 max-w-[95%] md:max-w-[90%] lg:max-w-[85%] mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <p className="text-gray-500">Loading collaborators...</p>
          </div>
        ) : collaborators?.length > 0 ? (
          <Swiper
            spaceBetween={30}
            slidesPerView={2}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
            }}
            slidesPerGroup={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={collaborators.length > 5}
            modules={[Autoplay]}
            className="px-4"
          >
            {collaborators.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gray-100 dark:bg-gray-950 rounded-xl h-24 flex items-center justify-center p-4 shadow-md">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="h-16 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://res.cloudinary.com/dipwayvsu/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1745146763/uauic3zxcvxvdepwl3dk.webp";
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex justify-center items-center h-24">
            <p className="text-gray-500 dark:text-gray-300">
              No collaborators found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurCollaboration;
