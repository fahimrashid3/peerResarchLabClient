import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import img1 from "../../assets/home/1.jpg";
import img2 from "../../assets/home/2.jpg";
import img3 from "../../assets/home/3.jpg";
import img4 from "../../assets/home/4.jpg";
import img5 from "../../assets/home/5.jpg";

const Carousel = () => {
  return (
    <div className="mb-12 md:mb-20 ">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper  "
      >
        <SwiperSlide>
          <img
            src={img1}
            className="mx-auto rounded-xl w-full md:max-h-screen"
            alt="Carousel"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img2}
            className="mx-auto rounded-xl w-full md:max-h-screen"
            alt="Carousel"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img3}
            className="mx-auto rounded-xl w-full md:max-h-screen"
            alt="Carousel"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img4}
            className="mx-auto rounded-xl w-full md:max-h-screen"
            alt="Carousel"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={img5}
            className="mx-auto rounded-xl w-full md:max-h-screen"
            alt="Carousel"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
