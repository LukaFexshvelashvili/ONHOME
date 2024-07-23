import { useEffect, useState } from "react";
import {
  BookmarkIcon,
  PlusIcon,
  RoomIcon,
  SquareFrameIcon,
} from "../../assets/icons/Icons";
import { getCurrency } from "../convertors/convertors";
import numeral from "numeral";
import {
  addFavorite,
  checkFavorite,
  removeFavorite,
} from "../../hooks/serverFunctions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { image_url_start } from "../../hooks/axiosCall";
import { getDealType } from "./getTypes";
import { t } from "i18next";

export type TProductCard = {
  id: number;
  estate_title: string;
  estate_deal: number;
  estate_active_image: string;
  estate_city: string;
  estate_district: string;
  estate_exact_address: string;
  estate_size: number;
  estate_land_size: number | null;
  estate_price: number;
  estate_currency: number;
  estate_rooms: number;
  estate_bedrooms: number;
  estate_floor: number;
  estate_floors: number;
  estate_vip: number;
  views: number;
  created_time: Date;
  update_time: Date;
};

export default function Card(props: {
  autoWidth?: boolean;
  product: TProductCard;
}) {
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const submitFavorite = (state: boolean) => {
    if (state) {
      addFavorite(dispatch, props.product.id);
    } else {
      removeFavorite(dispatch, props.product.id);
    }
  };
  useEffect(() => {
    setFavorite(checkFavorite(props.product.id));
  }, []);

  return (
    <>
      <div
        className={`h-auto p-0 pb-14 ${
          props.autoWidth ? "w-full" : "w-[280px]"
        }  ${
          props.product.estate_vip == 2
            ? "bg-gradient-to-t from-vipPlusClear from-5% to-25% to-whiteMain border-none shadow-[inset_0px_0px_0px_1.5px_var(--vipPlusHover)]"
            : "bg-whiteMain shadow-[inset_0px_0px_0px_1.5px_var(--cardBorder)]"
        } border-none relative ${loaded ? "rounded-[10px]" : "rounded-[15px]"}`}
      >
        <div className={`${loaded ? "visible" : "invisible"}`}>
          <Link to={"/product/" + props.product.id} className=" rounded-2xl">
            <div className="w-full h-[200px] rounded-[15px] bg-whiteLoad relative overflow-hidden">
              <div className="absolute flex gap-2 top-2 right-2 z-[3] cursor-pointer">
                <div
                  className={`  h-[25px] px-2 select-none ${
                    props.product.estate_vip == 2 ? "bg-vipPlusI" : "bg-main"
                  } rounded-md shadow-lg flex items-center justify-center text-Asmaller font-mainSemiBold text-buttonText ml-auto tracking-widest cursor-default top-[6px] right-0 z-[3]`}
                >
                  {getDealType(props.product.estate_deal)}
                </div>
                {props.product.estate_vip == 2 ? (
                  <div className="h-[25px] w-[60px] select-none bg-vipPlusI rounded-md flex items-center justify-center text-Asmaller font-mainBold text-buttonText tracking-wider cursor-default">
                    VIP+
                  </div>
                ) : props.product.estate_vip == 1 ? (
                  <div className="h-[25px] w-[60px] select-none bg-orangeI rounded-md flex items-center justify-center text-Asmaller font-mainBold text-buttonText tracking-wider cursor-default">
                    VIP
                  </div>
                ) : (
                  props.product.estate_vip == 0 && <></>
                )}
              </div>
              <img
                src={image_url_start + props.product.estate_active_image}
                className="absolute h-full w-full object-cover top-0 left-0 select-none"
                alt="estate-photo"
                onLoad={() => {
                  setLoaded(true);
                }}
                loading="lazy"
              />
              <div className="absolute bottom-2 left-0 px-3 flex items center gap-1 w-full">
                <div className="bg-cardInfoBg backdrop-blur-[3px] rounded-[3px] flex justify-center items-center px-2 py-[5px] text-WhiteFade font-mainMedium tracking-wider text-[12px]">
                  <RoomIcon className="h-[15px] mr-3 [&>path]:fill-WhiteFade" />{" "}
                  {props.product.estate_rooms}
                </div>
                <div className="bg-cardInfoBg backdrop-blur-[3px] rounded-[3px] flex justify-center items-center px-2 py-[5px] text-WhiteFade font-mainMedium tracking-wider text-[12px]">
                  <SquareFrameIcon className="h-[15px] mr-3 [&>path]:stroke-WhiteFade" />{" "}
                  {props.product.estate_size}მ²
                </div>
              </div>
            </div>{" "}
          </Link>
          <div className="flex flex-col py-1 pt-2 px-3 relative">
            <Link to={"/product/" + props.product.id}>
              <h2 className="text-textHeadCard font-mainSemiBold text-[15px] text-nowrap text-ellipsis w-full overflow-hidden">
                {props.product.estate_title}
              </h2>
            </Link>
            <Link to={"/product/" + props.product.id}>
              <p className="text-textDescCard text-[13px] font-mainRegular mt-[2px]  text-nowrap text-ellipsis w-full overflow-hidden">
                {props.product.estate_city}
                {props.product.estate_district &&
                  ", " + props.product.estate_district}
              </p>{" "}
            </Link>
          </div>
          <div className="flex items-center mt-2 bottom-3 w-full absolute left-0 px-3">
            <div
              className={`${
                props.product.estate_vip == 2
                  ? "bg-vipPlusClear text-vipPlusI"
                  : "bg-mainClear text-main"
              }  w-[120px] h-[30px] flex justify-center items-center rounded-[5px] `}
            >
              {numeral(Math.floor(props.product.estate_price))
                .format("0,0")
                .replace(/,/g, " ")}
              {getCurrency(props.product.estate_currency)}
            </div>
            <p className="text-textDescCard font-mainRegular tracking-wide text-[13px] max-w-[90px] mx-3 text-nowrap text-ellipsis w-full overflow-hidden">
              მ² -{" "}
              {props.product.estate_land_size ? (
                <>
                  {numeral(
                    Math.floor(
                      props.product.estate_price /
                        (props.product.estate_size +
                          props.product.estate_land_size)
                    )
                  )
                    .format("0,0")
                    .replace(/,/g, " ")}
                </>
              ) : (
                <>
                  {numeral(
                    Math.floor(
                      props.product.estate_price / props.product.estate_size
                    )
                  )
                    .format("0,0")
                    .replace(/,/g, " ")}
                </>
              )}
              {getCurrency(props.product.estate_currency)}
            </p>
            <button
              onClick={() => {
                submitFavorite(!favorite);
                setFavorite((state) => !state);
              }}
              className=" p-[5px] rounded-md absolute right-3"
            >
              <BookmarkIcon
                className={`h-[20px]  transition-all   ${
                  props.product.estate_vip == 2
                    ? favorite
                      ? "fill-vipPlusI [&>path]:stroke-vipPlusI"
                      : "fill-transparent [&>path]:stroke-vipPlusI"
                    : favorite
                    ? "fill-orangeI [&>path]:stroke-orangeI"
                    : "fill-transparent [&>path]:stroke-navIcon"
                }`}
              />
            </button>
          </div>
        </div>

        {loaded ? null : <CardSkeleton />}
      </div>
    </>
  );
}
export function CardSkeleton(props: { fixedWidth?: boolean }) {
  return (
    <div
      className={` ${
        props.fixedWidth ? "h-auto w-[280px]" : "absolute h-full w-full"
      }  top-0 left-0 bg-whiteMain border-2 border-cardBorder rounded-[10px] pb-14 z-10`}
    >
      <div className="w-full h-[200px] rounded-normal bg-whiteLoad relative overflow-hidden skeletonLoad">
        <div className="absolute bottom-2 left-2 flex items center gap-2">
          <div className="skeletonLoad bg-[var(--skeleton3)] backdrop-blur-[2px] rounded-[3px] flex justify-center items-center px-2 py-[6px] text-WhiteFade font-mainSemiBold text-sm h-[20px] w-[50px]">
            {/* rooms */}
          </div>
          <div className="skeletonLoad bg-[var(--skeleton3)] backdrop-blur-[2px] rounded-[3px] flex justify-center items-center px-2 py-[6px] text-WhiteFade font-mainSemiBold text-sm h-[20px] w-[50px]">
            {/* size */}
          </div>
        </div>
      </div>
      <div className="flex flex-col py-1 pt-2 px-3">
        <h2 className="text-textHeadCard skeletonLoad mt-1 font-mainSemiBold text-[15px] text-nowrap text-ellipsis w-10/12 overflow-hidden h-[15px] rounded-md bg-[var(--skeleton1)]">
          {/* header */}
        </h2>
        <p className="text-textDescCard skeletonLoad text-[13px] font-mainRegular mt-[5px]  text-nowrap text-ellipsis w-6/12 overflow-hidden h-[15px] rounded-md bg-[var(--skeleton1)]">
          {/* description */}
        </p>
      </div>
      <div className="flex items-center mt-2 bottom-3 w-full absolute left-0 px-3">
        <div className="skeletonLoad bg-mainClear text-main w-[120px] h-[30px] flex justify-center items-center rounded-md">
          {/* price */}
        </div>
        <p className="skeletonLoad text-textDescCard font-mainRegular tracking-wide text-[13px] max-w-[90px] mx-3 text-nowrap text-ellipsis w-full overflow-hidden">
          {/* price per size */}
        </p>
        <button className="skeletonLoad p-[5px] rounded-md h-[30px] aspect-square absolute right-3 bg-[var(--skeleton1)]">
          {/*  favorites */}
        </button>
      </div>
    </div>
  );
}
export function SeeMoreCard(props: { autoWidth?: boolean; link: string }) {
  return (
    <>
      <div
        className={`h-[316px] cursor-pointer transition-colors hover:bg-whiteHover  ${
          props.autoWidth ? "w-full" : "w-[280px]"
        } bg-whiteMain border-2 border-cardBorder font-mainMedium  rounded-[17px] p-3 pb-14 relative text-blackMain flex justify-center flex-col gap-3 items-center text-[16px] tracking-wider`}
      >
        <Link
          to={"/Search?" + props.link}
          className="absolute w-full h-full top-0 left-0"
        ></Link>
        {t("global.titles.see_more")}
        <PlusIcon className="h-[20px] [&>path]:fill-blackMain " />
      </div>
    </>
  );
}
