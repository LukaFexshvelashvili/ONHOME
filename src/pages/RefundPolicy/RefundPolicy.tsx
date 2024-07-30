import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function RefundPolicy() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("refund_title")}</title>
      </Helmet>
      <main>
        <div className="text-Asmall text-textInfo [&>h1]:mb-2 [&>h2]:mb-2 [&>h2]:mt-5">
          {" "}
          <h1>{t("refund_title")}</h1>
          <h2>1. {t("rf1")}:</h2>
          <ul>
            <li>{t("rf2")}</li>
          </ul>
          <h2>2. {t("rf3")}:</h2>
          <p>{t("rf4")}:</p>
          <ul>
            <li>
              {t("rf5")}:{" "}
              <Link to={"tel:+995592605605"} className="text-main underline">
                +995 592 60 56 05
              </Link>
            </li>
            <li>
              {t("rf6")}:{" "}
              <Link
                to={"mailto:support@onhome.ge"}
                className="text-main underline"
              >
                support@onhome.ge
              </Link>
            </li>
          </ul>
          <h2>3. {t("rf7")}:</h2>
          <ul>
            <li>{t("rf8")}</li>
            <li>{t("rf9")}</li>
          </ul>
          <h2>4. {t("rf10")}:</h2>
          <ul>
            <li>{t("rf11")}</li>
          </ul>
        </div>
      </main>
    </>
  );
}
