import { Link, useNavigate } from "react-router-dom";
import {
  CheckIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
} from "../../assets/icons/Icons";
import {
  Home5Decor,
  HomesbgDecor,
} from "../../assets/images/decorations/svg/Decorations";
import SideSection from "./components/SideSection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Tuser } from "../../store/data/userSlice";
import axiosCall from "../../hooks/axiosCall";
import { makeUserSession } from "../../hooks/serverFunctions";
import { useEffect, useRef, useState } from "react";
import {
  hasNumbersAndLetters,
  hasUppercase,
} from "../../hooks/AdditionalFunctions";
import AuthenticationHeader from "./AuthenticationHeader";
import { Helmet } from "react-helmet";
import { setWebLoader } from "../../store/data/webUISlice";
import MailVerification from "./MailVerification";
import { t } from "i18next";

export default function Register() {
  const user: Tuser = useSelector((store: RootState) => store.user);
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const [showVerify, setShowVerify] = useState<boolean>(false);

  const [passwordInput, setPasswordInput] = useState<string>("");
  const [passwordStatus, setPasswordStatus] = useState<number>(0);
  const [agreement, setAgreement] = useState<boolean>(false);
  const dispatch = useDispatch();

  const getVerifyMail = useRef<string | null>(null);
  const nameRef = useRef<null | HTMLInputElement>(null);
  const surnameRef = useRef<null | HTMLInputElement>(null);
  const mailRef = useRef<null | HTMLInputElement>(null);
  const mobileRef = useRef<null | HTMLInputElement>(null);
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const confirmPasswordRef = useRef<null | HTMLInputElement>(null);

  const darkMode: boolean = useSelector(
    (store: RootState) => store.webUI.darkMode
  );

  useEffect(() => {
    let passwordVerifier: number[] = [0, 0, 0];
    if (passwordInput.length >= 8) {
      passwordVerifier[1] = 1;
    } else {
      passwordVerifier[1] = 0;
    }
    if (hasNumbersAndLetters(passwordInput)) {
      passwordVerifier[2] = 1;
    } else {
      passwordVerifier[2] = 0;
    }
    if (hasUppercase(passwordInput)) {
      passwordVerifier[3] = 1;
    } else {
      passwordVerifier[3] = 0;
    }

    setPasswordStatus(
      passwordVerifier.filter((item: number) => item == 1).length
    );
  }, [passwordInput]);
  useEffect(() => {
    if (user.isLogged === null) {
      if (user.isLogged === true) {
        navigate("/");
      }
    }
  }, [user.isLogged, navigate]);

  const handleForm = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    if (agreement) {
      let formInputs = {
        name: nameRef.current?.value,
        surname: surnameRef.current?.value,
        mail: mailRef.current?.value,
        mobile: mobileRef.current?.value,
        password: passwordRef.current?.value,
        confirmPassword: confirmPasswordRef.current?.value,
      };

      if (
        formInputs.name &&
        formInputs.surname &&
        formInputs.mail &&
        formInputs.password &&
        formInputs.mobile &&
        formInputs.confirmPassword
      ) {
        if (formInputs.mobile && formInputs.mobile.length > 8) {
          if (formInputs.password.length >= 8) {
            if (formInputs.password === formInputs.confirmPassword) {
              setError("");
              const formData = new FormData();
              if (e) {
                formData.append("verified", JSON.stringify(false));
              } else {
                formData.append("verified", JSON.stringify(true));
              }
              formData.append("name", formInputs.name);
              formData.append("surname", formInputs.surname);
              formData.append("mail", formInputs.mail);
              if (formInputs.mobile) {
                formData.append("mobile", formInputs.mobile);
              } else {
                formData.append("mobile", "");
              }
              if (localStorage.getItem("favorites")) {
                const userFavorites: any = localStorage.getItem("favorites");
                formData.append("favorites", userFavorites);
              }
              formData.append("password", formInputs.password);
              dispatch(setWebLoader({ active: true, opacity: true }));
              axiosCall
                .post("authentication/user_register", formData, {
                  withCredentials: true,
                })
                .then((res) => {
                  dispatch(setWebLoader({ active: false }));
                  if (res.data.status === 801) {
                    setShowVerify(true);
                    getVerifyMail.current = formInputs.mail
                      ? formInputs.mail
                      : null;
                  } else if (res.data.status === 3) {
                    let userData = {
                      id: res.data.user_id,
                      name: formInputs.name,
                      surname: formInputs.surname,
                      mail: formInputs.mail,
                      mobile: formInputs.mobile,
                      money: 0,
                      favorites: JSON.stringify([]),
                      notifications: JSON.stringify([]),
                      verified: 0,
                      create_date: res.data.create_date,
                    };
                    makeUserSession(dispatch, userData);
                  } else if (res.data.status === 2) {
                    setError(t("login.r1"));
                  } else if (res.data.status === -1) {
                    setError(t("login.r2"));
                  }
                });
            } else {
              setError(t("login.r3"));
            }
          } else {
            setError(t("login.r4"));
          }
        } else {
          setError(t("login.r5"));
        }
      } else {
        setError(t("login.r6"));
      }
    } else {
      setError(t("login.r7"));
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("login.register")} - OnHome</title>
        <meta name="description" lang="ka" content="რეგისტრაცია - OnHome" />
        <meta
          name="keywords"
          lang="ka"
          content="ონჰოუმ რეგისტრაცია, რეგისტრაცია ონჰოუმ, onhome register, register onhome, onhome, onhome რეგისტრაცია, რეგისტრაცია onhome"
        />

        <meta name="theme-color" content="#3a86ff" />
        <link rel="canonical" href="https://onhome.ge/"></link>

        {/* Open Graph tags */}
        <meta property="og:title" lang="ka" content="რეგისტრაცია - onhome.ge" />

        <meta property="og:type" lang="ka" content="website" />
        <meta property="og:url" lang="ka" content="https://onhome.ge" />
        <meta
          property="og:site_name"
          content="OnHome.ge - უძრავი ქონების ყიდვა გაყიდვა გაქირავება"
        />
      </Helmet>
      <main className="m-0 p-0">
        <AuthenticationHeader />
        <div className="flex h-screen overflow-hidden min-h-[900px]">
          <section className="flex-1 relative flex justify-center items-center">
            {showVerify ? (
              <MailVerification
                goBack={() => {
                  setShowVerify(false);
                }}
                mail={getVerifyMail.current ? getVerifyMail.current : ""}
                getRegister={() => {
                  handleForm();
                }}
              />
            ) : null}
            <div
              className={` flex-col items-center ${
                darkMode ? "" : "pb-[150px]"
              }  medium:pb-[80px] ${showVerify ? "hidden" : "flex"}`}
            >
              <h1 className=" text-[32px] text-textHead font-mainBold mb-10 mobile:text-[22px] mobile:mb-6">
                {t("login.create_account")}
              </h1>
              <form
                onSubmit={handleForm}
                className="w-[420px] flex flex-col gap-5 items-center relative z-10 mobile:gap-4 mobile:max-w-[360px] mobile:w-[100%] mobile:px-[5px]"
              >
                {error !== "" && (
                  <div className="max-w-full w-full h-auto p-3 rounded-lg bg-pinkClear text-pinkI border-2 border-pinkI  flex justify-center items-center text-center text-[14px] tracking-wider font-mainSemiBold">
                    {error}
                  </div>
                )}
                <div className="flex items-center gap-5 mobile:gap-3">
                  <div className="h-[50px] w-full rounded-normal flex items-center relative">
                    <input
                      ref={nameRef}
                      type="text"
                      name="firstname"
                      placeholder={t("profileInfo.name")}
                      className="h-full w-full rounded-normal mobile:text-[12px] bg-LoginInput outline-none px-3 text-textDesc tracking-wider text-Asmall transition-colors focus:bg-LoginInputActive"
                    />
                  </div>
                  <div className="h-[50px] w-full rounded-normal flex items-center relative">
                    <input
                      ref={surnameRef}
                      type="text"
                      name="surname"
                      placeholder={t("profileInfo.surname")}
                      className="h-full w-full rounded-normal mobile:text-[12px] bg-LoginInput outline-none px-3 text-textDesc tracking-wider text-Asmall transition-colors focus:bg-LoginInputActive"
                    />
                  </div>
                </div>
                <div className="h-[50px] w-full rounded-normal flex items-center relative">
                  <MailIcon className="h-[22px] mobile:h-[20px] aspect-square absolute left-3 [&>path]:stroke-blackMain z-[3] opacity-40" />
                  <input
                    type="email"
                    name="email"
                    ref={mailRef}
                    placeholder={t("profileInfo.email")}
                    className="h-full w-full rounded-normal mobile:text-[12px] bg-LoginInput outline-none px-3 pl-11 mobile:pl-10 text-textDesc tracking-wider text-[13px] transition-colors focus:bg-LoginInputActive"
                  />
                </div>

                <div className="h-[50px] w-full rounded-normal flex items-center relative">
                  <PhoneIcon className="h-[22px] mobile:h-[20px] aspect-square absolute left-3 [&>path]:stroke-blackMain z-[3] opacity-40" />
                  <input
                    ref={mobileRef}
                    type="tel"
                    name="mobile"
                    autoComplete="off"
                    placeholder={t("profileInfo.mobile")}
                    className="h-full w-full rounded-normal mobile:text-[12px] bg-LoginInput outline-none px-3 pl-11 mobile:pl-10 text-textDesc tracking-wider text-Asmall transition-colors focus:bg-LoginInputActive"
                  />
                </div>
                <div className="h-[50px] w-full rounded-normal flex items-center relative">
                  <LockIcon className="w-[22px] mobile:h-[20px] aspect-square absolute left-3 [&>path]:stroke-blackMain z-[3] opacity-40" />
                  <input
                    type="password"
                    placeholder={t("login.password")}
                    ref={passwordRef}
                    autoComplete="off"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="h-full w-full rounded-normal mobile:text-[12px] bg-LoginInput outline-none px-3 pl-11 mobile:pl-10 text-textDesc tracking-wider text-Asmall transition-colors focus:bg-LoginInputActive"
                  />
                </div>
                <div className="h-[50px] w-full rounded-normal flex items-center relative">
                  <LockIcon className="w-[22px] mobile:h-[20px] aspect-square absolute left-3 [&>path]:stroke-blackMain z-[3] opacity-40" />
                  <input
                    ref={confirmPasswordRef}
                    autoComplete="off"
                    type="password"
                    placeholder={t("login.repeat_password")}
                    className="h-full w-full rounded-normal mobile:text-[12px] bg-LoginInput outline-none px-3 pl-11 mobile:pl-10 text-textDesc tracking-wider text-Asmall transition-colors focus:bg-LoginInputActive"
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
                  <p className="text-textDesc text-Asmall font-mainBold tracking-wider opacity-40 mt-2 mobile:text-[12px]">
                    {passwordStatus == 0 && t("login.p1")}
                    {passwordStatus == 1 && t("login.p2")}
                    {passwordStatus == 2 && t("login.p3")}
                    {passwordStatus == 3 && t("login.p4")}
                  </p>
                </div>
                <div className="flex items-center w-full justify-between ">
                  <div className="flex items-center text-textDesc text-Asmall font-mainBold tracking-wider  mobile:text-[12px] select-none">
                    <div
                      onClick={() => setAgreement((state) => !state)}
                      className={` h-[16px] transition-colors aspect-square justify-center items-center flex border-[3px] rounded-md border-main mr-2 cursor-pointer mobile:mr-1 mobile:border-[2px] ${
                        agreement ? "bg-main" : "bg-transparent"
                      } `}
                    >
                      {agreement && (
                        <CheckIcon className="h-[8px]  aspect-square" />
                      )}
                    </div>
                    <p
                      onClick={() => setAgreement((state) => !state)}
                      className="cursor-pointer "
                    >
                      {t("login.agree")}
                    </p>
                    <span className="text-main cursor-pointer ml-2 mobile:text-[12px]">
                      <Link to="/PrivacyPolicy">
                        {t("login.terms_and_conditions")}
                      </Link>
                    </span>
                  </div>
                </div>
                <button className=" mt-4 mobile:mt-0 linearButton font-mainBold text-buttonText h-[40px] w-[200px] mobile:text-[14px] mobile:h-[36px] rounded-normal tracking-wider transition-shadow hover:shadow-[0px_6px_15px_var(--mainClear)]">
                  {t("login.register")}
                </button>
              </form>

              <p className="mt-8 mobile:mt-6 text-textDesc text-Asmall font-mainBold tracking-wider mobile:text-[12px]">
                {t("login.have_an_account")}{" "}
                <span className="text-main cursor-pointer">
                  <Link to="/Login"> {t("login.title")}</Link>
                </span>
              </p>
            </div>

            <div className="absolute bottom-0 z-0 pointer-events-none w-full">
              {!darkMode && (
                <HomesbgDecor className="absolute bottom-0 w-full opacity-20" />
              )}
              <Home5Decor className="absolute max-h-[160px] bottom-0 max-w-[50%] left-[50%] translate-x-[-50%] hidden mobile:block " />
            </div>
          </section>
          <SideSection />
        </div>
      </main>
    </>
  );
}
