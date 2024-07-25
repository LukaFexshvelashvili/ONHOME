import { useEffect, useState } from "react";
import { ActiveOffers, TOffer } from "../../../assets/lists/offers";
import DaysDropdown from "../../AddProduct/components/DaysDropdown";
import { PopupCloseIcon } from "../../../assets/icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Link, useNavigate } from "react-router-dom";
import ContentLoader from "../../../components/global/ContentLoader";
import axiosCall from "../../../hooks/axiosCall";
import { makeUserSession } from "../../../hooks/serverFunctions";
import { clearSession } from "../../../store/data/userSlice";
import OfferCard from "../../../components/global/OfferCard";

type Trequest = {
  pending: number;
  status: null | number;
  data: null | {
    expire: string;
    product_id: string;
    vip_name: string;
  };
};

export default function Buypopup(props: {
  setPopbuy: Function;
  popbuy: { id?: number | null };
  fetchProducts: Function;
}) {
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [selectedDays, setSelectedDays] = useState<number>(1);
  const [request, setRequest] = useState<Trequest>({
    pending: 0,
    status: null,
    data: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => store.user);
  let offerData = ActiveOffers().filter((item) => item.status == status)[0];
  const buyVip = () => {
    setError("");
    if (status > 0) {
      if (user.money >= offerData.price * selectedDays) {
        setRequest({ pending: 1, status: null, data: null });
        axiosCall
          .post(
            "user/vip_add.php",
            { vipDays: selectedDays, vip: status, productId: props.popbuy.id },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((res) => {
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
              })
              .then(() => {
                props.fetchProducts();
                setRequest({
                  pending: 2,
                  status: res.data.status,
                  data: res.data.payload,
                });
              });
          });
      } else {
        setError("ანგარიშზე არა არის საკმარისი თანხა");
      }
    }
  };
  useEffect(() => {
    if (props.popbuy) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [props.popbuy]);
  return (
    <div className="fixed w-full h-full top-0 left-0 z-30 flex justify-center items-center pointer-events-all">
      <div
        onClick={() => props.setPopbuy({ id: null })}
        className="absolute top-0 left-0 w-full h-full  bg-[rgba(0,0,0,0.4)]  z-[5] "
      >
        {" "}
      </div>
      <div
        className={`noScrollBar relative max-w-[1000px] w-[96%]  max-h-[90%] overflow-auto ${
          request.pending == 1 ? "min-h-[300px]" : null
        } rounded-section bg-whiteMain p-5 relative z-10`}
      >
        {request.pending == 0 ? (
          <>
            <button
              onClick={() => props.setPopbuy({ id: null })}
              className="h-[30px] aspect-square  absolute top-3 right-3 flex justify-center items-center p-1"
            >
              <PopupCloseIcon className="h-[16px] [&>path]:fill-mainBlack" />
            </button>
            <div className=" max-w-[850px] w-[96%] mx-auto ">
              <h2 className="text-main font-mainBold text-center text-[18px] ">
                VIP ყიდვა
              </h2>
              <p className="text-textDesc  text-center text-[14px] mt-2">
                სტატუსის გაძლიერება განცხადებაზე #{props.popbuy.id}
              </p>
              <div className="flex items-center justify-center gap-5 mt-8 mobileTab:flex-col mobileTab:justify-center py-5 flex-wrap overflow-y-auto max-h-[400px]">
                {ActiveOffers().map(
                  (e: TOffer, i: number) =>
                    e.status !== 0 && (
                      <OfferCard
                        offerData={e}
                        activeStatus={status}
                        setActiveStatus={setStatus}
                        key={i}
                      />
                    )
                )}
              </div>
              {offerData.status !== 0 && (
                <DaysDropdown
                  offerData={offerData}
                  value={selectedDays}
                  setValue={setSelectedDays}
                />
              )}
              {error !== "" && (
                <div className="max-w-full w-full h-auto p-3 mt-3 rounded-lg bg-pinkClear text-pinkI border-2 border-pinkI  flex justify-center items-center text-center text-[14px] tracking-wider font-mainSemiBold">
                  {error}
                </div>
              )}{" "}
              <div className="flex justify-between mt-4 ">
                <p className="text-Asmall text-textDesc font-mainSemiBold ">
                  ბალანსი:{" "}
                  <span className="text-main">
                    {" "}
                    {(user.money / 100)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "₾"}
                  </span>
                </p>{" "}
                <Link
                  to={"/Profile/Balance"}
                  className="text-main text-Asmall underline"
                >
                  ბალანსის შევსება
                </Link>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-Asmall text-textDesc font-mainMedium">
                  სტატუსი
                </p>

                <p
                  className="text-Asmall"
                  style={{ color: offerData.mainColor }}
                >
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
              {status > 0 ? (
                <button
                  onClick={buyVip}
                  className="block h-[34px] w-[180px] rounded-md bg-main text-buttonText text-[14px] tracking-wider transition-colors hover:bg-mainHover ml-auto mt-5"
                >
                  გადახდა
                </button>
              ) : null}
            </div>
          </>
        ) : request.pending == 2 ? (
          <>
            {request.status == 100 ? (
              <>
                {" "}
                <h2 className="text-greenI font-mainBold text-center text-[18px] ">
                  VIP სტატუსი წარმატებით დაყენდა
                </h2>
                <p className="text-textDesc  text-center text-[14px] mt-2">
                  VIP სტატუსი წარმატებით ჩაირთო განცხადებაზე - #
                  {request.data?.product_id}
                </p>
                <div className="text-start text-Asmall text-textDesc mt-4 flex flex-col gap-2">
                  <p>
                    სტატუსი:{" "}
                    <span
                      style={{
                        color: ActiveOffers().filter(
                          (item) => item.name == request.data?.vip_name
                        )[0].mainColor,
                      }}
                    >
                      {request.data?.vip_name}{" "}
                    </span>
                  </p>
                  <p>ამოწურვის ვადა: {request.data?.expire}</p>
                </div>
                <button
                  onClick={() => props.setPopbuy({ id: null })}
                  className="block h-[34px] w-[180px] rounded-md bg-greenClear text-greenI text-[14px] tracking-wider transition-colors hover:bg-greenHover mx-auto mt-5"
                >
                  დახურვა
                </button>
              </>
            ) : (
              <>
                {" "}
                <h2 className="text-redI font-mainBold text-center text-[18px] ">
                  წარმოიშვა შეცდომა
                </h2>
                <p className="text-textDesc  text-center text-[14px] mt-2">
                  სერვერზე შეფერხებაა, სცადეთ მოგვიანებით
                </p>
                <button
                  onClick={() => props.setPopbuy({ id: null })}
                  className="block h-[34px] w-[180px] rounded-md bg-redClear text-redI text-[14px] tracking-wider transition-colors hover:bg-redHover mx-auto mt-5"
                >
                  გასაგებია
                </button>
              </>
            )}
          </>
        ) : (
          <ContentLoader />
        )}
        {}
      </div>
    </div>
  );
}
