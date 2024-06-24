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

  let offerData = ActiveOffers.filter((item) => item.id == activeOffer)[0];
  let sendAddress = {
    city: data.estateCity,
    address: data.estateAddress,
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
            currency={data.estateCurrency}
            address={sendAddress}
          />
          <p className=" text-Asmall text-textDesc mt-3">ბარათის ვიზუალი</p>
        </div>
        <p className="text-Asmall text-textDesc mt-3 flex justify-between">
          ბალანსი{": "}
          <span className="text-main ml-1">
            {(user.money / 100)
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "₾"}
          </span>
          <Link
            className="text-main underline ml-auto  w-min text-nowrap"
            to={"/Profile/Balance"}
          >
            ბალანსის შევსება
          </Link>
        </p>
        <div className="flex gap-2 items-center mt-5">
          {ActiveOffers.map((e: TOffer, i: number) => (
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
          <p className="text-Asmall text-textDesc font-mainMedium">სტატუსი</p>

          <p className="text-Asmall" style={{ color: offerData.mainColor }}>
            {offerData.name}
          </p>
        </div>
        {offerData.status !== 0 && (
          <>
            <div className="h-1 w-[50px] rounded-md bg-mainClear mx-auto my-2"></div>

            <div className="flex items-center justify-between font-mainBold rounded-lg mt-1">
              <p className=" text-textDesc font-mainMedium">ფასი</p>

              <p className=" text-main">
                {offerData.sale !== 0 ? (
                  <>
                    {offerData.price * selectedDays -
                      offerData.sale * selectedDays +
                      "₾"}{" "}
                    <span className=" line-through opacity-30 ">
                      {" "}
                      {offerData.price * selectedDays}₾
                    </span>
                  </>
                ) : (
                  <>{offerData.price * selectedDays}₾</>
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
              setError("საკმარის თანხა არარის ბალანსზე");
            } else {
              submitProduct(
                data,
                props.setShowError,
                props.setUploadStatus,
                props.setAlertBlock,
                setError,
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
          გამოქვეყნება
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
  size?: number | null;
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
      let calc = props.size > 0 && props.price > 0 && props.price / props.size;
      return calc && Math.floor(calc);
    } else {
      return 0;
    }
  };
  return (
    <div
      className={`h-auto   ${
        props.autoWidth ? "w-full" : "w-[290px]"
      } bg-whiteMain border-2 border-cardBorder rounded-normal p-3 pb-14 relative medium:w-[260px]`}
    >
      <div className="w-full h-[240px] medium:h-[200px] rounded-normal bg-whiteLoad relative overflow-hidden flex justify-center items-center">
        <div className="absolute h-[25px] w-[60px]  select-none bg-redI rounded-md flex items-center justify-center text-Asmaller font-mainBold text-buttonText tracking-wider cursor-default top-2 right-2 z-[3]">
          VIP+
        </div>
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
            {props.rooms && props.rooms}
          </div>
          <div className="bg-cardInfoBg backdrop-blur-[2px] rounded-[3px] flex justify-center items-center px-2 py-[6px] text-WhiteFade font-mainSemiBold text-sm">
            <SquareFrameIcon className="h-[18px] mr-3 [&>path]:stroke-WhiteFade" />{" "}
            {props.size
              ? props.size.toString().length > 7
                ? props.size.toString().slice(0, 7) + "+"
                : props.size.toString()
              : 0}
            მ²
          </div>
        </div>
      </div>

      <div className="flex flex-col py-1">
        <h2 className="text-textHeadCard font-mainMedium w-[80%] overflow-hidden text-nowrap text-ellipsis">
          {props.title ? props.title : "სათაური"}
        </h2>
        <p className="text-textDescCard text-Asmall font-mainRegular">
          {props.address.city
            ? props.address.city +
              `${props.address.address ? ", " + props.address.address : ""}`
            : "ქალაქი"}
        </p>
      </div>
      <div className="flex items-center mt-2 bottom-3 w-full absolute left-0 px-3">
        <div className="bg-mainClear text-main w-[120px] h-[30px] flex justify-center items-center rounded-lg">
          {props.price &&
            numeral(Math.floor(props.price)).format("0,0").replace(/,/g, " ")}
          {props.currency == 0 ? "$" : props.currency == 1 && "₾"}
        </div>
        <p className="text-textDescCard text-Asmall mx-3 ">
          მ² - {getSizePrice()}
          {props.currency == 0 ? "$" : props.currency == 1 && "₾"}
        </p>
        <button className="p-[5px] rounded-md absolute right-3">
          <BookmarkIcon
            className={`h-[20px]  transition-all [&>path]:stroke-navIcon`}
          />
        </button>
      </div>
    </div>
  );
}
