import { Link } from "react-router-dom";
import BlueHouseDecoration from "../../../assets/images/decorations/bluehouse.png";
import { t } from "i18next";

export default function AgencyCard() {
  return (
    <section className="my-[60px] mb-[80px] w-full h-[500px] maclerLinear bg-mainClear rounded-[20px] flex items-center p-8 shadow-[12px_12px_0px] shadow-[rgba(58,_134,_255,_0.1)] small:flex-col small:h-auto small:gap-10 ">
      <div className="flex-1 flex items-center justify-center">
        <img
          src={BlueHouseDecoration}
          alt="blue house decoraion"
          className="w-[100%] mobileSmall:w-[90%] max-h-[520px] max-w-[560px] mediumSmall:max-w-[360px]"
        />
      </div>
      <div className="flex-1  pl-[80px] small:w-full small:pl-0 small:flex small:flex-col small:items-center">
        <h2 className="small:text-center text-[24px] mobileSmall:text-[22px] font-mainBold text-[#3a86ff] mb-5">
          {t("homePage.agencyService.title")}
        </h2>
        <p className="small:text-center text-textDesc text-[15px] mobileSmall:text-[15px] tracking-wider max-w-[600px]">
          {t("homePage.agencyService.description")}
        </p>
        <div className="flex flex-col gap-3 my-8 mobileSmall:items-start">
          <div className="flex items-center  text-textDesc text-[15px] gap-3 small:justify-center mobileSmall:text-[15px]">
            <div className="h-[14px] aspect-square rounded-circle border-2  border-[#3a86ff]"></div>{" "}
            {t("homePage.agencyService.service1")}
          </div>
          <div className="flex items-center text-textDesc text-[15px] gap-3 small:justify-center mobileSmall:text-[15px]">
            <div className="h-[14px] aspect-square rounded-circle border-2  border-[#3a86ff]"></div>{" "}
            {t("homePage.agencyService.service2")}
          </div>
          <div className="flex items-center text-textDesc text-[15px] gap-3 small:justify-center mobileSmall:text-[15px]">
            <div className="h-[14px] aspect-square rounded-circle border-2  border-[#3a86ff]"></div>{" "}
            {t("homePage.agencyService.service3")}
          </div>
          <div className="flex items-center text-textDesc text-[15px] gap-3 small:justify-center mobileSmall:text-[15px]">
            <div className="h-[14px] aspect-square rounded-circle border-2  border-[#3a86ff]"></div>{" "}
            {t("homePage.agencyService.service4")}
          </div>
        </div>
        <Link to={"/AgencyService"} className="block small:mx-auto mt-3 w-min">
          <button className=" block bg-[#3a86ff] rounded-[5px] w-[190px] h-[40px] mobileSmall:h-[36px] mobileSmall:w-[160px] mobileSmall:text-[14px] text-buttonText text-[14px] tracking-widest transition-colors hover:bg-mainHover">
            {t("homePage.agencyService.button")}
          </button>
        </Link>
      </div>
    </section>
  );
}
