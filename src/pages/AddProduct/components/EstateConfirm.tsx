import { useEffect, useState } from "react";
import {
  BookmarkIcon,
  ImageLoaderIcon,
  RoomIcon,
  SquareFrameIcon,
} from "../../../assets/icons/Icons";
import { ActiveOffers, TOffer } from "../../../assets/lists/offers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import numeral from "numeral";
import {
  clearAddProduct,
  updateEstateVipDays,
  updateVip,
} from "../../../store/data/addProductSlice";
import DaysDropdown from "./DaysDropdown";
import { submitProduct } from "./Selectors";
import { Link, useNavigate } from "react-router-dom";
import axiosCall from "../../../hooks/axiosCall";
import { makeUserSession } from "../../../hooks/serverFunctions";
import { clearSession } from "../../../store/data/userSlice";
import { t } from "i18next";

export default function EstateConfirm(props: {
  setShowError: Function;
  setAlertBlock: Function;
  setUploadStatus: Function;
}) {
  const data = useSelector((state: RootState) => state.addProduct);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const vipStatus = useSelector(
    (store: RootState) => store.addProduct.estateVip
  );
  const navigate = useNavigate();
  const [activeOffer, setActiveOffer] = useState<number>(vipStatus);
  const [selectedDays, setSelectedDays] = useState<number>(1);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setActiveOffer(vipStatus);
  }, [vipStatus]);

  let offerData = ActiveOffers().filter((item) => item.id == activeOffer)[0];
  let sendAddress = {
    city: data.estateCity,
    address: data.estateDistrict,
    exactAddress: data.estateExactAddress,
  };
  return (
    <>
      <div className="p-4">
        <div className=" flex flex-col items-center justify-center">
          <CardExample
            title={data.estateTitle}
            rooms={data.estateRooms}
            image={data.estateActiveImage}
            price={data.estatePrice}
            size={data.estateSize}
            vip={data.estateVip}
            landSize={data.estateLandSize}
            currency={data.estateCurrency}
            address={sendAddress}
          />
          <p className=" text-Asmall text-textDesc mt-3">
            {t("confirm.card_UI")}
          </p>
        </div>
        <div className="text-Asmall text-textDesc mt-3 flex justify-center flex-col ">
          <p className="">
            {t("global.balance")}
            {": "}
            <span className="text-main ml-1">
              {(user.money / 100)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "₾"}
            </span>
          </p>
          <Link
            className="text-main underline  w-min text-nowrap"
            to={"/Profile/Balance"}
          >
            {t("global.fill_balance")}
          </Link>
        </div>
        <div className="flex gap-2 items-center mt-5">
          {ActiveOffers().map((e: TOffer, i: number) => (
            <div
              key={i}
              onClick={() => {
                setError("");

                dispatch(updateVip(e.id));
                if (e.id == 0) {
                  dispatch(updateEstateVipDays(null));
                }
              }}
              className="text-Asmall h-[30px] w-[80px] flex items-center justify-center cursor-pointer rounded-md transition-colors"
              style={{
                backgroundColor:
                  activeOffer == e.id ? e.mainColor : e.secondColor,
                color: activeOffer == e.id ? "#FFFFFF" : e.mainColor,
              }}
            >
              {e.name}
            </div>
          ))}
        </div>
        {offerData.status !== 0 && (
          <DaysDropdown
            offerData={offerData}
            value={selectedDays}
            setValue={(days: number) => {
              setSelectedDays(days);
              dispatch(updateEstateVipDays(days));
              setError("");
            }}
          />
        )}
        <div className="flex justify-between mt-6">
          <p className="text-Asmall text-textDesc font-mainMedium">
            {t("product.status")}
          </p>

          <p className="text-Asmall" style={{ color: offerData.mainColor }}>
            {offerData.name}
          </p>
        </div>
        {offerData.status !== 0 && (
          <>
            <div className="h-1 w-[50px] rounded-md bg-mainClear mx-auto my-2"></div>

            <div className="flex items-center justify-between font-mainBold rounded-lg mt-1">
              <p className=" text-textDesc font-mainMedium">
                {t("filters.price")}
              </p>

              <p className=" text-main">
                {offerData.sale !== 0 ? (
                  <>
                    {(
                      offerData.price * selectedDays -
                      offerData.sale * selectedDays
                    ).toFixed(2) + "₾"}{" "}
                    <span className=" line-through opacity-30 ">
                      {" "}
                      {(offerData.price * selectedDays).toFixed(2)}₾
                    </span>
                  </>
                ) : (
                  <>{(offerData.price * selectedDays).toFixed(2)}₾</>
                )}
              </p>
            </div>
          </>
        )}
        {error !== "" && (
          <div className="max-w-full w-full mt-3 h-auto p-3 rounded-lg bg-pinkClear text-pinkI border-2 border-pinkI  flex justify-center items-center text-center text-[14px] tracking-wider font-mainSemiBold">
            {error}
          </div>
        )}
        <button
          onClick={() => {
            setError("");

            if (
              (offerData.price * selectedDays - offerData.sale * selectedDays) *
                100 >
              user.money
            ) {
              setError(t("alert.no_enough_money_on_balance"));
            } else {
              submitProduct(
                data,
                props.setShowError,
                props.setUploadStatus,
                props.setAlertBlock,
                () => {
                  dispatch(clearAddProduct());
                  axiosCall
                    .get("authentication/user", { withCredentials: true })
                    .then((res) => {
                      if (res.data.status == 100) {
                        makeUserSession(dispatch, {
                          ...res.data.user,
                          favorites: JSON.parse(res.data.user.favorites),
                        });

                        if (res.data.user.banned == 1) {
                          navigate("/SuspendedAccount");
                        }
                      } else if (res.data.status == 0) {
                        dispatch(clearSession());
                      }
                    });
                }
              );
            }
          }}
          className="h-[42px] w-full rounded-md bg-main text-buttonText tracking-wider text-[15px] transition-colors mt-3 hover:bg-mainHover"
        >
          {t("confirm.publish")}
        </button>
      </div>
    </>
  );
}
export function CardExample(props: {
  autoWidth?: boolean;
  image?: string | null;
  title?: string | null;
  price?: number | null;
  vip?: number | null;
  size?: number | null;
  landSize?: number | null;
  rooms?: number | null;
  currency: number;
  address: {
    city: string | null;
    address: string | null;
    exactAddress: string | null;
  };
}) {
  const getSizePrice = () => {
    if (props.size && props.size > 0 && props.price && props.price > 0) {
      if (props.landSize && props.landSize > 0) {
        let calc = props.price / (props.size + props.landSize);
        return calc && Math.floor(calc);
      } else {
        let calc = props.price / props.size;
        return calc && Math.floor(calc);
      }
    } else {
      return 0;
    }
  };
  return (
    <div
      className={`h-auto p-0 pb-14 ${
        props.autoWidth ? "w-full" : "w-[280px]"
      }  ${
        props.vip == 2
          ? "bg-gradient-to-t from-vipPlusClear from-5% to-25% to-whiteMain border-none shadow-[inset_0px_0px_0px_1.5px_var(--vipPlusHover)]"
          : "bg-whiteMain shadow-[inset_0px_0px_0px_1.5px_var(--cardBorder)]"
      } border-none  rounded-[10px]  relative`}
    >
      <div className="w-full h-[200px] rounded-[12px] bg-whiteLoad relative overflow-hidden flex justify-center items-center">
        {props.vip == 2 ? (
          <div className="absolute h-[25px] w-[60px] select-none bg-vipPlusI rounded-md flex items-center justify-center text-Asmaller font-mainBold text-buttonText tracking-wider cursor-default top-2 right-2 z-[3]">
            VIP+
          </div>
        ) : props.vip == 1 ? (
          <div className="absolute h-[25px] w-[60px] select-none bg-orangeI rounded-md flex items-center justify-center text-Asmaller font-mainBold text-buttonText tracking-wider cursor-default top-2 right-2 z-[3]">
            VIP
          </div>
        ) : (
          props.vip == 0 && <></>
        )}
        {props.image ? (
          <img
            src={props.image}
            className="absolute h-full w-full object-cover top-0 left-0 select-none"
            alt="estate-photo"
          />
        ) : (
          <ImageLoaderIcon className="h-[100px] [&>path]:fill-[var(--skeleton6)]" />
        )}
        <div className="absolute bottom-2 left-2 flex items center gap-2">
          <div className="bg-cardInfoBg backdrop-blur-[2px] rounded-[3px] flex justify-center items-center px-2 py-[6px] text-WhiteFade font-mainSemiBold text-sm">
            <RoomIcon className="h-[18px] mr-3 [&>path]:fill-WhiteFade" />{" "}
            {props.rooms ? props.rooms : 0}
          </div>
          <div className="bg-cardInfoBg backdrop-blur-[2px] rounded-[3px] flex justify-center items-center px-2 py-[6px] text-WhiteFade font-mainSemiBold text-sm">
            <SquareFrameIcon className="h-[18px] mr-3 [&>path]:stroke-WhiteFade" />{" "}
            {props.size
              ? props.size.toString().length > 7
                ? props.size.toString().slice(0, 7) + "+"
                : props.size.toString()
              : 0}
            {t("global.m")}²
          </div>
        </div>
      </div>

      <div className="flex flex-col  py-1 pt-2 px-3">
        <h2 className="text-textHeadCard font-mainMedium w-[80%] text-[15px] overflow-hidden text-nowrap text-ellipsis">
          {props.title ? props.title : t("confirm.title")}
        </h2>
        <p className="text-textDescCard  font-mainRegular text-[13px]">
          {props.address.city
            ? props.address.city +
              `${props.address.address ? ", " + props.address.address : ""}`
            : t("filters.city")}
        </p>
      </div>
      <div className="flex items-center mt-2 bottom-3 w-full absolute left-0 px-3">
        <div
          className={` ${
            props.vip == 2
              ? "bg-vipPlusClear text-vipPlusI"
              : "bg-mainClear text-main"
          }  w-[120px] h-[30px] flex justify-center items-center rounded-[5px]`}
        >
          {props.price &&
            numeral(Math.floor(props.price)).format("0,0").replace(/,/g, " ")}
          {props.currency == 0 ? "$" : props.currency == 1 && "₾"}
        </div>
        <p className="text-textDescCard text-Asmall mx-3 ">
          {t("global.m")}² - {getSizePrice()}
          {props.currency == 0 ? "$" : props.currency == 1 && "₾"}
        </p>
        <button className="p-[5px] rounded-md absolute right-3">
          <BookmarkIcon
            className={`h-[20px]  transition-all   ${
              props.vip == 2
                ? "fill-transparent [&>path]:stroke-vipPlusI"
                : "fill-transparent [&>path]:stroke-navIcon"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
