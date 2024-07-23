import { useState } from "react";
import { DropDownIcon } from "../assets/icons/Icons";
import { Link } from "react-router-dom";
import { t } from "i18next";

export default function Footer() {
  return (
    <footer className="w-full mt-[50px] h-auto bg-navBg pt-10 shadow-footerShadow medium:pt-5 font-mainRegular">
      <div className="content_container">
        <div className=" flex flex-wrap justify-between w-full medium:hidden">
          <div className="flex flex-col gap-3 [&>p]:text-Asmall text-Asmall [&>p]:text-textDesc [&>p]:cursor-pointer">
            <h3 className="mb-2 text-textHeadBlack">ჩვენს შესახებ</h3>
            <p className="max-w-[300px]">
              უძრავი ქონების გაყიდვის/გაქირავების სერვისი - გეხმარებით
              განათავსოთ თქვენი უძრავი ქონება მომხმარებლების მოსაზიდად
            </p>
          </div>
          <div className="flex flex-col gap-2 [&>p]:text-Asmall text-Asmall [&>a]:text-textDesc [&>p]:cursor-pointer">
            <h3 className="mb-2  text-textHeadBlack">ნავიგაცია</h3>
            <Link to={"/"}>მთავარი</Link>
            <Link to={"/Search"}>მოძებნა</Link>
            <Link to={"/"}>პროექტები</Link>
            <Link to={"AgencyService"}>
              {t("homePage.agencyService.title")}
            </Link>
          </div>
          <div className="flex flex-col gap-2 [&>p]:text-Asmall text-Asmall [&>a]:text-textDesc [&>p]:cursor-pointer">
            <h3 className="mb-2  text-textHeadBlack">დახმარება</h3>
            <Link to={"/Contact"}>კონტაქტი</Link>
            <Link to={"/AdsMake"}>რეკლამა</Link>
            <Link to={"/PrivacyPolicy"}>წესები</Link>
            <Link to={"tel:+995592605605"}>+995 592 60* **</Link>
            <Link to={"mailto:support@onhome.ge"}>support@onhome.ge</Link>
          </div>
          <div className="flex flex-col gap-3 ">
            <h3 className="mb-2  text-textHeadBlack">იყიდება</h3>
            <div className="flex flex-wrap flex-col gap-2 gap-x-6 h-[160px] [&>a]:text-Asmall text-Asmall [&>a]:text-textDesc [&>a]:cursor-pointer">
              <Link to={"search?deal=2"}>ქირავდება დღიურად</Link>

              <Link to={"search?deal=0&estate_type=1&rooms=1"}>
                იყიდება 1 ოთახიანი ბინა
              </Link>
              <Link to={"search?deal=0&estate_type=1&rooms=2"}>
                იყიდება 2 ოთახიანი ბინა
              </Link>
              <Link to={"search?deal=0&estate_type=1&rooms=3"}>
                იყიდება 3 ოთახიანი ბინა
              </Link>
              <Link to={"search?deal=0&estate_type=1&rooms=4"}>
                იყიდება 4 ოთახიანი ბინა
              </Link>
              <Link to={"search?deal=0&estate_type=1&city=თბილისი"}>
                იყიდება ბინა თბილისში
              </Link>

              <Link to={"search?deal=1&estate_type=1"}>ქირავდება ბინები</Link>
              <Link to={"search?deal=1&estate_type=0"}>
                ქირავდება კერძო სახლი
              </Link>
              <Link to={"search?deal=1&estate_type=2"}>ქირავდება ფართი</Link>
              <Link to={"search?deal=0&estate_type=0&city=ბათუმი"}>
                იყიდება ბინა ბათუმში
              </Link>
              <Link to={"search?deal=0&estate_type=0"}>
                იყიდება კერძო სახლი
              </Link>

              <Link to={"search?deal=1&estate_type=2"}>ქირავდება დარბაზი</Link>
              <Link to={"search?deal=0&estate_type=3"}>იყიდება ნაკვეთი</Link>
            </div>
          </div>
        </div>
        <div className="hidden medium:flex flex-col gap-5">
          <ResponsiveFooterLi
            title="ჩვენს შესახებ"
            content={
              <p className="max-w-[500px]">
                უძრავი ქონების გაყიდვის/გაქირავების სერვისი - გეხმარებით
                განათავსოთ თქვენი უძრავი ქონება მომხმარებლების მოსაზიდად
              </p>
            }
          />
          <ResponsiveFooterLi
            title="ნავიგაცია"
            content={
              <>
                <Link to={"/"}>მთავარი</Link>
                <Link to={"Search"}>მოძებნა</Link>
                <Link to={"/"}>პროექტები</Link>
                <Link to={"AgencyService"}>
                  {t("homePage.agencyService.title")}
                </Link>
              </>
            }
          />
          <ResponsiveFooterLi
            title="დახმარება"
            content={
              <>
                <Link to="Contact">კონტაქტი</Link>
                <Link to="AdsMake">რეკლამა</Link>
                <Link to={"tel:+995592605605"}>+995 592 60* **</Link>
                <Link to={"mailto:support@onhome.ge"}>support@onhome.ge</Link>
              </>
            }
          />
          <ResponsiveFooterLi
            title="იყიდება"
            content={
              <>
                <Link to={"search?deal=0&estate_type=1&rooms=1"}>
                  იყიდება 1 ოთახიანი ბინა
                </Link>
                <Link to={"search?deal=0&estate_type=1&rooms=2"}>
                  იყიდება 2 ოთახიანი ბინა
                </Link>
                <Link to={"search?deal=0&estate_type=1&rooms=3"}>
                  იყიდება 3 ოთახიანი ბინა
                </Link>
                <Link to={"search?deal=0&estate_type=1&rooms=4"}>
                  იყიდება 4 ოთახიანი ბინა
                </Link>
                <Link to={"search?deal=0&estate_type=1&city=თბილისი"}>
                  იყიდება ბინა თბილისში
                </Link>

                <Link to={"search?deal=1&estate_type=1"}>ქირავდება ბინები</Link>
                <Link to={"search?deal=1&estate_type=0"}>
                  ქირავდება კერძო სახლი
                </Link>
                <Link to={"search?deal=1&estate_type=2"}>ქირავდება ფართი</Link>
                <Link to={"search?deal=0&estate_type=0&city=ბათუმი"}>
                  იყიდება ბინა ბათუმში
                </Link>
                <Link to={"search?deal=0&estate_type=0"}>
                  იყიდება კერძო სახლი
                </Link>

                <Link to={"search?deal=1&estate_type=2"}>
                  ქირავდება დარბაზი
                </Link>
                <Link to={"search?deal=0&estate_type=3"}>იყიდება ნაკვეთი</Link>
              </>
            }
          />
        </div>
      </div>

      <div className="h-[2px] w-full bg-lineBg mt-5"></div>
      <div className="content_container flex justify-between  [&>p]:text-Asmall medium:[&>p]:text-[11px] text-Asmall [&>p]:text-textInfo [&>p]:cursor-pointer py-3">
        <div className="flex gap-4  text-Asmall [&>a]:text-Asmall [&>a]:text-textInfo medium:[&>a]:text-[11px]  [&>a]:cursor-pointer flex-wrap">
          <Link to={"PrivacyPolicy"}> წესები და პირობები</Link>
          <Link to={"PrivacyPolicy"}> კონფიდენციალურობა </Link>
        </div>
        <p> © 2024 ყველა უფლება დაცულია</p>
      </div>
    </footer>
  );
}

function ResponsiveFooterLi(props: { title: string; content: JSX.Element }) {
  const [active, setactive] = useState<boolean>(false);
  return (
    <div className={` ${active ? "h-auto" : "max-h-[32px]"} overflow-hidden`}>
      <button
        onClick={() => setactive((state: boolean) => !state)}
        className="flex h-[32px] justify-between items-center w-full"
      >
        <h3 className="mb-2 text-textHeadBlack mobile:text-[12px] opacity-90">
          {props.title}
        </h3>
        <DropDownIcon
          className={` h-3 aspect-square [&>path]:fill-textDesc transition-transform ${
            active ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div className="flex flex-col [&>p]:text-[16px] [&>a]:text-textDesc [&>p]:text-textDesc  gap-1 mobile:[&>p]:text-[12px]">
        {props.content}
      </div>
    </div>
  );
}
