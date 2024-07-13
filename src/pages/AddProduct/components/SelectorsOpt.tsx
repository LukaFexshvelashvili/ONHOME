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
          განცხადების სათაური *
        </p>{" "}
        <span className="text-Asmall text-textDescCard ">
          (მაქსიმალური სიგრძე: 30)
        </span>
      </div>
      {title == "" && props.error && (
        <div className=" rounded-xl text-pinkI bg-pinkClear py-3 px-4 text-sm tracking-wider mt-2 text-center">
          {" "}
          სავალდებულოა შეავსოთ სათაურის ველი
        </div>
      )}
      <div className="flex gap-3 flex-wrap pl-3 mt-4 mobile:justify-center mobile:pl-0 ">
        <div className="inputBl relative flex items-center max-w-[300px] w-full">
          <input
            type="text"
            className="AddProductInputTitle"
            placeholder="მაგ: იყიდება ბინა ზღვასთან"
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
          განცხადების აღწერა
        </p>{" "}
        <span className="text-Asmall text-textDescCard ">
          (მაქსიმალური სიგრძე: 600)
        </span>
      </div>

      <div className="flex gap-3 flex-wrap pl-3 mt-4 mobile:justify-center mobile:pl-0">
        <div className="inputBl relative flex items-center max-w-[700px] w-full">
          <textarea
            className="AddProductInputTitle textareaInput"
            placeholder="განცხადების აღწერა"
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
        შეთავაზება
      </p>
      <div className="flex items-center justify-center gap-5 mt-8 flex-wrap">
        {ActiveOffers.map((e: TOffer, i: number) => (
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
        გარიგების ტიპი *
      </p>
      <div className="flex gap-3 flex-wrap pl-3 mt-4 mobile:justify-center mobile:pl-0">
        {projectDealTypes.map((e: string, i: number) => (
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
    "ახალი აშენებული",
    "ძველი აშენებული",
    "მშენებარე",
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
        "სასოფლო სამეურნეო",
        "არა სასოფლო სამეურნეო",
        "კომერციული",
        "სპეციალური",
        "საინვესტიციო/სამშენებლო",
      ]);
    } else if (productData.estateType == 2 || (estateType && estateType == 2)) {
      setDealTypes([
        "საოფისე",
        "სავაჭრო",
        "სასაწყობე",
        "საწარმოო ფართი",
        "უნივერსალური",
        "სპეციალური",
        "კვების ობიექტები",
        "ავტოფარეხი",
        "სარდაფი",
        "ნახევარსარდაფი",
        "მთლიანი შენობა",
        "ავტოსამრეცხაო",
        "ავტოსერვისი",
      ]);
    } else {
      setDealTypes(["ახალი აშენებული", "ძველი აშენებული", "მშენებარე"]);
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
        სტატუსი *
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
        მისამართი*
      </p>
      {locations.city == "" && props.error && (
        <div className=" rounded-xl text-pinkI bg-pinkClear py-3 px-4 text-sm tracking-wider mt-2 text-center">
          {" "}
          სავალდებულოა შეავსოთ ქალაქის ველი
        </div>
      )}
      <div
        onClick={() => setOpenLocations(true)}
        className="cursor-pointer rounded-lg h-[40px]  max-w-[500px] w-full gap-2 flex items-center bg-whiteMain border-2 mt-2 text-textDesc text-[14px] border-lineBg font-mainRegular px-2"
      >
        <div className=" w-[33%] overflow-hidden max-w-[33%] text-nowrap text-ellipsis">
          ქალაქი: {locations.city ? locations.city : "*"}{" "}
        </div>
        <div className="h-[50%] w-[2px] bg-lineBg "></div>
        <div className=" w-[33%] overflow-hidden max-w-[33%] text-nowrap text-ellipsis">
          რაიონი: {locations.district ? locations.district : "*"}{" "}
        </div>
        <div className="h-[50%] w-[2px] bg-lineBg "></div>

        <div className=" w-[33%] overflow-hidden max-w-[33%] text-nowrap text-ellipsis">
          უბანი: {locations.urban ? locations.urban : "*"}{" "}
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
            placeholder="ზუსტი მისამართი"
          />
        </div>

        <input
          type="text"
          ref={getInput}
          className="AddProductInput "
          placeholder="საკადასტრო კოდი"
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
