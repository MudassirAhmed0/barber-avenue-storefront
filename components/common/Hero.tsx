"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Image from "next/image";
import StandardBtn from "./link-buttons/StandardBtn";

const Hero = () => {
  const heroSlides = [
    {
      title: "Street Born.Barber Raised",
      subtitle: "Street Born. Barber Raised.",
      image: "/images/home/hero/1.jpg",
    },
    {
      title: "Street Born.Barber Raised",
      subtitle: "Street Born. Barber Raised.",
      image: "/images/home/hero/2.jpg",
    },
    {
      title: "Street Born.Barber Raised",
      subtitle: "Street Born. Barber Raised.",
      image: "/images/home/hero/3.jpg",
    },
    {
      title: "Street Born.Barber Raised",
      subtitle: "Street Born. Barber Raised.",
      image: "/images/home/hero/4.jpg",
    },
    {
      title: "Street Born.Barber Raised",
      subtitle: "Street Born. Barber Raised.",
      image: "/images/home/hero/5.jpg",
    },
  ];

  return (
    <section className="fullVh fullSvh relative lg:pt-[19vh] lg:pb-[10.5555555556vh] pt-36 sm:pt-[200px] pb-[60px] sm:pb-[120px]">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={800}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="atlwh_Full !absolute z-[2] w-full top-0 left-0 h-full"
      >
        {heroSlides.map((heroSlide, index) => (
          <SwiperSlide
            key={index}
            className="atlwh_Full !flex items-center !justify-center relative"
          >
            <div className="atlwh_Full">
              <Image
                fill
                alt={heroSlide.subtitle}
                src={heroSlide.image}
                className="object-cover w-full h-full absolute top-0 left-0"
              />
            </div>
            <span className="atlwh_Full bg-black/50 absolute top-0 left-0 w-full h-full"></span>

            <div className="relative z-[2] flex flex-col lg:gap-y-[length:var(--vw20)] gap-y-4 items-center text-center myContainer">
              <h1 className="lg:text-[length:var(--vw80)] lg:leading-[length:var(--vw90)] text55 text-white">
                {heroSlide.title}
              </h1>
              <StandardBtn link={"/"} text={"shop now"} greenVersion />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;

