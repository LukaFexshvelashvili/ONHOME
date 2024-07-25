import { useDispatch, useSelector } from "react-redux";
import {
  Tlocation,
  updateDeal,
  updateDescription,
  updateExactAddress,
  updateIpcode,
  updateLocations,
  updateStatus,
  updateTitle,
} from "../../../store/data/addProductSlice";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../../../store/store";
import { ActiveOffers, TOffer } from "../../../assets/lists/offers";
import OfferCard from "../../../components/global/OfferCard";
import SearchPlace from "../../../components/placeSelector/SearchPlace";
import { projectDealTypes } from "../../../assets/lists/productAddons";
import { PopupCloseIcon } from "../../../assets/icons/Icons";
import { t } from "i18next";

export function EstateTitle(props: {
  error?: boolean;
  setData?: Function;
  defData?: string;
}) {
  const [title, setTitle] = useState(props.defData ? props.defData : "");
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mobile:flex-col">
        <p className=" text-textHead tracking-wider font-mainBold  mobile:text-[15px]  mobile:text-center ">
          {t("selectors.title")} *
        </p>{" "}
        <span className="text-Asmall text-textDescCard ">
          ({t("selectors.min_title")})
        </span>
      </div>
      {title == "" && props.error && (
        <div className=" rounded-xl text-pinkI bg-pinkClear py-3 px-4 text-sm tracking-wider mt-2 text-center">
          {" "}
          {t("selectors.required_title")}
        </div>
      )}
      <div className="flex gap-3 flex-wrap pl-3 mt-4 mobile:justify-center mobile:pl-0 ">
        <div className="inputBl relative flex items-center max-w-[300px] w-full">
          <input
            type="text"
            className="AddProductInputTitle"
            placeholder={t("selectors.title_placeholder")}
            max={30}
            maxLength={30}
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setTitle(e.target.value);
                if (!props.setData) {
                  if (e.target.value == "") {
                    dispatch(updateTitle(null));
                  } else {
                    dispatch(updateTitle(e.target.value));
                  }
                } else {
                  props.setData(e.target.value);
                }
              }
            }}
          />
          <div className="absolute right-3 text-textHead text-[12px] font-mainRegular tracking-wider ">
            {30 - title.length}
          </div>
        </div>
      </div>
    </div>
  );
}
export function EstateDescription(props: {
  setData?: Function;
  defData?: string;
}) {
  const [description, setDescription] = useState(
    props.defData ? props.defData : ""
  );
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mobile:flex-col">
        <p className=" text-textHead tracking-wider font-mainBold  mobile:text-[15px]  mobile:text-center ">
          {t("selectors.desc")}
        </p>{" "}
        <span className="text-Asmall text-textDescCard ">
          ({t("selectors.min_desc")})
        </span>
      </div>

      <div className="flex gap-3 flex-wrap pl-3 mt-4 mobile:justify-center mobile:pl-0">
        <div className="inputBl relative flex items-center max-w-[700px] w-full">
          <textarea
            className="AddProductInputTitle textareaInput"
            placeholder={t("selectors.desc_placeholder")}
            value={description}
            onChange={(e) => {
              if (e.target.value.length <= 600) {
                setDescription(e.target.value);
                if (!props.setData) {
                  if (e.target.value == "") {
                    dispatch(updateDescription(null));
                  } else {
                    dispatch(updateDescription(e.target.value));
                  }
                } else {
                  props.setData(e.target.value);
                }
              }
            }}
          ></textarea>
          <div className="absolute right-3 bottom-2 text-textHead text-[12px] font-mainRegular tracking-wider ">
            {600 - description.length}
          </div>
        </div>
      </div>
    </div>
  );
}
export function EstateOption() {
  const vipStatus = useSelector(
    (store: RootState) => store.addProduct.estateVip
  );
  const [status, setStatus] = useState<number>(vipStatus);

  useEffect(() => {
    setStatus(vipStatus);
  }, [vipStatus]);
  return (
    <div className="flex flex-col">
      <p className=" text-textHead tracking-wider font-mainBold  mobile:text-[15px]  mobile:text-center ">
        {t("selectors.offer")}
      </p>
      <div className="flex items-center justify-center gap-5 mt-8 flex-wrap">
        {ActiveOffers().map((e: TOffer, i: number) => (
          <OfferCard offerData={e} activeStatus={status} key={i} />
        ))}
      </div>
    </div>
  );
}

