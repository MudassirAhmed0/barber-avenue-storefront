"use client";
import useCarousel from "@/hooks/useCarousel";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoLogoInstagram } from "react-icons/io5";

const images = [
  {
    image: "/images/home/about/1.jpg",
  },
  {
    image: "/images/home/about/2.jpg",
  },
  {
    image: "/images/home/about/3.jpg",
  },
  {
    image: "/images/home/about/4.jpg",
  },
];

const About = () => {
  const { current } = useCarousel({ length: images?.length });
  return (
    <section className="relative lg:py-[length:var(--vw180)] py-[60px] sm:py-[120px]">
      <div className="flex flex-wrap items-center justify-center lg:gap-[length:var(--vw60)] gap-4 relative z-[2] myContainer">
        <div className="lg:w-[40%] lg:h-[30vw] w-full h-[300px] relative rounded-2xl overflow-hidden">
          {images?.map((item, index) => (
            <Image
              key={item.image}
              src={item.image}
              alt="about"
              fill
              className={`object-cover transition-opacity duration-1000 ease-in-out ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>
        <div className="lg:w-[40%] w-full flex flex-col items-start lg:gap-y-[length:var(--vw20)] gap-y-4">
          <h2 className="text55">About us</h2>

          <p className="text18">
            The Avenues brought us together — Barber Avenue is more than a
            brand; it’s a movement built for the community. Where barbering
            meets fashion. From tools and accessories to apparel and style,
            everything we create helps barbers and hustlers express themselves,
            elevate their craft, and turn opportunity into legacy.
          </p>
          <Link
            target="_blank"
            href={"https://www.instagram.com/barberavenuee/"}
            className="flex items-center gap-2 lg:p-[length:var(--vw12)] p-2 lg:rounded-[length:var(--vw12)] rounded-[12px] border border-black"
          >
            <div className="lg:bg-[color:var(--color-green)] rounded-full lg:p-[length:var(--vw12)]">
              <IoLogoInstagram className="lg:size-[length:var(--vw20)] size-5 lg:text-white" />
            </div>
            <span>BARBERAVENUEE</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
