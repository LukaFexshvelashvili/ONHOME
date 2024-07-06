import { memo, useEffect, useRef, useState } from "react";
import { PopupCloseIcon, SearchIcon } from "../../assets/icons/Icons";

import axiosCall from "../../hooks/axiosCall";
import { TProductCard } from "../../components/global/Card";
import { useDebounce } from "../../hooks/serverFunctions";
import ContentLoader from "../../components/global/ContentLoader";

import { deleteParams, updateParams } from "../../hooks/routerHooks";
import { useSearchParams } from "react-router-dom";
import {
  getSearchCache,
  setSearchCache,
} from "../../components/cache/cacheFunctions";
import { Helmet } from "react-helmet";
import FiltersSection from "./components/FiltersSection";
import SearchCard from "./components/SearchCard";
function Search() {
  const [searched, setSearched] = useState<any>(null);
  const [vipSearched, setVipSearched] = useState<any[] | null>(null);
  const [params, setParams] = useSearchParams();
  const [loader, setLoader] = useState<boolean>(false);
  const [pages, setPages] = useState<number>(1);
  const [openFilters, setOpenFilters] = useState<boolean>(false);

  const cachedFirst = useRef<any[]>([]);
  const getFullCount = useRef<number>(0);
  const lastDebouncedSearch = useRef<string | null>(null);
  const [activePage, setActivePage] = useState<number>(() => {
    const page = params.get("page");
    return page !== null ? parseInt(page) : 1;
  });

  const [searchTitle, setSearchTitle] = useState<string>(() => {
    const title = params.get("title");
    return title !== null ? title : "";
  });
  const debouncedSearch = useDebounce(location.search, 300);

  const afterSearchActions = (fetchedData: any) => {
    setSearched(fetchedData.products);
    if (fetchedData.vipProducts && fetchedData.vipProducts.length > 5) {
      setVipSearched(fetchedData.vipProducts.slice(0, 5));
    } else if (fetchedData.vipProducts) {
      setVipSearched(fetchedData.vipProducts);
    }
    setPages(Math.ceil(fetchedData.length / fetchedData.per_page_length));

    getFullCount.current = fetchedData.length;
    if (
      (activePage < 1 ||
        activePage >
          Math.ceil(fetchedData.length / fetchedData.per_page_length)) &&
      params.get("page")
    ) {
      deleteParams(params, setParams, "page");
    }
  };

  useEffect(() => {
    setSearched(null);
    setVipSearched(null);
  }, [location.search]);

  useEffect(() => {
    if (debouncedSearch !== lastDebouncedSearch.current) {
      getSearchCache(debouncedSearch).then((res: any) => {
        if (res !== null) {
          afterSearchActions(res);
          setLoader(false);
        } else {
          axiosCall.get(`fetch/search${debouncedSearch}`).then((res) => {
            if (res.data.status == 100) {
              setSearchCache(debouncedSearch, res.data);

              afterSearchActions(res.data);
            }
            setLoader(false);
          });
        }
      });
      if (activePage < 1) {
        deleteParams(params, setParams, "page");
        setActivePage(1);
      }
      lastDebouncedSearch.current = debouncedSearch;
    }
  }, [debouncedSearch]);

  const titleSubmit = () => {
    if (searchTitle !== "") {
      updateParams(params, setParams, { title: searchTitle });
    } else {
      if (params.get("title")) {
        deleteParams(params, setParams, "title");
      }
    }
  };

  useEffect(() => {
    if (activePage !== 1) {
      setSearched([]);
    } else {
      setSearched(cachedFirst.current);
    }
  }, [activePage]);
  const fetchPageButtons = () => {
    const buttons = []; // Create an array to hold the buttons
    if (pages > 1) {
      for (let i = 1; i <= pages; i++) {
        buttons.push(
          <button
            key={i}
            className={`h-[32px] aspect-square text-[15px] text-buttonText ${
              activePage == i ? "bg-main" : "bg-whiteHover"
            } rounded-md flex items-center justify-center`}
            onClick={() => {
              window.scrollTo(0, 0);

              if (i == 1) {
                deleteParams(params, setParams, "page");
              } else {
                updateParams(params, setParams, { page: i });
              }
              setActivePage(i);
            }}
          >
            {i}
          </button>
        );
      }
    }

    return buttons; // Return the array of buttons after the loop
  };

  return (
    <>
      {searchTitle ? (
        <Helmet>
          <title>ძებნა - {searchTitle}</title>
        </Helmet>
      ) : (
        <Helmet>
          <title>ძებნა - OnHome</title>
        </Helmet>
      )}

      <main className="flex gap-4 flex-col">
        <div className="flex gap-2">
          <div className="w-full flex items-center border-2 border-whiteLoad rounded-normal overflow-hidden relative h-[45px]">
            <form
              className="w-full h-full"
              onSubmit={(e) => {
                e.preventDefault();
                titleSubmit();
              }}
            >
              <input
                type="text"
                placeholder="სიტყვით ძებნა..."
                className="w-full h-full px-4 bg-bodyBg outline-none text-blackMain tracking-wider text-[14px] transition-colors focus:bg-whiteLoad"
                onChange={(e) => {
                  setSearchTitle(e.target.value);
                }}
                value={searchTitle}
              />
            </form>

            <div
              onClick={() => {
                if (params.get("title")) {
                  deleteParams(params, setParams, "title");
                }

                setSearchTitle("");
              }}
              className={`absolute h-[28px] aspect-square rounded-md bg-whiteHoverDark  flex items-center justify-center right-2  transition-all ${
                searchTitle == ""
                  ? " pointer-events-none cursor-default invisible opacity-0"
                  : "cursor-pointer visible opacity-100"
              } hover:bg-whiteCont`}
            >
              <PopupCloseIcon className="h-[10px] aspect-square [&>path]:fill-blackMain" />
            </div>
          </div>
          <button
            onClick={() => setOpenFilters((state) => !state)}
            className="h-[45px] w-[60px] text-[14px]   bg-main rounded-[5px] text-buttonText tracking-wider font-mainMedium relative flex items-center justify-center"
          >
            <div className=" flex flex-col h-[25px] aspect-square justify-center items-center gap-1 absolute">
              <span className="h-[2px] rounded-md w-10/12 bg-buttonText block"></span>
              <span className="h-[2px] rounded-md w-8/12 bg-buttonText block"></span>
              <span className="h-[2px] rounded-md w-4/12 bg-buttonText block"></span>
            </div>
          </button>
          <button
            onClick={titleSubmit}
            className=" h-[45px] w-[60px] text-[14px]   font-mainMedium rounded-[6px] text-buttonText bg-main flex items-center justify-center tracking-widest  transition-colors hover:bg-mainHover"
          >
            <SearchIcon className="h-[16px] aspect-square " />
          </button>
        </div>

        <div className="flex gap-5 w-full mediumSmallXl:flex-col">
          <FiltersSection
            openFilters={openFilters}
            setOpenFilters={setOpenFilters}
            setSearchTitle={setSearchTitle}
          />
          <section className="rounded-normal w-full">
            <p className="text-Asmall text-textDesc tracking-wider font-mainSemiBold m-3 mt-0 mobile:text-[12px]">
              {!loader && searched !== null
                ? `ნაპოვნია ${getFullCount.current} შედეგი`
                : ""}
            </p>
            <div className="flex flex-wrap relative min-h-[150px] gap-[10px] gap-y-[15px] searchCardLow:gap-y-[10px] large:justify-center large:gap-5  justify-evenly mediumSmallXl:flex-col">
              {!loader ? (
                <>
                  {vipSearched !== null && vipSearched.length > 0
                    ? vipSearched.map((product: TProductCard) => (
                        <SearchCard key={product.id} product={product} />
                      ))
                    : null}
                  {searched !== null && searched.length > 0
                    ? searched.map((product: TProductCard) => (
                        <SearchCard key={product.id} product={product} />
                      ))
                    : null}
                </>
              ) : (
                <ContentLoader />
              )}
            </div>
            <div className="flex items-center  justify-center gap-4 mt-5">
              {fetchPageButtons()}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
export default memo(Search);
