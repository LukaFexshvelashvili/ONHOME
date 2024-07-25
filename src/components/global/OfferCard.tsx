import { useDispatch } from "react-redux";
import { TOffer } from "../../assets/lists/offers";
import { updateVip } from "../../store/data/addProductSlice";
import { t } from "i18next";

export default function OfferCard(props: {
  offerData: TOffer;
  activeStatus: number;
  setActiveStatus?: Function;
}) {
  const dispatch = useDispatch();
  return (
    <div
      className=" h-[350px] w-[260px] rounded-section flex justify-between p-3 relative items-center flex-col"
      style={{ backgroundColor: props.offerData.secondColor }}
    >
      <div
        className="absolute h-[30px] w-[120px] rounded-normal font-mainBold text-buttonText flex items-center justify-center text-Asmall tracking-wider top-0 -translate-y-1/4"
        style={{ backgroundColor: props.offerData.mainColor }}
      >
        {props.offerData.name}
      </div>
      <div
        className="flex flex-col mt-7
    "
      >
        {props.offerData.benefits.map((item: string, index: number) => (
          <div key={index} className="flex flex-col">
            <p className="text-[13px] tracking-normal font-mainBold text-textDesc text-center">
              {item}
            </p>
            <div
              className="h-[2px] w-[30px] rounded-md  mx-auto my-2"
              style={{ backgroundColor: props.offerData.lineColor }}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 w-full">
        <p
          className="text-Asmall font-mainBold text-center"
          style={{ color: props.offerData.mainColor }}
        >
          {props.offerData.price !== 0
            ? `1 ${t("offers.day")} - ${
                props.offerData.sale
                  ? (props.offerData.price - props.offerData.sale).toFixed(2)
                  : props.offerData.price
              }₾`
            : t("offers.free")}
          {props.offerData.sale ? (
            <span className="  line-through opacity-30 ml-2">
              {props.offerData.price.toFixed(2)}₾
            </span>
          ) : null}
        </p>
        <button
          className="h-[36px] w-full rounded-md text-Asmall font-mainBold tracking-wider transition-colors"
          style={{
            backgroundColor:
              props.activeStatus == props.offerData.status
                ? "#FFFFFF"
                : props.offerData.mainColor,
            color:
              props.activeStatus == props.offerData.status
                ? props.offerData.mainColor
                : "#FFFFFF",
          }}
          onClick={() => {
            if (props.setActiveStatus) {
              props.setActiveStatus(
                props.offerData.status == props.activeStatus
                  ? 0
                  : props.offerData.status
              );
            }
            dispatch(updateVip(props.offerData.status));
          }}
        >
          {props.activeStatus == props.offerData.status
            ? t("offers.choosed")
            : t("offers.choose")}
        </button>
      </div>
    </div>
  );
}
