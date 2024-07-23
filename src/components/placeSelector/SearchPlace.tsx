import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { getCacheItem, setCacheItem } from "../cache/cacheFunctions";
import axiosCall from "../../hooks/axiosCall";
import { Tlocation } from "../../store/data/addProductSlice";

function SearchPlace(props: {
  setData: Function;
  closeWindow?: Function;
  defData?: Tlocation | any;
}) {
  const [districtSearch, setDistrictSearch] = useState<string>(
    props.defData?.district ? props.defData.district : ""
  );
  const [citySearch, setCitySearch] = useState<string>(
    props.defData?.city ? props.defData.city : ""
  );
  const firstRender = useRef<boolean>(true);
  const [city, setCity] = useState<string>(
    props.defData?.city ? props.defData.city : ""
  );
  const [urban, setUrban] = useState<string>(
    props.defData?.urban ? props.defData.urban : ""
  );
  const [district, setDistrict] = useState<string>(
    props.defData?.district ? props.defData.district : ""
  );

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
    setDistrict("");
    setDistrictSearch("");
    setUrban("");
  }, [city]);
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
    props.setData({ city: city, district: district, urban: urban });
    if (props.closeWindow) {
      props.closeWindow();
    }
  };

  return (
    <>
      {locationsAPI && locationsAPI.length > 1 ? (
        <div className="flex gap-2 mt-3 small:flex-col small:gap-0">
          <div className="w-[30%]  small:w-full">
            <input
              type="text"
              placeholder="ქალაქი"
              className="text-blackMain mt-6 small:mt-2 text-[14px] small:text-[13px] h-[40px] w-full bg-LoginInput outline-none rounded-lg px-4 transition-colors focus:bg-LoginInputActive my-3"
              onChange={(e) => setCitySearch(e.target.value)}
              value={citySearch}
            />
            <div className="border-r-2 border-lineBg pr-1">
              <div className="smScroll gap-2 grid-cols-1 grid small:grid-cols-3 searchCardLow:grid-cols-2 mobileSmallest:grid-cols-1 justify-center items-middle min-h-[400px] max-h-[400px] small:min-h-[150px] small:max-h-[150px] overflow-auto pr-2">
                <GetCities
                  search={citySearch}
                  city={city}
                  setCity={setCity}
                  locationsAPI={locationsAPI}
                />
              </div>
            </div>
          </div>
          <div className="w-[70%] small:w-full">
            <input
              type="text"
              placeholder="რაიონი"
              className="text-blackMain mt-6 small:mt-2 text-[14px] small:text-[13px] h-[40px] w-full bg-LoginInput outline-none rounded-lg px-4 transition-colors focus:bg-LoginInputActive my-3"
              onChange={(e) => setDistrictSearch(e.target.value)}
              value={districtSearch}
            />
            {city !== "" ? (
              <div className="smScroll  small:justify-center flex flex-wrap  gap-2.5 h-auto max-h-[400px] small:min-h-[150px] small:max-h-[150px] overflow-auto pr-2">
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
                აირჩიეთ ქალაქი
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className=" text-center text-textHead my-5">იტვირთება...</p>
      )}
      <div className="h-[70px] w-full flex items-center justify-start flex-col gap-3 small:justify-end small:flex-row small:items-center mobileSmall:border-t border-lineBg mobileSmall:flex-col mobileSmall:h-[80px] mobileSmall:justify-center">
        <p className="text-center text-textHead text-[12px] font-mainRegular translate-y-1 small:translate-y-0">
          {city !== ""
            ? district !== ""
              ? urban
                ? city + " > " + district + " > " + urban
                : city + " > " + district
              : city
            : null}
        </p>

        <button
          onClick={() => {
            submitLocations();
          }}
          className=" DefButton"
        >
          დადასტურება
        </button>
      </div>
    </>
  );
}

export default memo(SearchPlace);

function GetDistricts(props: {
  setDistrict: Function;
  setUrban: Function;
  district: string;
  urban: string;
  city: string;
  search: string;
  locationsAPI: any;
}) {
  return (
    <>
      {props.city !== "" &&
        props.locationsAPI
          .filter((cities: any) => cities.display_name == props.city)[0]
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
                onClick={() =>
                  props.setDistrict((state: string) =>
                    state !== item.display_name ? item.display_name : ""
                  )
                }
                className={`flex items-center rounded-lg px-2 py-1 min-h-[26px] text-textHead font-mainRegular text-[13px] cursor-pointer transition-colors ${
                  props.district == item.display_name
                    ? "bg-whiteHover"
                    : "bg-whiteMani"
                } duration-150 hover:bg-whiteHover`}
              >
                {item.display_name}
              </div>

              {item.urbans.map((urban_item: any) => (
                <div
                  key={urban_item.id}
                  onClick={() => {
                    props.setDistrict(item.display_name);
                    props.setUrban((state: string) =>
                      state !== urban_item.display_name
                        ? urban_item.display_name
                        : ""
                    );
                  }}
                  className={`flex items-center rounded-lg  px-2 py-1 min-h-[26px] text-textDescCard font-mainRegular text-[12px] cursor-pointer transition-colors ${
                    props.urban == urban_item.display_name
                      ? "bg-whiteHover"
                      : "bg-whiteMani"
                  } duration-150 hover:bg-whiteHover`}
                >
                  {urban_item.display_name}
                </div>
              ))}
            </div>
          ))}
    </>
  );
}

function GetCities(props: {
  setCity: Function;
  city: string;
  search: string;
  locationsAPI: any;
}) {
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
            onClick={() =>
              props.setCity((state: string) =>
                state !== item.display_name ? item.display_name : ""
              )
            }
            className={`small:w-full text-center justify-center bg-whiteLower select-none flex items-center rounded-lg px-2 py-2 min-h-[30px] small:min-h-[24px] small:text-[12px] text-textHead font-mainRegular text-[14px] cursor-pointer transition-colors ${
              props.city == item.display_name ? "bg-whiteHover" : "bg-whiteMani"
            } duration-150 hover:bg-whiteHover`}
          >
            {item.display_name}
          </div>
        ))}
    </>
  );
}
