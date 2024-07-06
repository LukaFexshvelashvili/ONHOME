import numeral from "numeral";
import {
  BedIcon,
  BookmarkIcon,
  RoomIcon,
  SquareFrameIcon,
  StairsIcon,
} from "../../../assets/icons/Icons";
import { TProductCard } from "../../../components/global/Card";
import { getDealType } from "../../../components/global/getTypes";
import { image_url_start } from "../../../hooks/axiosCall";
import { useEffect, useState } from "react";
import { currencyConvertor } from "../../../components/convertors/convertors";
import {
  addFavorite,
  checkFavorite,
  removeFavorite,
} from "../../../hooks/serverFunctions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FormatTime } from "../../../components/global/Addons";

export default function SearchCard({ product }: { product: TProductCard }) {
  const [currency, setCurrency] = useState(0);
  const [favorite, setFavorite] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [price, setPrice] = useState<{ full: number; perSize: number }>({
    full: Math.floor(product.estate_price),
    perSize: product.estate_land_size
      ? Math.floor(
          product.estate_price /
            (product.estate_size + product.estate_land_size)
        )
      : Math.floor(product.estate_price / product.estate_size),
  });
  const changeCurrency = (newCurrency: number) => {
    setPrice({
      full: currencyConvertor(price.full, currency),
      perSize: currencyConvertor(price.perSize, currency),
    });
    setCurrency(newCurrency);
  };
  const submitFavorite = (state: boolean) => {
    if (state) {
      addFavorite(dispatch, product.id);
    } else {
      removeFavorite(dispatch, product.id);
    }
  };
  useEffect(() => {
    setFavorite(checkFavorite(product.id));
  }, []);
  return (
    <div
      className={`relative ${
        product.estate_vip == 2
          ? "bg-gradient-to-t from-vipPlusClear from-5% to-60% to-whiteMain border-none shadow-[inset_0px_0px_0px_1.5px_var(--vipPlusHover)]"
          : "bg-whiteMain shadow-[inset_0px_0px_0px_1.5px_var(--cardBorder)]"
      } h-[200px] mediumSmall:h-[170px] searchCardLow:h-[135px] mediumSmallXl:w-full  p-3 searchCardLow:p-0 w-[calc(50%-10px)] rounded-lg border-2 border-cardBorder flex items-center gap-3 searchCardLow:gap-0`}
    >
      <div className="h-full aspect-[1/0.8] mediumSmallXl:aspect-[1/0.65] searchCardLow:aspect-[1/0.85] mobile:aspect-[1/0.8]  rounded-lg bg-whiteHover overflow-hidden shrink-0">
        <Link to={"/product/" + product.id}>
          <img
            src={image_url_start + product.estate_active_image}
            className="h-full w-full object-cover rounded-lg brightness-[85%]"
          />
        </Link>
      </div>
      <button
        onClick={() => {
          submitFavorite(!favorite);
          setFavorite((state) => !state);
        }}
        className=" p-[5px] rounded-md absolute right-3 searchCardLow:right-1 top-3 searchCardLow:top-1"
      >
        <BookmarkIcon
          className={`h-[20px]  transition-all searchCardLow:h-[16px]  ${
            product.estate_vip == 2
              ? favorite
                ? "fill-vipPlusI [&>path]:stroke-vipPlusI"
                : "fill-transparent [&>path]:stroke-vipPlusI"
              : favorite
              ? "fill-orangeI [&>path]:stroke-orangeI"
              : "fill-transparent [&>path]:stroke-navIcon"
          }`}
        />
      </button>
      <div className="flex flex-col h-full py-1 pb-0 gap-1 w-full searchCardLow:pr-2 searchCardLow:p-2 searchCardLow:gap-0">
        <Link className="w-min" to={"/product/" + product.id}>
          <h3 className="font-mainSemiBold tracking-wider text-textHeadCard searchCardLow:text-[13px] text-[15px]  w-min text-nowrap overflow-hidden text-ellipsis max-w-[130px]">
            {product.estate_title}
          </h3>
        </Link>
        <p
          className={`${
            product.estate_vip == 2 ? "text-vipPlusI" : "text-main"
          } font-mainSemiBold tracking-[1.5px] text-[12px] searchCardLow:text-[11px]`}
        >
          {getDealType(product.estate_deal)}
        </p>
        <div className="flex gap-2 searchCardLow:gap-3 items-center mt-1 mobile:flex-wrap  searchCardLow:mb-1">
          <div className="flex text-textDescCard items-center text-[12px] searchCardLow:text-[12px] searchCardLow:tracking-wider searchCardLow:font-mainMedium rounded-md border border-cardBorder py-1 px-2 searchCardLow:border-none searchCardLow:px-0  ">
            <div className="h-[16px] searchCardLow:h-[14px] aspect-square mr-2 searchCardLow:mr-1">
              <SquareFrameIcon className="[&>path]:stroke-textDescCard [&>path]:fill-textDescCard" />
            </div>
            {product.estate_size}მ²
          </div>
          <div className="flex text-textDescCard items-center text-[12px] searchCardLow:text-[12px] searchCardLow:tracking-wider searchCardLow:font-mainMedium rounded-md border border-cardBorder py-1 px-2 searchCardLow:border-none searchCardLow:px-0  ">
            <div className="h-[16px] searchCardLow:h-[14px] aspect-square mr-2 searchCardLow:mr-1">
              <RoomIcon className="[&>path]:fill-textDescCard" />
            </div>
            {product.estate_rooms}
          </div>
          <div className="flex text-textDescCard items-center text-[12px] searchCardLow:text-[12px] searchCardLow:tracking-wider searchCardLow:font-mainMedium rounded-md border border-cardBorder py-1 px-2 searchCardLow:border-none searchCardLow:px-0  ">
            <div className="h-[16px] searchCardLow:h-[14px] aspect-square mr-2 searchCardLow:mr-1">
              <BedIcon className="[&>path]:fill-textDescCard" />
            </div>
            {product.estate_bedrooms}
          </div>
          <div className="searchCardLow:hidden flex text-textDescCard items-center text-[12px] rounded-md border border-cardBorder py-1 px-2 searchCardLow:border-none searchCardLow:px-0  ">
            <div className="h-[16px]  aspect-square mr-2 searchCardLow:mr-1">
              <StairsIcon className="[&>path]:stroke-textDescCard" />
            </div>
            {product.estate_floor} / {product.estate_floors}
          </div>
        </div>
        <div className="mt-auto w-full">
          <div className="flex items-center justify-between w-full">
            <p className="text-textDescCard font-mainMedium tracking-wider text-[12px] medium:text-[11px] max-w-[60px] overflow-hidden text-ellipsis text-nowrap">
              {product.estate_city}
              <span className="searchCardLow:hidden">
                {product.estate_district && ", " + product.estate_district}
              </span>
            </p>
            <p className="text-textDescCard font-mainMedium tracking-wider text-[12px] medium:text-[11px]">
              {FormatTime(product.update_time.toString())}
            </p>{" "}
          </div>
          <div className="border-t border-cardBorder mt-1"></div>
          <div className="flex items-center h-[42px] searchCardLow:h-auto">
            <div
              onClick={() => changeCurrency(currency == 0 ? 1 : 0)}
              className={`  h-[28px] w-[60px] searchCardLow:h-[20px] searchCardLow:w-[44px] flex items-center overflow-hidden select-none outline text-[14px] searchCardLow:text-[12px] outline-2 -outline-offset-2 outline-borderCol1 rounded-lg  text-textDescCard cursor-pointer`}
            >
              <div
                className={`flex-1 transition-all h-full flex items-center justify-center font-mainRegular ${
                  currency == 0
                    ? ""
                    : product.estate_vip == 2
                    ? "text-buttonText bg-vipPlusI rounded-lg relative"
                    : "text-buttonText bg-main rounded-lg relative"
                } `}
              >
                ₾
              </div>
              <div
                className={`flex-1 transition-all h-full flex items-center justify-center font-mainRegular ${
                  currency == 0
                    ? product.estate_vip == 2
                      ? "text-buttonText bg-vipPlusI rounded-lg relative"
                      : "text-buttonText bg-main rounded-lg relative"
                    : ""
                }`}
              >
                $
              </div>
            </div>

            <div className="flex items-center gap-4 medium:gap-2 ml-auto searchCardLow:gap-1 searchCardLow:justify-end">
              <p className="text-[12px] font-mainMedium tracking-wide text-textDescCard medium:text-[11px] searchCardLow:text-[10px] searchCardLow:tracking-normal ">
                1 მ² - {numeral(price.perSize).format("0,0").replace(/,/g, " ")}{" "}
                {currency == 0 ? "$" : currency == 1 ? "₾" : ""}
              </p>
              <div
                className={`${
                  product.estate_vip == 2
                    ? "bg-vipPlusClear text-vipPlusI"
                    : "bg-mainClear text-main"
                }  w-[120px] medium:w-[100px] h-[30px] flex justify-center items-center rounded-[5px]  searchCardLow:w-min searchCardLow:text-nowrap searchCardLow:bg-transparent `}
              >
                <p className="text-[16px] font-mainSemiBold medium:text-[14px] mobileSmall:text-[13px] searchCardLow:tracking-normal searchCardLow:text-[14px]">
                  {numeral(price.full).format("0,0").replace(/,/g, " ")}{" "}
                  {currency == 0 ? "$" : currency == 1 ? "₾" : ""}
                </p>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
