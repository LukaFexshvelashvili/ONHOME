import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  hasNumbersAndLetters,
  hasUppercase,
} from "../../../hooks/AdditionalFunctions";
import axiosCall from "../../../hooks/axiosCall";
import { LockIcon } from "../../../assets/icons/Icons";
import { HomesbgDecor } from "../../../assets/images/decorations/svg/Decorations";
import SideSection from "./SideSection";
import AuthenticationHeader from "../AuthenticationHeader";
import { setWebLoader } from "../../../store/data/webUISlice";
import { t } from "i18next";

export default function RecoverContent() {
  const { url } = useParams();

  const [password, setPassword] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordStatus, setPasswordStatus] = useState<number>(0);
  const dispatch = useDispatch();
  const [error, setError] = useState<{ status: boolean; data: null | string }>({
    status: false,
    data: null,
  });
  const darkMode: boolean = useSelector(
    (store: RootState) => store.webUI.darkMode
  );
  useEffect(() => {
    let passwordVerifier: number[] = [0, 0, 0];
    if (password.length >= 8) {
      passwordVerifier[1] = 1;
    } else {
      passwordVerifier[1] = 0;
    }
    if (hasNumbersAndLetters(password)) {
      passwordVerifier[2] = 1;
    } else {
      passwordVerifier[2] = 0;
    }
    if (hasUppercase(password)) {
      passwordVerifier[3] = 1;
    } else {
      passwordVerifier[3] = 0;
    }

    setPasswordStatus(
      passwordVerifier.filter((item: number) => item == 1).length
    );
  }, [password]);

  const submitPassword = () => {
    setError({ status: false, data: null });
    if (password.length >= 8) {
      if (password == confirmPassword) {
        dispatch(setWebLoader({ active: true, opacity: true }));

        axiosCall
          .post(
            "user/reset_password.php",
            { newPassword: password, url: url },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((res) => {
            dispatch(setWebLoader({ active: false }));

            if (res.data.status === 100) {
              setStatus(100);
            } else {
              setError({
                status: true,
                data: t("passwordRecover.d1"),
              });
            }
          });
      } else {
        setError({ status: true, data: t("passwordRecover.d2") });
      }
    } else {
      setError({
        status: true,
        data: t("passwordRecover.d3"),
      });
    }
  };
  return (
    <>
      <main className="m-0 p-0">
        <AuthenticationHeader />
        <div className="flex h-screen">
          {status === 0 ? (
            <section className="flex-1 relative flex justify-center items-center">
              {/* <RecoverPassword /> */}
              <div
                className={`flex flex-col items-center ${
                  darkMode ? "" : "pb-[200px]"
                }  medium:pb-[100px] w-full`}
              >
                <h1 className=" text-[32px] mobile:text-[24px] text-textHead font-mainBold mb-2">
                  {t("passwordRecover.d4")}
                </h1>
                <p className="mb-6 text-textDesc text-Asmall font-mainBold tracking-wider mobile:text-[14px]">
                  {t("passwordRecover.d5")}
                </p>
                {error.status ? (
                  <div className="w-[380px] mb-5 h-auto p-3 rounded-lg bg-pinkClear text-pinkI border-2 border-pinkI  flex justify-center items-center text-center text-[14px] tracking-wider font-mainSemiBold">
                    {error.data}
                  </div>
                ) : null}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitPassword();
                  }}
                  className="w-[380px] flex flex-col gap-5 items-center relative z-10 mobile:gap-4 mobile:max-w-[360px] mobile:w-full mobile:px-[5px]"
                >
                  <div className="h-[40px] w-full rounded-normal flex items-center relative">
                    <LockIcon className="h-[24px] mobile:h-[20px] aspect-square absolute left-3 [&>path]:stroke-textDescCard" />
                    <input
                      type="password"
                      placeholder={t("login.password")}
                      className="h-full w-full rounded-normal bg-LoginInput outline-none px-3 pl-11 mobile:text-[12px] mobile:pl-10 text-textDesc tracking-wider text-Asmall transition-colors focus:bg-LoginInputActive"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  <div className="h-[40px] w-full rounded-normal flex items-center relative">
                    <LockIcon className="h-[24px] mobile:h-[20px] aspect-square absolute left-3 [&>path]:stroke-textDescCard" />
                    <input
                      type="password"
                      placeholder={t("login.repeat_password")}
                      className="h-full w-full rounded-normal bg-LoginInput outline-none px-3 pl-11 mobile:text-[12px] mobile:pl-10 text-textDesc tracking-wider text-Asmall transition-colors focus:bg-LoginInputActive"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="w-full h-2 rounded-md bg-whiteLoad">
                      <div
                        className={`  duration-500            
                  ${passwordStatus == 0 && "bg-pinkI w-[10%]"}
                  ${passwordStatus == 1 && "bg-orangeI w-[30%]"}
                  ${passwordStatus == 2 && "bg-yellowI w-[65%]"}
                  ${passwordStatus == 3 && "bg-greenI w-[100%]"}
                  h-full rounded-md transition-all`}
                      ></div>
                    </div>
                    <p className="text-textDesc text-Asmall font-mainBold tracking-wider opacity-70 mt-2 mobile:text-[12px]">
                      {passwordStatus == 0 && t("login.p1")}
                      {passwordStatus == 1 && t("login.p2")}
                      {passwordStatus == 2 && t("login.p3")}
                      {passwordStatus == 3 && t("login.p4")}
                    </p>
                  </div>
                  <button className="linearButton mt-2 font-mainBold text-buttonText h-[40px] w-[200px] mobile:h-[36px] mobile:w-[180px] mobile:text-[14px] rounded-normal tracking-wider transition-shadow hover:shadow-[0px_6px_15px_var(--mainClear)]">
                    {t("profileInfo.confirm")}
                  </button>
                </form>

                <p className="text-main text-Asmall mt-5 font-mainBold tracking-wider mobile:text-[12px] mobile:invisible cursor-pointer">
                  <Link to={"/Login"}>{t("passwordRecover.go_back")}</Link>
                </p>
              </div>
              <div className="absolute bottom-0 z-0 pointer-events-none w-full">
                {!darkMode && <HomesbgDecor className="w-full opacity-20" />}
              </div>
            </section>
          ) : (
            <section className="flex-1 relative flex justify-center items-center">
              <div
                className={`flex flex-col items-center ${
                  darkMode ? "" : "pb-[200px]"
                }  medium:pb-[100px] w-full`}
              >
                <h1 className=" text-[32px] mobile:text-[24px] text-textHead font-mainBold mb-2 ">
                  {t("passwordRecover.password_updated_successfully")}
                </h1>
                <Link to={"/Login"} className="mobile:mt-4 mt-6 rounded-normal">
                  <button className="linearButton  font-mainBold text-buttonText h-[40px] w-[200px] mobile:h-[36px] mobile:w-[180px] mobile:text-[14px] rounded-normal tracking-wider transition-shadow hover:shadow-[0px_6px_15px_var(--mainClear)]">
                    {t("passwordRecover.log_in")}
                  </button>
                </Link>
              </div>
            </section>
          )}
          <SideSection />
        </div>
      </main>
    </>
  );
}
