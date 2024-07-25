import { memo, useCallback, useEffect, useRef, useState } from "react";
import ProductBanner from "./ProductBanner";
import Buypopup from "./Buypopup";
import axiosCall from "../../../hooks/axiosCall";
import { Link } from "react-router-dom";
import ContentLoader from "../../../components/global/ContentLoader";
import PopAlertBlock from "../../../components/PopAlertBlock";
import { Tuser } from "../../../store/data/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Helmet } from "react-helmet";
import PopEditBlock from "./components/PopEditBlock";
import { t } from "i18next";

export type TProductData = {
  id: number;
  user_id: number;
  estate_title: string;
  estate_description: string;
  estate_type: number;
  estate_deal: number;
  estate_status: string;
  estate_city: string;
  estate_district: string;
  estate_urban: string;
  estate_exact_address: string;
  estate_ipcode: string;
  estate_size: number;
  estate_land_size: number;
  estate_project: number;
  estate_condition: number;
  estate_floor: number;
  estate_floors: number;
  estate_rooms: number;
  estate_bedrooms: number;
  estate_bathrooms: number;
  estate_price: number;
  estate_sale: number;
  estate_addons: string;
  estate_close_places: string;
  estate_currency: number;
  estate_vip: number;
  estate_vip_expire: string;
  estate_active_image: string;
  estate_images: string;
  views: number;
  created_time: string;
  update_time: string;
  expire_time: string;
  product_status: number;
  macler_status: number;
  banned: number;
};

type TAlertPop = {
  open: boolean;
  headText: string;
  descText: string;
  nextFunction: Function;
};

