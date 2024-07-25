import { useEffect, useState } from "react";
import { RealEstateTypes } from "../../Search/components/FiltersArray";
import {
  CheckIcon,
  DropDownIcon,
  PlusIcon,
  TrashIcon,
} from "../../../assets/icons/Icons";
import { SelectNumbers } from "../../Search/components/Filters";
import {
  TProductAddon,
  productAddonsList,
  productAddonsListForHotel,
  productAddonsListForLand,
  projectStatuses,
  projectTypes,
} from "../../../assets/lists/productAddons";
import {
  TClosePlace,
  closePlacesList,
} from "../../../assets/lists/closePlaces";
import { useDispatch, useSelector } from "react-redux";
import {
  TproductInfoStart,
  updateActiveImage,
  updateAddons,
  updateBathrooms,
  updateBedrooms,
  updateClosePlaces,
  updateCondition,
  updateCurrency,
  updateFloor,
  updateFloors,
  updateFullPrice,
  updateImages,
  updateLandSize,
  updateProject,
  updateRooms,
  updateSize,
  updateType,
} from "../../../store/data/addProductSlice";
import { RootState } from "../../../store/store";
import axiosCall from "../../../hooks/axiosCall";
import BubbleSelector from "../../../components/global/BubbleSelector";
import { currencyConvertor } from "../../../components/convertors/convertors";
import { TinfoDefData } from "../../Profile/components/components/PopEditBlock";
import { t } from "i18next";

export const submitProduct = (
  productData: TproductInfoStart | any,
  setShowError: Function,
  setUploadStatus: Function,
  setAlertBlock: Function,
  clearAddProduct: Function
) => {
  let error: boolean = false;

  if (
    productData.estateCity == null ||
    productData.estateImages == null ||
    productData.estatePrice == null ||
    productData.estateTitle == null
  ) {
    error = true;
  }

  if (error) {
    setShowError(true);
    window.scrollTo(-1000, 0);
  } else {
    let formData = new FormData();
    formData.append("estateType", productData.estateType);
    formData.append("estateTitle", productData.estateTitle);
    formData.append("estateDescription", productData.estateDescription);
    formData.append("estateDeal", productData.estateDeal);
    formData.append("estateStatus", productData.estateStatus);
    formData.append("estateCity", productData.estateCity);
    formData.append("estateDistrict", productData.estateDistrict);
    formData.append("estateUrban", productData.estateUrban);
    formData.append("estateExactAddress", productData.estateExactAddress);
    formData.append("estateIpcode", productData.estateIpcode);
    formData.append("estateSize", productData.estateSize);
    formData.append("estateLandSize", productData.estateLandSize);
    formData.append("estateProject", productData.estateProject);
    formData.append("estateCondition", productData.estateCondition);
    formData.append("estateFloor", productData.estateFloor);
    formData.append("estateFloors", productData.estateFloors);
    formData.append("estateRooms", productData.estateRooms);
    formData.append("estateBedrooms", productData.estateBedrooms);
    formData.append("estateBathrooms", productData.estateBathrooms);
    if (productData.estateCurrency !== 0) {
      formData.append(
        "estatePrice",
        `${currencyConvertor(productData.estatePrice, 1)}`
      );
    } else {
      formData.append("estatePrice", productData.estatePrice);
    }
    formData.append("estateAddons", JSON.stringify(productData.estateAddons));
    formData.append(
      "estateClosePlaces",
      JSON.stringify(productData.estateClosePlaces)
    );
    formData.append("estateCurrency", "0");
    formData.append("estateVip", productData.estateVip);
    formData.append("estateVipDays", productData.estateVipDays);
    productData.estateImages.forEach((image: any) => {
      if (image.cover == true) {
        formData.append("estateActiveImage", image.image);
      }
      formData.append("images[]", image.image);
    });
    setAlertBlock(true);
    axiosCall
      .post("/upload_product", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setUploadStatus(res.data.status);
        if (res.data.status === 100) {
          clearAddProduct();
        }
      });
  }
};

