import { FormEvent, useEffect, useRef, useState } from "react";
import { HomesbgDecor } from "../../assets/images/decorations/svg/Decorations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Tuser } from "../../store/data/userSlice";
import { useNavigate } from "react-router-dom";
import axiosCall from "../../hooks/axiosCall";
import { Helmet } from "react-helmet";
import { setWebLoader } from "../../store/data/webUISlice";
import CryptoJS from "crypto-js";

const hashString = (data: string) => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};

export default function MailVerification(props: {
  mail: string;
  goBack: Function;
  getRegister: Function;
}) {
  const user: Tuser = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<{ status: boolean; data: null | string }>({
    status: false,
    data: null,
  });
  const sendStop = useRef<boolean>(false);
  const sendedCode = useRef<string>("");
  const rn = "LoPN2610MnSpOrN";

  const darkMode: boolean = useSelector(
    (store: RootState) => store.webUI.darkMode
  );
  useEffect(() => {
    dispatch(setWebLoader({ active: true, opacity: true }));

    if (props.mail.length > 2) {
      if (!sendStop.current) {
        axiosCall
          .post(
            "authentication/user_mail_verification.php",
            { email: props.mail },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((res) => {
            dispatch(setWebLoader({ active: false }));

            let getCd = res.data.data.split(rn)[2];
            sendedCode.current = getCd;
            if (res.status == 0) {
              setError({
                status: true,
                data: "სერვერზე შეცდომაა სცადეთ მოგვიანებით",
              });
            }
          });
        sendStop.current = true;
      }
    } else {
      setError({ status: true, data: "შეიყვანეთ სწორი მეილი" });
    }
  }, [sendStop.current]);

  const checkCode = (e: FormEvent) => {
    e.preventDefault();
    setError({ status: false, data: null });

    if (code.current) {
      if (hashString(code.current.value.toString()) == sendedCode.current) {
        props.getRegister();
      } else {
        setError({ status: true, data: "კოდი არასწორია" });
      }
    }
  };
  if (user.isLogged === null || user.isLogged == true) {
    navigate("/");
  }
  return (
    <>
      <Helmet>
        <title>მეილის ვერიფიკაცია - OnHome</title>
      </Helmet>
      <div
        className={`flex flex-col items-center ${
          darkMode ? "" : "pb-[200px]"
        }  medium:pb-[100px] w-full`}
      >
        <h1 className=" text-[32px] mobile:text-[24px] text-textHead font-mainBold mb-2">
          მეილის ვერიფიკაცია
        </h1>
        <p className="mb-6 text-textDesc text-Asmall font-mainBold tracking-wider mobile:text-[14px] text-center">
          კოდი გაგზავნილია მეილზე: {props.mail}
          <br />
          (შეამოწმეთ სპამის გვერდიც)
        </p>
        {error.status ? (
          <div className="w-[380px] mb-5 h-auto p-3 rounded-lg bg-pinkClear text-pinkI border-2 border-pinkI  flex justify-center items-center text-center text-[14px] tracking-wider font-mainSemiBold">
            {error.data}
          </div>
        ) : null}
        <form
          onSubmit={(e) => {
            checkCode(e);
          }}
          className="w-[380px] flex flex-col gap-5 items-center relative z-10 mobile:gap-4 mobile:max-w-[360px] mobile:w-full mobile:px-[5px]"
        >
          <div className="h-[40px] w-full rounded-normal flex items-center relative">
            <div className="h-[40px] w-full rounded-normal flex items-center relative">
              <input
                type="text"
                placeholder="შეიყვანეთ კოდი"
                ref={code}
                className="h-full w-full rounded-normal bg-mainClear outline-none px-3 text-center text-textDesc tracking-wider text-Asmall transition-colors focus:bg-mainClearActive placeholder:text-main"
              />
            </div>
          </div>

          <button className="linearButton mt-2 font-mainBold text-buttonText h-[40px] w-[200px] mobile:h-[36px] mobile:w-[180px] mobile:text-[14px] rounded-normal tracking-wider transition-shadow hover:shadow-[0px_6px_15px_var(--mainClear)]">
            დადასტურება
          </button>
        </form>

        <p
          onClick={() => props.goBack()}
          className="text-main text-Asmall mt-5 font-mainBold tracking-wider mobile:text-[12px] mobile:invisible cursor-pointer"
        >
          უკან დაბრუნება
        </p>
      </div>
      <div className="absolute bottom-0 z-0 pointer-events-none w-full">
        {!darkMode && <HomesbgDecor className="w-full opacity-20" />}
      </div>
    </>
  );
}
