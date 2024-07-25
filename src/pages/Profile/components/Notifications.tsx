import { useEffect, useState } from "react";
import { Tnotification } from "../../../assets/types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosCall from "../../../hooks/axiosCall";
import { updateNotifications } from "../../../store/data/userSlice";
import { Helmet } from "react-helmet";
import { t } from "i18next";

export default function Notifications() {
  const userNotifications = useSelector(
    (store: RootState) => store.user.notifications
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeMessage, setActiveMessage] = useState<number>(-1);
  const [notifications, setNotifications] = useState<Tnotification[]>([]);
  const params = useParams();
  useEffect(() => {
    setNotifications(userNotifications);
  }, [userNotifications]);
  useEffect(() => {
    if (params.id !== undefined) {
      setActiveMessage(parseInt(params.id));

      let data: Tnotification | undefined = userNotifications.filter(
        (data) => data.id == parseInt(params.id ? params.id : "-5")
      )[0];

      if (data == undefined) {
        navigate("/Profile/Notifications/");
        setActiveMessage(-1);
      }
    }
  }, [params]);

  return (
    <>
      <Helmet>
        <title>{t("navbar.notifications")} - OnHome</title>
      </Helmet>
      <div className=" rounded-section shadow-sectionShadow bg-whiteMain relative flex overflow-hidden mobile:flex-col">
        {notifications.length > 0 ? (
          <>
            <div className=" notificationList w-5/12 border-r-2 border-whiteHover h-[520px] max-h-[520px] overflow-x-hidden mobile:w-full mobile:h-min mobile:min-h-[50px]">
              {notifications.map((e: Tnotification) => (
                <NotificationBlock
                  dispatch={dispatch}
                  key={e.id}
                  data={e}
                  activeMessage={activeMessage}
                  setActiveMessage={setActiveMessage}
                />
              ))}
            </div>
            <NotificationsData
              notifications={notifications}
              activeMessage={activeMessage}
            />
          </>
        ) : (
          <div className="flex justify-center items-center w-full text-textDesc px-3 py-7">
            {t("navbar.there_are_no_messages")}
          </div>
        )}
      </div>
    </>
  );
}

function NotificationsData({
  activeMessage,
  notifications,
}: {
  activeMessage: number;
  notifications: Tnotification[];
}) {
  const data: Tnotification = notifications.filter(
    (data) => data.id == activeMessage
  )[0];
  return (
    <div className=" px-7 py-5 w-7/12 flex justify-center items-center text-textDesc min-h-[400px] mobile:min-h-[0px] mobile:w-full">
      {activeMessage == -1 ? (
        <>{t("global.choose_notification")}</>
      ) : (
        <div className="flex flex-col gap-3 text-center">
          <h1 className=" text-[16px] text-textHead">{data.title}</h1>
          <h4 className=" text-[14px] text-textDesc">{data.description}</h4>

          {data.link ? (
            <Link to={data.link}>
              <button className=" mt-[30px] bg-main rounded-[5px] w-[180px] h-[38px] font-mainBold text-buttonText text-[13px] tracking-widest block mx-auto transition-colors hover:bg-mainHover">
                {t("global.see_link")}
              </button>
            </Link>
          ) : null}
        </div>
      )}
    </div>
  );
}

function NotificationBlock({
  dispatch,
  data,
  activeMessage,
  setActiveMessage,
}: {
  dispatch: Function;
  data: Tnotification;
  activeMessage: number;
  setActiveMessage: Function;
}) {
  useEffect(() => {
    if (data.seen == false && activeMessage == data.id) {
      axiosCall
        .get("/set_notifications?notification_id=" + data.id, {
          withCredentials: true,
        })
        .then((res) => {
          let updatedNotifications: Tnotification[] = res.data;
          dispatch(updateNotifications(updatedNotifications));
        });
    }
  }, [activeMessage]);

  return (
    <Link to={"/Profile/Notifications/" + data.id}>
      <div
        className={`px-3 py-5 h-[65px] w-full cursor-pointer ${
          activeMessage == data.id ? "bg-whiteHover" : "bg-transparent"
        }  transition-colors hover:bg-whiteHover flex items-center relative select-none`}
        onClick={() => setActiveMessage(data.id)}
      >
        <div className="h-8 aspect-square rounded-lg bg-main"></div>
        <div className="flex flex-col ml-3">
          <p className="w-[99%] text-nowrap overflow-hidden text-ellipsis text-[12px] text-textHead font-mainBold">
            {" "}
            {data.title.slice(0, 24)}
          </p>
          <p className="w-[99%] text-nowrap overflow-hidden text-ellipsis text-[10px] text-textDesc font-mainBold">
            {data.description.slice(0, 42)}
          </p>
        </div>
        {data.seen ? null : (
          <div className="absolute h-[10px] aspect-square rounded-circle bg-main right-3"></div>
        )}
      </div>
    </Link>
  );
}
