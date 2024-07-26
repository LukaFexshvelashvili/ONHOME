import { useState } from "react";
import { currencyConvertor } from "../../../components/convertors/convertors";
import { projectDealTypes } from "../../../assets/lists/productAddons";

export function InputSizeSlider(props: {
  setData: Function;
  closeWindow: Function;
  toFull?: boolean;
}) {
  const [Prices, setPrices] = useState<number[]>([0, 0]);

  return (
    <div
      className={`flex flex-col items-center relative  mx-auto ${
        props.toFull ? "w-full max-w-[900px]" : "w-[10/12]"
      }`}
    >
      <div className="flex items-center gap-6 mt-4 mobile:flex-wrap">
        <div className="flex items-center">
          <input
            type="number"
            className="h-[30px] w-[100px] rounded-md bg-LoginInput px-3 outline-none transition-colors text-textHeadCard focus:bg-LoginInputActive text-[15px]"
            onChange={(e) => {
              setPrices([e.target.valueAsNumber, Prices[1]]);
            }}
            value={Prices[0]}
          />
          <p className="text-Asmall ml-2 text-textDesc">მ² -დან</p>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            className="h-[30px] w-[100px] rounded-md bg-LoginInput px-3 outline-none text-textHeadCard transition-colors focus:bg-LoginInputActive text-[15px]"
            onChange={(e) => {
              setPrices([Prices[0], e.target.valueAsNumber]);
            }}
            value={Prices[1]}
          />
          <p className="text-Asmall ml-2 text-textDesc">მ² -მდე</p>
        </div>
      </div>
      <button
        onClick={() => {
          props.setData([Prices[0], Prices[1]]);
          props.closeWindow(null);
        }}
        className="my-1 mt-6 rounded-md bg-main px-8 py-2 text-buttonText tracking-wider transition-colors hover:bg-mainHover"
      >
        დადასტურება
      </button>
    </div>
  );
}
export function InputPriceSlider(props: {
  setData: Function;
  closeWindow: Function;
  toFull?: boolean;
}) {
  const [Prices, setPrices] = useState<number[]>([0, 0]);
  const [currency, setCurrency] = useState<number>(0);

  const changeCurrency = (newCurrency: number) => {
    setCurrency(newCurrency);
    setPrices([
      currencyConvertor(Prices[0], currency),
      currencyConvertor(Prices[1], currency),
    ]);
  };
  return (
    <div
      className={`flex flex-col items-center relative  mx-auto ${
        props.toFull ? "w-full max-w-[900px]" : "w-10/12"
      }`}
    >
      <div
        onClick={() => changeCurrency(currency == 0 ? 1 : 0)}
        className={`h-[30px] w-[70px] flex items-center absolute select-none ${
          props.toFull ? "mt-2" : ""
        }  top-0 right-0 outline outline-2 -outline-offset-2 outline-borderCol1 rounded-lg  text-textDescCard cursor-pointer`}
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
      <div className="flex items-center gap-6 mt-4 mobileTab:flex-wrap ">
        <div className="flex items-center">
          <input
            type="number"
            className="h-[30px] w-[100px] rounded-md bg-LoginInput px-3 outline-none transition-colors text-textHeadCard focus:bg-LoginInputActive text-[15px]"
            onChange={(e) => {
              setPrices([e.target.valueAsNumber, Prices[1]]);
            }}
            value={Prices[0]}
          />
          <p className="text-Asmall ml-2 text-textDesc">
            {currency == 0 ? "$" : "₾"} -დან
          </p>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            className="h-[30px] w-[100px] rounded-md bg-LoginInput px-3 outline-none transition-colors text-textHeadCard focus:bg-LoginInputActive text-[15px]"
            onChange={(e) => {
              setPrices([Prices[0], e.target.valueAsNumber]);
            }}
            value={Prices[1]}
          />
          <p className="text-Asmall ml-2 text-textDesc">
            {currency == 0 ? "$" : "₾"} -მდე
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          props.setData({
            start: Prices[0],
            end: Prices[1],
            currency: currency,
          });
          props.closeWindow(null);
        }}
        className="my-1 mt-6 rounded-md bg-main px-8 py-2 text-buttonText tracking-wider transition-colors hover:bg-mainHover"
      >
        დადასტურება
      </button>
    </div>
  );
}
export function ProjectDealSelectorSearch(props: {
  setData: Function;
  addFunction?: Function;
  active?: number | null;
}) {
  const [active, setActive] = useState<null | number>(
    props.active ? props.active : null
  );

  return (
    <>
      {projectDealTypes().map((e: string, i: number) => (
        <button
          key={i}
          onClick={() => {
            if (active == i) {
              props.setData(null);

              setActive(null);
            } else {
              props.setData(i);
              setActive(i);
              if (props.addFunction) {
                props.addFunction();
              }
            }
          }}
          className={`  p-2 px-4 rounded-xl transition-colors font-mainSemiBold ${
            active == i ? "bg-main" : "bg-mainClearActive"
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
