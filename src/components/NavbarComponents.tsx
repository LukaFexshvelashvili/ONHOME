import { Link } from "react-router-dom";
import { Tuser } from "../store/data/userSlice";
import {
  DocumentsIcon,
  LogoutIcon,
  MessageIcon,
  MoonIcon,
  NotificationIcon,
  SettingsIcon,
  SunIcon,
  UserLinearIcon,
} from "../assets/icons/Icons";
import { toggleDarkMode } from "../store/data/webUISlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import HoverTitle from "./global/HoverTitle";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export function NotificationBar({
  userData,
  activePop,
  setActivePop,
}: {
  userData: Tuser;
  activePop: string | null;
  setActivePop: Function;
}) {
  const popupBlock = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        popupBlock.current &&
        !popupBlock.current.contains(event.target) &&
        activePop == "notifications"
      ) {
        setActivePop(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    if (activePop !== "notifications") {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupBlock, activePop]);
  return (
    <div
      ref={popupBlock}
      className={`group relative h-[34px] mobileTab:h-[32px] aspect-square cursor-default flex items-center justify-center transition-colors ${
        activePop == "notifications" ? "bg-mainClear" : "bg-transparent"
      }   rounded-md `}
    >
      {activePop !== "notifications" ? (
        <HoverTitle title={t("navbar.notifications")} />
      ) : null}

      {userData.notifications.length !== 0 &&
        userData.notifications.some((item) => item.seen == false) && (
          <div className="absolute h-[8px] aspect-square top-[6px] right-[6px] z-20 rounded-circle bg-main"></div>
        )}
      <NotificationIcon
        onClick={() => {
          setActivePop((state: string | null) =>
            state !== "notifications" ? "notifications" : null
          );
        }}
        className={`h-[20px] mobileTab:h-[18px] aspect-square  cursor-pointer translate-y-[1px]  select-none ${
          activePop == "notifications"
            ? " [&>path]:fill-main"
            : " [&>path]:fill-navIcon"
        }`}
      />
      <div
        className={` absolute h-auto   ${
          userData.notifications.length == 0
            ? "min-h-min pb-0"
            : "pb-[40px] min-h-[250px]"
        } max-h-[250px] w-[220px] overflow-hidden bg-whiteMain rounded-normal shadow-sectionShadow top-[60px] right-0 duration-200 transition-[opacity,visibility]  ${
          activePop == "notifications"
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        <div className="flex flex-col ">
          {userData.isLogged ? (
            userData.notifications.length == 0 ? (
              <p className=" text-textHead text-[12px] tracking-wider font-mainRegular p-3 text-center">
                {t("navbar.there_are_no_messages")}
              </p>
            ) : (
              userData.notifications.map((item, i) => (
                <Link
                  key={i}
                  to={"/Profile/Notifications/" + item.id}
                  className="w-full px-3 py-2 transition-colors hover:bg-whiteHover"
                  onClick={() => {
                    setActivePop(null);
                  }}
                >
                  <button className="w-full">
                    <div className="flex items-center relative">
                      <div className="h-[26px] aspect-square bg-main rounded-md"></div>
                      {item.seen == false && (
                        <div className="h-[10px] aspect-square rounded-circle bg-main absolute right-0"></div>
                      )}
                      <div className="flex flex-col text-start ml-2">
                        <p className="text-[11px] tracking-wider font-mainSemiBold text-userName">
                          {item.title.slice(0, 18)}
                        </p>
                        <p className="text-[10px] w-[99%] text-nowrap overflow-hidden text-ellipsis font-mainMedium tracking-wider text-userLastName">
                          {item.description.slice(0, 22)}
                        </p>
                      </div>
                    </div>
                  </button>
                </Link>
              ))
            )
          ) : (
            <p className=" text-textHead text-[12px] tracking-wider font-mainRegular p-3 text-center">
              {t("navbar.to_see_notifications")}{" "}
              <Link
                to={"/Login"}
                className=" text-main font-mainBold underline"
              >
                {t("navbar.log_in2")}
              </Link>
            </p>
          )}
        </div>
        {userData.notifications.length !== 0 ? (
          <Link
            className="absolute bottom-0 w-full h-[40px]"
            to={"/Profile/Notifications"}
            onClick={() => setActivePop(null)}
          >
            <button className=" w-full h-full bg-mainClear text-main left-0 tracking-wider font-mainBold text-[12px]">
              {t("navbar.see_all")}{" "}
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function ProfileBar({
  userData,
  activePop,
  setActivePop,
  darkmode,
}: {
  userData: Tuser;
  activePop: string | null;
  setActivePop: Function;
  darkmode: boolean;
}) {
  const { i18n } = useTranslation();

  const dispatch = useDispatch();

  const unloggedButtons: TProfileButton[] = [
    {
      link: "/Login",
      name: t("navbar.log_in"),
      icon: (
        <LogoutIcon className="h-[20px] aspect-square stroke-textHead mr-2" />
      ),
    },

    {
      link: "ChangeDarkTheme",
      name: t("navbar.dark_mode"),
      icon: <MoonIcon className="h-[20px] aspect-square fill-textHead mr-2" />,
    },
  ];

  const profileButtons: TProfileButton[] = [
    {
      link: "/Profile",
      name: t("navbar.my_profile"),
      icon: (
        <UserLinearIcon className=" h-[20px] aspect-square fill-textHead mr-2" />
      ),
    },
    {
      link: "/Profile/MyProducts",
      name: t("navbar.my_forms"),
      icon: (
        <DocumentsIcon className=" h-[20px] aspect-square stroke-textHead mr-2" />
      ),
    },
    {
      link: "ChangeDarkTheme",
      name: t("navbar.dark_mode"),
      icon: <MoonIcon className=" h-[20px] aspect-square fill-textHead mr-2" />,
    },
    {
      link: "/Profile/Settings",
      name: t("navbar.settings"),
      icon: (
        <SettingsIcon className=" h-[20px] aspect-square [&>path]:stroke-textHead mr-2" />
      ),
    },
    {
      link: "/Contact",
      name: t("navbar.contact"),
      icon: (
        <MessageIcon className=" h-[20px] aspect-square stroke-textHead mr-2" />
      ),
    },
    {
      link: "/Logout",
      name: t("navbar.log_out"),
      icon: (
        <LogoutIcon className=" h-[20px] aspect-square stroke-textHead mr-2" />
      ),
    },
  ];

  const popupBlock = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        popupBlock.current &&
        !popupBlock.current.contains(event.target) &&
        activePop == "profile"
      ) {
        setActivePop(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    if (activePop !== "profile") {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupBlock, activePop]);
  return (
    <div
      ref={popupBlock}
      className="h-[34px]  aspect-square rounded-circle bg-main p-[3px] flex justify-center items-center relative"
    >
      <div
        onClick={() =>
          setActivePop((state: string | null) =>
            state !== "profile" ? "profile" : null
          )
        }
        className="h-full border-2 border-whiteMain aspect-square rounded-circle bg-main select-none cursor-pointer "
      ></div>
      <div
        className={`absolute  overflow-hidden h-auto w-[230px] bg-navBg rounded-normal shadow-sectionShadow top-[60px] right-0 duration-200 transition-[opacity,visibility]  ${
          activePop == "profile" ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="px-6 pt-5  flex items-center">
          <div className="h-[34px]  aspect-square rounded-circle bg-main p-[3px] flex justify-center items-center relative">
            <div className="h-full border-2 border-whiteMain aspect-square rounded-circle bg-main select-none cursor-pointer "></div>
          </div>
          <div className=" flex flex-col ml-3">
            <p className="text-[13px] font-mainBold text-userName">
              {userData.name == "სტუმარი"
                ? i18n.language == "en"
                  ? "Guest"
                  : "სტუმარი"
                : userData.name}
            </p>
            <p className="text-[11px] font-mainBold text-userLastName">
              {userData.surname}
            </p>
          </div>
        </div>
        <p className="text-[12px] text-textDesc mt-3 text-center px-4">
          {t("global.balance")}
          {": "}
          <span className="text-main ml-1 font-mainBold">
            {(userData.money / 100)
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "₾"}
          </span>
        </p>
        <div className=" mx-auto my-2 mb-4 bg-lineBg h-[2px] w-[50px] rounded-md"></div>
        <div className="flex flex-col">
          {userData.isLogged
            ? profileButtons.map((e: TProfileButton, i: number) =>
                e.link !== "ChangeDarkTheme" ? (
                  <Link key={i} to={e.link} onClick={() => setActivePop(null)}>
                    <button className="w-full border-t border-lineBg px-5 py-[10px] text-textHead text-start text-[13px] tracking-wider flex items center transition-colors hover:bg-whiteHover">
                      {e.icon}
                      {e.name}
                    </button>
                  </Link>
                ) : (
                  <button
                    key={i}
                    onClick={() => dispatch(toggleDarkMode())}
                    className="w-full border-t border-lineBg px-5 py-[10px] text-textHead text-start text-[13px] tracking-wider flex items center transition-colors hover:bg-whiteHover"
                  >
                    {darkmode ? (
                      <SunIcon className=" h-[20px] aspect-square stroke-textHead mr-2" />
                    ) : (
                      e.icon
                    )}
                    {darkmode ? t("navbar.light_mode") : t("navbar.dark_mode")}
                  </button>
                )
              )
            : unloggedButtons.map((e: TProfileButton, i: number) =>
                e.link !== "ChangeDarkTheme" ? (
                  <Link key={i} to={e.link} onClick={() => setActivePop(null)}>
                    <button className="w-full border-t border-lineBg px-5 py-[10px] text-textHead text-start text-[13px] tracking-wider flex items center transition-colors hover:bg-whiteHover">
                      {e.icon}
                      {e.name}
                    </button>
                  </Link>
                ) : (
                  <button
                    key={i}
                    onClick={() => dispatch(toggleDarkMode())}
                    className="w-full border-t border-lineBg px-5 py-[10px] text-textHead text-start text-[13px] tracking-wider flex items center transition-colors hover:bg-whiteHover"
                  >
                    {darkmode ? (
                      <SunIcon className=" h-[20px] aspect-square stroke-textHead mr-2" />
                    ) : (
                      e.icon
                    )}
                    {darkmode ? t("navbar.light_mode") : t("navbar.dark_mode")}
                  </button>
                )
              )}
        </div>
      </div>
    </div>
  );
}

type TProfileButton = {
  name: string;
  icon: JSX.Element;
  link: string;
};
