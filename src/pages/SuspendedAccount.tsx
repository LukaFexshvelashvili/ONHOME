import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PhoneFIlledIcon } from "../assets/icons/Icons";
import HoverTitle from "../components/global/HoverTitle";
import { FacebookIcon, InstagramIcon } from "../components/popups/SharePopup";

export default function SuspendedAccount() {
  const navigate = useNavigate();
  const userData = useSelector((store: RootState) => store.user);
  useEffect(() => {
    if (userData.banned == 0 || !userData.isLogged) {
      navigate("/");
    }
  }, []);

  return (
    <div className="text-textHead h-screen min-h-[300px] text-center flex flex-col justify-center items-center text-[16px]">
      <p>
        გამარჯობა {userData.name}, <br /> თქვენი ანგარიში (ID - {userData.id})
        დაიბლოკა <span className="text-redI ">საეჭვო აქტივობების</span> გამო{" "}
        <br />
        <p className="my-4">მოგვწერეთ დახმარებისთვის</p>
        <div className="flex items-center gap-5 flex-wrap justify-center mb-5">
          <Link
            to={"tel:+995562605605"}
            className="relative  group flex items-center justify-center h-[50px] aspect-square text-[15px] mobile:text-[14px] tracking-wider font-mainBold max-w-[400px] rounded-lg bg-greenI text-greenI  "
          >
            <PhoneFIlledIcon className="h-[21px] aspect-square [&>path]:fill-buttonText [&>path]:transition-opacity  " />
            <HoverTitle title="დარეკვა" />
          </Link>
          <Link
            to={"https://www.facebook.com/profile.php?id=61561368268186"}
            className="relative group  flex items-center justify-center h-[50px] aspect-square text-[15px] mobile:text-[14px] tracking-wider font-mainBold  rounded-lg bg-blueI text-blueI  "
          >
            <FacebookIcon className="h-[23px] aspect-square [&>path]:fill-buttonText [&>path]:transition-opacity  " />
            <HoverTitle title="facebook" />
          </Link>
          <Link
            to={"https://www.instagram.com/onhomege/"}
            className="relative  group  bg-gradient-to-bl from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center h-[50px] aspect-square text-[15px] mobile:text-[14px] tracking-wider font-mainBold  rounded-lg bg-pinkI text-pinkI "
          >
            <InstagramIcon className="h-[23px] aspect-square [&>g]:stroke-buttonText [&>g]:transition-opacity " />
            <HoverTitle title="instagram" />
          </Link>
        </div>
        ან{" "}
        <Link to={"/Logout"} className="cursor-pointer text-main underline">
          გადით ანგარიშიდან
        </Link>
      </p>
    </div>
  );
}
