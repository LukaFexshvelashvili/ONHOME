import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { RealEstateTypes } from "./FiltersArray";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { deleteParams, updateParams } from "../../../hooks/routerHooks";
import { currencyConvertor } from "../../../components/convertors/convertors";
import { t } from "i18next";

export function SelectNumbers(props: {
  name?: string;
  setData?: Function;
  defData?: number;
  setDataDispatch?: Function;
  changeParams?: boolean;
  engName?: string;
}) {
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch();
  const [active, setActive] = useState(
    props.defData !== undefined ? props.defData : -1
  );
  const Length = [0, 1, 2, 3, 4, 5, 6, 7, 7];
  useEffect(() => {
    if (props.setDataDispatch) {
      dispatch(props.setDataDispatch(active !== -1 ? active : 0));
    }
  }, [active]);
  const changeProps = (newActive: number) => {
    if (props.engName && props.changeParams && active !== newActive) {
      let newProp: any = {};
      newProp[props.engName] = newActive;
      updateParams(params, setParams, newProp);
      setActive(newActive);
    } else if (props.engName && props.changeParams && active == newActive) {
      deleteParams(params, setParams, props.engName);
      setActive(-1);
    } else {
      setActive(newActive);
    }
  };

  useEffect(() => {
    if (props.engName) {
      const searchType = params.get(props.engName);
      if (searchType) {
        setActive(parseInt(searchType));
      } else if (!searchType) {
        setActive(-1);
      }
    }
  }, [params]);
  return (
    <div className="flex flex-col items-center">
      {props.name && (
        <p className=" text-textHead tracking-wider font-mainBold  mb-4">
          {props.name}
        </p>
      )}
      <div className="flex gap-3 flex-wrap justify-center">
        {Length.map((e, i) => (
          <button
            key={i}
            onClick={() => {
              changeProps(i);
              if (props.setData) {
                props.setData(i);
              }
            }}
            className={` h-[36px] text-[15px] aspect-square rounded-circle flex justify-center items-center transition-colors ${
              active == i ? "bg-main text-buttonText" : "bg-mainClear text-main"
            }`}
          >
            {Length.length - 1 !== i ? e : `${e}+`}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SelectType() {
  const [active, setActive] = useState<null | number>(null);

  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const searchType = params.get("estate_type");
    if (searchType) {
      setActive(parseInt(searchType));
    } else if (!searchType) {
      setActive(null);
    }
  }, [params]);

  return (
    <div className="flex flex-col items-center">
      <p className=" text-textHead tracking-wider font-mainBold ">
        {t("filters.type")}
      </p>
      <div className="flex gap-3 flex-wrap justify-center mt-4">
        {RealEstateTypes().map((e, i) => (
          <button
            key={i}
            onClick={() => {
              if (active == i) {
                setActive(null);
                deleteParams(params, setParams, "estate_type");
              } else {
                setActive(i);
                updateParams(params, setParams, { estate_type: i });
              }
            }}
            className={`mobile:w-full mobile:flex mobile:py-[15px] mobile:items-center mobile:justify-center  p-2 px-4 rounded-xl transition-colors ${
              active == i ? "bg-main" : "bg-mainClear"
            }`}
          >
            <e.icon
              className={` h-[24px]  aspect-square ${
                active == i && "[&>path]:fill-buttonText"
              } `}
            />
            <p
              className={`text-Asmall ml-7 mobile:ml-5 tracking-wide ${
                active == i ? "text-buttonText" : "text-main"
              }`}
            >
              {e.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export function PriceSlider(props: { setData?: Function }) {
  const [params, setParams] = useSearchParams();
  const firstRender = useRef<boolean>(true);

  const [Prices, setPrices] = useState<number[]>([-1, -1]);
  const [currency, setCurrency] = useState<number>(0);
  useEffect(() => {
    const searchPrices = params.get("prices");

    if (searchPrices) {
      const getSearchPrices = JSON.parse(searchPrices);
      setPrices([getSearchPrices.start, getSearchPrices.end]);
    }
  }, []);
  useEffect(() => {
    const searchPrices = params.get("prices");

    if (searchPrices && firstRender.current) {
      const getSearchPrices = JSON.parse(searchPrices);
      changeCurrency(getSearchPrices.currency);
    }
    firstRender.current = false;
  }, [Prices[0] >= 0, params]);

  useEffect(() => {
    if (props.setData) {
      props.setData([Prices[0], Prices[1]]);
    }
    if (Prices[1] !== -1) {
      updateParams(params, setParams, {
        prices: JSON.stringify({
          start: Prices[0] == -1 ? 0 : Prices[0],
          end: Prices[1] == -1 ? 0 : Prices[1],
          currency: currency,
        }),
      });
    }
  }, [Prices[0], Prices[1]]);

  const changeCurrency = (newCurrency: number) => {
    setCurrency(newCurrency);
    if (Prices[0] >= 0 && Prices[1] >= 0) {
      setPrices([
        currencyConvertor(Prices[0], currency),
        currencyConvertor(Prices[1], currency),
      ]);
      updateParams(params, setParams, {
        prices: JSON.stringify({
          start: currencyConvertor(Prices[0], currency),
          end: currencyConvertor(Prices[1], currency),
          currency: newCurrency,
        }),
      });
    }
  };
  return (
    <div className="flex flex-col items-center relative w-10/12 mx-auto">
      <p className=" text-textHead tracking-wider font-mainBold ">
        {t("filters.price")}
      </p>{" "}
      <div
        onClick={() => changeCurrency(currency == 0 ? 1 : 0)}
        className={`h-[30px] w-[70px] flex items-center absolute select-none top-0 right-0 outline outline-2 -outline-offset-2 outline-borderCol1 rounded-lg  text-textDescCard cursor-pointer`}
      >
        <div
          className={`flex-1 transition-all h-full flex items-center justify-center font-mainRegular ${
            currency == 0 ? "" : "text-buttonText bg-main rounded-lg relative"
          } `}
        >
          ₾
        </div>
        <div
          className={`flex-1 transition-all h-full flex items-center justify-center font-mainRegular ${
            currency == 0 ? "text-buttonText bg-main rounded-lg relative" : ""
          }`}
        >
          $
        </div>
      </div>
      <div className="flex items-center gap-6 mt-4 mobileSmall:flex-col">
        <div className="flex items-center">
          <input
            type="number"
            className="h-[30px] w-[100px] rounded-md bg-LoginInput text-textHeadCard px-3 outline-none transition-colors focus:bg-LoginInputActive text-[15px]"
            onChange={(e) => {
              if (e.target.valueAsNumber >= 0) {
                setPrices([e.target.valueAsNumber, Prices[1]]);
              } else if (e.target.value == "") {
                setPrices([-1, Prices[1]]);
              }
            }}
            value={Prices[0] == -1 ? "" : Prices[0]}
          />
          <p className="text-Asmall ml-2 text-textDesc">
            {currency == 0 ? "$" : "₾"}{" "}
            {t("filters.from") == "-დან" ? t("filters.from") : "to"}
          </p>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            className="h-[30px] w-[100px] rounded-md bg-LoginInput text-textHeadCard px-3 outline-none transition-colors focus:bg-LoginInputActive text-[15px]"
            onChange={(e) => {
              if (e.target.valueAsNumber >= 0) {
                setPrices([Prices[0], e.target.valueAsNumber]);
              } else if (e.target.value == "") {
                setPrices([Prices[0], -1]);
              }
            }}
            value={Prices[1] == -1 ? "" : Prices[1]}
          />
          <p className="text-Asmall ml-2 text-textDesc">
            {currency == 0 ? "$" : "₾"}{" "}
            {t("filters.to") == "-მდე" ? t("filters.to") : null}
          </p>
        </div>
      </div>
    </div>
  );
}
export function SizeSlider(props: { setData?: Function }) {
  const [params, setParams] = useSearchParams();
  const startCounting = useRef<boolean>(false);
  const firstRender = useRef<boolean>(true);
  const isHectar = useRef<boolean>(false);

  const [Sizes, setSizes] = useState<number[]>([-1, -1]);

  const searchSizes = params.get("sizes");
  useLayoutEffect(() => {
    if (params.get("estate_type") && params.get("estate_type") == "3") {
      isHectar.current = true;
    } else {
      isHectar.current = false;
    }
  }, [params]);
  useEffect(() => {
    if (firstRender.current) {
      if (searchSizes) {
        const getSearchSizes = JSON.parse(searchSizes);
        setSizes([getSearchSizes[0], getSearchSizes[1]]);
      } else if (!searchSizes) {
        setSizes([-1, -1]);
      }
      firstRender.current = false;
    } else if (searchSizes == null) {
      setSizes([-1, -1]);
    }
  }, [searchSizes, params]);

  useEffect(() => {
    if (startCounting.current) {
      setSizes([-1, -1]);

      updateParams(params, setParams, {
        sizes: JSON.stringify([0, 0]),
      });
      if (props.setData) {
        props.setData([Sizes[0], Sizes[1]]);
      }
    } else if (Sizes[1] !== -1) {
      updateParams(params, setParams, {
        sizes: JSON.stringify([Sizes[0] == -1 ? 0 : Sizes[0], Sizes[1]]),
      });
    }
  }, [Sizes[0], Sizes[1]]);
  return (
    <div className="flex flex-col items-center relative w-10/12 mx-auto">
      <p className=" text-textHead tracking-wider font-mainBold ">
        {t("filters.space")}
      </p>

      <div className="flex items-center gap-6 mt-4 mobileSmall:flex-col">
        <div className="flex items-center">
          <input
            type="number"
            className="h-[30px] w-[100px] rounded-md bg-LoginInput text-textHeadCard px-3 outline-none transition-colors focus:bg-LoginInputActive text-[15px]"
            onChange={(e) => {
              if (e.target.valueAsNumber >= 0) {
                setSizes([e.target.valueAsNumber, Sizes[1]]);
              } else if (e.target.value == "") {
                setSizes([-1, Sizes[1]]);
              }
            }}
            value={Sizes[0] == -1 ? "" : Sizes[0]}
          />
          <p className="text-Asmall ml-2 text-textDesc">
            {t("global.m")}²{" "}
            {t("filters.from") == "-დან" ? t("filters.from") : "to"}
          </p>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            className="h-[30px] w-[100px] rounded-md bg-LoginInput  text-textHeadCard px-3 outline-none transition-colors focus:bg-LoginInputActive text-[15px]"
            onChange={(e) => {
              if (e.target.valueAsNumber >= 0) {
                setSizes([Sizes[0], e.target.valueAsNumber]);
              } else if (e.target.value == "") {
                setSizes([Sizes[0], -1]);
              }
            }}
            value={Sizes[1] == -1 ? "" : Sizes[1]}
          />
          <p className="text-Asmall ml-2 text-textDesc">
            {t("global.m")}²{" "}
            {t("filters.to") == "-მდე" ? t("filters.to") : null}
          </p>
        </div>
      </div>
    </div>
  );
}
