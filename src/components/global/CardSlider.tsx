import { Swiper, SwiperSlide } from "swiper/react";
import Card, { CardSkeleton, SeeMoreCard, TProductCard } from "./Card";
import { LeftArrowIcon } from "../../assets/icons/Icons";
import { memo, useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";

function CardSlider({
  products,
  link,
}: {
  products: TProductCard[] | any;
  link?: string;
}) {
  const swiperRef = useRef<any>(null);
  return (
    <div className="relative flex items-center">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full"
        slidesPerView={1}
        spaceBetween={20}
        speed={450}
        breakpoints={{
          1500: { spaceBetween: 20, slidesPerView: 4.8 },
          1330: { spaceBetween: 20, slidesPerView: 4.2 },
          1200: { spaceBetween: 15, slidesPerView: 4 },
          1100: { spaceBetween: 10, slidesPerView: 3.7 },
          1000: { spaceBetween: 10, slidesPerView: 3.4 },
          900: { spaceBetween: 10, slidesPerView: 3 },
          800: { spaceBetween: 10, slidesPerView: 2.6 },
          700: { spaceBetween: 10, slidesPerView: 2.2 },
          650: { spaceBetween: 10, slidesPerView: 2.2 },
          560: { spaceBetween: 10, slidesPerView: 2 },
          510: { spaceBetween: 10, slidesPerView: 1.8 },
          480: { spaceBetween: 10, slidesPerView: 1.7 },
          450: { spaceBetween: 10, slidesPerView: 1.6 },
          420: { spaceBetween: 10, slidesPerView: 1.5 },
          400: { spaceBetween: 10, slidesPerView: 1.4 },
          370: { spaceBetween: 10, slidesPerView: 1.3 },
          340: { spaceBetween: 10, slidesPerView: 1.2 },
          310: { spaceBetween: 8, slidesPerView: 1.1 },
          9: { spaceBetween: 8, slidesPerView: 1 },
        }}
      >
        {products ? (
          <>
            {products.map((item: TProductCard) =>
              item.id !== -8 ? (
                <SwiperSlide key={item.id}>
                  <Card product={item} />
                </SwiperSlide>
              ) : link ? null : null
            )}
            {link ? (
              <SwiperSlide>
                <SeeMoreCard link={link} />
              </SwiperSlide>
            ) : null}
          </>
        ) : (
          <>
            <SwiperSlide>
              <CardSkeleton fixedWidth={true} />
            </SwiperSlide>
            <SwiperSlide>
              <CardSkeleton fixedWidth={true} />
            </SwiperSlide>
            <SwiperSlide>
              <CardSkeleton fixedWidth={true} />
            </SwiperSlide>
            <SwiperSlide>
              <CardSkeleton fixedWidth={true} />
            </SwiperSlide>
            <SwiperSlide>
              <CardSkeleton fixedWidth={true} />
            </SwiperSlide>
          </>
        )}
      </Swiper>
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="h-[50px] mobile:hidden aspect-square rounded-circle bg-whiteMain p-[15px] absolute z-[1] left-0 -translate-x-2/4 border-2 border-cardBorder transition-colors hover:bg-whiteHover"
      >
        <LeftArrowIcon className="h-full aspect-square" />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="h-[50px] mobile:hidden aspect-square rounded-circle bg-whiteMain p-[15px] absolute z-[1] right-0 translate-x-2/4 border-2 border-cardBorder transition-colors hover:bg-whiteHover"
      >
        <LeftArrowIcon className="h-full aspect-square rotate-180" />
      </button>
    </div>
  );
}

export default memo(CardSlider);
