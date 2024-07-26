import { memo, useEffect, useMemo, useState } from "react";
import { LeftArrowIcon, PopupCloseIcon } from "../../../assets/icons/Icons";
import { AdBannerProductSlider } from "../../../components/global/AdComponents";
import { Swiper, SwiperSlide } from "swiper/react";
import { image_url_start } from "../../../hooks/axiosCall";

function ImageSlider(props: { productData: any }) {
  const [slider, setSlider] = useState<number>(0);
  const [fullSlider, setFullSlider] = useState<boolean>(false);

  const imageList = useMemo(
    () => JSON.parse(props.productData.estate_images),
    [props.productData.id]
  );

  const sliderNext = () => {
    if (slider == imageList.length - 1) {
      setSlider(0);
    } else {
      setSlider((state) => state + 1);
    }
  };
  const sliderPrev = () => {
    if (slider == 0) {
      setSlider(imageList.length - 1);
    } else {
      setSlider((state) => state - 1);
    }
  };
  useEffect(() => {
    if (Math.floor(Math.random() * 15) == 4) {
      if (
        props.productData.estate_images.length > 1 &&
        !imageList.includes("AD")
      ) {
        imageList.splice(1, 0, "AD");
      }
    }
  }, [props.productData.id]);

  useEffect(() => {
    setSlider(0);
  }, [props.productData.id]);

  return (
    <>
      {fullSlider ? (
        <FullSliderBlock
          imageList={imageList}
          slider={slider}
          setSlider={setSlider}
          setFullSlider={setFullSlider}
        />
      ) : null}
      <div className="flex-[1.3] bg-whiteMain rounded-block relative flex items-center justify-center  shadow-sectionShadow max-h-[450px]">
        <div className="slider-shade absolute h-full w-full left-0 top-0 z-[2] rounded-b-block"></div>
        <div className="flex items-center gap-4 absolute bottom-3 z-[3] mobileSmall:gap-3 max-w-[90%] overflow-hidden">
          <Swiper spaceBetween={15} slidesPerView="auto">
            {imageList.map((item: string, i: number) => (
              <SwiperSlide key={i} className="w-auto py-[2px] px-[2px]">
                <SliderSmallImage
                  slider={slider}
                  i={i}
                  setSlider={setSlider}
                  item={item}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <SliderMainImage
          imageList={imageList}
          slider={slider}
          setFullSlider={setFullSlider}
        />
        {imageList.length !== 1 && (
          <>
            <button
              onClick={() => sliderPrev()}
              className="mobile:hidden h-16 aspect-square rounded-circle bg-whiteMain p-5 absolute z-[5] left-0 -translate-x-1/4 shadow-slideNavShadow"
            >
              <LeftArrowIcon className="h-full aspect-square" />{" "}
            </button>{" "}
            <button
              onClick={() => sliderNext()}
              className="mobile:hidden h-16 aspect-square rounded-circle bg-whiteMain p-5 absolute z-[5] right-0 translate-x-1/4 shadow-slideNavShadow"
            >
              <LeftArrowIcon className="h-full aspect-square rotate-180" />{" "}
            </button>
          </>
        )}
      </div>
    </>
  );
}
export default memo(ImageSlider);

function SliderMainImage({
  imageList,
  slider,
  setFullSlider,
}: {
  imageList: string[];
  slider: number;
  setFullSlider: Function;
}) {
  const [loaded, setLoaded] = useState<boolean>(
    imageList[slider] !== "AD" ? false : true
  );
  return (
    <div
      onClick={() => setFullSlider(true)}
      className="relative overflow-hidden h-full w-full rounded-block z-[2] medium:min-h-[500px] small:min-h-[400px] mobile:min-h-[300px] mobileSmall:min-h-[200px] "
    >
      {!loaded ? (
        <div className="h-full w-full bg-whiteMain  absolute top-0 left-0 z-[5]">
          <div className="w-full h-full  bg-whiteLoad relative overflow-hidden skeletonLoad"></div>
        </div>
      ) : null}
      {imageList[slider] !== "AD" ? (
        <img
          src={image_url_start + imageList[slider]}
          className="absolute top-0 left-0 h-full w-full object-cover"
          alt="Product Image"
          onLoad={() => {
            setLoaded(true);
          }}
        />
      ) : (
        <AdBannerProductSlider />
      )}
    </div>
  );
}

function FullSliderBlock({
  imageList,
  slider,
  setSlider,
  setFullSlider,
}: {
  imageList: string[];
  slider: number;
  setSlider: Function;
  setFullSlider: Function;
}) {
  const [loaded, setLoaded] = useState<boolean>(
    imageList[slider] !== "AD" ? false : true
  );
  return (
    <div className="fixed left-0 top-0 h-full w-full  z-50 py-[50px] flex justify-center items-center">
      <div
        className="absolute top-0 left-0 bg-[rgba(0,0,0,0.7)] w-full h-full"
        onClick={() => setFullSlider(false)}
      ></div>
      <div className="content_container relative z-10">
        <div className="flex flex-col gap-5 justify-center items-center relative">
          <div
            onClick={() => setFullSlider(false)}
            className="h-[40px] aspect-square top-0 right-0 absolute cursor-pointer"
          >
            <PopupCloseIcon className="h-5 [&>path]:fill-blackMain" />
          </div>
          <div className="relative flex items-center justify-center gap-3  h-auto w-[90%] max-w-[1200px] mobile:w-full  aspect-video rounded-xl overflow-hidden">
            {!loaded ? (
              <div className="h-full w-full bg-whiteMain  absolute top-0 left-0 z-[5]">
                <div className="w-full h-full  bg-whiteLoad relative overflow-hidden skeletonLoad"></div>
              </div>
            ) : null}
            {imageList[slider] !== "AD" ? (
              <img
                src={image_url_start + imageList[slider]}
                className="h-full w-full top-0 left-0 object-cover"
                alt="Product Image"
                onLoad={() => {
                  setLoaded(true);
                }}
              />
            ) : (
              <AdBannerProductSlider />
            )}
          </div>
          <div className="noScrollBar relative flex items-center justify-center gap-3 w-full overflow-x-auto flex-nowrap overflow-hidden max-w-full">
            <Swiper spaceBetween={15} slidesPerView="auto">
              {imageList.map((item: string, i: number) => (
                <SwiperSlide key={i} className="w-auto  py-[2px] px-[2px]">
                  <SliderSmallImage
                    slider={slider}
                    i={i}
                    setSlider={setSlider}
                    item={item}
                    large
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderSmallImage(props: {
  item: string;
  i: number;
  slider: number;
  large?: boolean;
  setSlider: Function;
}) {
  const [loaded, setLoaded] = useState<boolean>(
    props.item !== "AD" ? false : true
  );
  return (
    <div
      key={props.i}
      onClick={() => props.setSlider(props.i)}
      className={` select-none ${
        props.large
          ? "h-[60px] mobileSmall:h-[40px]"
          : "h-[40px] mobileSmall:h-[32px]"
      } relative aspect-video rounded-[5px] outline outline-[2px]  overflow-hidden cursor-pointer ${
        props.slider == props.i ? "outline-main" : "outline-whiteMain"
      }`}
    >
      {" "}
      {!loaded ? (
        <div className="h-full w-full bg-whiteMain  absolute top-0 left-0 z-[5]">
          <div className="w-full h-full  bg-whiteLoad relative overflow-hidden skeletonLoad"></div>
        </div>
      ) : null}
      {props.item !== "AD" ? (
        <img
          src={image_url_start + props.item}
          className=" h-full w-full object-cover rounded-[5px]"
          alt="Product Image"
          onLoad={() => {
            setLoaded(true);
          }}
        />
      ) : (
        <div className="h-full w-full bg-whiteLoad flex justify-center items-center text-blackMain">
          AD
        </div>
      )}
    </div>
  );
}
