import { useEffect, useState } from "react";
import {
  BookmarkIcon,
  RoomIcon,
  SquareFrameIcon,
} from "../../assets/icons/Icons";
import { TProductData } from "../../pages/Profile/components/MyProducts";
import { getCurrency } from "../convertors/convertors";
import numeral from "numeral";
import {
  addFavorite,
  checkFavorite,
  removeFavorite,
} from "../../hooks/serverFunctions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Card(props: {
  autoWidth?: boolean;
  product: TProductData;
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
        className={`h-auto ${
          loaded ? "" : "invisible max-w-0 overflow-hidden"
        }  ${
          props.autoWidth ? "w-full" : "w-[280px]"
        } bg-whiteMain border-2 border-cardBorder rounded-normal p-3 pb-14 relative`}
      >
        <Link to={"/product/" + props.product.id} className=" rounded-2xl">
          <div className="w-full h-[200px] rounded-normal bg-whiteLoad relative overflow-hidden">
            {props.product.estate_vip == 2 ? (
              <div className="absolute h-[25px] w-[60px] select-none bg-redI rounded-md flex items-center justify-center text-Asmaller font-mainBold text-buttonText tracking-wider cursor-default top-2 right-2 z-[3]">
                VIP+
              </div>
            ) : props.product.estate_vip == 1 ? (
              <div className="absolute h-[25px] w-[60px] select-none bg-orangeI rounded-md flex items-center justify-center text-Asmaller font-mainBold text-buttonText tracking-wider cursor-default top-2 right-2 z-[3]">
                VIP
              </div>
            ) : (
              props.product.estate_vip == 0 && <></>
            )}
            <img
              src={
                "http://localhost/HomeRentServer/" +
                props.product.estate_active_image
              }
              className="absolute h-full w-full object-cover top-0 left-0 select-none"
              alt="estate-photo"
              onLoad={() => {
                setLoaded(true);
              }}
              loading="lazy"
            />
            <div className="absolute bottom-2 left-2 flex items center gap-2">
              <div className="bg-cardInfoBg backdrop-blur-[2px] rounded-[3px] flex justify-center items-center px-2 py-[6px] text-WhiteFade font-mainSemiBold text-sm">
                <RoomIcon className="h-[18px] mr-3 [&>path]:fill-WhiteFade" />{" "}
                {props.product.estate_rooms}
              </div>
              <div className="bg-cardInfoBg backdrop-blur-[2px] rounded-[3px] flex justify-center items-center px-2 py-[6px] text-WhiteFade font-mainSemiBold text-sm">
                <SquareFrameIcon className="h-[18px] mr-3 [&>path]:stroke-WhiteFade" />{" "}
                {props.product.estate_size}მ²
              </div>
            </div>
          </div>{" "}
        </Link>
        <div className="flex flex-col py-1 pt-2">
          <Link to={"/product/" + props.product.id}>
            <h2 className="text-textHeadCard font-mainSemiBold text-[15px] text-nowrap text-ellipsis w-full overflow-hidden">
              {props.product.estate_title}
            </h2>
          </Link>
          <Link to={"/product/" + props.product.id}>
            <p className="text-textDescCard text-[13px] font-mainRegular mt-[2px]  text-nowrap text-ellipsis w-full overflow-hidden">
              {props.product.estate_city},{" "}
              {props.product.estate_address && props.product.estate_address}
            </p>{" "}
          </Link>
        </div>
        <div className="flex items-center mt-2 bottom-3 w-full absolute left-0 px-3">
          <div className="bg-mainClear text-main w-[120px] h-[30px] flex justify-center items-center rounded-md">
            {numeral(Math.floor(props.product.estate_price))
              .format("0,0")
              .replace(/,/g, " ")}
            {getCurrency(props.product.estate_currency)}
          </div>
          <p className="text-textDescCard font-mainRegular tracking-wide text-[13px] max-w-[90px] mx-3 text-nowrap text-ellipsis w-full overflow-hidden">
            მ² -{" "}
            {numeral(
              Math.floor(props.product.estate_price / props.product.estate_size)
            )
              .format("0,0")
              .replace(/,/g, " ")}
            {getCurrency(props.product.estate_currency)}
          </p>
          <button
            onClick={() => {
              submitFavorite(!favorite);
              setFavorite((state) => !state);
            }}
            className="p-[5px] rounded-md absolute right-3"
          >
            <BookmarkIcon
              className={`h-[20px]  transition-all   ${
                favorite
                  ? "fill-orangeI [&>path]:stroke-orangeI"
                  : "fill-transparent [&>path]:stroke-navIcon"
              }`}
            />
          </button>
        </div>
      </div>
      {!loaded && <CardSkeleton />}
    </>
  );
}
export function CardSkeleton(props: { autoWidth?: boolean }) {
  return (
    <div
      className={`h-auto   ${
        props.autoWidth ? "w-full" : "w-[280px]"
      } bg-whiteMain border-2 border-cardBorder rounded-normal p-3 pb-14 relative`}
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
      <div className="flex flex-col py-1 pt-2">
        <h2 className="text-textHeadCard skeletonLoad font-mainSemiBold text-[15px] text-nowrap text-ellipsis w-10/12 overflow-hidden h-[20px] rounded-md bg-[var(--skeleton1)]">
          {/* header */}
        </h2>
        <p className="text-textDescCard skeletonLoad text-[13px] font-mainRegular mt-[2px]  text-nowrap text-ellipsis w-6/12 overflow-hidden h-[20px] rounded-md bg-[var(--skeleton1)]">
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
