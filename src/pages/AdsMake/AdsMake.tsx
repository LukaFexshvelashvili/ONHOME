import { Link } from "react-router-dom";
import {
  HomePageAd1,
  HomePageAd2,
  ProductPageAd1,
  ProductPageAd2,
  WholePageAd,
} from "./Decorations";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

export default function AdsMake() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("adp1")} - OnHome</title>
      </Helmet>
      <main className="pt-[60px]">
        <h1 className="text-textDesc text-[20px] font-mainBold text-center tracking-wider">
          {t("adp2")}
        </h1>

        <p className="mt-[40px] mb-3 text-main font-mainSemiBold tracking-wider text-center text-[18px]">
          {t("adp3")}
        </p>
        <div className="flex justify-center">
          <WholePageAd />
        </div>
        <p className="mt-[20px] text-textDesc text-[16px] max-w-[500px] font-mainSemiBold tracking-wider text-center mx-auto">
          {t("adp4")}
        </p>
        <div className="h-[4px] w-[60px] rounded-lg my-[30px]  bg-whiteLoad mx-auto block"></div>

        <p className=" text-main mb-3 font-mainSemiBold tracking-wider text-center text-[18px]">
          {t("adp5")}
        </p>
        <div className="flex justify-center">
          <HomePageAd1 />
          <HomePageAd2 />
        </div>
        <p className="mt-[20px] text-textDesc text-[16px] max-w-[500px] font-mainSemiBold tracking-wider text-center mx-auto">
          {t("adp6")}
        </p>
        <div className="h-[4px] w-[60px] rounded-lg my-[30px]  bg-whiteLoad mx-auto block"></div>

        <p className=" text-main mb-3 font-mainSemiBold tracking-wider text-center text-[18px]">
          {t("adp7")}
        </p>
        <div className="flex justify-center">
          <ProductPageAd1 />
          <ProductPageAd2 />
        </div>
        <p className="mt-[20px] text-textDesc text-[16px] max-w-[500px] font-mainSemiBold tracking-wider text-center mx-auto">
          {t("adp8")}
        </p>
        <div className="h-[4px] w-[60px] rounded-lg my-[30px]  bg-whiteLoad mx-auto block"></div>

        <p className=" text-main mb-3 font-mainSemiBold tracking-wider text-center text-[18px]">
          {t("adp9")}
        </p>
        <div className="flex gap-3 justify-center mt-5">
          <Link
            to={"tel:+995592605605"}
            className="DefButton flex justify-center items-center"
          >
            დაგვრეკე{t("adp10")}
          </Link>
          <Link
            to={"mailto:ads@onhome.ge"}
            className="DefButton flex justify-center items-center"
          >
            მოვწერე{t("adp11")}
          </Link>
        </div>
      </main>
    </>
  );
}
