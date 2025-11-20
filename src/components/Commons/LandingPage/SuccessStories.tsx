import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "swiper/swiper-bundle.css";
import { useState } from "react";

export default function SuccessStories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Switching to Alfasente streamlined our payroll process. Payments are now fast, accurate, and stress-free!",
      author: "John Kitende",
      designation: "CFO, XYZ Corp",
    },
    {
      quote:
        "Alfasente has saved us hours every month. The seamless integration with our accounts is a game-changer!",
      author: " Sarah Kamya",
      designation: " Finance Director, ABC Enterprises",
    },
    {
      quote:
        "Security is a top priority, and Alfasente’s encryption ensures complete confidence in every transaction.",
      author: "Emily Wang",
      designation: "Head of Operations, GreenTech",
    },
    {
      quote:
        "Switching to Alfasente streamlined our payroll process. Payments are now fast, accurate, and stress-free!",
      author: "John Kitende",
      designation: "CFO @ XYZ Corp",
    },
    {
      quote:
        "Alfasente has saved us hours every month. The seamless integration with our accounts is a game-changer!",
      author: " Sarah Kamya",
      designation: " Finance Director @ ABC Enterprises",
    },
    {
      quote:
        "Security is a top priority, and Alfasente’s encryption ensures complete confidence in every transaction.",
      author: "Emily Wang",
      designation: "Head of Operations @ GreenTech",
    },
  ];

  return (
    <section
      className="hidden flex-col mt-14 lg:mt-[98px] lg:px-[6.25vw] mx-4 xl:mx-0"
      id="testimonials"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col">
          <h3 className=" font-medium text-xl inline-block whitespace-normal break-words md:text-[42px] text-black/90">
            Customer experiences that speak volumes
          </h3>
        </div>
        <div className="flex justify-end items-center gap-3 py-4 ">
          <div
            className={`prev rounded-full p-1 flex justify-center items-center w-6 h-6 md:h-10 md:w-10 border  ${
              currentIndex === 0
                ? "bg-[white] border-[#C8CFDE] text-[#1B2029]"
                : "bg-[#E59339] border-none text-white"
            } `}
          >
            <ChevronLeft className="h-6 w-6 " />
          </div>
          <div
            className={`next rounded-full p-1 h-6 w-6 md:w-10 md:h-10 border flex justify-center items-center  border-[#CDCED7] ${
              currentIndex !== 0
                ? "bg-[white] border-[#C8CFDE] text-[#1B2029]"
                : "bg-[#E59339] text-white border-none"
            }`}
          >
            <ChevronRight className={`h-6 w-6 `} />
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={22}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
        modules={[Navigation]}
        className="w-full "
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} data-hash={`slide${index + 1}`}>
            <div className="flex flex-col gap-4  lg:min-h-[152px]  px-5 py-4 text-[#666666] rounded-[10px] border border-[#D4DAE6] hover:bg-[#8D35AA] hover:border-none">
              <div className="flex items-center gap-[14px] mt-2  ">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/images/user.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-black/80 text-base ">
                    {testimonial.author}
                  </p>
                  <p className="text-sm font-normal text-[#5C6474] ">
                    {testimonial.designation}
                  </p>
                </div>
              </div>
              <p className="font-normal text-[17px] leading-[22px] text-black/60">
                "{testimonial.quote}"
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
