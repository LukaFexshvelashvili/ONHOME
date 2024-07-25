import { useNavigate, useParams } from "react-router-dom";
import { TClosePlace, closePlacesList } from "../../assets/lists/closePlaces";
import {
  TProductAddon,
  productAddonsList,
  productAddonsListForHotel,
  productAddonsListForLand,
} from "../../assets/lists/productAddons";
import CardSlider from "../../components/global/CardSlider";
import ImageSlider from "./components/ImageSlider";
import ProductSideBar from "./components/ProductSideBar";
import { useLayoutEffect, useRef, useState } from "react";
import axiosCall from "../../hooks/axiosCall";
import ContentLoader from "../../components/global/ContentLoader";
import { TProductData } from "../Profile/components/MyProducts";
import { useDispatch } from "react-redux";
import { productView } from "../../hooks/serverProductFunctions";
import { TProductCard } from "../../components/global/Card";
import { AdBanner3 } from "../../components/global/AdComponents";
import { setWebLoader } from "../../store/data/webUISlice";
import {
  getProductCache,
  setProductCache,
} from "../../components/cache/cacheFunctions";
import { Helmet } from "react-helmet";
import { t } from "i18next";

export type TproductPage = {
  productData: TProductData;
  sameProducts: TProductCard[];
  userData: { id: number; name: string; surname: string; mobile: string };
};

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState<null | TproductPage>(null);

  const makeRefresh = useRef({ id: id, refresh: true });
  useLayoutEffect(() => {
    dispatch(setWebLoader({ active: true }));
    if (
      ((makeRefresh.current.id == id && makeRefresh.current.refresh == true) ||
        makeRefresh.current.id !== id) &&
      id
    ) {
      makeRefresh.current.id = id;
      makeRefresh.current.refresh = false;

      getProductCache(id).then((res) => {
        if (res !== null) {
          setPageData(res);
          dispatch(setWebLoader({ active: false }));
        } else {
          axiosCall
            .post(
              "fetch/product",
              {
                product_id: id,
                product_view: productView(dispatch, parseInt(id)),
              },
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            )
            .then((res) => {
              if (res.data.product_data == null) {
                dispatch(setWebLoader({ active: false }));
                navigate("/");
                return;
              } else {
                if (res.data.status === 100) {
                  let saveData = {
                    productData: res.data.product_data,
                    userData: res.data.user_data,
                    sameProducts: res.data.same_products,
                  };
                  setPageData(saveData);
                  setProductCache(id, saveData);
                } else {
                  dispatch(setWebLoader({ active: false }));

                  navigate("/");
                  return;
                }
              }
              dispatch(setWebLoader({ active: false }));
            });
        }
      });
    }
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{pageData?.productData.estate_title}</title>
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
      <main className="min-h-screen">
        {pageData === null || !pageData.productData.id ? (
          <ContentLoader />
        ) : (
          <>
            <section className="medium:flex-col flex gap-[36px] medium:gap-5 mobile:gap-3">
              <ImageSlider productData={pageData.productData} />
              <ProductSideBar pageData={pageData} />
            </section>
            <section className="flex gap-[36px] mt-6  small:flex-col medium:mt-3 medium:gap-3">
              <div className="flex-[2] flex flex-col gap-3">
                <div className=" rounded-block bg-whiteMain p-4">
                  <p className=" text-[15px] font-mainBold text-textHeadCard">
                    {t("product.description")}
                  </p>
                  <p className=" text-[14px] font-mainSemiBold text-textDescCard leading-[23px] mt-2 tracking-normal">
                    {pageData.productData.estate_description &&
                    pageData.productData.estate_description !== "null"
                      ? pageData.productData.estate_description.slice(0, 600)
                      : t("product.no_description")}
                  </p>
                  {pageData.productData.estate_ipcode !== "null" && (
                    <p className="text-[14px] font-mainSemiBold text-textDesc leading-[23px] mt-2 tracking-normal">
                      {t("product.cadastral_code")}:{" "}
                      <span className="text-main underline cursor-pointer">
                        {" "}
                        {pageData.productData.estate_ipcode}
                      </span>
                    </p>
                  )}
                </div>
                <div className=" rounded-block bg-whiteMain p-4">
                  <p className=" text-[15px] font-mainBold text-textHeadCard">
                    {t("product.more_info")}
                  </p>
                  <div className="flex items-start justify-center gap-3 flex-col flex-wrap max-h-[150px] my-[25px] pl-5 medium:max-h-none medium:flex-row ">
                    {JSON.parse(pageData.productData.estate_addons) !== null
                      ? pageData.productData.estate_type == 3
                        ? productAddonsListForLand().map(
                            (item: TProductAddon, i: number) => (
                              <div
                                key={i}
                                className={`flex items-center ${
                                  JSON.parse(
                                    pageData.productData.estate_addons
                                  ).includes(i)
                                    ? "opacity-100"
                                    : "opacity-20 line-through decoration-blackMain"
                                } `}
                              >
                                {item.icon("h-[20px]")}{" "}
                                <p className="text-Asmall ml-2 text-textDesc">
                                  {" "}
                                  {item.name}
                                </p>
                              </div>
                            )
                          )
                        : pageData.productData.estate_type == 4
                        ? productAddonsListForHotel().map(
                            (item: TProductAddon, i: number) => (
                              <div
                                key={i}
                                className={`flex items-center ${
                                  JSON.parse(
                                    pageData.productData.estate_addons
                                  ).includes(i)
                                    ? "opacity-100"
                                    : "opacity-20 line-through decoration-blackMain"
                                } `}
                              >
                                {item.icon("h-[20px]")}{" "}
                                <p className="text-Asmall ml-2 text-textDesc">
                                  {" "}
                                  {item.name}
                                </p>
                              </div>
                            )
                          )
                        : productAddonsList().map(
                            (item: TProductAddon, i: number) => {
                              if (
                                pageData.productData.estate_type !== 0 &&
                                item.name == t("addons.sewage")
                              ) {
                                return null;
                              }
                              return (
                                <div
                                  key={i}
                                  className={`flex items-center ${
                                    JSON.parse(
                                      pageData.productData.estate_addons
                                    ).includes(i)
                                      ? "opacity-100"
                                      : "opacity-20 line-through decoration-blackMain"
                                  } `}
                                >
                                  {item.icon("h-[20px]")}{" "}
                                  <p className="text-Asmall ml-2 text-textDesc">
                                    {" "}
                                    {item.name}
                                  </p>
                                </div>
                              );
                            }
                          )
                      : null}
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-3  small:flex-col-reverse ">
                <AdBanner3 />
                <div className=" rounded-block bg-whiteMain p-4">
                  <p className=" text-[15px] font-mainBold text-textHeadCard">
                    {t("product.close_places")}
                  </p>
                  <div className="flex gap-3 flex-wrap mt-5 mobile:justify-center">
                    {JSON.parse(pageData.productData.estate_close_places) !==
                    null
                      ? closePlacesList().map((item: TClosePlace, i: number) =>
                          JSON.parse(
                            pageData.productData.estate_close_places
                          ).includes(i) ? (
                            <div
                              className="h-[35px] px-4 flex items-center rounded-md "
                              style={{ backgroundColor: item.bgColor }}
                              key={i}
                            >
                              {item.icon("h-[24px]")}{" "}
                              <p
                                className="ml-2 text-Asmall font-mainMedium tracking-widest"
                                style={{ color: item.color }}
                              >
                                {" "}
                                {item.name}
                              </p>
                            </div>
                          ) : null
                        )
                      : null}
                  </div>
                </div>
              </div>
            </section>
            <div className="mt-5">
              {pageData.sameProducts && (
                <>
                  <p className="p-2 text-[16px] font-mainBold text-textHeadCard mb-1">
                    {t("product.similar_forms")}
                  </p>

                  <CardSlider products={pageData.sameProducts} />
                </>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}
