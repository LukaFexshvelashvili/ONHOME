import { Link } from "react-router-dom";
import {
  HomePageAd1,
  HomePageAd2,
  ProductPageAd1,
  ProductPageAd2,
  WholePageAd,
} from "./Decorations";
import { Helmet } from "react-helmet";

export default function AdsMake() {
  return (
    <>
      <Helmet>
        <title>რაკლამის განთავსება - OnHome</title>
      </Helmet>
      <main className="pt-[60px]">
        <h1 className="text-textDesc text-[20px] font-mainBold text-center tracking-wider">
          რეკლამის ადგილები
        </h1>

        <p className="mt-[40px] mb-3 text-main font-mainSemiBold tracking-wider text-center text-[18px]">
          მთლიან საიტზე
        </p>
        <div className="flex justify-center">
          <WholePageAd />
        </div>
        <p className="mt-[20px] text-textDesc text-[16px] max-w-[500px] font-mainSemiBold tracking-wider text-center mx-auto">
          რეკლამის ადგილი მდებარეობს ნავიგაციის ზემოთა ნაწილზე და ჩანს ვებსაიტის
          თითქმის ყოველ არსებულ გვერდზე
        </p>
        <div className="h-[4px] w-[60px] rounded-lg my-[30px]  bg-whiteLoad mx-auto block"></div>

        <p className=" text-main mb-3 font-mainSemiBold tracking-wider text-center text-[18px]">
          მთავარი გვერდი
        </p>
        <div className="flex justify-center">
          <HomePageAd1 />
          <HomePageAd2 />
        </div>
        <p className="mt-[20px] text-textDesc text-[16px] max-w-[500px] font-mainSemiBold tracking-wider text-center mx-auto">
          მთავარი გვერდის რეკლამები ხილვადია საძიებო სექციის ქვევით და
          განცხადების გამოქვეყნების შეთავაზების სექციის ზევითა ნაწილებში
        </p>
        <div className="h-[4px] w-[60px] rounded-lg my-[30px]  bg-whiteLoad mx-auto block"></div>

        <p className=" text-main mb-3 font-mainSemiBold tracking-wider text-center text-[18px]">
          განცხადების გვერდი
        </p>
        <div className="flex justify-center">
          <ProductPageAd1 />
          <ProductPageAd2 />
        </div>
        <p className="mt-[20px] text-textDesc text-[16px] max-w-[500px] font-mainSemiBold tracking-wider text-center mx-auto">
          განცხადების გვერდის რეკლამები ხილვადია განცხადების ფოტოების სლაიდერზე
          და განცხადების აღწერის მარჯვენა ნაწილში
        </p>
        <div className="h-[4px] w-[60px] rounded-lg my-[30px]  bg-whiteLoad mx-auto block"></div>

        <p className=" text-main mb-3 font-mainSemiBold tracking-wider text-center text-[18px]">
          რეკლამის შეკვეთა
        </p>
        <div className="flex gap-3 justify-center mt-5">
          <Link
            to={"tel:+995592605605"}
            className="DefButton flex justify-center items-center"
          >
            დაგვირეკე
          </Link>
          <Link
            to={"mailto:adspublish@onhome.ge"}
            className="DefButton flex justify-center items-center"
          >
            მოგვწერე
          </Link>
        </div>
      </main>
    </>
  );
}
