import { Link } from "react-router-dom";
import {
  Home1Decor,
  Home2Decor,
  Home3Decor,
  Home4Decor,
  SkeletonDecor,
} from "../../../assets/images/decorations/svg/Decorations";
import { t } from "i18next";

export default function CreateOffer() {
  return (
    <section className="flex items-center gap-20 mobile:gap-10 my-[120px] mt-[80px]  mobile:my-[60px]  mobile:mb-[50px] small:flex-col small:items-stretch">
      <div className="flex flex-col flex-1 gap-2 ">
        <div className="flex justify-center gap-16 items-end border-b-8 border-mainClear mediumSmall:gap-10 small:gap-12 mobile:gap-3">
          <Home3Decor className=" h-[90px] mediumSmall:h-[80px] small:h-[90px] mobileSmall:h-[60px] aspect-auto translate-y-[1px]" />
          <Home4Decor className=" h-[80px] mediumSmall:h-[70px] small:h-[80px] mobileSmall:h-[60px] aspect-auto" />
          <Home1Decor className="mobileSmall:hidden h-[90px] mediumSmall:h-[70px] small:h-[80px] mobileSmall:h-[60px] aspect-auto" />
          <Home2Decor className=" h-[90px] mediumSmall:h-[80px] small:h-[90px] mobileSmall:h-[60px] aspect-auto translate-y-[2px]" />
        </div>
        <h2 className="small:text-center small:w-full mt-5 text-[26px] tracking-wider font-mainBold text-main mb-3 mobileSmall:mb-2  mediumSmall:text-[24px] mobileSmall:text-[20px] mobileSmall:tracking-wide">
          {t("homePage.addProduct.title")}
        </h2>
        <p className="small:text-center small:max-w-full  text-textDesc text-[16px] max-w-[500px] leading-7 mobileSmall:text-[14px] mobileSmall:tracking-wide mobileSmall:leading-6 tracking-wider ">
          {t("homePage.addProduct.description")}
        </p>
        <Link
          to={"/AddProduct"}
          className="small:mx-auto mt-9 mobileSmall:mt-4 w-min block"
        >
          <button className="    mobileSmall:h-[36px] mobileSmall:w-[160px] mobileSmall:text-[14px] bg-main rounded-[5px] w-[190px] h-[40px] text-buttonText text-[15px] tracking-widest transition-colors hover:bg-mainHover">
            {t("homePage.addProduct.button")}
          </button>
        </Link>
      </div>
      <div className="flex flex-col flex-1 pl-7  mobile:px-2">
        <SkeletonDecor className=" w-full aspect-auto" />
      </div>
    </section>
  );
}
