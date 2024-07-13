import { useState } from "react";
import { MailIcon } from "../../assets/icons/Icons";
import { HomesbgDecor } from "../../assets/images/decorations/svg/Decorations";
import SideSection from "./components/SideSection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Tuser } from "../../store/data/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axiosCall from "../../hooks/axiosCall";
import AuthenticationHeader from "./AuthenticationHeader";
import { Helmet } from "react-helmet";
import { setWebLoader } from "../../store/data/webUISlice";

export default function ForgotPassword() {
  const user: Tuser = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [codeSubmit, setCodeSubmit] = useState<boolean>(false);
  const [error, setError] = useState<{ status: boolean; data: null | string }>({
    status: false,
    data: null,
  });
  const darkMode: boolean = useSelector(
    (store: RootState) => store.webUI.darkMode
  );
  const submitEmail = () => {
    if (email.length > 2) {
      dispatch(setWebLoader({ active: true, opacity: true }));
      setError({ status: false, data: null });

      axiosCall
        .post(
          "user/send_verify_code.php",
          { email: email },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          dispatch(setWebLoader({ active: false }));

          if (res.data.status == 100) {
            setCodeSubmit(true);
          } else if (res.data.status == 2) {
            setError({ status: true, data: "მსგავსი მეილი ვერ მოიძებნა" });
          } else if (res.data.status == 0) {
            setError({
              status: true,
              data: "წარმოიშვა შეცდომა, სცადეთ მოგვიანებით",
            });
          }
        });
    } else {
      setError({ status: true, data: "შეიყვანეთ სწორი მეილი" });
    }
  };
  const submitCode = () => {
    setError({ status: false, data: null });
    dispatch(setWebLoader({ active: true, opacity: true }));

    axiosCall
      .post(
        "user/verify_code.php",
        { email: email, code: code },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        dispatch(setWebLoader({ active: false }));

        if (res.data.status == 0) {
          setError({ status: true, data: "კოდი არასწორია" });
        } else if (res.data.status == 100) {
          navigate("/ForgotPassword/" + res.data.url);
        }
      });
  };
  if (user.isLogged === null || user.isLogged == true) {
    navigate("/");
    return null;
  }
  return (
    <>
      <Helmet>
        <title>პაროლის აღდგენა - OnHome</title>
        <meta name="description" lang="ka" content="პაროლის აღდგენა - OnHome" />
        <meta
          name="keywords"
          lang="ka"
          content="ონჰოუმ პაროლის აღდგენა, პაროლის აღდგენა ონჰოუმ, onhome register, register onhome, onhome, onhome პაროლის აღდგენა, პაროლის აღდგენა onhome"
        />

        <meta name="theme-color" content="#3a86ff" />
        <link rel="canonical" href="https://onhome.ge/"></link>

        {/* Open Graph tags */}
        <meta
          property="og:title"
          lang="ka"
          content="პაროლის აღდგენა - onhome.ge"
        />

        <meta property="og:type" lang="ka" content="website" />
        <meta property="og:url" lang="ka" content="https://onhome.ge" />
        <meta
          property="og:site_name"
          content="OnHome.ge - უძრავი ქონების ყიდვა გაყიდვა გაქირავება"
        />
      </Helmet>
      <main className="m-0 p-0">
        <AuthenticationHeader />
        <div className="flex h-screen">
          <section className="flex-1 relative flex justify-center items-center">
            {/* <RecoverPassword /> */}
            <div
              className={`flex flex-col items-center ${
                darkMode ? "" : "pb-[200px]"
              }  medium:pb-[100px] w-full`}
            >
              <h1 className=" text-[32px] mobile:text-[24px] text-textHead font-mainBold mb-2">
                პაროლის აღდგენა
              </h1>
              <p className="mb-6 text-textDesc text-Asmall font-mainBold tracking-wider mobile:text-[14px] text-center">
                {codeSubmit
                  ? "კოდი გაგზავნილია მეილზე: " + email
                  : "შეიყვანეთ თქვენი ელფოსტა"}
                <br />
                (შეამოწმეთ სპამის გვერდიც)
              </p>
              {error.status ? (
                <div className="w-[380px] mb-5 h-auto p-3 rounded-lg bg-pinkClear text-pinkI border-2 border-pinkI  flex justify-center items-center text-center text-[14px] tracking-wider font-mainSemiBold">
                  {error.data}
                </div>
              ) : null}
              {codeSubmit ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitCode();
                  }}
                  className="w-[380px] flex flex-col gap-5 items-center relative z-10 mobile:gap-4 mobile:max-w-[360px] mobile:w-full mobile:px-[5px]"
                >
                  <div className="h-[40px] w-full rounded-normal flex items-center relative">
                    <div className="h-[40px] w-full rounded-normal flex items-center relative">
                      <input
                        type="text"
                        placeholder="შეიყვანეთ კოდი"
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                        className="h-full w-full rounded-normal bg-mainClear outline-none px-3 text-center text-textDesc tracking-wider text-Asmall transition-colors focus:bg-mainClearActive placeholder:text-main"
                      />
                    </div>
                  </div>

                  <button className="linearButton mt-2 font-mainBold text-buttonText h-[40px] w-[200px] mobile:h-[36px] mobile:w-[180px] mobile:text-[14px] rounded-normal tracking-wider transition-shadow hover:shadow-[0px_6px_15px_var(--mainClear)]">
                    დადასტურება
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitEmail();
                  }}
                  className="w-[380px] flex flex-col gap-5 items-center relative z-10 mobile:gap-4 mobile:max-w-[360px] mobile:w-full mobile:px-[5px]"
                >
                  <div className="h-[40px] w-full rounded-normal flex items-center relative">
                    <MailIcon className="h-[24px] mobile:h-[20px] aspect-square absolute left-3 [&>path]:stroke-textDescCard" />
                    <input
                      type="email"
                      name="email"
                      placeholder="მეილი"
                      className="h-full w-full rounded-normal bg-LoginInput outline-none px-3 pl-11 mobile:text-[12px] mobile:pl-10 text-textDesc tracking-wider text-Asmall transition-colors focus:bg-LoginInputActive"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>

                  <button className="linearButton mt-2 font-mainBold text-buttonText h-[40px] w-[200px] mobile:h-[36px] mobile:w-[180px] mobile:text-[14px] rounded-normal tracking-wider transition-shadow hover:shadow-[0px_6px_15px_var(--mainClear)]">
                    კოდის მიღება
                  </button>
                </form>
              )}
              <p className="text-main text-Asmall mt-5 font-mainBold tracking-wider mobile:text-[12px] mobile:invisible cursor-pointer">
                <Link to={"/Login"}>უკან დაბრუნება</Link>
              </p>
            </div>
            <div className="absolute bottom-0 z-0 pointer-events-none w-full">
              {!darkMode && <HomesbgDecor className="w-full opacity-20" />}
            </div>
          </section>
          <SideSection />
        </div>
      </main>
    </>
  );
}

