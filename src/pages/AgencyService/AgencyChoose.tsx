import { LoginEyeIcon } from "../../assets/icons/Icons";
import { useEffect, useRef, useState } from "react";
import axiosCall, { image_url_start } from "../../hooks/axiosCall";
import { TProductData } from "../Profile/components/MyProducts";
import { sendMaclerRequest } from "../../hooks/serverProductFunctions";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FormatTime } from "../../components/global/Addons";

export default function MaclerChoose() {
  const userData = useSelector((store: RootState) => store.user);
  const navigate = useNavigate();
  const firstRender = useRef(true);
  const [productId, setProductId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ status: number }>({ status: -1 });
  const [myProducts, setMyProducts] = useState<any[]>([]);
  if (userData.isLogged === false) {
    navigate("/Login");
  }
  const maclerRequest = () => {
    if (productId) {
      sendMaclerRequest(userData, productId, 1000).then((res) =>
        setMessage({ status: res })
      );
    }
  };
  useEffect(() => {
    if (firstRender.current) {
      if (userData.id) {
        axiosCall
          .get("fetch/my_products?user_id=" + userData.id, {
            withCredentials: true,
          })
          .then((res) => {
            res.data && setMyProducts(res.data);
          });
        firstRender.current = false;
      }
    }
  }, [userData.id]);

  return (
    <>
      <Helmet>
        <title>განცხადების არჩევა - სააგენტო სერვისი</title>
      </Helmet>
      <main className="min-h-screen mt-[30px]">
        {message.status !== -1 && (
          <div className="fixed w-full h-full top-0 left-0 z-10 flex justify-center items-center">
            <div
              onClick={() => setMessage({ status: -1 })}
              className="absolute top-0 left-0 w-full h-full  bg-[rgba(0,0,0,0.4)]  z-[5]"
            >
              {" "}
            </div>
            <div className=" w-[650px] rounded-section bg-whiteMain p-5 relative z-10  max-w-[90%]">
              {message.status == 100 ? (
                <div className="w-[550px] mx-auto">
                  <h2 className="text-maclerMain font-mainBold text-center text-[18px]  mb-4">
                    მოთხოვნა წარმატებით გაიგზავნა
                  </h2>
                  <p className="text-textDesc  text-center text-[14px] mt-2">
                    სააგენტოს სერვისის მოთხოვნა განცხადებაზე #{productId}
                  </p>
                  <p className="text-textDesc  text-center text-[14px] ">
                    სერვისის დადასტურების შემთხვევაში დაგიკავშირდებით თქვენი
                    ანგარიშის ნომერზე
                  </p>
                  <Link
                    to={"/Profile/MyProducts"}
                    className="block w-min mx-auto"
                  >
                    <button className="bg-maclerMain text-[14px] h-[35px] w-[200px] text-buttonText tracking-wider rounded-md mx-auto block mt-6  transition-colors hover:bg-maclerMainHover">
                      გასაგებია
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="w-[550px] mx-auto  max-w-[100%] ">
                  <h2 className="text-redI font-mainBold text-center text-[18px]  mb-4">
                    წარმოიშვა შეცდომა შეცდომა
                  </h2>
                  <p className="text-textDesc  text-center text-[14px] mt-2">
                    სერვისი ამჟამად მიუწვდომელია
                  </p>
                  <p className="text-textDesc  text-center text-[14px] ">
                    სცადეთ მოგვიანებით
                  </p>
                  <button
                    onClick={() => setMessage({ status: -1 })}
                    className="bg-redI text-[14px] h-[35px] w-[200px] text-buttonText tracking-wider rounded-md mx-auto block mt-6  transition-colors hover:bg-redCloseI"
                  >
                    გასაგებია
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="bg-whiteMain rounded-section shadow-sectionShadow">
          {productId == null ? (
            <>
              <div className="p-4">
                <h1 className="text-[18px] text-maclerMain  font-mainBold">
                  სააგენტოს სერვისი - აირჩიეთ განცხადება{" "}
                </h1>
                <p className="text-[15px] text-textDesc mt-4 ">
                  თქვენი განცხადებები
                </p>
              </div>
              {myProducts.length > 0
                ? myProducts.map((e: TProductData) => (
                    <ProductBannerMacler
                      key={e.id}
                      productData={e}
                      setProduct={setProductId}
                    />
                  ))
                : null}{" "}
            </>
          ) : (
            <>
              <div className="p-4">
                <h1 className="text-[18px] text-maclerMain  font-mainBold">
                  სააგენტოს სერვისი - შეთანხმება
                </h1>
                <div className="bg-maclerMainClear rounded-xl [&>div]:border-none mt-[30px]">
                  <ProductBannerMacler
                    productData={
                      myProducts.filter(
                        (product: TProductData) => product.id == productId
                      )[0]
                    }
                    setProduct={setProductId}
                    setOff
                  />
                </div>
                <p className="text-textHead  mt-[30px] mb-[20px]">
                  უძრავი ქონების ფასი
                </p>
                <div className="flex items-center gap-[30px] mobile:flex-col-reverse">
                  <div className="flex flex-col flex-1 gap-8  mobile:w-full">
                    <div className="px-5 flex flex-col  gap-3">
                      <div className="w-full h-10 bg-maclerMain flex justify-center items-center text-buttonText tracking-widest rounded-lg">
                        86 000$
                      </div>
                      <div className="flex justify-between my-3 mb-5">
                        <p className="text-maclerMain">სერვისი</p>
                        <p className="text-maclerMain">-1 000$</p>
                      </div>
                      <div className="w-full h-[1px] bg-maclerMain rounded-md"></div>
                      <p className="w-full text-maclerMain text-center">
                        გაყიდვის შემოსავალი
                      </p>
                      <p className="w-full text-maclerMain text-center">
                        85 000$
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="bg-maclerMainClear rounded-section p-4 px-5">
                      <p className="text-center text-maclerMain font-mainBold">
                        სერვისის პირობები
                      </p>
                      <div className="flex flex-col gap-3 mt-5">
                        <p className=" text-[14px] text-maclerMain font-mainBold">
                          წინასწარი შენატანის გარეშე
                        </p>
                        <p className=" text-[14px] text-maclerMain font-mainBold">
                          სერვისის გააქტიურების შემდეგ ადმინი გადახედავს
                          განცხადებას და{" "}
                          <span className="text-main underline cursor-pointer">
                            კრიტერიუმების
                          </span>{" "}
                          მიხედვით დაადასტურებს მას
                        </p>
                        <p className=" text-[14px] text-maclerMain font-mainBold">
                          სერვისის საფასურს უძრავი ქონების გარიგების დასრულების
                          შემდეგ იხდით (თუ ჩვენი დახმარებით გაყიდეთ უძრავი
                          ქონება)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={maclerRequest}
                  className="bg-maclerMain text-[14px] h-[36px] w-[220px] text-buttonText tracking-wider font-mainMedium rounded-md mx-auto block mt-8 mb-2 transition-colors hover:bg-maclerMainHover"
                >
                  სერვისის მოთხოვნა
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

function ProductBannerMacler(props: {
  setProduct: Function;
  setOff?: boolean;
  productData: TProductData;
}) {
  return (
    <div className=" w-full border-t-[2px] border-lineBg py-5 px-4 flex items-center  mobile:flex-col">
      <div className="w-[170px] h-[100px] rounded-lg bg-whiteLoad relative overflow-hidden mobile:w-[100%] mobile:aspect-video mobile:h-auto">
        <div className="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.1)] z-[2]"></div>
        <img
          src={image_url_start + props.productData.estate_active_image}
          className="absolute h-full w-full object-cover  top-0 left-0"
        />
      </div>
      <div className="flex flex-col ml-3 h-full relative  mobile:w-full mobile:mt-3 mobile:h-auto">
        <h3 className="text-[15px] mb-[2px] text-textHeadBlack">
          {props.productData.estate_title}
        </h3>
        <p className="text-[13px] text-textDesc">
          განახლდა:{" "}
          <span className="text-[13px] text-textHeadBlack">
            {FormatTime(props.productData.update_time.toString())}
          </span>
        </p>
        <p className="text-[13px] text-textDesc">
          ვადა:{" "}
          <span className="text-[13px] text-textHeadBlack">
            {FormatTime(props.productData.update_time.toString())}
          </span>
        </p>
        <div className="flex items-center gap-5 mt-3">
          <p className="flex items-center text-[13px] text-textDesc gap-1">
            <LoginEyeIcon className="h-4 aspect-square [&>path]:fill-textDesc" />{" "}
            {props.productData.views}
          </p>
          <p className="text-[13px] text-textDesc">
            ID - {props.productData.id}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 ml-auto mobile:mx-auto">
        {props.productData.macler_status === 0 ? (
          props.setOff == null ? (
            <button
              className="bg-maclerMain mobile:mt-5  text-buttonText h-[35px] w-[180px] rounded-md text-[13px] font-mainBold tracking-wide transition-colors hover:bg-maclerMainHover"
              onClick={() => props.setProduct(props.productData.id)}
            >
              არჩევა
            </button>
          ) : (
            <button
              className="bg-whiteMain text-maclerMain mobile:mt-5  h-[35px] w-[180px] rounded-md text-[13px] font-mainBold tracking-wide transition-colors hover:bg-whiteHover"
              onClick={() => props.setProduct(null)}
            >
              არჩეული
            </button>
          )
        ) : props.productData.macler_status == 1 ? (
          <button className="bg-maclerMainClear pointer-events-none mobile:mt-5  text-maclerMain h-[35px] w-[200px] rounded-md text-[13px] font-mainBold tracking-wide">
            მოთხოვნა გაგზავნილია
          </button>
        ) : props.productData.macler_status == 2 ? (
          <button className="bg-redClear pointer-events-none mobile:mt-5  text-redI h-[35px] w-[220px] rounded-md text-[13px] font-mainMedium tracking-wider">
            მოთხოვნა უარყოფილია
          </button>
        ) : props.productData.macler_status == 3 ? (
          <button className="bg-maclerMainClear pointer-events-none mobile:mt-5  text-maclerMain h-[35px] w-[240px] rounded-md text-[13px] font-mainBold tracking-wide">
            მოთხოვნა დადასტურებულია
          </button>
        ) : null}
      </div>
    </div>
  );
}
