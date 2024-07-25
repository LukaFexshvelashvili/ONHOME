import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function UploadProgressBar() {
  const { t } = useTranslation();
  const [percentages, setPercentages] = useState(0);
  useEffect(() => {
    setPercentages(10);
  }, []);

  useEffect(() => {
    let timeout: any = null;
    let timer: any = null;

    if (percentages < 90) {
      timer = setInterval(() => {
        setPercentages((prevState) => {
          if (prevState + 30 >= 95) {
            clearInterval(timer!); // Stop the interval if 90% or more
            return 95; // Ensure we set to 90
          }
          return prevState + 35;
        });
      }, 1400);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (timeout) clearTimeout(timeout);
    };
  }, [percentages]);

  return (
    <div className="h-[150px] w-full flex flex-col gap-6 justify-center items-center">
      <h1 className="  tracking-wider text-main">{t("publishing")}</h1>
      <div className="h-[40px] w-full rounded-lg bg-whiteLoad relative overflow-hidden">
        <div
          className="absolute greenAnim h-full left-0 transition-transform duration-700 ease-in-out w-full scale-x-0 origin-left"
          style={{ transform: `scaleX(${percentages / 100})` }}
        ></div>
      </div>
    </div>
  );
}
