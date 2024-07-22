import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import banner1 from "../../../assets/images/estates/banner1.webp";
import banner2 from "../../../assets/images/estates/banner2.webp";
import banner3 from "../../../assets/images/estates/banner3.webp";
import { Link } from "react-router-dom";
import { memo, useMemo, useState } from "react";

function MainSlider() {
  return (
    <Swiper
      modules={[EffectFade, Pagination, Autoplay]}
      effect={"fade"}
      pagination={{ clickable: true }}
      rewind
      autoplay={{ delay: 6000 }}
      className="w-full  "
    >
      <SwiperSlide>
        <MainSliderCard
          image={banner1}
          head=""
          desc=""
          link=""
          linkWhole="/AddProduct"
          button={false}
          opacity={false}
        />
      </SwiperSlide>
      <SwiperSlide>
        <MainSliderCard
          image={banner2}
          head=""
          desc=""
          link=""
          linkWhole="/"
          button={false}
          opacity={false}
        />
      </SwiperSlide>
      <SwiperSlide>
        <MainSliderCard
          image={banner3}
          head=""
          desc=""
          link=""
          linkWhole="/AdsMake"
          button={false}
          opacity={false}
        />
      </SwiperSlide>
    </Swiper>
  );
}
type TMainSliderCard = {
  image: string;
  head: string;
  desc: string;
  link: string;
  opacity: boolean;
  button: boolean;
  linkWhole?: string;
};
function MainSliderCard(props: TMainSliderCard) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const imageElement = useMemo(() => {
    return (
      <img
        src={props.image}
        onLoad={() => {
          setLoaded(true);
        }}
        className=" z-[1] max-h-[380px] max-w-[1390px] absolute h-full w-full object-cover top-0 left-0 object-[center_center]"
        alt="OnHome Slider Banner"
      />
    );
  }, []);

  return (
    <div
      className="w-full h-[380px]  bg-bodyBg
    large:h-[330px]
      mediumSmall:h-[270px]
      mediumSmallXl:h-[245px]
    medium:h-[300px]
    small:h-[220px]
    smallXl:h-[190px]
    mobile:h-[210px] mobileTab:h-[170px] mobileSmall:h-[140px] rounded-[25px] mobile:rounded-[15px] mobileSmall:rounded-[10px]  overflow-hidden relative"
    >
      {!loaded ? (
        <div className="h-full w-full bg-whiteMain  absolute top-0 left-0 z-[5]">
          <div className="w-full h-full  bg-whiteLoad relative overflow-hidden skeletonLoad"></div>
        </div>
      ) : null}
      {props.linkWhole ? (
        <Link to={props.linkWhole}>
          {imageElement}
          {props.opacity ? (
            <div className=" bg-gradient-to-t from-sliderFadeStart to-sliderFadeEnd z-[2] absolute h-full w-full object-cover top-0 left-0"></div>
          ) : null}
          <div className="w-full flex justify-between z-30 absolute bottom-8 mobileSmall:bottom-3 px-6 mobile:px-3 items-end">
            <div className="flex flex-col gap-1   ">
              <h1 className=" text-sliderHead text-[18px] mobile:text-[16px] mobileSmall:text-[15px]  ">
                {props.head}
              </h1>
              <h3 className=" text-sliderDesc text-[14px] mobile:text-[12px] mobileSmall:text-[12px]">
                {props.desc}
              </h3>
            </div>
            {props.button ? (
              <button className="DefButton relative z-30 mobile:text-[11px] mobileSmall:hidden text-buttonText">
                სრულად ნახვა
              </button>
            ) : null}
          </div>
        </Link>
      ) : (
        <>
          <img
            src={props.image}
            alt="Apartment"
            className=" z-[1] absolute h-full w-full object-cover top-0 left-0"
            onLoad={() => {
              setLoaded(true);
            }}
          />
          {props.opacity ? (
            <div className=" bg-gradient-to-t from-sliderFadeStart to-sliderFadeEnd z-[2] absolute h-full w-full object-cover top-0 left-0"></div>
          ) : null}
          <div className="w-full flex justify-between z-30 absolute bottom-8 mobileSmall:bottom-3 px-6 mobile:px-3 items-end">
            <div className="flex flex-col gap-1   ">
              <h1 className=" text-sliderHead text-[18px] mobile:text-[16px] mobileSmall:text-[15px]  ">
                {props.head}
              </h1>
              <h3 className=" text-sliderDesc text-[14px] mobile:text-[12px] mobileSmall:text-[12px]">
                {props.desc}
              </h3>
            </div>
            {props.button ? (
              <button className="DefButton relative z-30 mobile:text-[11px] mobileSmall:hidden text-buttonText">
                სრულად ნახვა
              </button>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

export default memo(MainSlider);
