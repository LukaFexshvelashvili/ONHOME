import { memo, useEffect, useMemo, useState } from "react";
import {
  FilterFrameIcon,
  FilterHomeIcon,
  FilterPlaceIcon,
  MoneyIcon,
  PopupCloseIcon,
  RoomIcon,
  SearchIcon,
  SellIcon,
} from "../../../assets/icons/Icons";
import {
  RealEstateTypes,
  TRealEstateTypes,
} from "../../Search/components/FiltersArray";

import {
  InputPriceSlider,
  InputSizeSlider,
  ProjectDealSelectorSearch,
} from "./SearchComponents";
import { useNavigate } from "react-router-dom";
import { SelectNumbers } from "../../Search/components/Filters";
import searchBg from "../../../assets/images/estates/searchBg2.webp";
import HoverTitle from "../../../components/global/HoverTitle";
import SearchPlace from "../../../components/placeSelector/SearchPlace";
import { getDealType } from "../../../components/global/getTypes";
import { t } from "i18next";

type TPriceGet = {
  start: number;
  end: number;
  currency: number;
};

function SearchInput() {
  const navigate = useNavigate();
  const [inputSelect, setInputSelect] = useState<null | number>(null);
  const [getType, setGetType] = useState<null | string>(null);
  const [getDeal, setGetDeal] = useState<null | number>(null);
  const [getLocation, setGetLoaction] = useState<{
    city: string;
    district: string;
    urban: string;
  }>({ city: "", district: "", urban: "" });
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [getSizes, setGetSizes] = useState<null | number[]>(null);
  const [getRooms, setGetRooms] = useState<number | null>(null);
  const [getPrices, setGetPrices] = useState<null | TPriceGet>(null);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (getType) {
      const TypeIndex: number = RealEstateTypes().findIndex(
        (item: TRealEstateTypes) => item.name == getType
      );
      if (TypeIndex !== -1) {
        params.append("estate_type", JSON.stringify(TypeIndex));
      }
    }
    getLocation.city !== "" && params.append("city", getLocation.city);
    getLocation.district !== "" &&
      params.append("district", getLocation.district);
    getLocation.urban !== "" && params.append("urban", getLocation.urban);
    searchTitle !== "" && params.append("title", searchTitle);
    getSizes && params.append("sizes", JSON.stringify(getSizes));
    getRooms && params.append("rooms", JSON.stringify(getRooms));
    getDeal !== null ? params.append("deal", JSON.stringify(getDeal)) : null;

    getPrices && params.append("prices", JSON.stringify(getPrices));
    navigate(`/search?${params.toString()}`);
  };
  useEffect(() => {
    if (inputSelect !== null) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [inputSelect]);
  const imageElement = useMemo(() => {
    return (
      <img
        src={searchBg}
        className="absolute w-full h-full object-cover top-0 left-0 z-0 object-bottom"
        alt="search_background"
      />
    );
  }, []);
  return (
    <div className="w-full my-4 overflow-hidden  bg-whiteMain rounded-[25px] shadow-sectionShadow">
      <div className="w-full relative  flex gap-3 small:w-auto small:h-auto small:flex-col small:gap-1 flex-wrap mx-auto py-[20px] px-[25px] ">
        {imageElement}
        <div className="absolute w-full h-full object-cover top-0 left-0 bg-[#000000cf] backdrop-blur-[2px] z-0"></div>

        <div className="w-full flex items-center border-2 border-[#ffffff55] rounded-normal overflow-hidden relative h-[45px] small:my-2">
          <form
            className="w-full h-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <input
              type="text"
              placeholder={t("global.placeholders.search")}
              className="w-full h-full px-4  outline-none font-mainRegular bg-transparent text-buttonText tracking-wider text-[14px] transition-colors focus:bg-[#ffffff11]"
              onChange={(e) => setSearchTitle(e.target.value)}
              value={searchTitle}
            />
          </form>
          <div
            onClick={() => setSearchTitle("")}
            className={`absolute h-[28px] aspect-square rounded-md bg-[#ffffff21]  flex items-center justify-center right-2  transition-all ${
              searchTitle == ""
                ? " pointer-events-none cursor-default invisible opacity-0"
                : "cursor-pointer visible opacity-100"
            } hover:bg-whiteCont`}
          >
            <PopupCloseIcon className="h-[10px] aspect-square [&>path]:fill-white" />
          </div>
        </div>

        <div className="relative  rounded-normal flex small:w-full small:h-auto small:flex-col  h-[45px] items-center  w-[calc(100%-72px)] border-2 border-[#ffffff55] overflow-hidden">
          <div className="flex small:border-none beforeInputBlock items-center w-[25%] text-textDesc  small:w-full h-full border-r-2 border-[#ffffff55] cursor-pointer transition-colors hover:bg-[#ffffff11] relative">
            <div
              onClick={() => setInputSelect(7)}
              className="flex h-full items-center gap-2  px-3 w-full small:h-[52px]"
            >
              <SellIcon className=" small:w-[20px] h-[18px] [&>path]:fill-white" />{" "}
              <p className="max-w-[150px] small:max-w-[180px] text-[13px] font-mainRegular text-[#ffffffd3] text-ellipsis overflow-hidden text-nowrap">
                {getDeal !== null
                  ? getDealType(getDeal)
                  : t("global.placeholders.deal")}
              </p>
            </div>
            {getDeal !== null && (
              <button
                onClick={() => setGetDeal(null)}
                className="h-[20px] aspect-square absolute right-2 flex justify-center items-center p-1 z-10"
              >
                <PopupCloseIcon className=" [&>path]:fill-white" />
              </button>
            )}
          </div>
          <div className="flex small:border-none beforeInputBlock items-center w-[25%] text-textDesc  small:w-full h-full border-r-2 border-[#ffffff55] cursor-pointer transition-colors hover:bg-[#ffffff11] relative">
            <div
              onClick={() => setInputSelect(1)}
              className="flex h-full items-center gap-2  px-3 w-full small:h-[52px]"
            >
              <FilterHomeIcon className=" small:w-[20px] h-[16px] [&>path]:fill-white" />{" "}
              <p className="max-w-[150px] text-[13px] font-mainRegular text-[#ffffffd3]">
                {getType ? getType : t("global.placeholders.home")}
              </p>
            </div>
            {getType && (
              <button
                onClick={() => setGetType(null)}
                className="h-[20px] aspect-square absolute right-2 flex justify-center items-center p-1 z-10"
              >
                <PopupCloseIcon className=" [&>path]:fill-white" />
              </button>
            )}
          </div>
          <div className="flex small:border-none beforeInputBlock items-center w-[25%] text-textDesc  small:w-full h-full border-r-2 border-[#ffffff55] cursor-pointer transition-colors hover:bg-[#ffffff11] relative">
            <div
              onClick={() => setInputSelect(2)}
              className="flex h-full items-center gap-2  px-3 w-full small:h-[52px]"
            >
              <FilterPlaceIcon className=" small:w-[20px] h-[16px] [&>path]:fill-white" />{" "}
              <p className="max-w-[150px] text-[13px] font-mainRegular text-[#ffffffd3] overflow-hidden text-nowrap text-ellipsis">
                {getLocation.city !== ""
                  ? getLocation.district
                    ? getLocation.city + " > " + getLocation.district
                    : getLocation.city
                  : t("global.placeholders.location")}
              </p>
            </div>
            {getLocation.city !== "" && (
              <button
                onClick={() =>
                  setGetLoaction({ city: "", district: "", urban: "" })
                }
                className="h-[20px] aspect-square absolute right-2 flex justify-center items-center p-1 z-10"
              >
                <PopupCloseIcon className=" [&>path]:fill-white" />
              </button>
            )}
          </div>
          <div className="flex small:border-none beforeInputBlock items-center w-[25%] text-textDesc  small:w-full h-full border-r-2 border-[#ffffff55] cursor-pointer transition-colors hover:bg-[#ffffff11] relative">
            <div
              onClick={() => setInputSelect(3)}
              className="flex h-full items-center gap-2  px-3 w-full small:h-[52px]"
            >
              <FilterFrameIcon className=" small:w-[20px] h-[16px] [&>path]:fill-white" />{" "}
              <p className="max-w-[150px] text-[13px] font-mainRegular text-[#ffffffd3]">
                {getSizes
                  ? `${getSizes[0]} ${t("global.placeholders.m")}² - ${
                      getSizes[1]
                    } ${t("global.placeholders.m")}²`
                  : t("global.placeholders.space")}
              </p>
            </div>
            {getSizes && (
              <button
                onClick={() => setGetSizes(null)}
                className="h-[20px] aspect-square absolute right-2 flex justify-center items-center p-1 z-10"
              >
                <PopupCloseIcon className=" [&>path]:fill-white" />
              </button>
            )}
          </div>
          <div className="flex small:border-none beforeInputBlock items-center w-[25%] text-textDesc  small:w-full h-full border-r-2 border-[#ffffff55] cursor-pointer transition-colors hover:bg-[#ffffff11] relative">
            <div
              onClick={() => setInputSelect(4)}
              className="flex h-full items-center gap-2  px-3 w-full small:h-[52px]"
            >
              <MoneyIcon className=" h-[18px] small:w-[20px] [&>path]:fill-white" />{" "}
              <p className="max-w-[150px] text-[13px] font-mainRegular text-[#ffffffd3]">
                {getPrices
                  ? `${getPrices.start}${
                      getPrices.currency == 0 ? "$" : "₾"
                    } - ${getPrices.end}${getPrices.currency == 0 ? "$" : "₾"}`
                  : t("global.placeholders.price")}
              </p>
            </div>
            {getPrices && (
              <button
                onClick={() => setGetPrices(null)}
                className="h-[20px] aspect-square absolute right-2 flex justify-center items-center p-1 z-10"
              >
                <PopupCloseIcon className=" [&>path]:fill-white" />
              </button>
            )}
          </div>
          <div className="flex small:border-none items-center w-[25%] text-textDesc  small:w-full h-full cursor-pointer transition-colors hover:bg-[#ffffff11] relative">
            <div
              onClick={() => setInputSelect(5)}
              className="flex h-full items-center gap-2  px-3 w-full small:h-[52px]"
            >
              <RoomIcon className=" small:w-[20px] h-[18px] translate-y-[1px] [&>path]:fill-white" />{" "}
              <p className="max-w-[150px] text-[13px] font-mainRegular text-[#ffffffd3]">
                {getRooms !== null
                  ? `${getRooms} ${t("global.placeholders.room")}`
                  : t("global.placeholders.rooms")}
              </p>
            </div>
            {getRooms !== null ? (
              <button
                onClick={() => setGetRooms(null)}
                className="h-[20px] aspect-square absolute right-2 flex justify-center items-center p-1 z-10"
              >
                <PopupCloseIcon className=" [&>path]:fill-white" />
              </button>
            ) : null}
          </div>

          {inputSelect && (
            <div
              className={`fixed left-2/4 -translate-x-2/4 -translate-y-2/4 top-2/4 bg-whiteMain rounded-section shadow-sectionShadow p-4 small:pt-1 small:pb-4  ${
                inputSelect == 2 ? "max-w-[1200px]" : "max-w-[800px]"
              } w-[90%] mx-auto z-[21] small:top-2/4 small:-translate-y-2/4`}
            >
              <button
                onClick={() => setInputSelect(null)}
                className="h-[26px] aspect-square  absolute top-3 right-3 flex justify-center items-center p-1"
              >
                <PopupCloseIcon className=" [&>path]:fill-whiteCont" />
              </button>
              {inputSelect == 1 ? (
                <>
                  <p className="text-textHead text-[14px] w-full text-center small:text-center small:w-full small:mt-6 small:mb-2">
                    {t("global.titles.choose_real_estate_type")}
                  </p>
                  <SelectType
                    setData={setGetType}
                    closeWindow={setInputSelect}
                  />
                </>
              ) : inputSelect == 2 ? (
                <>
                  <p className="text-textHead text-[14px] w-full text-center small:text-center small:w-full small:mt-6 small:mb-2">
                    {t("global.titles.choose_location")}
                  </p>
                  <SearchPlace
                    setData={setGetLoaction}
                    closeWindow={setInputSelect}
                  />
                </>
              ) : inputSelect == 3 ? (
                <>
                  <p className="text-textHead text-[14px] w-wull text-center small:text-center small:w-full small:mt-6 small:mb-2">
                    {t("global.titles.choose_space")}
                  </p>
                  <InputSizeSlider
                    setData={setGetSizes}
                    closeWindow={setInputSelect}
                    toFull
                  />
                </>
              ) : inputSelect == 4 ? (
                <>
                  <p className="text-textHead text-[14px] w-full text-center small:text-center small:w-full small:mt-6 small:mb-2">
                    {t("global.titles.choose_price")}
                  </p>
                  <InputPriceSlider
                    setData={setGetPrices}
                    closeWindow={setInputSelect}
                    toFull
                  />
                </>
              ) : inputSelect == 5 ? (
                <>
                  <p className="text-textHead text-[14px] w-full text-center small:text-center small:w-full small:mt-6 small:mb-2">
                    {t("global.titles.choose_rooms")}
                  </p>
                  <SelectRooms
                    setData={setGetRooms}
                    closeWindow={setInputSelect}
                  />
                </>
              ) : inputSelect == 7 ? (
                <>
                  <p className="text-textHead text-[14px] w-full text-center small:text-center small:w-full small:mt-6 small:mb-2">
                    {t("global.titles.choose_deal")}
                  </p>
                  <div className="flex flex-wrap justify-center small:flex-col gap-2 mt-5">
                    <ProjectDealSelectorSearch
                      setData={setGetDeal}
                      addFunction={() => setInputSelect(null)}
                      active={getDeal}
                    />
                  </div>
                </>
              ) : null}
            </div>
          )}
        </div>
        <button
          onClick={handleSearch}
          className={`relative group small:hidden h-[45px] w-[60px] text-[14px] z-10 small:w-full small:py-3 small:mt-2 small:rounded-normal font-mainMedium rounded-[6px] text-buttonText bg-main flex items-center justify-center tracking-widest transition-all hover:bg-mainHover`}
        >
          <SearchIcon className="h-[16px] aspect-square " />
          <HoverTitle title={t("global.search")} top />
        </button>
        <button
          onClick={handleSearch}
          className={`hidden h-full z-[1] text-[14px] w-full py-3 mt-2 rounded-normal font-mainMedium  rounded-r-[6px] text-buttonText bg-main small:flex items-center justify-center tracking-widest  transition-all hover:bg-mainHover  `}
        >
          <SearchIcon className="h-[16px] aspect-square mr-2" />{" "}
          {t("global.search")}
        </button>
        {inputSelect && (
          <div
            onClick={() => setInputSelect(null)}
            className="fixed h-full w-full aspect-square bg-blackFade top-0 left-0 z-20 "
          ></div>
        )}
      </div>
    </div>
  );
}
export default memo(SearchInput);

