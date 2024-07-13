import { memo, useLayoutEffect, useRef, useState } from "react";
import {
  CrownIcon,
  ListIcon,
  NewsIcon,
  StarIcon,
} from "../../assets/icons/Icons";
import CardSlider from "../../components/global/CardSlider";
import ChooseSection from "./components/ChooseSection";
import CreateOffer from "./components/CreateOffer";
import MainSlider from "./components/MainSlider";
import SearchInput from "./components/SearchInput";
import axiosCall from "../../hooks/axiosCall";
import { TProductCard } from "../../components/global/Card";
import { AdBanner1, AdBanner2 } from "../../components/global/AdComponents";
import {
  getCacheItem,
  getLocalTime,
  isDateLater,
  setCacheItem,
} from "../../components/cache/cacheFunctions";
import { Helmet } from "react-helmet";
import MaclerCard from "./components/MaclerCard";

function Home() {
  const [products, setProducts] = useState<null | TProductCard[]>([]);
  const firstRender = useRef<boolean>(true);
  useLayoutEffect(() => {
    if (firstRender.current) {
      getCacheItem("home_page_fetch").then((chache) => {
        // ვამოწმებთ ქეშში არის თუარა ინფორმაცია ან 5 წუთზე მეტი ხანი თუა

        if (chache == undefined || isDateLater(chache.date, 5)) {
          axiosCall.get("fetch/products").then((res) => {
            if (res.data.status == 100) {
              setProducts(res.data.products);
              setCacheItem("home_page_fetch", {
                data: res.data.products,
                date: getLocalTime(),
              });
            }
          });
        } else {
          setProducts(chache.data);
        }
      });
      firstRender.current = false;
    }
  }, []);
  const viewedProducts = (): undefined | TProductCard[] => {
    if (products) {
      let productsList = products;
      productsList.sort((a, b) => b.views - a.views);

      // Select the top 5 items
      let List = productsList.slice(0, 5);
      return List;
    }
  };
  const lastProducts = (): TProductCard[] => {
    // Ensure products exist and the array is not empty
    if (products && products.length > 0) {
      // Copy the products array to avoid modifying the original array
      let productsList = [...products];

      // Sort the products based on views in descending order

      // Sort the top viewed products by update_time in descending order
      productsList.sort(
        (a, b) =>
          new Date(b.update_time).getTime() - new Date(a.update_time).getTime()
      );

      // Select the top 5 items
      let top5List = productsList.slice(0, 5);

      return top5List;
    } else {
      // Return an empty array if products is undefined or empty
      return [];
    }
  };

  return (
    <>
      <Helmet>
        <title>OnHome</title>
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
      <main>
        <div className="relative flex flex-col w-full mobileTab:flex-col-reverse">
          <MainSlider />
          <SearchInput />
        </div>
        <AdBanner1 />
        <div className="flex items-center text-textHead font-mainBold text-[17px] mobileSmall:text-[15px] my-4 mt-10">
          <CrownIcon className=" h-[18px] mobileSmall:h-[17px] [&>path]:fill-vipPlusI mr-3 mobileSmall:mr-2 translate-y-[-1px] " />{" "}
          <span className="text-vipPlusI mr-2">VIP+</span> განცხადებები
        </div>

        <CardSlider
          link="vip=2"
          products={products
            ?.filter((product: TProductCard) => product.estate_vip == 2)
            .sort(
              (a, b) =>
                new Date(b.update_time).getTime() -
                new Date(a.update_time).getTime()
            )}
        />

        <div className="flex items-center text-textHead font-mainBold text-[17px] mobileSmall:text-[15px] my-4 mt-[50px]">
          <ListIcon className=" h-[36px] mobileSmall:h-[34px] mobileSmall:mr-1  [&>path]:fill-orangeI mr-2 translate-y-[-1px]" />{" "}
          <span className="text-orangeI mr-2">VIP</span> განცხადებები
        </div>
        <CardSlider
          link="vip=1"
          products={products
            ?.filter((product: TProductCard) => product.estate_vip == 1)
            .sort(
              (a, b) =>
                new Date(b.update_time).getTime() -
                new Date(a.update_time).getTime()
            )}
        />
        <ChooseSection />
        <div className="flex items-center text-textHead font-mainBold text-[17px] mobileSmall:text-[15px] my-4">
          <NewsIcon className=" h-[32px] mobileSmall:h-[30px] mobileSmall:mr-1 [&>path]:fill-purpleI mr-2 translate-y-[-1px]" />{" "}
          ახალი
        </div>
        <CardSlider link="new=1" products={lastProducts()} />
        <MaclerCard />
        <div className="flex items-center text-textHead font-mainBold text-[17px] mobileSmall:text-[15px] my-4 mt-[50px]">
          <StarIcon className=" h-[32px] mobileSmall:h-[30px] mobileSmall:mr-1 [&>path]:fill-pinkI mr-2 translate-y-[-1px]" />{" "}
          პოპულარული
        </div>
        <CardSlider link="views=1" products={viewedProducts()} />
        <AdBanner2 />
        <CreateOffer />
      </main>
    </>
  );
}
export default memo(Home);