// function RecoverPassword() {
//   return (
//     <div className="flex flex-col items-center pb-[200px] medium:pb-[100px] w-full">
//       <h1 className=" text-[32px] text-main font-mainBold mb-2 mobile:text-[24px] ">
//         პაროლის განახლება
//       </h1>
//       <p className="mb-6 text-textDesc text-Asmall font-mainBold tracking-wider  mobile:text-[14px]">
//         შეიყვანეთ ახალი პაროლი
//       </p>
//       <form
//         onSubmit={(e) => e.preventDefault()}
//         className="w-[380px] flex flex-col gap-5 items-center relative z-10  mobile:gap-4 mobile:max-w-[360px] mobile:w-full mobile:px-[5px]"
//       >
//         <div className="h-[40px] w-full rounded-normal flex items-center relative">
//           <LockIcon className="w-[24px] mobile:h-[20px]  aspect-square absolute left-3 [&>path]:stroke-textDescCard" />
//           <input
//             type="password"
//             placeholder="პაროლი"
//             className="h-full w-full rounded-normal bg-LoginInput outline-none px-3 pl-11 mobile:text-[12px] mobile:pl-10 text-textDesc tracking-wider text-Asmall transition-colors focus:bg-LoginInputActive"
//           />
//         </div>
//         <div className="h-[40px] w-full rounded-normal flex items-center relative">
//           <LockIcon className="w-[24px] mobile:h-[20px]  aspect-square absolute left-3 [&>path]:stroke-textDescCard" />
//           <input
//             type="password"
//             placeholder="გაიმეორეთ პაროლი"
//             className="h-full w-full rounded-normal bg-LoginInput outline-none px-3 pl-11 mobile:text-[12px] mobile:pl-10 text-textDesc tracking-wider text-Asmall transition-colors focus:bg-LoginInputActive"
//           />
//         </div>
//         <div className="flex flex-col w-full">
//           <div className="w-full h-2 rounded-md bg-whiteLoad">
//             <div className="w-[10%] h-full rounded-md bg-pinkI"></div>
//           </div>
//           <p className="text-textDesc text-Asmall font-mainBold tracking-wider opacity-70 mt-2 mobile:text-[12px]">
//             პაროლი სუსტია
//           </p>
//         </div>

//         <button className="linearButton mt-2 font-mainBold text-buttonText h-[40px] w-[200px] mobile:h-[36px] mobile:w-[180px] mobile:text-[14px] rounded-normal tracking-wider transition-shadow hover:shadow-buttonShadow">
//           დადასტურება
//         </button>
//       </form>
//     </div>
//   );
// }
