import { memo, useEffect, useState } from "react";
import {
  BookmarkIcon,
  DateIcon,
  LoginEyeIcon,
} from "../../../assets/icons/Icons";

import { TProductData } from "./MyProducts";
import { getFavorites, removeFavorite } from "../../../hooks/serverFunctions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import HoverTitle from "../../../components/global/HoverTitle";
import { Helmet } from "react-helmet";
import { image_url_start } from "../../../hooks/axiosCall";
import { FormatTime } from "../../../components/global/Addons";
import { Link } from "react-router-dom";
import { t } from "i18next";

function SavedProducts() {
  const userFavorites = useSelector((store: RootState) => store.user.favorites);
  const [products, setProducts] = useState<[] | TProductData[]>([]);
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    getFavorites().then((data: TProductData[]) => setProducts(data));
  }, [userFavorites]);

  return (
    <>
      <Helmet>
        <title>{t("savedProducts.favorites")} - OnHome</title>
      </Helmet>{" "}
      <div className=" rounded-section text-textHead shadow-sectionShadow bg-whiteMain relative flex px-7 py-5 flex-col gap-3  mobile:px-3">
        <h1 className="mobileSmall:text-[14px] mobile:text-center">
          {t("savedProducts.saved_forms")}
        </h1>

        <input
          type="text"
          placeholder={t("my_products.search")}
          className=" text-[14px] h-[40px] w-full bg-LoginInput outline-none rounded-lg px-4 transition-colors focus:bg-LoginInputActive"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className=" rounded-section shadow-sectionShadow bg-whiteMain relative flex  py-2 flex-col gap-3">
        {products && search.length == 0 ? (
          products.length !== 0 && (
            <p className="px-4 text-[13px] text-textDesc my-1">
              {t("my_products.found")} {products.length} {t("my_products.form")}
            </p>
          )
        ) : products &&
          products.filter(
            (item: TProductData) =>
              item.id.toString().includes(search) ||
              item.estate_title.includes(search)
          ).length !== 0 ? (
          <p className="px-4 text-[13px] text-textDesc my-1">
            {t("my_products.found")}{" "}
            {
              products.filter(
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
        <div className="flex flex-col  max-h-[550px] overflow-x-hidden overflow-y-auto ">
          {products ? (
            products.length > 0 && search.length !== 0 ? (
              products
                .filter(
                  (item: TProductData) =>
                    item.id.toString().includes(search) ||
                    item.estate_title.includes(search)
                )
                .map((e: TProductData) => (
                  <FavoriteBanner key={e.id} product={e} />
                ))
            ) : (
              products.map((e: TProductData) => (
                <FavoriteBanner key={e.id} product={e} />
              ))
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

function FavoriteBanner(props: { product: TProductData }) {
  const dispatch = useDispatch();
  return (
    <div className=" w-full relative border-t-[2px] border-lineBg py-5 px-4 flex items-center   small:flex-col">
      <Link to={"/product/" + props.product.id}>
        <div className="w-[160px] h-[90px] rounded-lg bg-whiteLoad relative overflow-hidden   small:w-[100%] small:aspect-video small:h-auto">
          <div className="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.1)] z-[2]"></div>
          <img
            src={image_url_start + props.product.estate_active_image}
            className="absolute h-full w-full object-cover  top-0 left-0"
          />
        </div>
      </Link>
      <div className="flex flex-col ml-3 h-full relative  small:w-full small:mt-3 small:h-auto">
        {" "}
        <Link to={"/product/" + props.product.id} className="w-min">
          <h3 className="text-[15px] mb-[2px] text-textHeadBlack w-min text-nowrap max-w-[250px] text-ellipsis overflow-hidden ">
            {props.product.estate_title}
          </h3>{" "}
        </Link>
        <p className="text-[13px] text-textDesc">
          {t("global.placeholders.location")}:{" "}
          <span className="text-[13px] text-textHeadBlack">
            {props.product.estate_city}
          </span>
        </p>
        <p className="text-[13px] text-textDesc">
          {t("global.placeholders.rooms")}:{" "}
          <span className="text-[13px] text-textHeadBlack">
            {props.product.estate_rooms}
          </span>
        </p>
        <p className="text-[13px] text-textDesc">
          {t("global.placeholders.space")}:{" "}
          <span className="text-[13px] text-textHeadBlack">
            {props.product.estate_size} {t("global.m")}²
          </span>
        </p>
        <div className="flex items-center gap-5 mt-auto small:mt-2 flex-wrap">
          <p className="flex items-center text-[13px] text-textDesc gap-1">
            <LoginEyeIcon className="h-4 aspect-square [&>path]:fill-textDesc" />{" "}
            {props.product.views}
          </p>
          <p className="flex items-center text-[13px] text-textDesc gap-1">
            <DateIcon className="h-4 aspect-square [&>path]:fill-textDesc" />
            {FormatTime(props.product.update_time.toString())}
          </p>
          <p className="text-[13px] text-textDesc">ID - {props.product.id}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 ml-auto small:justify-start small:w-full small:mt-5">
        <button
          onClick={() => removeFavorite(dispatch, props.product.id)}
          className="group relative bg-orangeClear  h-[35px] aspect-square rounded-md  transition-colors p-2 hover:bg-orangeHover flex justify-center items-center"
        >
          <BookmarkIcon className="h-full aspect-square [&>path]:fill-orangeI [&>path]:stroke-orangeI" />
          <HoverTitle title={t("savedProducts.remove_favorite")} left bottom />
        </button>
      </div>
    </div>
  );
}

export default memo(SavedProducts);
