import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SuccessStories() {
  const testimonials = [
    {
      quote:
        "Using Phronesis has transformed how we analyze CT scans. The speed and accuracy are unmatched!",
      author: "Dr. Joseph Bukenya",
      designation: "Radiologist, MedPro Health Solutions",
    },
    {
      quote:
        "The AI analysis has reduced our diagnosis time by 40%, allowing us to focus more on patient care.",
      author: "Dr. Sarah Kamya",
      designation: "Lead Physician, Global Health Initiative",
    },
    {
      quote:
        "Phronesis has made our workflow seamless and fast. I can access patient data and results in one place.",
      author: "Dr. Emily Wang",
      designation: "Head of Radiology, CareWell Clinics",
    },
    {
      quote:
        "Phronesis has transformed the way we diagnose scans. The AI's accuracy and speed have drastically improved our workflow.",
      author: "Dr. Joseph Bukenya",
      designation: "Radiologist, MedPro Health Solutions",
      rating: 5,
    },
    {
      quote:
        "The precision and efficiency of Phronesis AI have allowed us to save countless hours in diagnosis, leading to better patient outcomes.",
      author: "Dr. Sarah Kamya",
      designation: "Lead Physician, Global Health Initiative",
    },
    {
      quote:
        "Integrating AI into our radiology department has streamlined our workflow. Phronesis has been key to that transformation.",
      author: "Dr. Emily Wang",
      designation: "Head of Radiology, CareWell Clinics",
    },
  ];

  return (
    <section className="flex flex-col mt-14 lg:mt-36" id="testimonials">
      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-col">
          <h3 className=" font-semibold text-3xl">
            Customer experiences that speak volumes
          </h3>
        </div>
        <div className="flex justify-end items-center gap-3 p-4">
          <div className="prev rounded-full p-1 border border-[#CDCED7]">
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
            spaceBetween: 30,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} data-hash={`slide${index + 1}`}>
            <div className="flex flex-col gap-1  lg:min-h-[161px]  p-4 text-[#666666] rounded-[10px] border border-[#D4DAE6]">
              <div className="flex items-center gap-4 mt-3  ">
                <Avatar>
                  <AvatarImage src="/images/user-profile.jfif" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-base">{testimonial.author}</p>
                  <p className="text-sm text-primary italic">
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