export function DealType(props: { setData?: Function; defData?: number }) {
  const [active, setActive] = useState<null | number>(
    props.defData !== undefined ? props.defData : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (active !== null) {
      if (!props.setData) {
        dispatch(updateDeal(active));
      } else {
        props.setData(active);
      }
    }
  }, [active]);
  return (
    <div className="flex flex-col">
      <p className=" text-textHead tracking-wider font-mainBold  mobile:text-[15px]  mobile:text-center ">
        {t("filters.deal")} *
      </p>
      <div className="flex gap-3 flex-wrap pl-3 mt-4 mobile:justify-center mobile:pl-0">
        {projectDealTypes().map((e: string, i: number) => (
          <button
            key={i}
            onClick={() => setActive(i)}
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
      </div>
    </div>
  );
}
export function EstateStatus({
  productData,
  setData,
  defData,
  estateType,
}: {
  productData: any;
  setData?: Function;
  defData?: string;
  estateType?: number;
}) {
  const [active, setActive] = useState<null | string>(
    defData !== undefined ? defData : null
  );
  const [DealTypes, setDealTypes] = useState<string[]>([
    t("selectors.newly_built"),
    t("selectors.old_building"),
    t("selectors.under_construction"),
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (active !== null) {
      if (!setData) {
        dispatch(updateStatus(active));
      } else {
        setData(active);
      }
    }
  }, [active]);
  useEffect(() => {
    if (productData.estateType == 3 || (estateType && estateType == 3)) {
      setDealTypes([
        t("selectors.agricultural"),
        t("selectors.not_agricultural"),
        t("selectors.commercial"),
        t("selectors.special"),
        t("selectors.investment_construction"),
      ]);
    } else if (productData.estateType == 2 || (estateType && estateType == 2)) {
      setDealTypes([
        t("selectors.office"),
        t("selectors.shopping"),
        t("selectors.warehouse"),
        t("selectors.production"),
        t("selectors.universal"),
        t("selectors.special"),
        t("selectors.catering_facilities"),
        t("selectors.garage"),
        t("selectors.basement"),
        t("selectors.semi_basement"),
        t("selectors.entire_building"),
        t("selectors.car_wash"),
        t("selectors.car_service"),
      ]);
    } else {
      setDealTypes([
        t("selectors.newly_built"),
        t("selectors.old_building"),
        t("selectors.under_construction"),
      ]);
    }
    if (defData == undefined) {
      setActive(null);
    }
    if (defData !== undefined && estateType) {
      setActive(null);
    }
  }, [productData.estateType, estateType]);
  return (
    <div className="flex flex-col">
      <p className=" text-textHead tracking-wider font-mainBold  mobile:text-[15px]  mobile:text-center ">
        {t("product.status")} *
      </p>
      <div className="flex gap-3 flex-wrap pl-3 mt-4 mobile:justify-center mobile:pl-0">
        {DealTypes.map((e, i) => (
          <button
            key={i}
            onClick={() => setActive(e)}
            className={`  p-2 px-4 rounded-xl transition-colors ${
              active == e ? "bg-main" : "bg-mainClear"
            }`}
          >
            <p
              className={`text-Asmall tracking-wide ${
                active == e ? "text-buttonText" : "text-main"
              }`}
            >
              {e}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
export function EstateAddress(props: { error: boolean }) {
  const [openLocations, setOpenLocations] = useState<boolean>(false);
  const [locations, setLocations] = useState<Tlocation>({
    city: "",
    district: "",
    urban: "",
  });
  const getInput = useRef<any>(null);
  const dispatch = useDispatch();
  const [ipAddress, setIpAddress] = useState<string>("");

  useEffect(() => {
    dispatch(
      updateLocations({
        city: locations.city !== "" ? locations.city : null,
        district: locations.district !== "" ? locations.district : null,
        urban: locations.urban !== "" ? locations.urban : null,
      })
    );
  }, [locations]);

  useEffect(() => {
    if (openLocations) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [openLocations]);

  return (
    <div className="flex flex-col relative z-10">
      {openLocations ? (
        <>
          <div
            onClick={() => setOpenLocations(false)}
            className="fixed h-full w-full aspect-square bg-blackFade top-0 left-0 z-20 "
          ></div>
          <div
            className={`fixed left-2/4 -translate-x-2/4 -translate-y-2/4 top-2/4 bg-whiteMain rounded-section shadow-sectionShadow p-4 small:py-0 small:p-1  ${
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
              setData={setLocations}
              defData={locations}
              closeWindow={() => setOpenLocations(false)}
            />
          </div>
        </>
      ) : null}
      <p className=" text-textHead tracking-wider font-mainBold  mobile:text-[15px]  mobile:text-center ">
        {t("selectors.location")} *
      </p>
      {locations.city == "" && props.error && (
        <div className=" rounded-xl text-pinkI bg-pinkClear py-3 px-4 text-sm tracking-wider mt-2 text-center">
          {" "}
          {t("selectors.location_required")}
        </div>
      )}
      <div
        onClick={() => setOpenLocations(true)}
        className="cursor-pointer rounded-lg h-[40px]  max-w-[500px] w-full gap-2 flex items-center bg-whiteMain border-2 mt-2 text-textDesc text-[14px] border-lineBg font-mainRegular px-2"
      >
        <div className=" w-[33%] overflow-hidden max-w-[33%] text-nowrap text-ellipsis">
          {t("filters.city")}: {locations.city ? locations.city : "*"}{" "}
        </div>
        <div className="h-[50%] w-[2px] bg-lineBg "></div>
        <div className=" w-[33%] overflow-hidden max-w-[33%] text-nowrap text-ellipsis">
          {t("filters.district")}:{" "}
          {locations.district ? locations.district : "*"}{" "}
        </div>
        <div className="h-[50%] w-[2px] bg-lineBg "></div>

        <div className=" w-[33%] overflow-hidden max-w-[33%] text-nowrap text-ellipsis">
          {t("filters.urban")}: {locations.urban ? locations.urban : "*"}{" "}
        </div>
      </div>

      <div className="flex gap-3 flex-wrap mt-4 mobile:justify-center mobile:pl-0">
        <div className="relative">
          <input
            onChange={(e) => {
              dispatch(updateExactAddress(e.target.value));
            }}
            type="text"
            className="AddProductInput"
            placeholder={t("selectors.exact_address")}
          />
        </div>

        <input
          type="text"
          ref={getInput}
          className="AddProductInput "
          placeholder={t("product.cadastral_code")}
          onChange={(e) => {
            let filteredValue = e.target.value.replace(/[^0-9.]/g, "");
            if (filteredValue == "") {
              dispatch(updateIpcode(null));
            } else {
              setIpAddress(filteredValue);
              dispatch(updateIpcode(filteredValue));
            }
          }}
          value={ipAddress}
        />
      </div>
    </div>
  );
}
