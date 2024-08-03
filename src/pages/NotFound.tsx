import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { NotFoundIcon } from "../assets/icons/Icons";
import { Link } from "react-router-dom";
import { memo } from "react";

function NotFound(props: { start?: boolean }) {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>404 - {t("notFound")}</title>
      </Helmet>

      <div
        className={` h-screen min-h-[300px] flex ${
          props.start ? "justify-start" : "justify-center"
        } flex-col items-center font-mainBold text-main`}
      >
        <p className="text-[68px] tracking-[2px] mb-5">404</p>
        <p className="text-[22px] mb-5 text-textDescCard">{t("notFound")}</p>
        <NotFoundIcon className="h-[300px] my-8" />
        <div className="flex gap-2">
          <Link to={"/"} className="  mt-5">
            <button className="h-[40px] px-5 rounded-md text-buttonText bg-main transition-colors text-[14px] hover:bg-mainHover">
              {t("alert.go_to_home_page")}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default memo(NotFound);
