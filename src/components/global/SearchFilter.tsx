import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCity } from "../../store/data/addProductSlice";
import axiosCall from "../../hooks/axiosCall";
import { getCacheItem, setCacheItem } from "../cache/cacheFunctions";

function SearchFilter() {
  const [citiesAPI, setCitiesAPI] = useState([]);

  const [search, setSearch] = useState("");
  const [searchWindow, setSearchWindow] = useState(false);
  const [active, setActive] = useState("");
  const dispatch = useDispatch();
  const firstRender = useRef<boolean>(true);

  useLayoutEffect(() => {
    getCacheItem("cities").then((cachedCities) => {
      if (cachedCities == undefined && firstRender.current) {
        firstRender.current = false;
        axiosCall.get("locations/get_cities").then((res) => {
          if (res.status == 200) {
            setCitiesAPI(res.data.subLocs.map((item: any) => item.name.ka));
            setCacheItem(
              "cities",
              res.data.subLocs.map((item: any) => item.name.ka)
            );
          }
        });
      } else {
        setCitiesAPI(cachedCities);
      }
    });
  }, []);

  useEffect(() => {
    if (active !== "" && search !== active) {
      setActive("");
    }
  }, [search]);
  useEffect(() => {
    if (active !== "") {
      setSearch(active);
      setSearchWindow(false);
      dispatch(updateCity(active));
    }
  }, [active]);

  const fetchSearch = () => {
    if (search == "" && citiesAPI !== undefined && citiesAPI.length > 1) {
      return citiesAPI.map((e: string, i: number) => (
        <button
          key={i}
          onClick={() => setActive(e)}
          className={`w-full h-auto py-2 text-start px-5 text-Asmall transition-colors hover:bg-mainClear ${
            active == e ? "text-main" : "text-textHead"
          }`}
        >
          {e}
        </button>
      ));
    } else if (citiesAPI !== undefined && citiesAPI.length > 1) {
      return citiesAPI
        .filter((item: string) => item.includes(search))
        .map((e: string, i: number) => (
          <button
            key={i}
            onClick={() => setActive(e)}
            className={`w-full h-auto py-2 text-start px-5 text-Asmall transition-colors hover:bg-mainClear ${
              active == e ? "text-main" : "text-textHead"
            }`}
          >
            {e}
          </button>
        ));
    }
  };
  return (
    <div className="relative">
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onFocus={() => setSearchWindow(true)}
        type="text"
        className="AddProductInput"
        placeholder="ქალაქი"
      />

      {searchWindow && (
        <div className="absolute h-[200px] w-full rounded-lg bg-whiteMain shadow-sectionShadow z-10 top-[45px] overflow-hidden">
          <div className="flex flex-col h-full overflow-y-scroll">
            {fetchSearch()}
          </div>
        </div>
      )}
    </div>
  );
}
export default memo(SearchFilter);
