import { useEffect, useRef, useState } from "react";
import { DateIcon, LoginEyeIcon } from "../../../assets/icons/Icons";

import { TProductData } from "./MyProducts";
import { FetchLastSeenProducts } from "../../../hooks/serverProductFunctions";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

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
        <title>ბოლოს ნანახი - OnHome</title>
      </Helmet>{" "}
      <div className=" rounded-section shadow-sectionShadow bg-whiteMain relative flex  py-2 flex-col gap-3">
        <p className="px-4 text-[13px] text-textDesc my-1">
          სულ {products.length} განცხადება
        </p>
        <div className="flex flex-col  max-h-[550px] overflow-hidden overflow-y-auto">
          {products.length > 0 ? (
            products.map((e: TProductData) => (
              <BasicBanner key={e.id} productData={e} />
            ))
          ) : (
            <p className="px-4 text-[14px] text-textDesc my-3 text-center tracking-wider">
              სია ცარიელია
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
            src={
              "http://api.onhome.ge/" + props.productData.estate_active_image
            }
            className="absolute h-full w-full object-cover  top-0 left-0"
          />
        </Link>
      </div>
      <div className="flex flex-col ml-3 h-full relative smallXl:w-full smallXl:mt-3 smallXl:h-auto">
        <h3 className="text-[15px] mb-[2px] text-textHeadBlack ">
          {props.productData.estate_title}
        </h3>
        <p className="text-[13px] text-textDesc">
          ქალაქი:{" "}
          <span className="text-[13px] text-textHeadBlack">
            {props.productData.estate_city}
          </span>
        </p>
        <p className="text-[13px] text-textDesc">
          ოთახები:{" "}
          <span className="text-[13px] text-textHeadBlack">
            {props.productData.estate_rooms}
          </span>
        </p>
        <p className="text-[13px] text-textDesc">
          ფართი:{" "}
          <span className="text-[13px] text-textHeadBlack">
            {props.productData.estate_size} მ²
          </span>
        </p>
        <div className="flex items-center gap-5 mt-1 smallXl:mt-3 mobileSmall:flex-wrap ">
          <p className="flex items-center text-[13px] text-textDesc gap-1">
            <LoginEyeIcon className="h-4 aspect-square [&>path]:fill-textDesc" />{" "}
            {props.productData.views}
          </p>
          <p className="flex items-center text-[13px] text-textDesc gap-1">
            <DateIcon className="h-4 aspect-square [&>path]:fill-textDesc" />
            {props.productData.update_time.slice(0, 16)}
          </p>
          <p className="text-[13px] text-textDesc">
            ID - {props.productData.id}
          </p>
        </div>
      </div>
    </div>
  );
}
