import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import 'swiper/css';
import 'swiper/css/navigation';

export default function SuccessStories() {
  const testimonials = [
    {
      quote:
      "Switching to Alfasente streamlined our payroll process. Payments are now fast, accurate, and stress-free!",
         author: "John Kitende",
      designation: "CFO, XYZ Corp",
    },
    {
      quote:"Alfasente has saved us hours every month. The seamless integration with our accounts is a game-changer!",
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
      designation: "CFO, XYZ Corp",
    },
    {
      quote:"Alfasente has saved us hours every month. The seamless integration with our accounts is a game-changer!",
      author: " Sarah Kamya",
      designation: " Finance Director, ABC Enterprises",
    },
    {
      quote:
        "Security is a top priority, and Alfasente’s encryption ensures complete confidence in every transaction.",
      author: "Emily Wang",
      designation: "Head of Operations, GreenTech",
    },
  ];

  return (
    <section className="flex flex-col mt-14 lg:mt-20 px-[4vw]" id="testimonials">
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col">
          <h3 className=" font-medium text-3xl">
            Customer experiences that speak volumes
          </h3>
        </div>
        <div className="flex justify-end items-center gap-3 p-4">
          <div className="prev rounded-full p-1 border border-[#D4DAE6] ">
            <ArrowLeft className="h-5 w-5 text-black" />
          </div>
          <div className="next rounded-full p-1 border border-[#CDCED7]">
            <ArrowRight className="h-5 w-5 text-black" />
          </div>
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
        modules={[Navigation]}
        className="w-full  "
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
            spaceBetween: 10,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} data-hash={`slide${index + 1}`}>
            <div className="flex flex-col gap-1  lg:min-h-[150px]  p-2 text-[#666666] rounded-[10px] border border-[#D4DAE6] hover:bg-[#F7F9FD]">
              <div className="flex items-center gap-4 mt-2  ">
                <Avatar>
                  <AvatarImage src="/images/user-profile.jfif" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-base">{testimonial.author}</p>
                  <p className="text-sm text-[#5C6474] ">
                    {testimonial.designation}
                  </p>
                </div>
              </div>
              <p className="font-bold text-[15px]">{testimonial.quote}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
