import { useDispatch, useSelector } from "react-redux";
import {
  BedIcon,
  BookmarkIcon,
  DateIcon,
  LoginEyeIcon,
  PhoneFIlledIcon,
  ReportIcon,
  RoomIcon,
  ShareIcon,
  SquareFrameIcon,
  StairsIcon,
  UserIcon,
} from "../../../assets/icons/Icons";
import { RootState } from "../../../store/store";
import { useState } from "react";
import { addFavorite, removeFavorite } from "../../../hooks/serverFunctions";
import { currencyConvertor } from "../../../components/convertors/convertors";
import { projectStatuses } from "../../../assets/lists/productAddons";
import { TproductPage } from "../Product";
import { Link } from "react-router-dom";
import { setReportProblem, setShare } from "../../../store/data/popupsSlice";
import numeral from "numeral";
export default function ProductSideBar({
  pageData,
}: {
  pageData: TproductPage;
}) {
  const userFavorites = useSelector((store: RootState) => store.user.favorites);
  const dispatch = useDispatch();
  const [favorited, setFavorited] = useState(
    userFavorites.includes(pageData.productData.id)
  );

  const [currency, setCurrency] = useState<number>(0);
  const [seeNumber, setSeeNumber] = useState<boolean>(false);
  const [price, setPrice] = useState<{ full: number; perSize: number }>({
    full: Math.floor(pageData.productData.estate_price),
    perSize: pageData.productData.estate_land_size
      ? Math.floor(
          pageData.productData.estate_price /
            (pageData.productData.estate_size +
              pageData.productData.estate_land_size)
        )
      : Math.floor(
          pageData.productData.estate_price / pageData.productData.estate_size
        ),
  });

  const changeFavorite = () => {
    if (favorited) {
      removeFavorite(dispatch, pageData.productData.id);
      setFavorited(false);
    } else {
      addFavorite(dispatch, pageData.productData.id);

      setFavorited(true);
    }
  };
  const changeCurrency = (newCurrency: number) => {
    setPrice({
      full: currencyConvertor(price.full, currency),
      perSize: currencyConvertor(price.perSize, currency),
    });
    setCurrency(newCurrency);
  };

  return (
    <div className="flex-1 flex flex-col gap-3">
      <div className="bg-whiteMain rounded-block  shadow-sectionShadow">
        <div className="py-4 px-5 mobile:p-3 ">
          <div className=" mobileSmall:max-h-[18px] mobileSmall:overflow-hidden flex items-center text-[13px] font-mainBold text-textDescCard gap-7 mobile:justify-center mobile:gap-4 mobile:flex-wrap mobile:text-[11px] mobileSmall:text-[10px]">
            <span className="flex items-center">
              <LoginEyeIcon className=" h-[18px] aspect-square [&>path]:fill-textDesc mr-3 mobile:mr-2" />{" "}
              {pageData.productData.views}
            </span>
            <span className="flex items-center">
              <DateIcon className=" h-[18px] aspect-square [&>path]:fill-textDesc mr-3 mobile:mr-2 translate-y-[-1px]" />{" "}
              {pageData.productData.update_time.slice(0, 16)}
            </span>
            <span>ID - {pageData.productData.id}</span>
          </div>
          <div className="flex items-center mt-2 justify-between mobile:flex-col-reverse mobile:mt-3 mobile:gap-3 mobile:items-stretch">
            <h2 className="text-[18px] text-textHeadCard tracking-wide font-mainBold mobile:text-[18px] mobileSmall:text-[16px] max-w-[360px] overflow-hidden text-nowrap ">
              {pageData.productData.estate_title.slice(0, 30)}
            </h2>
            <div className=" flex justify-center items-center bg-mainClear text-main h-[30px] px-3 font-mainSemiBold tracking-wider rounded-md text-[13px] mobile:mx-auto mobileSmall:text-[12px] mobileSmall:h-[28px]">
              {getDealType(pageData.productData.estate_deal)}
            </div>{" "}
          </div>
          <div className=" flex text-textHead items-center h-[26px] font-mainSemiBold tracking-wider rounded-lg text-[13px] mobile:mx-auto mobileSmall:text-[12px] mobileSmall:h-[28px]">
            ტიპი:{" "}
            <Link
              className="ml-2 "
              to={"/search?estate_type=" + pageData.productData.estate_type}
            >
              <span className="text-main ">
                {getType(pageData.productData.estate_type)}
              </span>
            </Link>
          </div>{" "}
          {pageData.productData.estate_district ? (
            <div className=" flex text-textHead items-center h-[26px] font-mainSemiBold tracking-wider rounded-lg text-[13px] mobile:mx-auto mobileSmall:text-[12px] mobileSmall:h-[28px]">
              რაიონი:{" "}
              <Link
                className="ml-2 "
                to={"/search?district=" + pageData.productData.estate_district}
              >
                <span className="text-main ">
                  {pageData.productData.estate_district}
                </span>
              </Link>
            </div>
          ) : null}
          {pageData.productData.estate_urban ? (
            <div className=" flex text-textHead items-center h-[26px] font-mainSemiBold tracking-wider rounded-lg text-[13px] mobile:mx-auto mobileSmall:text-[12px] mobileSmall:h-[28px]">
              უბანი:{" "}
              <Link
                className="ml-2 "
                to={"/search?urban=" + pageData.productData.estate_urban}
              >
                <span className="text-main ">
                  {pageData.productData.estate_urban}
                </span>
              </Link>
            </div>
          ) : null}
          {pageData.productData.estate_land_size ? (
            <div className=" flex text-textHead items-center h-[26px] font-mainSemiBold tracking-wider rounded-lg text-[13px] mobile:mx-auto mobileSmall:text-[12px] mobileSmall:h-[28px]">
              ეზოს ფართი:{" "}
              <span className="ml-2 text-textDesc ">
                {pageData.productData.estate_land_size}
              </span>
            </div>
          ) : null}
          {pageData.productData.estate_condition ? (
            <div className=" flex text-textHead items-center h-[30px] font-mainSemiBold tracking-wider rounded-lg text-Asmall mobile:mx-auto mobileSmall:text-[12px] mobileSmall:h-[28px]">
              მდგომარეობა:{" "}
              <span className="ml-2 text-main ">
                {projectStatuses[pageData.productData.estate_condition]}
              </span>
            </div>
          ) : null}
          <div className="flex items-center mt-5 justify-between px-3 mobile:px-0">
            <div className="flex items-center gap-4 mobileSmall:gap-2">
              <p className="text-[20px] font-mainBold text-textHeadCard mobile:text-[18px] mobileSmall:text-[16px]">
                {numeral(price.full).format("0,0").replace(/,/g, " ")}{" "}
                {currency == 0 ? "$" : currency == 1 ? "₾" : ""}
              </p>
              <p className="text-[16px] font-mainBold text-textDescCard mobile:text-[14px] mobileSmall:text-[12px]">
                1 მ² - {numeral(price.perSize).format("0,0").replace(/,/g, " ")}{" "}
                {currency == 0 ? "$" : currency == 1 ? "₾" : ""}
              </p>
            </div>
            <div
              onClick={() => changeCurrency(currency == 0 ? 1 : 0)}
              className={`h-[30px] w-[70px] flex items-center select-none outline outline-2 -outline-offset-2 outline-borderCol1 rounded-lg  text-textDescCard cursor-pointer`}
            >
              <div
                className={`flex-1 transition-all h-full flex items-center justify-center font-mainRegular ${
                  currency == 0
                    ? ""
                    : "text-buttonText bg-main rounded-lg relative"
                } `}
              >
                ₾
              </div>
              <div
                className={`flex-1 transition-all h-full flex items-center justify-center font-mainRegular ${
                  currency == 0
                    ? "text-buttonText bg-main rounded-lg relative"
                    : ""
                }`}
              >
                $
              </div>
            </div>
          </div>
          <div className="outline outline-2 -outline-offset-2 outline-borderCol1 mobile:flex-col mobile:h-auto  rounded-xl  w-full h-[48px] mt-4 flex items-center">
            {seeNumber ? (
              <Link
                to={"tel:" + pageData.userData.mobile}
                className="w-auto mobile:w-full"
              >
                <button className="flex-1 text-buttonText flex justify-center min-w-[300px] items-center h-full rounded-xl min-h-[48px] mobile:min-h-[54px] mobileSmall:text-[13px] px-5 mobile:w-full bg-main relative text-Asmaller mobile:text-[14px] tracking-wide font-mainSemiBold transition-colors hover:bg-mainHover">
                  <PhoneFIlledIcon className="mobile:h-[21px] mobileSmall:h-[18px] h-[19px] aspect-square [&>path]:fill-text-buttonText mr-3 translate-y-[-1px]" />{" "}
                  {pageData.userData.mobile.slice(0, 3) +
                    " " +
                    pageData.userData.mobile.slice(3, 5) +
                    " " +
                    pageData.userData.mobile.slice(5, 7) +
                    " " +
                    pageData.userData.mobile.slice(7, 9) +
                    " დარეკვა"}
                </button>
              </Link>
            ) : (
              <button
                onClick={() => setSeeNumber(true)}
                className="flex-1  text-buttonText flex justify-center min-w-[300px] items-center h-full rounded-xl min-h-[48px] mobile:min-h-[54px] mobileSmall:text-[13px] px-5 mobile:w-full bg-main relative text-Asmaller mobile:text-[14px] tracking-wide font-mainSemiBold transition-colors hover:bg-mainHover"
              >
                <PhoneFIlledIcon className="mobile:h-[21px] mobileSmall:h-[18px] h-[19px] aspect-square [&>path]:fill-text-buttonText mr-3 translate-y-[-1px]" />{" "}
                {pageData.userData.mobile.slice(0, 3) +
                  " " +
                  pageData.userData.mobile.slice(3, 5) +
                  " ** ** ნომრის ჩვენება"}
              </button>
            )}{" "}
            <div className="flex-1 ">
              <Link to={"/Seller/" + pageData.userData.id}>
                <div className=" pl-5 flex items-center cursor-pointer mobile:h-auto mobile:py-[10px] mobile:justify-start ">
                  <UserIcon className="mobile:h-[21px] mobileSmall:text-[18px] h-[19px] aspect-square [&>g>path]:fill-userIconFilled mr-3 translate-y-[-1px]" />
                  <div className="flex flex-col ">
                    <p className="text-Asmallest text-textHeadCard font-mainBold leading-4 mobile:text-[13px] mobileSmall:text-[12px] mobile:leading-[18px]">
                      {pageData.userData.name}
                    </p>
                    <p className="text-Asmallest text-textDescCard font-mainBold leading-4 mobile:text-[13px] mobileSmall:text-[12px] mobile:leading-[18px]">
                      ყველა განცხადების ნახვა
                    </p>
                  </div>
                </div>
              </Link>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="bg-whiteMain rounded-block h-[70px] flex items-center  shadow-sectionShadow mobile:flex-wrap mobile:h-auto mobile:gap-y-5  mobile:p-3 mobile:justify-center">
        <div className="flex-1 px-5 flex items-center  mobile:min-w-[50%] border-r-2 mobile:border-none  border-lineBg">
          <SquareFrameIcon className=" h-[25px] aspect-square [&>path]:stroke-textHeadCard" />
          <div className="flex flex-col ml-3">
            <p className=" text-textDesc text-Asmaller font-mainBold tracking-wider">
              ფართი
            </p>
            <p className="text-textHeadCard text-Asmall font-mainBold ml-1 tracking-wider">
              {pageData.productData.estate_size}{" "}
              {pageData.productData.estate_type == 3 ? "" : "მ²"}
            </p>
          </div>
        </div>
        <div className="flex-1 px-5 flex items-center  mobile:min-w-[50%] border-r-2 mobile:border-none  border-lineBg">
          <RoomIcon className=" h-[26px] aspect-auto [&>path]:fill-textHeadCard translate-y-[2px]" />
          <div className="flex flex-col ml-3">
            <p className=" text-textDesc text-Asmaller font-mainBold tracking-wider">
              ოთახები
            </p>
            <p className="text-textHeadCard text-Asmall font-mainBold ml-1 tracking-wider">
              {pageData.productData.estate_rooms}
            </p>
          </div>
        </div>
        <div className="flex-1 px-5 flex items-center  mobile:min-w-[50%] border-r-2 mobile:border-none  border-lineBg">
          <BedIcon className="min-w-[26px] h-[26px] aspect-square [&>path]:fill-textHeadCard" />
          <div className="flex flex-col ml-3">
            <p className=" text-textDesc text-Asmaller font-mainBold tracking-wider">
              საძინებელი
            </p>
            <p className="text-textHeadCard text-Asmall font-mainBold ml-1 tracking-wider">
              {pageData.productData.estate_bedrooms}
            </p>
          </div>
        </div>
        {pageData.productData.estate_floor ? (
          <div className="flex-1 px-5 flex items-center  mobile:min-w-[50%] ">
            <StairsIcon className=" h-[25px] aspect-square [&>path]:stroke-textHeadCard" />
            <div className="flex flex-col ml-3">
              <p className=" text-textDesc text-Asmaller font-mainBold tracking-wider">
                სართული
              </p>
              <p className="text-textHeadCard text-Asmall font-mainBold ml-1 tracking-wider">
                {pageData.productData.estate_floor}{" "}
                {pageData.productData.estate_floors && (
                  <span className="text-textDescCard">
                    / {pageData.productData.estate_floors}
                  </span>
                )}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="bg-whiteMain rounded-block h-[70px] flex items-center justify-between  shadow-sectionShadow mobile:h-auto mobile:p-3 mobile:flex-wrap mobile:justify-center mobile:gap-y-3">
        <div className="flex flex-col mobile:text-center px-4 gap-[2px]">
          <p className=" text-textDesc text-Asmaller font-mainSemiBold tracking-wider">
            მდებარეობა
          </p>
          <p className="text-textHeadCard text-[13px] font-mainBold tracking-wider">
            {pageData.productData.estate_city}
          </p>
        </div>
        <div className=" flex flex-col mobile:text-center px-4 gap-[2px]">
          <p className=" text-textDesc text-Asmaller font-mainSemiBold tracking-wider">
            პროექტი
          </p>
          <p className="text-textHeadCard text-[13px] font-mainBold tracking-wider">
            {getProject(pageData.productData.estate_project)}
          </p>
        </div>
        <div className=" flex flex-col mobile:text-center px-4 gap-[2px]">
          <p className=" text-textDesc text-Asmaller font-mainSemiBold tracking-wider">
            სტატუსი
          </p>
          <p className="text-textHeadCard text-[13px] font-mainBold tracking-wider">
            {pageData.productData.estate_status}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5  mobile:flex-wrap mobile:justify-center mobile:gap-3">
        <div
          onClick={changeFavorite}
          className={` shadow-sectionShadow flex items-center px-3 pr-6 h-[40px] w-auto select-none transition-colors ${
            favorited ? "bg-orangeClear" : "bg-whiteMain"
          } rounded-[8px] text-[13px] text-textHeadCard tracking-wider cursor-pointer transition-colors hover:bg-whiteHover`}
        >
          <BookmarkIcon
            className={`h-[16px] aspect-square [&>path]:stroke-orangeI mr-3 [&>path]:transition-colors ${
              favorited ? "[&>path]:fill-orangeI" : "[&>path]:fill-transparent"
            } `}
          />{" "}
          {favorited ? "შენახულია" : "შენახვა"}
        </div>
        <div
          onClick={() =>
            dispatch(
              setShare({
                show: true,
                link: `${window.location}`,
              })
            )
          }
          className=" shadow-sectionShadow flex items-center px-3 pr-6 h-[40px] w-auto bg-whiteMain rounded-[8px] text-[13px] text-textHeadCard tracking-wider cursor-pointer transition-colors hover:bg-whiteHover"
        >
          <ShareIcon className="h-[16px] aspect-square [&>path]:stroke-main mr-3" />{" "}
          გაზიარება
        </div>
        <div
          onClick={() =>
            dispatch(
              setReportProblem({
                show: true,
                link: `${window.location}`,
                message: "",
              })
            )
          }
          className=" shadow-sectionShadow flex items-center px-3 pr-6 h-[40px] w-auto bg-whiteMain rounded-[8px] text-[13px] text-textHeadCard tracking-wider cursor-pointer transition-colors hover:bg-whiteHover"
        >
          <ReportIcon className="h-[16px] aspect-square [&>path]:fill-reportIcon mr-3" />{" "}
          გასაჩივრება
        </div>
      </div>
    </div>
  );
}

function getDealType(dealID: number) {
  switch (dealID) {
    case 0:
      return "იყიდება";
      break;
    case 1:
      return "ქირავდება";
      break;
    case 2:
      return "ქირავდება დღიურად";
      break;
    case 3:
      return "გირავდება";
      break;
  }
}
function getType(typeID: number) {
  switch (typeID) {
    case 0:
      return "კერძო სახლი";
      break;
    case 1:
      return "კორპუსის ბინა";
      break;
    case 2:
      return "კომერციული ფართი";
      break;
    case 3:
      return "მიწის ნაკვეთი";
      break;
    case 4:
      return "სასტუმრო";
      break;
  }
}

function getProject(projectID: number) {
  const projectTypes: string[] = [
    "არასტანდარტული",
    "ლენინგრადის",
    "ლვოვის",
    "კიევი",
    "თბილისური ეზო",
    "მოსკოვის",
    "ქალაქური",
    "ჩეხური",
    "ხრუშოვის",
    "თუხარელის",
    "ვეძისი",
    "იუგოსლავიის",
    "მეტრომშენის",
    "ყავლაშვილის",
  ];

  return projectTypes[projectID];
}