function SelectRooms(props: { setData: Function; closeWindow: Function }) {
  const [room, setRoom] = useState<number>(-2);
  useEffect(() => {
    if (room !== -2) {
      if (room !== -1) {
        props.setData(room);
        props.closeWindow(null);
      } else if (room == -1) {
        props.setData(null);
        props.closeWindow(null);
      }
    }
  }, [room]);

  return (
    <>
      <div className="flex flex-col w-full mt-6 gap-y-2">
        <SelectNumbers setData={setRoom} />
      </div>
    </>
  );
}

function SelectType(props: { setData: Function; closeWindow: Function }) {
  const [active, setActive] = useState(-1);
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-3 flex-wrap justify-center mt-4">
        {RealEstateTypes().map(
          (
            e: { icon: (props: any) => JSX.Element; name: string },
            i: number
          ) => (
            <button
              key={i}
              onClick={() => {
                setActive(i);
                props.setData(e.name);
                props.closeWindow(null);
              }}
              className={`  p-2 px-4 rounded-xl transition-colors ${
                active == i ? "bg-main" : "bg-mainClear"
              }`}
            >
              <e.icon
                className={` h-[24px] aspect-square ${
                  active == i && "[&>path]:fill-whiteMain"
                } `}
              />
              <p
                className={`text-Asmall ml-7 tracking-wide ${
                  active == i ? "text-whiteMain" : "text-main"
                }`}
              >
                {e.name}
              </p>
            </button>
          )
        )}
      </div>
    </div>
  );
}
