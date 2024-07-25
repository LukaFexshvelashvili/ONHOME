import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateActiveImage,
  updateImages,
} from "../../../store/data/addProductSlice";
import { useEffect } from "react";
import { t } from "i18next";

export default function statusBlock({
  status,
  setStatus,
  setAlertBlock,
}: {
  status: number | null;
  setStatus: Function;
  setAlertBlock: Function;
}) {
  // status 100 = success
  // status 0 = insert error (Server error)
  // status 5 = missing necessary info
  // status 6 = no supported format images
  // status 7 = image size exceeds 20MB
  // status 12 = no enough money
  useEffect(() => {
    scrollTo(0, 0);
    if (status) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const closeAlert = () => {
    setStatus(null);
    setAlertBlock(false);
  };
  return (
    <>
      {status === 100 ? (
        <UploadSuccessed close={closeAlert} />
      ) : status == 12 ? (
        <ErrorBlock
          title={t("alert.no_enough_money")}
          description={t("alert.no_enough_money_description")}
          close={closeAlert}
        />
      ) : status == 7 ? (
        <ExceedImageSize close={closeAlert} />
      ) : status == 6 ? (
        <NoSupportedFImageormats close={closeAlert} />
      ) : status == 5 ? (
        <ErrorBlock
          title={t("alert.re_check_info")}
          description={t("alert.re_check_info_description")}
          close={closeAlert}
        />
      ) : (
        status === 0 && (
          <ErrorBlock
            title={t("alert.error_on_server")}
            description={t("alert.error_on_server_description")}
            close={closeAlert}
          />
        )
      )}
    </>
  );
}

function ErrorBlock({
  close,
  title,
  description,
}: {
  close: () => void;
  title: string;
  description: string;
}) {
  return (
    <>
      <h2 className="text-pinkI text-center text-[20px] font-mainBold">
        {title}
      </h2>
      <p className="text-textDesc text-center text-[16px] font-mainBold my-3">
        {description}
      </p>
      <div className="flex items-center gap-5 justify-center mt-5">
        <button
          onClick={() => {
            close();
          }}
          className="px-4 py-2 rounded-md text-buttonText bg-main tracking-wider text-[14px] transition-colors hover:bg-mainHover"
        >
          {t("alert.close")}
        </button>{" "}
      </div>
    </>
  );
}

function NoSupportedFImageormats({ close }: { close: () => void }) {
  const dispatch = useDispatch();
  return (
    <>
      <h2 className="text-pinkI text-center text-[20px] font-mainBold">
        {t("alert.incorrect_image_type")}
      </h2>
      <p className="text-textDesc text-center text-[16px] font-mainBold my-3">
        {t("alert.incorrect_image_type_description")}
      </p>
      <div className="flex items-center gap-5 justify-center mt-5">
        <button
          onClick={() => {
            dispatch(updateActiveImage(null));
            dispatch(updateImages(null));
            close();
          }}
          className="px-4 py-2 rounded-md text-buttonText bg-main tracking-wider text-[14px] transition-colors hover:bg-mainHover"
        >
          {t("alert.close")}
        </button>{" "}
      </div>
    </>
  );
}
function ExceedImageSize({ close }: { close: () => void }) {
  const dispatch = useDispatch();
  return (
    <>
      <h2 className="text-pinkI text-center text-[20px] font-mainBold">
        {t("alert.oversized_image")}
      </h2>
      <p className="text-textDesc text-center text-[16px] font-mainBold my-3">
        {t("alert.oversized_image_description")}
      </p>
      <div className="flex items-center gap-5 justify-center mt-5">
        <button
          onClick={() => {
            dispatch(updateActiveImage(null));
            dispatch(updateImages(null));
            close();
          }}
          className="px-4 py-2 rounded-md text-buttonText bg-main tracking-wider text-[14px] transition-colors hover:bg-mainHover"
        >
          {t("alert.close")}
        </button>{" "}
      </div>
    </>
  );
}

function UploadSuccessed({ close }: { close: () => void }) {
  return (
    <>
      <h2 className="text-greenI text-center text-[20px] font-mainBold">
        {t("alert.form_added")}
      </h2>
      <p className="text-textDesc text-center text-[16px] font-mainBold my-3">
        {t("alert.form_added_description")}
      </p>
      <div className="flex items-center gap-5 justify-center mt-5 flex-wrap">
        <Link to={"/Profile/MyProducts"}>
          <button className="px-4 py-2 rounded-md text-buttonText bg-main tracking-wider text-[14px] transition-colors hover:bg-mainHover">
            {t("alert.see_form")}
          </button>
        </Link>{" "}
        <Link to={"/"}>
          <button className="px-4 py-2 rounded-md text-buttonText bg-main tracking-wider text-[14px] transition-colors hover:bg-mainHover">
            {t("alert.go_to_home_page")}
          </button>{" "}
        </Link>
        <button
          onClick={() => {
            close();
          }}
          className="px-4 py-2 rounded-md text-buttonText bg-main tracking-wider text-[14px] transition-colors hover:bg-mainHover"
        >
          {t("alert.add_new_form")}
        </button>{" "}
      </div>
    </>
  );
}
