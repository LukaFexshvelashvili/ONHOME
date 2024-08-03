import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { getCacheItem, setCacheItem } from "../cache/cacheFunctions";
import axiosCall from "../../hooks/axiosCall";
import { Tlocation } from "../../store/data/addProductSlice";
import { useTranslation } from "react-i18next";
import { PopupCloseIcon } from "../../assets/icons/Icons";

function SearchPlace(props: {
  setData: Function;
  closeWindow?: Function;
  defData?: Tlocation | any;
  forParams?: boolean;
}) {
  const { t } = useTranslation();
  const [districtSearch, setDistrictSearch] = useState<string>("");
  const [citySearch, setCitySearch] = useState<string>(
    props.defData?.display.city ? props.defData.display.city : ""
  );
  const firstRender = useRef<boolean>(true);
  const [city, setCity] = useState<any>({
    ka: props.defData?.city ? props.defData.city : "",
    display: props.defData?.display.city ? props.defData.display.city : "",
  });
  const [urban, setUrban] = useState<any>({
    ka: props.defData?.urban ? props.defData.urban : "",
    display: props.defData?.display.urban ? props.defData.display.urban : "",
  });
  const [district, setDistrict] = useState<any>({
    ka: props.defData?.district ? props.defData.district : "",
    display: props.defData?.display.district
      ? props.defData.display.district
      : "",
  });
  const [locationsAPI, setLocationsAPI] = useState<any>([]);
  useLayoutEffect(() => {
    getCacheItem("locations").then((cachedLocations) => {
      if (cachedLocations == undefined && firstRender.current) {
        firstRender.current = false;
        axiosCall.get("locations/get_cities").then((res) => {
          if (res.status == 200) {
            let parsedData = JSON.parse(res.data);
            if (parsedData.success) {
              setLocationsAPI(parsedData.data);

              setCacheItem("locations", parsedData.data);
            }
          }
        });
      } else {
        setLocationsAPI(cachedLocations);
      }
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        submitLocations();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [city, district, urban]);
  const submitLocations = () => {
    if (props.forParams) {
      props.setData({
        city: city.ka,
        district: district.ka,
        urban: urban.ka,
        display: {
          city: city.display,
          district: district.display,
          urban: urban.display,
        },
        displaySearch: JSON.stringify({
          city: city.display,
          district: district.display,
          urban: urban.display,
        }),
      });
    } else {
      props.setData({
        city: city.ka,
        district: district.ka,
        urban: urban.ka,
        display: {
          city: city.display,
          district: district.display,
          urban: urban.display,
        },
      });
    }

    if (props.closeWindow) {
      props.closeWindow();
    }
  };
  const clearInfo = () => {
    setDistrict({ ka: "", display: "" });
    setDistrictSearch("");
    setUrban({ ka: "", display: "" });
  };
  return (
    <>
      {locationsAPI && locationsAPI.length > 1 ? (
        <div className="flex gap-2 mt-3 small:flex-col small:gap-0">
          <div
            className={`w-[30%]  small:w-full ${
              city.display ? "hideRespo" : ""
            }`}
          >
            <div className="relative flex items-center mt-6 my-3  small:mt-2 ">
              <input
                type="text"
                placeholder={t("filters.city")}
                className="text-blackMain text-[14px] small:text-[13px] h-[40px] w-full bg-LoginInput outline-none rounded-lg px-4 transition-colors focus:bg-LoginInputActive"
                onChange={(e) => setCitySearch(e.target.value)}
                value={citySearch}
              />
              {citySearch !== "" ? (
                <button
                  onClick={() => setCitySearch("")}
                  className="h-[20px] aspect-square absolute right-2 flex justify-center items-center p-1 z-10"
                >
                  <PopupCloseIcon className=" [&>path]:fill-white" />
                </button>
              ) : null}
            </div>
            <div className="border-r-2 border-lineBg pr-1">
              <div className="smScroll auto-rows-auto gap-2 grid-cols-1 grid small:grid-cols-3 searchCardLow:grid-cols-2 mobileSmallest:grid-cols-1 justify-center items-middle min-h-[400px] max-h-[400px] small:min-h-[150px] small:max-h-[250px] overflow-auto pr-2">
                <GetCities
                  search={citySearch}
                  city={city}
                  setCity={setCity}
                  locationsAPI={locationsAPI}
                  clearInfo={clearInfo}
                />
              </div>
            </div>
          </div>
          {city.display ? (
            <div
              onClick={() => {
                clearInfo();
                setCity({ ka: "", display: "" });
              }}
              className={`relative small:w-full h-min text-center justify-center select-none hidden mobile:flex items-center rounded-lg px-2 py-2 min-h-[30px]  small:min-h-[24px] small:text-[12px] font-mainRegular text-[14px] cursor-pointer transition-colors bg-main text-buttonText hover:bg-mainHover duration-150 `}
            >
              {city.display}
              <PopupCloseIcon className="h-[12px] aspect-square absolute right-3  [&>path]:fill-white" />
            </div>
          ) : null}
          <div
            className={`w-[70%] small:w-full ${
              city.display ? "" : "hideRespo"
            } `}
          >
            {" "}
            <div className="relative flex items-center mt-6 my-3 small:mt-2 ">
              <input
                type="text"
                placeholder={t("filters.district")}
                className="text-blackMain text-[14px] small:text-[13px] h-[40px] w-full bg-LoginInput outline-none rounded-lg px-4 transition-colors focus:bg-LoginInputActive"
                onChange={(e) => setDistrictSearch(e.target.value)}
                value={districtSearch}
              />
              {districtSearch !== "" ? (
                <button
                  onClick={() => setDistrictSearch("")}
                  className="h-[20px] aspect-square absolute right-2 flex justify-center items-center p-1 z-10"
                >
                  <PopupCloseIcon className=" [&>path]:fill-white" />
                </button>
              ) : null}{" "}
            </div>
            {city.ka !== "" ? (
              <div className="smScroll  small:justify-center flex flex-wrap  gap-2.5 h-auto max-h-[400px] small:min-h-[150px] small:max-h-[250px] overflow-auto pr-2 mobileSmall:justify-start mobileSmall:pl-5">
                <GetDistricts
                  search={districtSearch}
                  district={district}
                  urban={urban}
                  city={city}
                  setDistrict={setDistrict}
                  setUrban={setUrban}
                  locationsAPI={locationsAPI}
                />
              </div>
            ) : (
              <p className=" text-center text-textHead my-5 text-[14px] ">
                {t("search.choose_city")}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className=" text-center text-textHead my-5">{t("search.loading")}</p>
      )}
      <div className="h-[70px] mobile:h-auto mobile:pt-2 mobile:gap-2 w-full flex items-center justify-start  flex-col gap-3 small:justify-end small:items-center mobileSmall:border-t border-lineBg mobileSmall:flex-col mobileSmall:justify-center">
        <p className="text-center text-textHead text-[12px] font-mainRegular translate-y-1 small:translate-y-0 h-[18px] -translate-x-1 w-full overflow-hidden text-nowrap text-ellipsis">
          {city.display !== ""
            ? district.display !== ""
              ? urban.display
                ? city.display +
                  " > " +
                  district.display +
                  " > " +
                  urban.display
                : city.display + " > " + district.display
              : city.display
            : null}
        </p>
        <div className="flex gap-2 flex-wrap-reverse justify-center items-center">
          <button
            onClick={() => {
              setCitySearch("");
              setDistrictSearch("");
              setCity({ ka: "", display: "" });
              setDistrict({ ka: "", display: "" });
              setUrban({ ka: "", display: "" });
            }}
            className=" DefCloseButton mobile:w-full"
          >
            {t("clear")}
          </button>
          <button
            onClick={() => {
              submitLocations();
            }}
            className=" DefButton mobile:w-full"
          >
            {t("search.confirm")}
          </button>
        </div>
      </div>
    </>
  );
}

export default memo(SearchPlace);

function GetDistricts(props: {
  setDistrict: Function;
  setUrban: Function;
  district: any;
  urban: any;
  city: any;
  search: string;
  locationsAPI: any;
}) {
  const { i18n } = useTranslation();

  return (
    <>
      {props.city.ka !== "" &&
        props.locationsAPI
          .filter((cities: any) => cities.display_name == props.city.ka)[0]
          .districts.filter(
            (district: any) =>
              district.translations.ka.display_name
                .toLowerCase()
                .includes(props.search.toLowerCase()) ||
              district.translations.en.display_name
                .toLowerCase()
                .includes(props.search.toLowerCase()) ||
              district.translations.ru.display_name
                .toLowerCase()
                .includes(props.search.toLowerCase())
          )
          .map((item: any) => (
            <div
              className="flex flex-col h-min justify-start items-start select-none"
              key={item.id}
            >
              <div
                onClick={() => {
                  props.setUrban({ ka: "", display: "" });

                  props.setDistrict((state: any) =>
                    state.ka !== item.display_name
                      ? {
                          ka: item.display_name,
                          display:
                            item.translations[i18n.language].display_name,
                        }
                      : { ka: "", display: "" }
                  );
                }}
                className={`flex items-center rounded-lg px-2 py-1 min-h-[26px] font-mainRegular text-[13px] cursor-pointer transition-colors ${
                  props.district.ka == item.display_name
                    ? "bg-main text-buttonText hover:bg-mainHover"
                    : "text-textHead hover:bg-whiteLow"
                } duration-150 `}
              >
                {item.translations[i18n.language].display_name}
              </div>

              {item.urbans.map((urban_item: any) => (
                <div
                  key={urban_item.id}
                  onClick={() => {
                    props.setDistrict({
                      ka: item.display_name,
                      display: item.translations[i18n.language].display_name,
                    });
                    props.setUrban((state: any) =>
                      state.ka !== urban_item.display_name
                        ? {
                            ka: urban_item.display_name,
                            display:
                              urban_item.translations[i18n.language]
                                .display_name,
                          }
                        : { ka: "", display: "" }
                    );
                  }}
                  className={`flex items-center rounded-lg  px-2 py-1 min-h-[26px]  font-mainRegular text-[12px] cursor-pointer transition-colors ${
                    props.urban.ka == urban_item.display_name
                      ? "bg-main text-buttonText hover:bg-mainHover"
                      : "text-textDescCard hover:bg-whiteLow"
                  } duration-150 `}
                >
                  {urban_item.translations[i18n.language].display_name}
                </div>
              ))}
            </div>
          ))}
    </>
  );
}

function GetCities(props: {
  setCity: Function;
  city: any;
  search: string;
  locationsAPI: any;
  clearInfo: Function;
}) {
  const { i18n } = useTranslation();
  return (
    <>
      {props.locationsAPI
        .filter(
          (cities: any) =>
            cities.translations.ka.display_name
              .toLowerCase()
              .includes(props.search.toLowerCase()) ||
            cities.translations.en.display_name
              .toLowerCase()
              .includes(props.search.toLowerCase()) ||
            cities.translations.ru.display_name
              .toLowerCase()
              .includes(props.search.toLowerCase())
        )
        .map((item: any) => (
          <div
            key={item.id}
            onClick={() => {
              props.clearInfo();
              props.setCity((state: any) =>
                state.ka !== item.display_name
                  ? {
                      ka: item.display_name,
                      display: item.translations[i18n.language].display_name,
                    }
                  : { ka: "", display: "" }
              );
            }}
            className={`small:w-full h-min text-center justify-center select-none flex items-center rounded-lg px-2 py-2 min-h-[30px]  small:min-h-[24px] small:text-[12px] font-mainRegular text-[14px] cursor-pointer transition-colors ${
              props.city.display ==
              item.translations[i18n.language].display_name
                ? "bg-main text-buttonText hover:bg-mainHover"
                : "bg-whiteHover text-textHead hover:bg-whiteLow"
            } duration-150 `}
          >
            {item.translations[i18n.language].display_name}
          </div>
        ))}
    </>
  );
}
