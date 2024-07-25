import { useState } from "react";
import { DropDownIcon } from "../assets/icons/Icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full mt-[50px] h-auto bg-navBg pt-10 shadow-footerShadow medium:pt-5 font-mainRegular">
      <div className="content_container">
        <div className=" flex flex-wrap justify-between w-full medium:hidden">
          <div className="flex flex-col gap-3 [&>p]:text-Asmall text-Asmall [&>p]:text-textDesc [&>p]:cursor-pointer">
            <h3 className="mb-2 text-textHeadBlack">{t("footer.about_us")}</h3>
            <p className="max-w-[300px]">{t("footer.about_us_desc")}</p>
          </div>
          <div className="flex flex-col gap-2 [&>p]:text-Asmall text-Asmall [&>a]:text-textDesc [&>p]:cursor-pointer">
            <h3 className="mb-2  text-textHeadBlack">
              {t("footer.navigation")}
            </h3>
            <Link to={"/"}>{t("footer.home")}</Link>
            <Link to={"/Search"}>{t("footer.search")}</Link>
            <Link to={"/"}>{t("footer.projects")}</Link>
            <Link to={"AgencyService"}>
              {t("homePage.agencyService.title")}
            </Link>
          </div>
          <div className="flex flex-col gap-2 [&>p]:text-Asmall text-Asmall [&>a]:text-textDesc [&>p]:cursor-pointer">
            <h3 className="mb-2  text-textHeadBlack">{t("footer.help")}</h3>
            <Link to={"/Contact"}>{t("footer.contact")}</Link>
            <Link to={"/AdsMake"}>{t("footer.ads")}</Link>
            <Link to={"/PrivacyPolicy"}>{t("footer.rules")}</Link>
            <Link to={"tel:+995592605605"}>+995 592 60 56 05</Link>
            <Link to={"mailto:support@onhome.ge"}>support@onhome.ge</Link>
          </div>
          <div className="flex flex-col gap-3 ">
            <h3 className="mb-2  text-textHeadBlack">{t("footer.sell")}</h3>
            <div className="flex flex-wrap flex-col gap-2 gap-x-6 h-[160px] [&>a]:text-Asmall text-Asmall [&>a]:text-textDesc [&>a]:cursor-pointer">
              <Link to={"search?deal=2"}>{t("footer.ft0")}</Link>

              <Link to={"search?deal=0&estate_type=1&rooms=1"}>
                {t("footer.ft1")}
              </Link>
              <Link to={"search?deal=0&estate_type=1&rooms=2"}>
                {t("footer.ft2")}
              </Link>
              <Link to={"search?deal=0&estate_type=1&rooms=3"}>
                {t("footer.ft3")}
              </Link>
              <Link to={"search?deal=0&estate_type=1&rooms=4"}>
                {t("footer.ft4")}
              </Link>
              <Link to={"search?deal=0&estate_type=1&city=თბილისი"}>
                {t("footer.ft5")}
              </Link>

              <Link to={"search?deal=1&estate_type=1"}>{t("footer.ft6")}</Link>
              <Link to={"search?deal=1&estate_type=0"}>{t("footer.ft7")}</Link>
              <Link to={"search?deal=1&estate_type=2"}>{t("footer.ft8")}</Link>
              <Link to={"search?deal=0&estate_type=0&city=ბათუმი"}>
                {t("footer.ft9")}
              </Link>
              <Link to={"search?deal=0&estate_type=0"}>{t("footer.ft10")}</Link>

              <Link to={"search?deal=1&estate_type=2"}>{t("footer.ft11")}</Link>
              <Link to={"search?deal=0&estate_type=3"}>{t("footer.ft12")}</Link>
            </div>
          </div>
        </div>
        <div className="hidden medium:flex flex-col gap-5">
          <ResponsiveFooterLi
            title={t("footer.about_us")}
            content={
              <p className="max-w-[500px]">{t("footer.about_us_desc")}</p>
            }
          />
          <ResponsiveFooterLi
            title={t("footer.navigation")}
            content={
              <>
                <Link to={"/"}>{t("footer.home")}</Link>
                <Link to={"Search"}>{t("footer.search")}</Link>
                <Link to={"/"}>{t("footer.projects")}</Link>
                <Link to={"AgencyService"}>
                  {t("homePage.agencyService.title")}
                </Link>
              </>
            }
          />
          <ResponsiveFooterLi
            title={t("footer.help")}
            content={
              <>
                <Link to="Contact">{t("footer.contact")}</Link>
                <Link to="AdsMake">{t("footer.ads")}</Link>{" "}
                <Link to={"/PrivacyPolicy"}>{t("footer.rules")}</Link>
                <Link to={"tel:+995592605605"}>+995 592 60* **</Link>
                <Link to={"mailto:support@onhome.ge"}>support@onhome.ge</Link>
              </>
            }
          />
          <ResponsiveFooterLi
            title="იყიდება"
            content={
              <>
                <Link to={"search?deal=2"}>{t("footer.ft0")}</Link>

                <Link to={"search?deal=0&estate_type=1&rooms=1"}>
                  {t("footer.ft1")}
                </Link>
                <Link to={"search?deal=0&estate_type=1&rooms=2"}>
                  {t("footer.ft2")}
                </Link>
                <Link to={"search?deal=0&estate_type=1&rooms=3"}>
                  {t("footer.ft3")}
                </Link>
                <Link to={"search?deal=0&estate_type=1&rooms=4"}>
                  {t("footer.ft4")}
                </Link>
                <Link to={"search?deal=0&estate_type=1&city=თბილისი"}>
                  {t("footer.ft5")}
                </Link>

                <Link to={"search?deal=1&estate_type=1"}>
                  {t("footer.ft6")}
                </Link>
                <Link to={"search?deal=1&estate_type=0"}>
                  {t("footer.ft7")}
                </Link>
                <Link to={"search?deal=1&estate_type=2"}>
                  {t("footer.ft8")}
                </Link>
                <Link to={"search?deal=0&estate_type=0&city=ბათუმი"}>
                  {t("footer.ft9")}
                </Link>
                <Link to={"search?deal=0&estate_type=0"}>
                  {t("footer.ft10")}
                </Link>

                <Link to={"search?deal=1&estate_type=2"}>
                  {t("footer.ft11")}
                </Link>
                <Link to={"search?deal=0&estate_type=3"}>
                  {t("footer.ft12")}
                </Link>
              </>
            }
          />
        </div>
      </div>

      <div className="h-[2px] w-full bg-lineBg mt-5"></div>
      <div className="content_container flex justify-between  [&>p]:text-Asmall medium:[&>p]:text-[11px] text-Asmall [&>p]:text-textInfo [&>p]:cursor-pointer py-3">
        <div className="flex gap-4  text-Asmall [&>a]:text-Asmall [&>a]:text-textInfo medium:[&>a]:text-[11px]  [&>a]:cursor-pointer flex-wrap">
          <Link to={"PrivacyPolicy"}> {t("footer.terms_and_conditions")}</Link>
          <Link to={"PrivacyPolicy"}> {t("footer.privacy")} </Link>
        </div>
        <p>{t("footer.all_rights_served")} </p>
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