export function EstateClosePlaces(props: {
  setData?: Function;
  defData?: number[] | null;
}) {
  const [selectedAddons, setSelectedAddons] = useState<number[]>(
    props.defData ? props.defData : []
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!props.setData) {
      if (selectedAddons.length === 0) {
        dispatch(updateClosePlaces(null));
      } else {
        dispatch(updateClosePlaces(selectedAddons));
      }
    } else {
      if (selectedAddons.length === 0) {
        props.setData(null);
      } else {
        props.setData(selectedAddons);
      }
    }
  }, [selectedAddons]);
  const addAddon = (index: number) => {
    if (selectedAddons.includes(index)) {
      let newAddons = selectedAddons.filter((item) => item !== index);
      setSelectedAddons([...newAddons]);
    } else {
      let newArr = [...selectedAddons, index];
      setSelectedAddons([...newArr]);
    }
  };

  return (
    <div className="flex flex-col">
      <p className=" text-textHead tracking-wider font-mainBold  mobile:text-[15px]  mobile:text-center ">
        ახლოს მდებარეობს
      </p>
      <div className="flex items-start justify-center gap-3 flex-col flex-wrap max-h-[200px] my-[25px] pl-5 mobileTab:pl-0 mobileSmall:pl-5 mobileSmall:max-h-fit">
        {closePlacesList().map((e: TClosePlace, i: number) => (
          <ClosePlaceBlock
            key={i}
            i={i}
            e={e}
            addAddon={addAddon}
            selectedAddons={selectedAddons}
          />
        ))}
      </div>
    </div>
  );
}
function ClosePlaceBlock(props: {
  i: number;
  e: TClosePlace;
  addAddon: Function;
  selectedAddons: number[];
}) {
  const [active, setActive] = useState(props.selectedAddons.includes(props.i));
  return (
    <div
      key={props.i}
      onClick={() => {
        props.addAddon(props.i);
        setActive((state) => !state);
      }}
      className="flex items-center cursor-pointer select-none"
    >
      <div
        className={`h-[16px] aspect-square border-2 rounded-md mr-3 transition-colors flex justify-center items-center ${
          active ? `bg-[${props.e.color}]` : "bg-transparent"
        }`}
        style={{
          borderColor: props.e.color,
          backgroundColor: active ? props.e.color : "transparent",
        }}
      >
        {active && <CheckIcon className="h-[8px] aspect-square " />}
      </div>
      {props.e.icon("h-[30px] mobileTab:h-[24px]")}
      <p className="ml-2 text-Asmall text-textDesc mobileTab:text-[12px]">
        {props.e.name}
      </p>
    </div>
  );
}
export function EstateAddons({
  productData,
  estateType,
  defData,
  setData,
}: {
  productData: any;
  estateType?: number;
  defData?: number[] | null;
  setData?: Function;
}) {
  const [selectedAddons, setSelectedAddons] = useState<number[]>(
    defData ? defData : []
  );

  const [addonList, setAddonList] = useState<any[]>(productAddonsList());
  const dispatch = useDispatch();
  useEffect(() => {
    if (!setData) {
      if (selectedAddons.length === 0) {
        dispatch(updateAddons(null));
      } else {
        dispatch(updateAddons(selectedAddons));
      }
    } else {
      if (selectedAddons.length === 0) {
        setData(null);
      } else {
        setData(selectedAddons);
      }
    }
  }, [selectedAddons]);
  useEffect(() => {
    if (productData.estateType == 3 || (estateType && estateType == 3)) {
      setAddonList(productAddonsListForLand());
    } else if (productData.estateType == 4 || (estateType && estateType == 4)) {
      setAddonList(productAddonsListForHotel());
    } else {
      setAddonList(productAddonsList());
    }
  }, [productData.estateType, estateType]);
  const addAddon = (index: number) => {
    if (selectedAddons.includes(index)) {
      let newAddons = selectedAddons.filter((item) => item !== index);
      setSelectedAddons([...newAddons]);
    } else {
      let newArr = [...selectedAddons, index];
      setSelectedAddons([...newArr]);
    }
  };

  return (
    <div className="flex flex-col">
      <p className=" text-textHead tracking-wider font-mainBold  mobile:text-[15px]  mobile:text-center ">
        მონიშნეთ დამატებები
      </p>
      <div className="flex items-start justify-center gap-3 flex-col flex-wrap max-h-[200px] my-[25px] pl-5 mediumSmallXl:max-h-[350px] mobileTab:pl-0 mobileSmall:pl-5 mobileSmall:max-h-fit">
        {addonList.map((e: TProductAddon, i: number) => {
          if (productData.estateType !== 0 && e.name == "კანალიზაცია") {
            return null;
          }
          return (
            <AddonBlock
              key={i}
              i={i}
              e={e}
              addAddon={addAddon}
              selectedAddons={selectedAddons}
            />
          );
        })}
      </div>
    </div>
  );
}
function AddonBlock(props: {
  i: number;
  e: TProductAddon;
  addAddon: Function;
  selectedAddons: number[];
}) {
  const [active, setActive] = useState(props.selectedAddons.includes(props.i));
  return (
    <div
      key={props.i}
      onClick={() => {
        props.addAddon(props.i);
        setActive((state) => !state);
      }}
      className="flex items-center cursor-pointer select-none"
    >
      <div
        className={`h-[16px] aspect-square border-2 border-main rounded-md mr-3 transition-colors flex justify-center items-center ${
          active ? "bg-main" : "bg-transparent"
        }`}
      >
        {active && <CheckIcon className="h-[8px]  aspect-square" />}
      </div>
      {props.e.icon("h-[30px] mobileTab:h-[24px]")}
      <p className="ml-2 text-Asmall text-textDesc mobileTab:text-[12px]">
        {props.e.name}
      </p>
    </div>
  );
}

