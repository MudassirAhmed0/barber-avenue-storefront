"use client";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import the Navigation module
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import { Star, StarHalf } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    profile: "https://randomuser.me/api/portraits/men/32.jpg",
    review: `
        <p>Working with this team was an absolute breeze. They quickly understood our goals and delivered a solution that exceeded expectations. Communication was clear and frequent, making us feel confident every step of the way.</p>
      `,
    name: "Jason Miller, Product Lead",
    location: "TechHive Solutions, Canada",
  },
  {
    profile: "https://randomuser.me/api/portraits/women/44.jpg",
    review: `
        <p>Excellent experience from start to finish! Their team demonstrated exceptional technical knowledge and attention to detail. They provided creative solutions to complex problems and always kept us in the loop.</p>
      `,
    name: "Emily Thompson, Head of Design",
    location: "PixelCraft Studio, UK",
  },
  {
    profile: "https://randomuser.me/api/portraits/men/76.jpg",
    review: `
        <p>They transformed our vague ideas into a polished, user-friendly product. Their flexibility and willingness to iterate based on feedback truly set them apart. Highly recommended for any ambitious project.</p>
      `,
    name: "Liam Chen, Co-Founder",
    location: "InnovateWorks, Singapore",
  },
  {
    profile: "https://randomuser.me/api/portraits/women/65.jpg",
    review: `
        <p>Our collaboration was seamless. Their team anticipated challenges and offered proactive solutions, saving us time and money. I’d gladly partner with them again for future initiatives.</p>
      `,
    name: "Sara Alvarez, Operations Director",
    location: "GlobalBridge Consulting, Spain",
  },
  {
    profile: "https://randomuser.me/api/portraits/men/21.jpg",
    review: `
        <p>Professional, responsive, and highly skilled. They took the time to understand our vision and delivered a final product that aligned perfectly with our brand. Truly a reliable partner in development.</p>
      `,
    name: "Oliver Becker, CEO",
    location: "NextGen Labs, Germany",
  },
  {
    profile: "https://randomuser.me/api/portraits/men/32.jpg",
    review: `
        <p>Working with this team was an absolute breeze. They quickly understood our goals and delivered a solution that exceeded expectations. Communication was clear and frequent, making us feel confident every step of the way.</p>
      `,
    name: "Jason Miller, Product Lead",
    location: "TechHive Solutions, Canada",
  },
  {
    profile: "https://randomuser.me/api/portraits/women/44.jpg",
    review: `
        <p>Excellent experience from start to finish! Their team demonstrated exceptional technical knowledge and attention to detail. They provided creative solutions to complex problems and always kept us in the loop.</p>
      `,
    name: "Emily Thompson, Head of Design",
    location: "PixelCraft Studio, UK",
  },
  {
    profile: "https://randomuser.me/api/portraits/men/76.jpg",
    review: `
        <p>They transformed our vague ideas into a polished, user-friendly product. Their flexibility and willingness to iterate based on feedback truly set them apart. Highly recommended for any ambitious project.</p>
      `,
    name: "Liam Chen, Co-Founder",
    location: "InnovateWorks, Singapore",
  },
  {
    profile: "https://randomuser.me/api/portraits/women/65.jpg",
    review: `
        <p>Our collaboration was seamless. Their team anticipated challenges and offered proactive solutions, saving us time and money. I’d gladly partner with them again for future initiatives.</p>
      `,
    name: "Sara Alvarez, Operations Director",
    location: "GlobalBridge Consulting, Spain",
  },
  {
    profile: "https://randomuser.me/api/portraits/men/21.jpg",
    review: `
        <p>Professional, responsive, and highly skilled. They took the time to understand our vision and delivered a final product that aligned perfectly with our brand. Truly a reliable partner in development.</p>
      `,
    name: "Oliver Becker, CEO",
    location: "NextGen Labs, Germany",
  },
];

export default function Testimonials() {
  return (
    <section className="lg:py-[length:var(--vw180)] py-[60px] sm:py-[120px]">
      <div className="myContainer flex flex-col justify-center items-center flex-wrap">
        <div className="flex flex-col items-center text-center lg:gap-y-[length:var(--vw20)] gap-y-4 lg:w-3/6">
          <h2 className="text55">Testimonials</h2>
        </div>
      </div>
      <div className="home_testimonials_swiper relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          centeredSlides={true}
          loop={true}
          autoplay={{ disableOnInteraction: false }}
          grabCursor={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          slidesPerView={"auto"}
          spaceBetween={20}
          className="lg:my-[length:var(--vw60)] my-10 swiper mySwiper !w-full"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="swiper-slide lg:!w-1/4 !w-[85%] !h-auto"
            >
              <div className="flex items-start flex-col lg:gap-y-[length:var(--vw20)] gap-y-4 h-full select-none border border-black lg:rounded-[length:var(--vw40)] rounded-[20px] bg-white lg:p-[length:var(--vw30)] p-4">
                <BiSolidQuoteAltLeft size={"30"} className="text-[color:var(--color-green)]" />
                <div
                  dangerouslySetInnerHTML={{ __html: testimonial.review }}
                  className="lg:text18 mtext18 font-medium"
                ></div>
                <div className="flex justify-start items-center lg:gap-x-[length:var(--vw16)] gap-x-4 border border-black lg:px-[length:var(--vw20)] lg:py-[length:var(--vw10)] px-4 py-2 rounded-[20px] lg:rounded-[length:var(--vw20)] mt-auto">
                  <div className="lg:size-[length:var(--vw50)] size-10 rounded-full overflow-hidden relative">
                    <Image
                      src={testimonial.profile}
                      alt="avatar"
                      fill
                      className="object-contain size-full"
                      unoptimized
                    />
                  </div>
                  <div className="flex justify-start items-start flex-col">
                    <p className="lg:text16 mtext16 font-medium line-clamp-1">
                      {testimonial.name}
                    </p>
                    <div className="flex items-center gap-1">
                      {/* 2 full */}
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                      {/* 1 half */}
                      <StarHalf className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                      {/* 2 empty */}
                      <Star className="h-5 w-5 text-gray-300" />
                      <Star className="h-5 w-5 text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons */}
        <div className="flex justify-center items-center space-x-6 w-full mt-8">
          <button className="rounded-full !p-0 flex justify-center items-center bg-[color:var(--color-green)] swiper-button-prev w-10 h-10">
            <Image
              className="lg:size-[length:var(--vw30)] w-6 h-6 scale-x-[-1]"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonials_7_svg-6_next.svg"
              alt="prev"
              width={24}
              height={24}
              unoptimized
            />
          </button>
          <button className="rounded-full !p-0 flex justify-center items-center bg-[color:var(--color-green)] swiper-button-next w-10 h-10">
            <Image
              className="lg:size-[length:var(--vw30)] w-6 h-6"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonials_7_svg-6_next.svg"
              alt="next"
              width={24}
              height={24}
              unoptimized
            />
          </button>
        </div>

        <style jsx global>{`
        .swiper-button-next::after,
        .swiper-button-prev::after {
            content: "";
        }
        .swiper-button-lock{
            display:block
        }
        `}</style>
      </div>
    </section>
  );
}
