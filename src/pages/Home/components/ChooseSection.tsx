import { Link } from "react-router-dom";
import HomeImage from "../../../assets/images/estates/home.webp";
import ApartamentImage from "../../../assets/images/estates/apartament.webp";
import LandImage from "../../../assets/images/estates/land.webp";
import ApartamentRentImage from "../../../assets/images/estates/apartamentRent.webp";
import HotelImage from "../../../assets/images/estates/hotel.webp";
import { t } from "i18next";

export default function ChooseSection() {
  return (
    <section className="my-[40px] mobile:my-[50px]">
      <div className="flex gap-4 mobile:gap-2 w-full [&>div]:rounded-section [&>div>div]:rounded-section  mobile:flex-col mobile:items-stretch">
        <div className="flex flex-[2] flex-wrap w-full gap-4 mobile:gap-3 [&>div]:h-[200px] mobile:flex-col mobile:items-stretch">
          <div className="flex w-[calc(50%-10px)]  mobile:w-full  mobile:aspect-video bg-whiteLoad overflow-hidden cursor-pointer group relative">
            <Link to={"/Search?estate_type=0"}>
              <div className="absolute h-full w-full top-0 left-0 bg-gradient-to-t from-sectionFadeStart to-sectionFadeEnd z-[2]"></div>
              <div className="absolute bottom-3 left-4 text-WhiteFade tracking-wider font-mainRegular text-[14px] mobile:text-[14px] z-[3] ">
                {t("homePage.cards.houses")}
              </div>
              <img
                src={HomeImage}
                className="absolute h-full w-full object-cover max-w-[450px] max-h-[200px] transition-[filter] duration-300 group-hover:brightness-110 rounded-section"
                alt="Real estate image"
              />
            </Link>
          </div>
          <div className="flex w-[calc(50%-8px)]  mobile:w-full  mobile:aspect-video bg-whiteLoad overflow-hidden cursor-pointer group relative">
            <Link to={"/Search?estate_type=3"}>
              <div className="absolute h-full w-full top-0 left-0 bg-gradient-to-t from-sectionFadeStart to-sectionFadeEnd z-[2]"></div>
              <div className="absolute bottom-3 left-4 text-WhiteFade tracking-wider font-mainRegular text-[14px] mobile:text-[14px] z-[3] ">
                {t("homePage.cards.lands")}
              </div>
              <img
                src={LandImage}
                className="absolute h-full w-full object-cover max-w-[450px] max-h-[200px] transition-[filter] duration-300 group-hover:brightness-110 rounded-section"
                alt="Real estate image"
              />{" "}
            </Link>
          </div>
          <div className="flex w-[calc(50%-8px)]  mobile:w-full  mobile:aspect-video bg-whiteLoad overflow-hidden cursor-pointer group relative">
            <Link to={"/Search?estate_type=1"}>
              <div className="absolute h-full w-full top-0 left-0 bg-gradient-to-t from-sectionFadeStart to-sectionFadeEnd z-[2]"></div>
              <div className="absolute bottom-3 left-4 text-WhiteFade tracking-wider font-mainRegular text-[14px] mobile:text-[14px] z-[3] ">
                {t("homePage.cards.selling_apartments")}
              </div>
              <img
                src={ApartamentImage}
                className="absolute h-full w-full object-cover max-w-[450px] max-h-[200px] transition-[filter] duration-300 group-hover:brightness-110 rounded-section"
                alt="Real estate image"
              />{" "}
            </Link>
          </div>
          <div className="flex w-[calc(50%-8px)]  mobile:w-full  mobile:aspect-video bg-whiteLoad overflow-hidden cursor-pointer group relative">
            <Link to={"/Search?estate_type=1&deal=1"}>
              <div className="absolute h-full w-full top-0 left-0 bg-gradient-to-t from-sectionFadeStart to-sectionFadeEnd z-[2]"></div>
              <div className="absolute bottom-3 left-4 text-WhiteFade tracking-wider font-mainRegular text-[14px] mobile:text-[14px] z-[3] ">
                {t("homePage.cards.renting_apartments")}
              </div>
              <img
                src={ApartamentRentImage}
                className="absolute h-full w-full object-cover max-w-[450px] max-h-[200px] transition-[filter] duration-300 group-hover:brightness-110 rounded-section"
                alt="Real estate image"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-1 bg-whiteLoad overflow-hidden cursor-pointer group relative mobile:aspect-video">
          <Link to={"/Search?estate_type=4"}>
            {" "}
            <div className="absolute h-full w-full top-0 left-0 bg-gradient-to-t from-sectionFadeStart to-sectionFadeEnd z-[2]"></div>
            <div className="absolute bottom-3 left-4 text-WhiteFade tracking-wider font-mainRegular text-[14px] mobile:text-[14px] z-[3] ">
              {t("homePage.cards.hotels")}
            </div>
            <img
              src={HotelImage}
              className="absolute h-full w-full object-cover max-w-[460px] max-h-[420px] transition-[filter] duration-300 group-hover:brightness-110 rounded-section"
              alt="Real estate image"
            />{" "}
          </Link>
        </div>
      </div>
      <div className=" mobile:aspect-video w-full mt-4 mobile:mt-2 bg-whiteLoad overflow-hidden cursor-pointer group rounded-section relative">
        <div className="absolute h-full w-full top-0 left-0 bg-gradient-to-t from-sectionFadeStart to-sectionFadeEnd z-[2]"></div>
        <div className="absolute bottom-3 left-4 text-WhiteFade tracking-wider font-mainRegular text-[14px] mobile:text-[14px] z-[3] ">
          {t("homePage.cards.lands")}
          მიწის ნაკვეთები
        </div>
        <img
          src={LandImage}
          className="absolute h-full w-full object-cover transition-[filter] duration-300 group-hover:brightness-110 rounded-section"
          alt="Real estate image"
        />
      </div>
    </section>
  );
}
