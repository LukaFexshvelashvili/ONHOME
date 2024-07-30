import { Link } from "react-router-dom";
import WebIcon from "../../assets/icons/WebIcon";

export default function AuthenticationHeader() {
  return (
    <div className="h-[70px] w-full absolute   bg-transparent flex items-center top-0 z-10">
      <div className="login_container flex justify-between">
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="flex items-center gap-[6px]"
        >
          <WebIcon className="h-[30px] aspect-square" />
          <div className=" rounded-[3px] cursor-pointer text-textHead font-mainBoldLg text-[16px] tracking-[2px]">
            <span className="text-main ">ON</span>HOME
          </div>
        </Link>
        {/* <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="flex items-center gap-3"
        >
          <div className=" h-[32px] w-[140px] flex justify-center items-center bg-gradient-to-tr from-main to-mainHover rounded-[5px] mobile:h-[30px] mobile:w-[130px]  cursor-pointer text-buttonText font-logoBold text-[18px] font-thin  tracking-[2.5px] [text-shadow:_2px_2px_10px_rgb(0_0_0_/_10%)] ">
            ONHOME
          </div>
        </Link> */}
      </div>
    </div>
  );
}
