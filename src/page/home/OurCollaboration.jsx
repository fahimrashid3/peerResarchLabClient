import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import SectionTitle from "../../components/SectionTitle";

const OurCollaboration = () => {
  const [collaborators, setCollaborators] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axiosPublic.get("/collaborations", {
          signal: controller.signal,
        });
        setCollaborators(res.data);
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.error("Error fetching collaborations:", error);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [axiosPublic]);
  return (
    <div className="my-12">
      <SectionTitle
        heading="Collaborators"
        subHeading="Our Collaboration Partners"
      />

      <Swiper
        spaceBetween={30}
        slidesPerView={5}
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
            <div className="bg-dark-200 rounded-xl h-24 flex items-center justify-center p-4 shadow-md">
              <img
                src={item.logo}
                alt={item.name}
                className="h-16 object-contain"
              />
              {/* <p>{item.name}</p> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OurCollaboration;
