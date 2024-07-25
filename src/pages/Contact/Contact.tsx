import { useSelector } from "react-redux";
import { PhoneFIlledIcon } from "../../assets/icons/Icons";
import {
  FacebookIcon,
  InstagramIcon,
} from "../../components/popups/SharePopup";
import { RootState } from "../../store/store";
import { Link } from "react-router-dom";
import { useState } from "react";
import axiosCall from "../../hooks/axiosCall";
import HoverTitle from "../../components/global/HoverTitle";
import { Helmet } from "react-helmet";
import { t } from "i18next";

export default function Contact() {
  const user = useSelector((store: RootState) => store.user);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(1);
    setError("");
    if (message.length > 6) {
      axiosCall
        .post(
          "actions/message",
          { message: message },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          if (res.data.status == 100) {
            setStatus(100);
          } else {
            setStatus(2);
            setError("სერვერზე შეფერხებაა, სცადეთ მოგვიანებით");
          }
        });
    } else {
      setError("ტექსტი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს");
    }
  };
  return (
    <>
      <Helmet>
        <title>{t("contact.title")} - OnHome</title>
      </Helmet>
      <main>
        <div className="bg-whiteMain rounded-block shadow-sectionShadow py-6 px-5">
          <h1 className="w-full text-center text-blackMain font-mainBold">
            {t("contact.message_us_on_website")}
          </h1>
          {user.isLogged ? (
            <div className="flex flex-col gap-3">
              {status == 100 ? (
                <div className="mt-5 w-[90%] max-w-[600px] mx-auto h-auto p-3 rounded-lg bg-greenClear text-greenI border-2 border-greenI  flex justify-center items-center text-center text-[14px] tracking-wider font-mainBold">
                  {t("contact.message_success")}
                </div>
              ) : status == 2 ? (
                <div className="mt-5 w-[90%] max-w-[600px] mx-auto h-auto p-3 rounded-lg bg-redClear text-redI border-2 border-redI  flex justify-center items-center text-center text-[14px] tracking-wider font-mainBold">
                  {error}
                </div>
              ) : (
                <form
                  onSubmit={(e) => (status !== 1 ? sendMessage(e) : null)}
                  className="flex flex-col gap-5"
                >
                  {error !== "" ? (
                    <div className="mt-5 w-[90%] max-w-[600px] mx-auto h-auto p-3 rounded-lg bg-redClear text-redI border-2 border-redI  flex justify-center items-center text-center text-[14px] tracking-wider font-mainBold">
                      {error}
                    </div>
                  ) : null}
                  {status == 1 ? (
                    <textarea
                      className=" opacity-80 pointer-events-none bg-whiteHover font-mainMedium text-textDesc text-[14px] tracking-wider rounded-md w-[90%] max-w-[600px] h-[100px] mx-auto block outline-none p-2 px-3 transition-colors focus:bg-whiteLoad mt-5"
                      placeholder={t("contact.message_placeholder")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  ) : (
                    <textarea
                      className=" bg-whiteHover font-mainMedium text-textDesc text-[14px] tracking-wider rounded-md w-[90%] max-w-[600px] h-[100px] mx-auto block outline-none p-2 px-3 transition-colors focus:bg-whiteLoad mt-5"
                      placeholder={t("contact.message_placeholder")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  )}
                  {status == 1 ? (
                    <button className="opacity-80 w-[90%] max-w-[250px] bg-mainHover text-buttonText text-[14px] tracking-wider h-[38px] mx-auto block rounded-md transition-colors pointer-events-none cursor-progress">
                      {t("contact.message_sending")}
                    </button>
                  ) : (
                    <button className="w-[90%] max-w-[250px] bg-main text-buttonText text-[14px] tracking-wider h-[38px] mx-auto block rounded-md transition-colors hover:bg-mainHover">
                      {t("contact.send")}
                    </button>
                  )}
                </form>
              )}

              <div className=" w-[90%] max-w-[600px] mx-auto h-auto p-3 rounded-lg bg-orangeClear text-orangeI border-2 border-orangeI flex justify-center items-center text-center text-[14px] tracking-wider font-mainSemiBold mt-3">
                {t("contact.contact_description")}
              </div>
            </div>
          ) : (
            <div className="relative flex justify-center items-center">
              <Link
                className="absolute z-10 h-[40px]  w-[90%] max-w-[300px]"
                to={"/Login"}
              >
                <button className=" h-full shadow-[0_0_30px_rgba(0,0,0,0.3)] w-full bg-main text-buttonText tracking-wider mx-auto block rounded-lg transition-colors hover:bg-mainHover ">
                  {t("contact.log_in")}
                </button>
              </Link>
              <div className="flex flex-col gap-3 w-full blur-[3px] pointer-events-none select-none">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col gap-5 pointer-events-none"
                >
                  <textarea
                    className="pointer-events-none  bg-whiteHover font-mainMedium text-[15px] tracking-wider rounded-md w-[90%] max-w-[600px] h-[100px] mx-auto block outline-none transition-colors focus:bg-whiteLoad mt-5"
                    placeholder={t("contact.message_placeholder")}
                  ></textarea>
                  <button className="pointer-events-none w-[90%] max-w-[300px] bg-main text-buttonText tracking-wider h-[40px] mx-auto block rounded-md transition-colors hover:bg-mainHover">
                    {t("contact.send")}
                  </button>
                </form>

                <div className="pointer-events-none w-[90%] max-w-[600px] mx-auto h-auto p-3 rounded-lg bg-orangeClear text-orangeI border-2 border-orangeI  flex justify-center items-center text-center text-[14px] tracking-wider font-mainBold">
                  {t("contact.contact_description")}
                </div>
              </div>
            </div>
          )}

          <h1 className="w-full text-center text-blackMain font-mainBold my-6">
            {t("contact.or")}
          </h1>
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <Link
              to={"tel:+995562605605"}
              className="relative  group flex items-center justify-center h-[50px] aspect-square text-[15px] mobile:text-[14px] tracking-wider font-mainBold max-w-[400px] rounded-lg bg-greenI text-greenI  "
            >
              <PhoneFIlledIcon className="h-[21px] aspect-square [&>path]:fill-buttonText [&>path]:transition-opacity  " />
              <HoverTitle title={t("contact.call")} />
            </Link>
            <Link
              to={"https://www.facebook.com/profile.php?id=61561368268186"}
              className="relative group  flex items-center justify-center h-[50px] aspect-square text-[15px] mobile:text-[14px] tracking-wider font-mainBold  rounded-lg bg-blueI text-blueI  "
            >
              <FacebookIcon className="h-[23px] aspect-square [&>path]:fill-buttonText [&>path]:transition-opacity  " />
              <HoverTitle title="facebook" />
            </Link>
            <Link
              to={"https://www.instagram.com/onhomege/"}
              className="relative  group  bg-gradient-to-bl from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center h-[50px] aspect-square text-[15px] mobile:text-[14px] tracking-wider font-mainBold  rounded-lg bg-pinkI text-pinkI "
            >
              <InstagramIcon className="h-[23px] aspect-square [&>g]:stroke-buttonText [&>g]:transition-opacity " />
              <HoverTitle title="instagram" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
