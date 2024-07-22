import { Link } from "react-router-dom";
import masterCard from "../../../assets/images/logos/masterCard.jpg";
import visa from "../../../assets/images/logos/visa.png";
import { useState } from "react";
import { Helmet } from "react-helmet";
export default function Balance() {
  const [amount, setAmount] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const getPay = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (amount && amount >= 5) {
    } else {
      setError("მინიმალური შეტანის თანხა: 5 ლარი");
    }
  };
  return (
    <>
      <Helmet>
        <title>ბალანსი - OnHome</title>
      </Helmet>
      <div className=" rounded-section shadow-sectionShadow bg-whiteMain relative flex gap-6 flex-col  px-7 py-5 ">
        <h2 className="text-textHeadCard text-[15px] tracking-wider">
          შეავსეთ ბალანსი
        </h2>

        <div className="flex justify-center items-center mt-3">
          <div className="flex justify-center items-center text-start flex-col">
            {error !== "" && (
              <div className="max-w-full w-full h-auto p-3 rounded-lg bg-pinkClear text-pinkI border-2 border-pinkI  flex justify-center items-center text-center text-[14px] tracking-wider font-mainSemiBold">
                {error}
              </div>
            )}
            <form
              onSubmit={(e) => getPay(e)}
              className="flex justify-center items-center text-start flex-col"
            >
              <div className="flex justify-center items-center h-[35px] w-[250px] relative overflow-hidden rounded-lg my-5">
                <input
                  type="number"
                  placeholder="შეიყვანეთ თანხა"
                  className="h-full w-full absolute rounded-lg bg-bodyBg text-[14px] font-mainMedium px-2 text-blackMain outline-none text-center tracking-wider placeholder-textCardDesc"
                  onChange={(e) => setAmount(e.target.valueAsNumber)}
                  value={amount ? amount : ""}
                />
                <div className="absolute right-2 h-[20px] aspect-square text-main translate-y-[-2px]">
                  ₾
                </div>
              </div>
              <button className="bg-main rounded-[5px] w-[200px] h-[40px] font-mainMedium text-buttonText text-[13px] tracking-wider transition-colors hover:bg-mainHover">
                ბალანსის შევსება
              </button>
            </form>
            <p className="mt-5 text-textDesc text-[12px] tracking-wider">
              (მინიმალური შენატანი 5 ლარი)
            </p>
            <p className="mt-5 text-textDesc text-[12px] tracking-wider">
              გადახდის მეთოდები
            </p>
            <div className="flex gap-2 mt-3">
              <img
                className=" h-8 rounded-lg"
                src={masterCard}
                alt="mastercard_logo"
              />{" "}
              <img
                className=" h-8 rounded-lg p-1 pr-2  bg-white"
                src={visa}
                alt="visa_logo"
              />
            </div>
            <Link
              to={"/Profile/ProfileInfo"}
              className="text-[14px] text-main mt-8 underline text-center"
            >
              გადახდების ისტორია იხილეთ ინფორმაციის გვერდზე
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
