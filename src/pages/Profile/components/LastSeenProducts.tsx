import { useEffect, useRef, useState } from "react";
import { DateIcon, LoginEyeIcon } from "../../../assets/icons/Icons";

import { TProductData } from "./MyProducts";
import { FetchLastSeenProducts } from "../../../hooks/serverProductFunctions";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { image_url_start } from "../../../hooks/axiosCall";
import { FormatTime } from "../../../components/global/Addons";
import { t } from "i18next";

export default function LastSeenProducts() {
  const [products, setProducts] = useState<TProductData[]>([]);
  const refresh = useRef<boolean>(true);

  useEffect(() => {
    if (refresh.current) {
      refresh.current = false;
      FetchLastSeenProducts().then((res) => setProducts(res));
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("navbar.last_seen")} - OnHome</title>
      </Helmet>{" "}
      <div className=" rounded-section shadow-sectionShadow bg-whiteMain relative flex  py-2 flex-col gap-3">
        <p className="px-4 text-[13px] text-textDesc my-1">
          {t("my_products.found")} {products.length} {t("my_products.form")}
        </p>
        <div className="flex flex-col  max-h-[550px] overflow-hidden overflow-y-auto">
          {products.length > 0 ? (
            products.map((e: TProductData) => (
              <BasicBanner key={e.id} productData={e} />
            ))
          ) : (
            <p className="px-4 text-[14px] text-textDesc my-3 text-center tracking-wider">
              {t("global.list_is_empty")}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

function BasicBanner(props: { productData: TProductData }) {
  return (
    <div className=" w-full border-t-[2px] border-lineBg py-5 px-4 flex items-center smallXl:flex-col">
      <div className="w-[160px] h-[90px] rounded-lg bg-whiteLoad relative overflow-hidden smallXl:w-[100%] smallXl:aspect-video smallXl:h-auto">
        <Link to={"/Product/" + props.productData.id}>
          <div className="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.1)] z-[2]"></div>
          <img
            src={image_url_start + props.productData.estate_active_image}
            className="absolute h-full w-full object-cover  top-0 left-0"
          />
        </Link>
      </div>
      <div className="flex flex-col ml-3 h-full relative smallXl:w-full smallXl:mt-3 smallXl:h-auto">
        <Link to={"/product/" + props.productData.id} className="w-min">
          <h3 className="text-[15px] mb-[2px] text-textHeadBlack w-min text-nowrap max-w-[250px] text-ellipsis overflow-hidden ">
            {props.productData.estate_title}
          </h3>{" "}
        </Link>
        <p className="text-[13px] text-textDesc">
          {t("global.placeholders.city")}:{" "}
          <span className="text-[13px] text-textHeadBlack">
            {props.productData.estate_city}
          </span>
        </p>
        <p className="text-[13px] text-textDesc">
          {t("global.placeholders.rooms")}:{" "}
          <span className="text-[13px] text-textHeadBlack">
            {props.productData.estate_rooms}
          </span>
        </p>
        <p className="text-[13px] text-textDesc">
          {t("global.placeholders.space")}:{" "}
          <span className="text-[13px] text-textHeadBlack">
            {props.productData.estate_size} {t("global.m")}²
          </span>
        </p>
        <div className="flex items-center gap-5 mt-1 smallXl:mt-3 mobileSmall:flex-wrap ">
          <p className="flex items-center text-[13px] text-textDesc gap-1">
            <LoginEyeIcon className="h-4 aspect-square [&>path]:fill-textDesc" />{" "}
            {props.productData.views}
          </p>
          <p className="flex items-center text-[13px] text-textDesc gap-1">
            <DateIcon className="h-4 aspect-square [&>path]:fill-textDesc" />
            {FormatTime(props.productData.update_time.toString())}
          </p>
          <p className="text-[13px] text-textDesc">
            ID - {props.productData.id}
          </p>
        </div>
      </div>
    </div>
  );
}
