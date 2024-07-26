import { memo, useEffect, useState } from "react";
import {
  projectDealTypes,
  projectStatuses,
  projectTypes,
} from "../../../assets/lists/productAddons";
import { deleteParams, updateParams } from "../../../hooks/routerHooks";
import { useSearchParams } from "react-router-dom";
import { PriceSlider, SelectNumbers, SelectType, SizeSlider } from "./Filters";
import DropDownSelector from "../../../components/global/DropDownSelector";
import SearchPlace from "../../../components/placeSelector/SearchPlace";
import { PopupCloseIcon } from "../../../assets/icons/Icons";
import { t } from "i18next";
function FiltersSection(props: {
  openFilters: boolean;
  setOpenFilters: Function;
  setSearchTitle: Function;
}) {
  const [params, setParams] = useSearchParams();

  const [openLocations, setOpenLocations] = useState(false);

  const paramsData: any = params.get("displaySearch");
  useEffect(() => {
    if (props.openFilters) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [props.openFilters]);
  return (
    <section className="flex justify-center items-center w-full absolute h-full z-20 shadow-none left-0 top-0 invisible">
      {openLocations ? (
        <>
          <div
            onClick={() => setOpenLocations(false)}
            className="fixed aspect-square bg-blackFade w-full h-full top-0 left-0 z-30 visible"
          ></div>
          <div
            className={`fixed left-2/4 -translate-x-2/4 -translate-y-2/4 top-2/4 bg-whiteMain rounded-section shadow-sectionShadow p-4 small:py-0 visible ${
              openLocations ? "max-w-[1200px]" : "max-w-[800px]"
            } w-[90%] mx-auto small:top-2/4 small:-translate-y-2/4 z-40`}
          >
            <button
              onClick={() => setOpenLocations(false)}
              className="h-[26px] aspect-square  absolute top-3 right-3 flex justify-center items-center p-1"
            >
              <PopupCloseIcon className=" [&>path]:fill-whiteCont" />
            </button>
            <SearchPlace
              setData={(locations: any) => {
                updateParams(params, setParams, locations);
              }}
              forParams
              defData={{
                city: params.get("city") ? params.get("city") : "",
                district: params.get("district") ? params.get("district") : "",
                urban: params.get("urban") ? params.get("urban") : "",
                display: {
                  city: paramsData ? JSON.parse(paramsData).city : "",
                  district: paramsData ? JSON.parse(paramsData).district : "",
                  urban: paramsData ? JSON.parse(paramsData).urban : "",
                },
              }}
              closeWindow={() => setOpenLocations(false)}
            />
          </div>
        </>
      ) : null}
      <div
        className={`overflow-hidden  h-full w-full flex justify-center items-center`}
      >
        <div
          onClick={() => props.setOpenFilters(false)}
          className={`fixed  h-full w-full top-0 left-0 bg-blackFade z-10 transition-[opacity,visibility] duration-500  ${
            props.openFilters ? "opacity-100 visible" : "opacity-0 invisible"
          } `}
        ></div>
        <div
          className={`  pb-[30px] rounded-[20px] overflow-hidden h-3/4  mobile:top-1/4 shadow-sectionShadow fixed z-[11] bg-whiteMain mobile:left-0  mobile:w-full transition-all duration-200 ${
            props.openFilters
              ? "mobile:translate-y-0 opacity-100 visible"
              : "mobile:translate-y-full opacity-0 invisible"
          } `}
        >
          <div
            onClick={() => props.setOpenFilters(false)}
            className="mobile:flex sticky top-0 items-center justify-center hidden py-3 h-[50px] translate-y-[-2px] bg-whiteMain z-20"
          >
            <div className=" h-[6px] w-[100px] rounded-md  bg-lineBg mx-auto "></div>
          </div>

          <div className="content_container responsiveFilters mobile:pt-[10px] mobile:pb-[50px] overflow-y-scroll px-5 max-h-full">
            <button
              onClick={() => props.setOpenFilters(false)}
              className="h-[26px] aspect-square  absolute top-3 right-4 flex justify-center items-center p-1 cursor-pointer z-10 mobile:hidden"
            >
              <PopupCloseIcon className=" [&>path]:fill-whiteCont" />
            </button>
            <div className="relative flex flex-col gap-9 pt-5 ">
              {params.size > 0 ? (
                <button
                  onClick={() => {
                    setParams({});

                    props.setSearchTitle("");
                  }}
                  className="absolute top-3 mobile:top-[-10px] right-6 text-buttonText px-3 py-1 rounded-md bg-main text-[12px] tracking-widest font-mainMedium cursor-pointer transition-colors hover:bg-mainHover"
                >
                  {t("filters.delete_filters")}
                </button>
              ) : null}
              <p className=" text-textHead tracking-wider text-center font-mainBold ">
                {t("filters.deal")}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <ProjectDealSelector />
              </div>
              <div className="flex flex-col items-center">
                <p className=" text-textHead tracking-wider font-mainBold ">
                  {t("filters.location")}
                </p>

                <div
                  onClick={() => setOpenLocations(true)}
                  className="cursor-pointer rounded-lg h-[40px]  max-w-[500px] w-full gap-2 flex items-center bg-whiteMain border-2 mt-2 text-textDesc text-[14px] border-lineBg font-mainRegular px-2"
                >
                  <div className=" w-[33%] overflow-hidden max-w-[33%] text-nowrap text-ellipsis">
                    {t("filters.city")}:{" "}
                    {paramsData ? JSON.parse(paramsData).city : "*"}{" "}
                  </div>
                  <div className="h-[50%] w-[2px] bg-lineBg "></div>
                  <div className=" w-[33%] overflow-hidden max-w-[33%] text-nowrap text-ellipsis">
                    {t("filters.district")}:{" "}
                    {paramsData ? JSON.parse(paramsData).district : "*"}{" "}
                  </div>
                  <div className="h-[50%] w-[2px] bg-lineBg "></div>

                  <div className=" w-[33%] overflow-hidden max-w-[33%] text-nowrap text-ellipsis">
                    {t("filters.urban")}:{" "}
                    {paramsData ? JSON.parse(paramsData).urban : "*"}{" "}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className=" text-textHead tracking-wider font-mainBold ">
                  {t("filters.condition")}
                </p>

                <DropDownSelector
                  name={t("filters.choose")}
                  itemsList={projectStatuses()}
                  engName={"condition"}
                  changeParams={true}
                />
              </div>
              <div className="flex flex-col items-center">
                <p className=" text-textHead tracking-wider font-mainBold ">
                  {t("filters.project")}
                </p>

                <DropDownSelector
                  name={t("filters.choose")}
                  itemsList={projectTypes()}
                  engName={"project_type"}
                  changeParams={true}
                />
              </div>
              <PriceSlider />
              <SizeSlider />
              <SelectType />
              <SelectNumbers
                changeParams={true}
                engName="rooms"
                name={t("filters.rooms")}
              />
              <SelectNumbers
                changeParams={true}
                engName="bedrooms"
                name={t("filters.bedrooms")}
              />
              <SelectNumbers
                changeParams={true}
                engName="wet_points"
                name={t("filters.wet_point")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default memo(FiltersSection);
function ProjectDealSelector() {
  const [params, setParams] = useSearchParams();
  const [active, setActive] = useState<null | number>(null);

  useEffect(() => {
    const searchType = params.get("deal");

    if (searchType) {
      setActive(parseInt(searchType));
    } else {
      setActive(null);
    }
  }, [params]);
  return (
    <>
      {projectDealTypes().map((e: string, i: number) => (
        <button
          key={i}
          onClick={() => {
            if (active == i) {
              setActive(null);
              deleteParams(params, setParams, "deal");
            } else {
              setActive(i);
              updateParams(params, setParams, { deal: i });
            }
          }}
          className={`  p-2 px-4 rounded-xl transition-colors ${
            active == i ? "bg-main" : "bg-mainClear"
          }`}
        >
          <p
            className={`text-Asmall tracking-wide ${
              active == i ? "text-buttonText" : "text-main"
            }`}
          >
            {e}
          </p>
        </button>
      ))}
    </>
  );
}
