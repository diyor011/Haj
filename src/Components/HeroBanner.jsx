import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeroBanner = () => {
  const slides = [
    '/medina4.webp',
    '/Base-img-1.jpg',
    '/umrah2.webp',
  ];

  const [activeBackground, setActiveBackground] = useState(slides[0]);

  const handleHover = (index) => {
    setActiveBackground(slides[index]);
  };

  const handleSlideChange = (swiper) => {
    setActiveBackground(slides[swiper.realIndex]);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 z-0"
        style={{ backgroundImage: `url(${activeBackground})` }}
      ></div>

      {/* Swiper */}
      <Swiper
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        effect="fade"
        speed={1500}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        onSlideChange={handleSlideChange}
        className="absolute w-full h-full opacity-0 pointer-events-none z-0"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}></SwiperSlide>
        ))}
      </Swiper>

     
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/70 z-10"></div>

      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 z-20">
        <div className="flex gap-6 max-[588px]:flex-col max-[588px]:items-center">
          {["Madina AL Munavvara", "Makka", "Umra"].map((city, idx) => (
            <React.Fragment key={idx}>
              <div
                className="group relative cursor-pointer"
                onMouseEnter={() => handleHover(idx)}
              >
                <p className="text-[30px] max-[400px]:text-[25px] group-hover:text-yellow-400 transition-all duration-300">
                  {city}
                </p>
                <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></div>
              </div>
              {idx !== 2 && (
                <span className="text-[30px] max-[588px]:hidden">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HeroBanner;