function MyProducts() {
  const [popbuy, setPopbuy] = useState<{ id: null | number }>({ id: null });
  const [choice, setChoice] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [editBlock, setEditBlock] = useState<{
    id: number | null;
    productData: TProductData | null;
  }>({ id: null, productData: null });

  const [myProducts, setMyProducts] = useState<any[] | null>(null);
  const [popAlert, setPopAlert] = useState<TAlertPop>({
    open: false,
    headText: "",
    descText: "",
    nextFunction: () => {},
  });
  const userData: Tuser = useSelector((store: RootState) => store.user);
  const saveProducts = useRef<any>(null);
  const refresh = useRef<boolean>(true);
  const fetchProducts = useCallback(() => {
    axiosCall
      .get("fetch/my_products?user_id=" + userData.id, {
        withCredentials: true,
      })
      .then((res) => {
        res.data &&
          setMyProducts(
            res.data.filter(
              (item: TProductData) => item.product_status == choice
            )
          );
        saveProducts.current = res.data.reverse();
      });
  }, []);
  useEffect(() => {
    if (refresh.current) {
      fetchProducts();
      refresh.current = false;
    }
  }, []);
  useEffect(() => {
    if (saveProducts.current !== null) {
      if (choice == 2) {
        setMyProducts(
          saveProducts.current.filter((item: TProductData) => item.banned == 1)
        );
      } else if (choice !== choices.length - 1) {
        setMyProducts(
          saveProducts.current.filter(
            (item: TProductData) =>
              item.product_status == choice && item.banned == 0
          )
        );
      } else {
        setMyProducts(
          saveProducts.current.filter(
            (item: TProductData) => item.macler_status !== 0 && item.banned == 0
          )
        );
      }
    }
  }, [choice, saveProducts.current]);

  const choices: string[] = [
    `${t("my_products.active")} (${
      saveProducts.current
        ? saveProducts.current.filter(
            (item: TProductData) => item.product_status == 0 && item.banned == 0
          ).length
        : ""
    })`,
    `${t("my_products.hidden")} (${
      saveProducts.current
        ? saveProducts.current.filter(
            (item: TProductData) => item.product_status == 1 && item.banned == 0
          ).length
        : ""
    })`,
    `${t("my_products.blocked")} (${
      saveProducts.current
        ? saveProducts.current.filter((item: TProductData) => item.banned == 1)
            .length
        : ""
    })`,
    `${t("my_products.agency_requests")} (${
      saveProducts.current
        ? saveProducts.current.filter(
            (item: TProductData) => item.macler_status !== 0 && item.banned == 0
          ).length
        : ""
    })`,
  ];

  return (
    <>
      <Helmet>
        <title>{t("my_products.my_forms")} - OnHome</title>
      </Helmet>
      {editBlock.id && editBlock.productData ? (
        <PopEditBlock
          fetchProducts={fetchProducts}
          productData={editBlock.productData}
          close={() => setEditBlock({ id: null, productData: null })}
        />
      ) : null}
      {popAlert.open ? (
        <PopAlertBlock
          close={() =>
            setPopAlert({
              open: false,
              headText: "",
              descText: "",
              nextFunction: () => {},
            })
          }
          headText={popAlert.headText}
          descText={popAlert.descText}
          nextFunction={popAlert.nextFunction}
        />
      ) : null}{" "}
      {popbuy.id !== null ? (
        <Buypopup
          setPopbuy={setPopbuy}
          popbuy={popbuy}
          fetchProducts={fetchProducts}
        />
      ) : null}
      <div className=" rounded-section text-textHead shadow-sectionShadow bg-whiteMain relative flex px-7 py-5 flex-col gap-3  mobile:px-3">
        <h1 className="mobileSmall:text-[14px] mobile:text-center">
          {t("my_products.my_forms")}
        </h1>
        <div className="flex gap-3 items-center flex-wrap mobile:justify-center">
          {choices.map((e: string, i: number) =>
            i !== choices.length - 1 ? (
              <button
                key={i}
                onClick={() => setChoice(i)}
                className={`px-4 py-2 transition-colors rounded-lg text-[14px]  ${
                  choice == i
                    ? "text-buttonText bg-main"
                    : "text-main bg-mainClear"
                }`}
              >
                {e}
              </button>
            ) : (
              <button
                key={i}
                onClick={() => setChoice(i)}
                className={`px-4 py-2 transition-colors rounded-lg text-[14px]  ${
                  choice == i
                    ? "text-buttonText bg-maclerMain"
                    : "text-maclerMain bg-maclerMainClear"
                }`}
              >
                {e}
              </button>
            )
          )}
        </div>
        <input
          type="text"
          placeholder={t("my_products.search")}
          className=" text-[14px] h-[40px] w-full bg-LoginInput outline-none rounded-lg px-4 transition-colors focus:bg-LoginInputActive"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className=" rounded-section shadow-sectionShadow bg-whiteMain relative flex  py-2 flex-col gap-3 min-h-[200px]">
        {myProducts === null && <ContentLoader />}
        {myProducts && search.length == 0 ? (
          myProducts.length !== 0 && (
            <p className="px-4 text-[13px] text-textDesc my-1">
              {t("my_products.found")} {myProducts.length}{" "}
              {t("my_products.form")}
            </p>
          )
        ) : myProducts &&
          myProducts.filter(
            (item: TProductData) =>
              item.id.toString().includes(search) ||
              item.estate_title.includes(search)
          ).length !== 0 ? (
          <p className="px-4 text-[13px] text-textDesc my-1">
            {t("my_products.found")}{" "}
            {
              myProducts.filter(
                (item: TProductData) =>
                  item.id.toString().includes(search) ||
                  item.estate_title.includes(search)
              ).length
            }{" "}
            {t("my_products.form")}
          </p>
        ) : (
          <p className="px-4 text-[13px] text-textDesc my-1">
            {t("my_products.no_form_found")}
          </p>
        )}
        <div className="flex flex-col  max-h-[550px] overflow-hidden overflow-y-auto">
          {search.length == 0 ? (
            myProducts && myProducts.length !== 0 ? (
              myProducts.map((e: TProductData) => (
                <ProductBanner
                  key={e.id}
                  setPopbuy={setPopbuy}
                  productData={e}
                  setPopAlert={setPopAlert}
                  userData={userData}
                  fetchProducts={fetchProducts}
                  setEditBlock={setEditBlock}
                />
              ))
            ) : myProducts && myProducts.length === 0 ? (
              choice !== choices.length - 1 ? (
                <div>
                  <p className="px-4 text-[15px] text-textDesc my-2 text-center">
                    {t("my_products.no_form_found")}
                  </p>
                  <div className="flex justify-center my-3 mt-5">
                    <Link to={"/addProduct"} className=" rounded-lg">
                      <button className=" block text-buttonText bg-main rounded-lg text-[14px] px-4 py-2 tracking-wide">
                        {t("my_products.add_form")}
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="px-4 text-[15px] text-textDesc my-2 text-center">
                    {t("my_products.no_request_found")}
                  </p>
                  <div className="flex justify-center my-3 mt-5">
                    <Link to={"/agencyChoose"} className=" rounded-lg">
                      <button className=" block text-buttonText bg-maclerMain rounded-lg text-[14px] px-4 py-2 tracking-wide">
                        {t("my_products.send_request")}
                      </button>
                    </Link>
                  </div>
                </div>
              )
            ) : null
          ) : null}
          {search.length !== 0 &&
            myProducts &&
            myProducts
              .filter(
                (item: TProductData) =>
                  item.id.toString().includes(search) ||
                  item.estate_title.includes(search)
              )
              .map((e: TProductData) => (
                <ProductBanner
                  key={e.id}
                  setPopbuy={setPopbuy}
                  productData={e}
                  setPopAlert={setPopAlert}
                  userData={userData}
                  fetchProducts={fetchProducts}
                  setEditBlock={setEditBlock}
                />
              ))}
        </div>
      </div>
    </>
  );
}
export default memo(MyProducts);