export function EstateImages(props: { error: boolean }) {
  const dispatch = useDispatch();
  const productData = useSelector((store: RootState) => store.addProduct);
  const [images, setImages] = useState<any>([]);
  useEffect(() => {
    if (images.length > 0) {
      let covers = images.filter(
        (item: { image: any; url: string; cover: boolean }) =>
          item.cover === true
      );

      if (covers.length === 0) {
        let newImages = images.map(
          (item: { image: any; url: string; cover: boolean }) => ({
            image: item.image,
            url: item.url,
            cover: false,
          })
        );
        newImages[0].cover = true;
        dispatch(updateActiveImage(images[0].url));
        dispatch(updateImages(newImages));
        setImages([...newImages]);
      } else {
        dispatch(updateActiveImage(covers[0].url));
        dispatch(updateImages([...images]));
      }
    } else if (images.length === 0) {
      dispatch(updateActiveImage(null));
      dispatch(updateImages(null));
    }
    if (
      productData.estateActiveImage == null &&
      productData.estateImages == null &&
      images.length > 0
    ) {
      setImages([]);
    }
  }, [images, productData.estateActiveImage]);

  const removeImage = (index: number) => {
    images.splice(index, 1);
    setImages([...images]);
  };
  const makeMainImage = (index: number) => {
    let newImages = images.map(
      (item: { image: any; url: string; cover: boolean }) => ({
        image: item.image,
        url: item.url,
        cover: false,
      })
    );
    newImages[index].cover = true;

    dispatch(updateActiveImage(images[index].url));
    setImages([...newImages]);
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center mobile:flex-col">
        <p className=" text-textHead tracking-wider font-mainBold  mobile:text-[15px]  mobile:text-center ">
          {t("selectors.photos")}{" "}
        </p>
        <p className="text-Asmall text-textDescCard ml-2 mobile:ml-0 text-center">
          ({t("selectors.photo_condition")})
        </p>{" "}
      </div>
      {images.length == 0 && props.error && (
        <div className=" rounded-xl text-pinkI bg-pinkClear py-3 px-4 text-sm tracking-wider mt-4 text-center">
          {" "}
          {t("selectors.photo_required")}
        </div>
      )}
      <div className="flex gap-3 flex-wrap pl-3 mt-4 mobile:justify-center mobile:pl-0">
        <div className=" h-[120px] aspect-video bg-whiteLow rounded-xl cursor-pointer transition-colors hover:bg-whiteHover flex justify-center items-center relative">
          <PlusIcon className=" h-[32px] aspect-square [&>path]:fill-whiteCont" />
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            className="h-full w-full absolute cursor-pointer"
            onChange={(event) => {
              if (event.target.files) {
                const selectedImages = Array.from(event.target.files).map(
                  (file) => {
                    return {
                      image: file,
                      url: URL.createObjectURL(file),
                      cover: false,
                    };
                  }
                );
                event.target.value = "";
                let allImages = [...selectedImages];

                if (images && images.length > 0) {
                  allImages = [...images, ...selectedImages];
                }
                if (allImages.length > 15) allImages = allImages.slice(-15);

                setImages(() => [...allImages]);
              }
            }}
            multiple
          />
        </div>
        {images.length !== 0 &&
          images.map(
            (e: { image: any; url: string; cover: boolean }, i: number) => (
              <div
                key={i}
                className="group  h-[120px] overflow-hidden aspect-video bg-whiteLow rounded-xl transition-colors hover:bg-whiteHover flex justify-center items-center relative"
              >
                <div className="flex items-center gap-3 absolute top-2 right-2">
                  <button
                    onClick={() => makeMainImage(i)}
                    className="invisible transition-opacity group-hover:visible opacity-0 group-hover:opacity-100   h-[30px] w-[150px] rounded-md bg-main text-buttonText z-[2] text-Asmaller tracking-wider"
                  >
                    {t("selectors.set_cover")}
                  </button>
                  <button
                    onClick={() => removeImage(i)}
                    className="invisible transition-opacity group-hover:visible opacity-0 group-hover:opacity-100   h-[30px] aspect-square rounded-md bg-redI text-whiteMain z-[2] text-Asmaller tracking-wider flex justify-center items-center"
                  >
                    <TrashIcon className="h-[20px] aspect-square [&>path]:stroke-buttonText" />
                  </button>
                </div>
                {e.cover == true && (
                  <div className="absolute bottom-1 left-1 w-[70px] h-[26px] flex items-center justify-center rounded-lg tracking-widest bg-main text-buttonText text-Asmaller z-[2]">
                    {t("selectors.cover")}
                  </div>
                )}
                <img
                  src={e.url}
                  alt="EstateImage"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            )
          )}
      </div>
    </div>
  );
}

