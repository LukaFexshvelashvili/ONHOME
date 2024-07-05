import { useEffect, useState } from "react";
import { DateIcon, LoginEyeIcon } from "../../../assets/icons/Icons";
import { TProductData } from "../../Profile/components/MyProducts";
import axiosCall, { image_url_start } from "../../../hooks/axiosCall";
import { useDebounce } from "../../../hooks/serverFunctions";
import ContentLoader from "../../../components/global/ContentLoader";
export default function ProductSearch() {
  const [loader, setLoader] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchTrigger, giveSearchTrigger] = useState<boolean>(false);
  const [products, setProducts] = useState<TProductData[]>([]);
  const debouncedSearch = useDebounce(search, 300);
  useEffect(() => {
    setLoader(true);
    axiosCall
      .post(
        `admin_panel/get_products`,
        { search: search },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        setLoader(false);
        if (res.data.status === 100) {
          setProducts(res.data.query);
        }
      });
  }, [debouncedSearch, searchTrigger]);
  return (
    <div>
      <p className=" text-textHead">განცხადებების მართვა</p>
      <input
        type="text"
        placeholder="მოძებნა   (ID, ტელეფონით, სიტყვით)"
        className=" text-[14px] h-[40px] w-full bg-LoginInput outline-none rounded-lg px-4 transition-colors focus:bg-LoginInputActive my-3 text-blackMain"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-col gap-3">
        {loader ? (
          <ContentLoader />
        ) : (
          products.map((e: TProductData) => (
            <ProductBanner
              key={e.id}
              product={e}
              rerender={giveSearchTrigger}
            />
          ))
        )}
      </div>
    </div>
  );
}

function ProductBanner(props: { product: TProductData; rerender: Function }) {
  const handleBan = (id: number) => {
    if (id) {
      axiosCall
        .post(
          "admin_panel/block_product",
          { product_id: id },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(() => props.rerender((state: boolean) => !state));
    }
  };
  const handleUnBan = (id: number) => {
    if (id) {
      axiosCall
        .post(
          "admin_panel/unblock_product",
          { product_id: id },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(() => props.rerender((state: boolean) => !state));
    }
  };
  const handleDelete = (id: number) => {
    if (id) {
      axiosCall
        .post(
          "admin_panel/delete_product",
          { product_id: id },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(() => props.rerender((state: boolean) => !state));
    }
  };
  return (
    <div className=" w-full border-t-[2px] border-lineBg py-5 flex items-center small:flex-col">
      <div className="w-[160px] h-[90px] rounded-lg bg-whiteLoad relative overflow-hidden small:w-[100%] small:aspect-video small:h-auto">
        <div className="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.1)] z-[2]"></div>
        <img
          src={image_url_start + props.product.estate_active_image}
          className="absolute h-full w-full object-cover  top-0 left-0"
        />
      </div>
      <div className="flex flex-col ml-3 h-full relative small:w-full small:mt-3 small:h-auto">
        <h3 className="text-[15px] mb-[2px] text-textHeadBlack">
          {props.product.estate_title}
        </h3>
        <p className="text-[13px] text-textDesc">
          ადგილი:{" "}
          <span className="text-[13px] text-textHeadBlack">
            {props.product.estate_city}
          </span>
        </p>
        <p className="text-[13px] text-textDesc">
          ოთახები:{" "}
          <span className="text-[13px] text-textHeadBlack">
            {props.product.estate_rooms}
          </span>
        </p>
        <p className="text-[13px] text-textDesc">
          ფართი{" "}
          <span className="text-[13px] text-textHeadBlack">
            {props.product.estate_size} მ²
          </span>
        </p>
        <div className="flex items-center gap-5 mt-auto small:mt-2">
          <p className="flex items-center text-[13px] text-textDesc gap-1">
            <LoginEyeIcon className="h-4 aspect-square [&>path]:fill-textDesc" />{" "}
            {props.product.views}
          </p>
          <p className="flex items-center text-[13px] text-textDesc gap-1">
            <DateIcon className="h-4 aspect-square [&>path]:fill-textDesc" /> 2
            {props.product.created_time}
          </p>
          <p className="text-[13px] text-textDesc">ID - {props.product.id}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 ml-auto mediumSmallXl:flex-wrap mediumSmallXl:justify-end small:justify-start small:w-full small:mt-5">
        {props.product.banned ? (
          <button
            onClick={() => {
              handleUnBan(props.product.id);
            }}
            className="bg-greenClear font-mainBold tracking-wider text-greenI text-[12px] h-[28px] w-[120px] rounded-md transition-colors hover:bg-greenHover"
          >
            განბლოკვა
          </button>
        ) : (
          <button
            onClick={() => {
              handleBan(props.product.id);
            }}
            className="bg-pinkClear font-mainBold tracking-wider text-pinkI text-[12px] h-[28px] w-[120px] rounded-md transition-colors hover:bg-pinkHover"
          >
            დაბლოკვა
          </button>
        )}
        <button
          onClick={() => handleDelete(props.product.id)}
          className="bg-redClear font-mainBold tracking-wider text-redI text-[12px] h-[28px] w-[100px] rounded-md transition-colors hover:bg-redHover"
        >
          წაშლა
        </button>
      </div>
    </div>
  );
}
