import { Link } from "react-router-dom";
import {
  ClientContact,
  MediaFiles,
  Speedometer,
} from "../../assets/icons/Icons";
import {
  MaclerHouse1,
  MaclerHouse2,
  MaclerHouse3,
} from "../../assets/images/decorations/svg/Decorations";
import { Helmet } from "react-helmet";

type Tservice = {
  icon: JSX.Element;
  title: string;
  color: string;
};
export default function AgencyService() {
  const services: Tservice[] = [
    {
      icon: <ClientContact className="h-[30px] mobileTab:h-[22px]" />,
      title: "კლიენტთან მოლაპარაკება",
      color: "#3DBE00",
    },
    {
      icon: <MediaFiles className="h-[30px] mobileTab:h-[22px]" />,
      title: "სოციალურ ქსელებში განთავსება",
      color: "#3DBE00",
    },
    {
      icon: <Speedometer className="h-[30px] mobileTab:h-[22px] " />,
      title: "სწრაფი მომსახურება",
      color: "#3DBE00",
    },
    {
      icon: (
        <div className="h-[28px] mobileTab:h-[26px] mobileTab:text-[13px] mobileTab:w-[60px]  w-[80px] text-[14px] rounded-md bg-vipPlusI text-buttonText flex justify-center items-center">
          VIP+
        </div>
      ),
      title: "VIP+ სტატუსი",
      color: "#ff005c",
    },
  ];
  return (
    <>
      <Helmet>
        <meta
          name="description"
          lang="ka"
          content="OnHome - სახლები, აგარაკები, ბინები, კომერციული ფართები, სასტუმროები, მიწის ნაკვეთები, მიწები, ყიდვა, გაყიდვა, გაქირავება. "
        />
        <meta
          name="keywords"
          lang="ka"
          content="სააგენტო სერვისი, უძრავი ქონების გაყიდვა, თბილისი, ბინა, სახლი, აგარაკი, მიწის ნაკვეთი, სასტუმრო, კომერციული ფართი, იყიდება, გირავდება, ქირავდება, სამშენებლო კომპანია, სააგენტო, ახალაშენებული, მშენებარე, შავი კარკასი, თეთრი კარკასი, მწვანე კარკასი"
        />
        <meta name="theme-color" content="#3a86ff" />
        <link rel="canonical" href="https://onhome.ge/"></link>

        {/* Open Graph tags */}
        <meta
          property="og:title"
          lang="ka"
          content="სააგენტო სერვისი - onhome.ge"
        />

        <meta property="og:type" lang="ka" content="website" />
        <meta property="og:url" lang="ka" content="https://onhome.ge" />
        <meta property="og:site_name" content="OnHome" />
        <title>სააგენტოს სერვისი - OnHome</title>
      </Helmet>
      <main className=" mt-[30px]">
        <section className="flex items-center small:flex-col-reverse small:gap-y-20">
          <div className="">
            <h2 className="text-[28px] font-mainBold text-maclerMain mb-3 small:text-center mobileTab:text-[24px]">
              სააგენტოს სერვისი
            </h2>
            <p className=" text-textDesc text-[16px] tracking-wider max-w-[600px] small:text-center mobileTab:text-[16px] mobileTab:px-[5%] ">
              სერვისში გთავაზობთ დახმარებას თქვენი უძრავი ქონების
              გაყიდვა/გაქირავება -ში
            </p>
            <div className="flex flex-col gap-3 my-5 small:items-center">
              <div className="flex items-center text-textDesc gap-3">
                <div className="h-[14px] aspect-square rounded-circle border-2 border-maclerMain"></div>{" "}
                სოციალურ მედიაში განთავსება
              </div>
              <div className="flex items-center text-textDesc gap-3">
                <div className="h-[14px] aspect-square rounded-circle border-2 border-maclerMain"></div>{" "}
                პრიორიტეტული გამოჩენა (საიტზე)
              </div>
              <div className="flex items-center text-textDesc gap-3">
                <div className="h-[14px] aspect-square rounded-circle border-2 border-maclerMain"></div>{" "}
                მომხმარებლებთან მოლაპარაკება
              </div>
              <div className="flex items-center text-textDesc gap-3">
                <div className="h-[14px] aspect-square rounded-circle border-2 border-maclerMain"></div>{" "}
                სწრაფი მომსახურება
              </div>
            </div>
            <Link
              to={"/agencyChoose"}
              className="mt-5 block small:mx-auto   small:mt-8 w-min"
            >
              <button className="block  bg-maclerMain rounded-[5px] w-[190px] h-[40px] text-buttonText text-[15px] tracking-widest transition-colors hover:bg-maclerMainHover">
                დაწყება
              </button>
            </Link>
          </div>
          <div className="flex justify-center items-end maclerSideBorder ">
            <MaclerHouse3 className="h-[250px] large:h-[210px] mediumSmall:h-[110px] mobileTab:h-[120px] mobileSmall:h-[90px] translate-x-[40%]" />
            <MaclerHouse2 className="h-[230px] large:h-[200px] mediumSmall:h-[150px] mobileTab:h-[100px] mobileSmall:h-[80px] relative z-[1]" />
            <MaclerHouse1 className="h-[250px] large:h-[210px] mediumSmall:h-[110px] mobileTab:h-[120px] mobileSmall:h-[90px] translate-x-[-40%]" />
          </div>
        </section>
        <div className=" w-full rounded-section bg-whiteMain shadow-sectionShadow mt-[50px] p-3 px-5">
          <p className="text-maclerMain font-mainBold tracking-wider">
            მომსახურება
          </p>
          <p className="mt-2 text-textDesc text-[14px]">
            ჩვენ გთავაზობთ მომსახურებას და დახმარებას თქვენი უძრავი ქონების
            სწრაფად გაყიდვა/გაქირავება ში, სერვისში შედის:
          </p>
          <div className="flex justify-center gap-10 items-center mt-7 mb-3 flex-wrap">
            {services.map((e: Tservice, i: number) => (
              <div key={i} className="flex items-center gap-3">
                {e.icon}{" "}
                <p
                  className="text-[15px] mobileTab:text-[14px]"
                  style={{ color: e.color }}
                >
                  {e.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