export function EstateType(props: { setData?: Function; defData?: number }) {
  const productType = useSelector(
    (store: RootState) => store.addProduct.estateType
  );
  const [active, setActive] = useState<null | number>(
    props.defData !== undefined ? props.defData : null
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!props.setData) {
      dispatch(updateType(active));
    } else {
      props.setData(active);
    }
  }, [active]);
  useEffect(() => {
    if (productType == null && props.defData == undefined) {
      setActive(null);
    }
  }, [productType]);

  return (
    <div className="flex flex-col">
      <p className=" text-textHead tracking-wider font-mainBold  mobile:text-[15px]  mobile:text-center ">
        {t("addProduct.real_estate_type")} *
      </p>
      <div className="flex gap-3 flex-wrap pl-3 mt-4 mobile:justify-center mobile:pl-0">
        {RealEstateTypes().map((e, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`mobile:w-full mobile:flex mobile:py-[15px] mobile:items-center mobile:justify-start   p-2 px-4 rounded-xl transition-colors ${
              active == i ? "bg-main" : "bg-mainClear"
            }`}
          >
            <e.icon
              className={`mobile:ml-5 h-[24px] aspect-square ${
                active == i && "[&>path]:fill-buttonText"
              } `}
            />
            <p
              className={`text-Asmall ml-7 tracking-wide ${
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

export function EstateInformation(props: {
  error?: boolean;
  productData: any;
  setData?: Function;
  defData?: TinfoDefData;
}) {
  const [size, setSize] = useState<null | number>(
    props.defData ? props.defData.size : null
  );
  const [landSize, setLandSize] = useState<null | number>(
    props.defData ? props.defData.landSize : null
  );
  const [openDeal, setOpenDeal] = useState(false);
  const [currency, setCurrency] = useState(
    props.defData ? props.defData.currency : 0
  );
  const [fullPrice, setFullPrice] = useState(
    props.defData ? props.defData.fullPrice : 0
  );
  const [sizePrice, setSizePrice] = useState(
    props.defData ? props.defData.sizePrice : 0
  );
  const [floor, setFloor] = useState(
    props.defData ? `${props.defData.floor}` : ""
  );
  const [floors, setFloors] = useState(
    props.defData ? `${props.defData.floors}` : ""
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!props.setData) {
      if (fullPrice > 0) {
        dispatch(updateFullPrice(fullPrice));
      }
    } else {
      props.setData((state: TinfoDefData) => ({
        ...state,
        fullPrice: fullPrice,
      }));
    }
  }, [fullPrice]);
  useEffect(() => {
    if (!props.setData) {
      dispatch(updateCurrency(currency));
    } else {
      props.setData((state: TinfoDefData) => ({
        ...state,
        currency: currency,
      }));
    }
  }, [currency]);
  const calculateSizePrice = (price: number) => {
    if (size && size > 0) {
      if (landSize && landSize > 0) {
        setSizePrice(Math.floor(price / (size + landSize)));
      } else {
        setSizePrice(Math.floor(price / size));
      }
    }
  };
  const calculateFullPrice = (price: number) => {
    if (size && size > 0) {
      if (landSize && landSize > 0) {
        setFullPrice(Math.floor(price * (size + landSize)));
      } else {
        setFullPrice(Math.floor(price * size));
      }
    }
  };

  return (
    <>
      <div className="flex flex-col ">
        <p className=" text-textHead tracking-wider font-mainBold  mobile:text-[15px]  mobile:text-center ">
          {t("addProduct.info")}
        </p>
        {(size == null || fullPrice == 0) && props.error && (
          <div className=" rounded-xl text-pinkI bg-pinkClear py-3 px-4 text-sm tracking-wider mt-4 text-center">
            {" "}
            {t("addProduct.required_space_price")}
          </div>
        )}
        <div className="flex gap-6 flex-col pl-3 mt-4 mobile:pl-0">
          <div className="flex items-center mobileSmall:flex-col  mobileSmall:items-stretch">
            <p className="text-textDesc font-mainMedium w-[200px] mobileTab:text-[14px] mobileTab:min-w-[auto] mobileSmall:mb-3 mobileSmall:text-center mobileSmall:w-full mobileSmall:mt-3">
              {t("product.space")} ({t("global.m")}²) *
            </p>{" "}
            <div className="w-full flex justify-end">
              <input
                type="number"
                className="AddProductInput mobileSmall:mx-auto "
                placeholder={t("product.space")}
                onChange={(e) => {
                  setSize(e.target.valueAsNumber);
                  if (!props.setData) {
                    dispatch(updateSize(e.target.valueAsNumber));
                  } else {
                    props.setData((state: TinfoDefData) => ({
                      ...state,
                      size: e.target.valueAsNumber,
                    }));
                  }
                }}
                value={size ? size : ""}
              />{" "}
            </div>
          </div>
          {props.productData.estateType === 0 ? (
            <div className="flex items-center mobileSmall:flex-col  mobileSmall:items-stretch">
              <p className="text-textDesc font-mainMedium w-[200px] mobileTab:text-[14px] mobileTab:min-w-[auto] mobileSmall:mb-3 mobileSmall:text-center mobileSmall:w-full mobileSmall:mt-3">
                {t("product.yard_area")} ({t("global.m")}²)
              </p>{" "}
              <div className="w-full flex justify-end">
                <input
                  type="number"
                  className="AddProductInput mobileSmall:mx-auto "
                  placeholder={t("product.yard_area")}
                  onChange={(e) => {
                    setLandSize(e.target.valueAsNumber);
                    if (!props.setData) {
                      dispatch(updateLandSize(e.target.valueAsNumber));
                    } else {
                      props.setData((state: TinfoDefData) => ({
                        ...state,
                        landSize: e.target.valueAsNumber,
                      }));
                    }
                  }}
                  value={landSize ? landSize : ""}
                />{" "}
              </div>
            </div>
          ) : null}
          <div className="flex flex-col z-[4]">
            <>
              {size == null || size <= 0 ? (
                <div className=" rounded-xl text-orangeI bg-orangeClear py-3 px-4 text-sm tracking-wider  mb-4 text-center">
                  {" "}
                  {t("addProduct.insert_price_before_space")}
                </div>
              ) : null}
              <div className="flex items-center justify-between mediumSmall:flex-col mediumSmall:justify-center mediumSmall:gap-3">
                <p className="text-textDesc font-mainMedium w-[60px] mobileTab:text-[14px] mobileTab:min-w-[auto] mobileSmall:mb-3 mobileSmall:text-center mobileSmall:w-full mobileSmall:mt-3">
                  {t("filters.price")} *
                </p>{" "}
                {/* <p className=" text-textHead tracking-wider font-mainBold  mobile:text-[15px]  mobile:text-center ">
                ფასი
                </p> */}
                <div
                  className={`flex gap-4 flex-wrap items-center  transition-opacity  mobile:w-full ${
                    size == null || size <= 0
                      ? "pointer-events-none opacity-40"
                      : ""
                  } `}
                >
                  <div className="relative mobile:w-full">
                    <button
                      onClick={() => setOpenDeal((state) => !state)}
                      type="button"
                      className="bg-main mobile:w-full flex items-center w-[150px] justify-center py-[8px] rounded-lg text-buttonText tracking-widest font-mainMedium text-Asmall"
                    >
                      {currency == 0 ? "$ USD" : "₾ GEL"}
                      <DropDownIcon className="h-[16px] aspect-square flex items-center justify-center ml-4 translate-y-[1px] [&>path]:fill-WhiteFade" />
                    </button>
                    <div
                      className={` w-[150px] absolute shadow-cardShadow bg-whiteMain rounded-lg top-[45px] overflow-hidden transition-all  ${
                        openDeal ? "opacity-100 visible" : "invisible opacity-0"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setOpenDeal(false);
                          setCurrency(1);
                        }}
                        type="button"
                        className={`h-[40px]  w-full flex justify-center items-center text-textHead transition-colors hover:bg-whiteHover ${
                          currency == 0 && "bg-whiteHover"
                        }`}
                      >
                        ₾ GEL
                      </button>
                      <button
                        onClick={() => {
                          setOpenDeal(false);
                          setCurrency(0);
                        }}
                        type="button"
                        className={`h-[40px] w-full flex justify-center items-center text-textHead transition-colors hover:bg-whiteHover ${
                          currency == 0 && "bg-whiteHover"
                        }`}
                      >
                        $ USD
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mobile:w-full mobile:justify-center">
                    <input
                      type="number"
                      className="AddProductInput mobile:w-[100%_!important]"
                      placeholder={t("addProduct.full_price")}
                      onChange={(e) => {
                        setFullPrice(e.target.valueAsNumber);
                        calculateSizePrice(e.target.valueAsNumber);
                      }}
                      value={fullPrice ? fullPrice : ""}
                    />{" "}
                    <p className=" text-textDesc">
                      {currency == 0 ? "$" : "₾"}
                    </p>{" "}
                  </div>
                  <div className="flex items-center gap-2 mobile:w-full mobile:justify-center">
                    <input
                      type="number"
                      className="AddProductInput mobile:w-[100%_!important]"
                      placeholder={`${t("global.m")}² ${t("product.price")}`}
                      onChange={(e) => {
                        setSizePrice(e.target.valueAsNumber);
                        calculateFullPrice(e.target.valueAsNumber);
                      }}
                      value={sizePrice ? sizePrice : ""}
                    />{" "}
                    <p className=" text-textDesc">
                      {currency == 0 ? "$" : "₾"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          </div>
          {props.productData.estateType !== 3 ? (
            <>
              {props.productData.estateType !== 2 ? (
                <>
                  <div className="flex items-start mobileTab:flex-col h-auto   mobileTab:items-stretch">
                    <p className="text-textDesc font-mainMedium w-[200px] min-w-[200px] mobileTab:text-[14px] mobileTab:min-w-[auto] mobileTab:mb-3 mobileTab:text-center mobileTab:w-full mobileTab:mt-3">
                      {t("addProduct.project")} *
                    </p>
                    <BubbleSelector
                      itemList={projectTypes()}
                      defData={props.defData?.project}
                      setData={(item: any) => {
                        if (!props.setData) {
                          dispatch(updateProject(item));
                        } else {
                          props.setData((state: TinfoDefData) => ({
                            ...state,
                            project: item,
                          }));
                        }
                      }}
                    />
                  </div>
                </>
              ) : null}
              <div className="flex items-center mobileTab:flex-col   mobileTab:items-stretch ">
                <p className="text-textDesc font-mainMedium w-[200px] mobileTab:text-[14px] mobileTab:min-w-[auto] mobileTab:mb-3 mobileTab:text-center mobileTab:w-full mobileTab:mt-3">
                  {t("addProduct.condition")} *
                </p>

                <BubbleSelector
                  itemList={projectStatuses()}
                  defData={props.defData?.projectStatus}
                  setData={(item: any) => {
                    if (!props.setData) {
                      dispatch(updateCondition(item));
                    } else {
                      props.setData((state: TinfoDefData) => ({
                        ...state,
                        projectStatus: item,
                      }));
                    }
                  }}
                />
              </div>

              <div className="flex items-center mobileTab:flex-col  mobileTab:items-stretch">
                <p className="text-textDesc font-mainMedium min-w-[200px] mobileTab:text-[14px] mobileTab:min-w-[auto] mobileTab:mb-3 mobileTab:text-center mobileTab:w-full mobileTab:mt-3">
                  {t("addProduct.floor")}
                </p>
                <div className="flex gap-4 flex-wrap  mobileTab:justify-center w-full justify-end">
                  <input
                    type="number"
                    className="AddProductInput"
                    placeholder={t("addProduct.floors")}
                    value={floor}
                    onChange={(e) => {
                      if (!props.setData) {
                        dispatch(updateFloor(e.target.valueAsNumber));
                      } else {
                        props.setData((state: TinfoDefData) => ({
                          ...state,
                          floors: e.target.valueAsNumber,
                        }));
                      }
                      setFloor(e.target.value);
                    }}
                  />{" "}
                  <input
                    type="number"
                    className="AddProductInput"
                    placeholder={t("addProduct.all_floors")}
                    value={floors}
                    onChange={(e) => {
                      if (!props.setData) {
                        dispatch(updateFloors(e.target.valueAsNumber));
                      } else {
                        props.setData((state: TinfoDefData) => ({
                          ...state,
                          allFloors: e.target.valueAsNumber,
                        }));
                      }
                      setFloors(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center mobileTab:flex-col">
                <p className="text-textDesc font-mainMedium w-[200px] mobileTab:w-full mobileTab:mb-3 mobileTab:mt-5 mobileTab:text-center">
                  {t("addProduct.rooms")} *
                </p>
                <div className="w-full flex justify-end mobileTab:justify-center">
                  <SelectNumbers
                    setDataDispatch={updateRooms}
                    defData={props.defData?.rooms}
                    setData={(e: number) => {
                      if (props.setData) {
                        props.setData((state: TinfoDefData) => ({
                          ...state,
                          rooms: e,
                        }));
                      }
                    }}
                    name=""
                  />
                </div>
              </div>
              <div className="flex items-center mobileTab:flex-col">
                <p className="text-textDesc font-mainMedium w-[200px] mobileTab:w-full mobileTab:mb-3 mobileTab:mt-5 mobileTab:text-center">
                  {t("addProduct.bedrooms")} *
                </p>{" "}
                <div className="w-full flex justify-end mobileTab:justify-center">
                  <SelectNumbers
                    setDataDispatch={updateBedrooms}
                    defData={props.defData?.bedroom}
                    setData={(e: number) => {
                      if (props.setData) {
                        props.setData((state: TinfoDefData) => ({
                          ...state,
                          bedroom: e,
                        }));
                      }
                    }}
                    name=""
                  />{" "}
                </div>
              </div>
              <div className="flex items-center mobileTab:flex-col">
                <p className="text-textDesc font-mainMedium w-[200px] mobileTab:w-full mobileTab:mb-3 mobileTab:mt-5 mobileTab:text-center">
                  {t("addProduct.wet_points")} *
                </p>{" "}
                <div className="w-full flex justify-end mobileTab:justify-center">
                  <SelectNumbers
                    setDataDispatch={updateBathrooms}
                    defData={props.defData?.bathroom}
                    setData={(e: number) => {
                      if (props.setData) {
                        props.setData((state: TinfoDefData) => ({
                          ...state,
                          bathroom: e,
                        }));
                      }
                    }}
                    name=""
                  />{" "}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
