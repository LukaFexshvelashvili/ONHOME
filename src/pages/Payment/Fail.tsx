import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from "react";

function Success() {
  const { t } = useTranslation();
  const [counter, setCounter] = useState(8);
  const navigate = useNavigate();
  useEffect(() => {
    const inter = setTimeout(() => setCounter(counter - 1), 1000);
    return () => {
      clearTimeout(inter);
      if (counter == 1) {
        navigate("/");
      }
    };
  }, [counter]);

  return (
    <>
      <Helmet>
        <title>{t("fail_title")}</title>
      </Helmet>

      <div className=" h-[calc(100vh-60px)] min-h-[300px] flex justify-center flex-col items-center font-mainBold text-redI">
        <div className="w-full h-[300px] rounded-lg bg-sectionBg shadow-cardShadow p-5 flex flex-col justify-center items-center text-start ">
          <p className="text-[28px] tracking-[1px] ">{t("fail_title")}</p>
          <p className="text-[16px] text-textDescCard mt-5 ">{t("fail_p")}</p>
          <p className="text-[16px] text-textDescCard mt-2 ">
            {t("auto_redirect")} {counter} {t("seconds")}
          </p>
          <div className="flex gap-2 mt-5">
            <Link to={"/"} className="  mt-5">
              <button className="h-[40px] px-5 rounded-md text-buttonText bg-main transition-colors text-[14px] hover:bg-mainHover">
                {t("alert.go_to_home_page")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(Success);
