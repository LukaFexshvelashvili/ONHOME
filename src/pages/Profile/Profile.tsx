import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  BookmarkIcon,
  ChatIcon,
  DocumentsIcon,
  HistoryIcon,
  MoneyDollarIcon,
  SettingsIcon,
  UserLinearIcon,
} from "../../assets/icons/Icons";
import { useLayoutEffect, useState } from "react";

import { Link, Route, Routes, useNavigate } from "react-router-dom";
import MyProducts from "./components/MyProducts";
import Balance from "./components/Balance";
import Notifications from "./components/Notifications";
import SavedProducts from "./components/SavedProducts";
import LastSeenProducts from "./components/LastSeenProducts";
import Settings from "./components/Settings";
import ProfileInfo from "./components/ProfileInfo";
import { Helmet } from "react-helmet";

export default function Profile() {
  const userData = useSelector((store: RootState) => store.user);
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState(1);
  useLayoutEffect(() => {
    if (location.pathname.includes("MyProducts")) {
      setActiveNav(1);
    }
    if (location.pathname.includes("Balance")) {
      setActiveNav(2);
    }
    if (location.pathname.includes("SavedProducts")) {
      setActiveNav(3);
    }
    if (location.pathname.includes("LastSeenProducts")) {
      setActiveNav(4);
    }
    if (location.pathname.includes("Notifications")) {
      setActiveNav(5);
    }
    if (location.pathname.includes("Settings")) {
      setActiveNav(6);
    }
    if (location.pathname.includes("ProfileInfo")) {
      setActiveNav(7);
    }
    let forScroll: any = null;

    if (window.innerWidth <= 800 && userData.isLogged) {
      forScroll = setTimeout(() => {
        window.scrollTo(0, 400);
      }, 0);
    }
    return () => {
      clearTimeout(forScroll);
    };
  }, [navigate, location.pathname]);

  return (
    <>
      <Helmet>
        <title>პროფილი - OnHome</title>
      </Helmet>
      <main className="min-h-screen flex gap-4 mobile:gap-0 mobile:flex-col">
        <section className="flex flex-col flex-[2] mobile:flex-[none] mobile:mb-5 gap-4">
          {userData.isLogged ? (
            <div className="h-[100px] rounded-section shadow-sectionShadow bg-whiteMain relative flex flex-wrap items-center px-7 py-5 ">
              <p className="text-sm text-textDescCard absolute top-2 right-4 small:text-[10px]">
                ID - {userData.id}
              </p>
              <div className="flex gap-2 items-center">
                <div className="">
                  <div className="h-[38px]  aspect-square rounded-circle bg-main p-[4px] flex justify-center items-center relative">
                    <div className="h-full border-2 border-whiteMain aspect-square rounded-circle bg-main select-none cursor-pointer "></div>
                  </div>
                </div>
                <div className="ml-1">
                  <p className=" font-mainBold text-textHeadCard leading-[22px] text-[15px]">
                    {userData.name}
                  </p>
                  <p className=" font-mainBold text-textDescCard leading-[22px] text-[14px]">
                    {userData.surname}
                  </p>
                </div>
              </div>
              <div className="w-full">
                <p className="text-[13px] text-textDesc mt-2 text-center px-4">
                  ბალანსი{": "}
                  <span className="text-main ml-1 font-mainSemiBold tracking-wider">
                    {(userData.money / 100)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "₾"}
                  </span>
                </p>
              </div>
            </div>
          ) : null}

          <div className=" rounded-section shadow-sectionShadow bg-whiteMain relative items-center overflow-hidden flex flex-col">
            {userData.isLogged
              ? ProfileNavs.map((e: TProfileNav) => (
                  <Link
                    key={e.id}
                    onClick={() => setActiveNav(e.id)}
                    to={e.link}
                    className="w-full"
                  >
                    <button
                      className={` outline-none cursor-pointer transition-colors w-full text-start px-5 py-[13px] text-textHead font-mainMedium flex items-center relative text-[14px] before:transition-transform  ${
                        activeNav == e.id
                          ? "ActiveProfileNav before:bg-main bg-mainClear before:scale-y-1"
                          : "bg-transparent before:scale-y-0"
                      }`}
                    >
                      <e.icon /> {e.name}
                    </button>
                  </Link>
                ))
              : ProfileNavsGuest.map((e: TProfileNav) => (
                  <Link
                    key={e.id}
                    onClick={() => setActiveNav(e.id)}
                    to={e.link}
                    className="w-full"
                  >
                    <button
                      className={` outline-none cursor-pointer transition-colors w-full text-start px-5 py-[13px] text-textHead font-mainMedium flex items-center relative text-[14px] before:transition-transform  ${
                        activeNav == e.id
                          ? "ActiveProfileNav before:bg-main bg-mainClear before:scale-y-1"
                          : "bg-transparent before:scale-y-0"
                      }`}
                    >
                      <e.icon /> {e.name}
                    </button>
                  </Link>
                ))}
          </div>
          {!userData.isLogged ? (
            <Link to={"/Login"} className="rounded-[10px] ">
              <button className="w-full h-[50px] rounded-[10px] text-buttonText bg-main tracking-wider text-[14px] transition-colors hover:bg-mainHover">
                ანგარიშში შესვლა
              </button>
            </Link>
          ) : null}
        </section>
        <section className="flex flex-col flex-[5] gap-4 ">
          <Routes>
            <Route path="/">
              {userData.isLogged ? (
                <Route index element={<MyProducts />} />
              ) : null}
              {userData.isLogged ? (
                <Route path="MyProducts" element={<MyProducts />} />
              ) : null}
              {userData.isLogged ? (
                <Route path="Balance" element={<Balance />} />
              ) : null}
              <Route path="SavedProducts" element={<SavedProducts />} />
              {userData.isLogged ? (
                <Route path="Notifications/" element={<Notifications />}>
                  <Route path=":id" element={<Notifications />} />
                </Route>
              ) : null}
              {userData.isLogged ? (
                <Route path="LastSeenProducts" element={<LastSeenProducts />} />
              ) : null}
              <Route path="Settings" element={<Settings />} />
              {userData.isLogged ? (
                <Route path="ProfileInfo" element={<ProfileInfo />} />
              ) : null}
            </Route>
          </Routes>
        </section>
      </main>
    </>
  );
}
type TProfileNav = {
  id: number;
  name: string;
  link: string;
  icon: () => JSX.Element;
};
const ProfileNavs: TProfileNav[] = [
  {
    id: 1,
    name: "ჩემი განცხადებები",
    link: "MyProducts",
    icon: () => <DocumentsIcon className="h-[26px] aspect-square mr-[10px]" />,
  },
  {
    id: 2,
    name: "ბალანსი",
    link: "Balance",
    icon: () => (
      <MoneyDollarIcon className="h-[26px] aspect-square mr-[10px] [&>path]:stroke-textHead" />
    ),
  },
  {
    id: 3,
    name: "შენახული განცხადებები",
    link: "SavedProducts",
    icon: () => (
      <BookmarkIcon className="h-[26px] aspect-square mr-[10px] [&>path]:stroke-[1.5px] p-[3px] [&>path]:stroke-textHead" />
    ),
  },
  {
    id: 4,
    name: "ბოლოს ნანახი",
    link: "LastSeenProducts",
    icon: () => (
      <HistoryIcon className="h-[27px] aspect-square mr-[10px]  [&>path]:stroke-[1.5px] p-[3px] [&>path]:fill-textHead" />
    ),
  },
  {
    id: 5,
    name: "შეტყობინებები",
    link: "Notifications",
    icon: () => (
      <ChatIcon className="h-[27px] aspect-square mr-[10px]  [&>path]:stroke-[1.5px] p-[3px] [&>path]:stroke-textHead" />
    ),
  },

  {
    id: 6,
    name: "პარამეტრები",
    link: "Settings",
    icon: () => (
      <SettingsIcon className="h-[26px] aspect-square mr-[10px] [&>path]:stroke-[1.5px] p-[3px] [&>path]:stroke-textHead" />
    ),
  },
  {
    id: 7,
    name: "ჩემს შესახებ",
    link: "ProfileInfo",
    icon: () => (
      <UserLinearIcon className="h-[26px] aspect-square mr-[10px] [&>path]:stroke-[1.5px] p-[2px] [&>path]:fill-textHead" />
    ),
  },
];
const ProfileNavsGuest: TProfileNav[] = [
  {
    id: 3,
    name: "შენახული განცხადებები",
    link: "SavedProducts",
    icon: () => (
      <BookmarkIcon className="h-[26px] aspect-square mr-[10px] [&>path]:stroke-[1.5px] p-[3px] [&>path]:stroke-textHead" />
    ),
  },

  {
    id: 6,
    name: "პარამეტრები",
    link: "Settings",
    icon: () => (
      <SettingsIcon className="h-[26px] aspect-square mr-[10px] [&>path]:stroke-[1.5px] p-[3px] [&>path]:stroke-textHead" />
    ),
  },
];
