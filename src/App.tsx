import { Route, Routes, useNavigate } from "react-router-dom";
import {
  Suspense,
  lazy,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { checkUIStorage } from "./hooks/UIFunctions";
import { useDispatch, useSelector } from "react-redux";
import axiosCall from "./hooks/axiosCall";
import { loggedUser, makeUserSession } from "./hooks/serverFunctions";
import { RootState } from "./store/store";
import { Tuser, clearSession } from "./store/data/userSlice";
import CheckRoutes from "./CheckRoutes";
import Logout from "./pages/Logout";
import { TPopups } from "./store/data/popupsSlice";
import ProblemReport from "./components/popups/ProblemReport";
import SharePopup from "./components/popups/SharePopup";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ServerError from "./pages/ServerError";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import { Helmet } from "react-helmet";
import CookieAgreement from "./pages/Profile/components/CookieAgreement";
import AddProduct from "./pages/AddProduct/AddProduct";
import { useTranslation } from "react-i18next";

const Success = lazy(() => import("./pages/Payment/Success"));
const Fail = lazy(() => import("./pages/Payment/Fail"));

const NotFound = lazy(() => import("./pages/NotFound"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy/RefundPolicy"));
const SuspendedAccount = lazy(() => import("./pages/SuspendedAccount"));

const PasswordRecover = lazy(
  () => import("./pages/Authentication/PasswordRecover")
);
const AdsMake = lazy(() => import("./pages/AdsMake/AdsMake"));
const Contact = lazy(() => import("./pages/Contact/Contact"));

const AgencyService = lazy(() => import("./pages/AgencyService/AgencyService"));
const AgencyChoose = lazy(() => import("./pages/AgencyService/AgencyChoose"));
const AgencyConditions = lazy(
  () => import("./pages/AgencyService/AgencyConditions")
);
const AdminPanel = lazy(() => import("./pages/AdminPanel/AdminPanel"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Search = lazy(() => import("./pages/Search/Search"));
const Login = lazy(() => import("./pages/Authentication/Login"));
const Register = lazy(() => import("./pages/Authentication/Register"));
const Seller = lazy(() => import("./pages/Seller/Seller"));
const ForgotPassword = lazy(
  () => import("./pages/Authentication/ForgotPassword")
);

function App() {
  const { t, i18n } = useTranslation();
  const UISettings = useSelector((store: RootState) => store.webUI);
  const user: Tuser = useSelector((store: RootState) => store.user);
  const popups: TPopups = useSelector((store: RootState) => store.popups);
  const [loading, setLoading] = useState<boolean>(true);
  const [lock, setLock] = useState<boolean>(false);
  const [cookiesAgreement, setCookieAgreement] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refresh = useRef<boolean>(true);

  useLayoutEffect(() => {
    checkUIStorage(dispatch, UISettings);
    if (
      localStorage.getItem("cookiesAgreement") &&
      localStorage.getItem("cookiesAgreement") == "1"
    ) {
    } else {
      setCookieAgreement(true);
      localStorage.getItem("cookieAgreement");
    }
  }, []);

  useEffect(() => {
    if (refresh.current) {
      refresh.current = false;
      axiosCall
        .get("authentication/user", { withCredentials: true })
        .then((res) => {
          setLoading(false);
          if (res.status == 200) {
            if (res.data.status == 100) {
              makeUserSession(dispatch, {
                ...res.data.user,
                favorites: JSON.parse(res.data.user.favorites),
              });

              if (res.data.user.banned == 1) {
                navigate("/SuspendedAccount");
              }
            } else if (res.data.status == 0) {
              dispatch(clearSession());
            }
          } else {
            setLock(true);
          }
        })
        .catch(() => {
          setLoading(false);
          setLock(true);
        });
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loggedUser(navigate, user.isLogged);
  }, [navigate, user.isLogged, location.pathname]);

  useEffect(() => {
    if (i18n.language == "ru") {
      document.body.classList.add("rsnf");
    } else {
      document.body.classList.remove("rsnf");
    }
  }, [i18n.language]);
  return (
    <>
      <Helmet>
        <title>{t("seo.title")}</title>

        <meta
          name="description"
          lang="ka"
          content="OnHome - სახლები, აგარაკები, ბინები, კომერციული ფართები, სასტუმროები, მიწის ნაკვეთები, მიწები, ყიდვა, გაყიდვა, გაქირავება. "
        />
        <meta
          name="keywords"
          lang="ka"
          content="უძრავი ქონება, საქართელო, თბილისი, ბინა, სახლი, აგარაკი, მიწის ნაკვეთი, სასტუმრო, კომერციული ფართი, იყიდება, გირავდება, ქირავდება, ქირავდება დღიურად, ვიქირავებ, ვიგირავებ, ვიყიდი, სამშენებლო კომპანია, სააგენტო, ახალაშენებული, მშენებარე, შავი კარკასი, თეთრი კარკასი, მწვანე კარკასი"
        />
        <meta name="theme-color" content="#3a86ff" />
        <link rel="canonical" href="https://onhome.ge/"></link>

        {/* Open Graph tags */}
        <meta
          property="og:title"
          lang="ka"
          content="უძრავი ქონების ყიდვა, გაყიდვა, გაქირავება - onhome.ge"
        />

        <meta property="og:type" lang="ka" content="website" />
        <meta property="og:url" lang="ka" content="https://onhome.ge" />
        <meta
          property="og:site_name"
          content="OnHome.ge - უძრავი ქონების ყიდვა გაყიდვა გაქირავება"
        />
      </Helmet>
      {loading ? <MainLoader /> : null}
      {cookiesAgreement ? (
        <CookieAgreement close={() => setCookieAgreement(false)} />
      ) : null}
      {UISettings.loader.active ? (
        <MainLoader
          opacity={
            UISettings.loader.opacity ? UISettings.loader.opacity : false
          }
        />
      ) : null}
      {popups.reportProblem.show ? <ProblemReport /> : null}
      {popups.share.show ? <SharePopup /> : null}
      {!lock ? (
        <Suspense fallback={<MainLoader opacity />}>
          <CheckRoutes user={user}>
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="/NotFound" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />

                <Route path="Login" element={<Login />} />
                <Route path="Register" element={<Register />} />
                <Route path="ForgotPassword" element={<ForgotPassword />} />
                <Route
                  path="ForgotPassword/:url"
                  element={<PasswordRecover />}
                />
                {user.isLogged ? (
                  <Route path="Logout" element={<Logout />} />
                ) : null}
                <Route path="Search" element={<Search />} />
                <Route path="Product" element={<Product />} />
                <Route path="Contact" element={<Contact />} />
                <Route path="Payment/Success" element={<Success />} />
                <Route path="Payment/Fail" element={<Fail />} />
                <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
                <Route path="RefundPolicy" element={<RefundPolicy />} />
                <Route path="Product/:id" element={<Product />} />
                <Route path="AddProduct" element={<AddProduct />} />
                <Route path="SuspendedAccount" element={<SuspendedAccount />} />
                <Route path="Profile/*" element={<Profile />} />
                <Route path="AgencyService" element={<AgencyService />} />
                <Route path="AgencyChoose" element={<AgencyChoose />} />
                <Route path="AdsMake" element={<AdsMake />} />
                <Route path="AgencyConditions" element={<AgencyConditions />} />
                <Route path="Seller/:id" element={<Seller />} />

                {user.isLogged ? (
                  <Route path="AdminPanel" element={<AdminPanel />} />
                ) : null}
              </Route>
            </Routes>
          </CheckRoutes>
        </Suspense>
      ) : (
        <Routes>
          <Route element={<ServerError />} path="/*" />
        </Routes>
      )}
    </>
  );
}

export default App;

function MainLoader(props: { opacity?: boolean }) {
  return (
    <div
      className={`${
        props.opacity ? "opacity-70" : ""
      } fixed top-0 bottom-0 h-full w-full bg-whiteMain z-[99] flex justify-center items-center`}
    >
      <svg
        className="animwhole translate-y-[-30px]"
        width="102"
        height="116"
        viewBox="0 0 102 116"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="13" y="48" width="75" height="67" rx="6" fill="var(--main)" />
        <path
          className="animdown"
          d="M47 3.34794C49 1 52 1 54 3.34794L86 34.0012C89 37 87 42 82 42.6H19.219C14 42 12 37 15 34.0012L47 3.34794Z"
          fill="var(--main)"
        />
        <rect
          x="54"
          y="59"
          width="26"
          height="17"
          rx="5"
          fill="var(--whiteMain)"
        />
        <rect
          className="animdoor"
          x="54"
          y="86"
          width="26"
          height="300"
          rx="5"
          fill="var(--whiteMain)"
        />
        <rect
          className="animfill"
          x="21"
          y="59"
          width="26"
          height="17"
          rx="5"
          fill="var(--whiteMain)"
        />
        <rect
          x="21"
          y="86"
          width="26"
          height="17"
          rx="5"
          fill="var(--whiteMain)"
        />
      </svg>
    </div>
  );
}
