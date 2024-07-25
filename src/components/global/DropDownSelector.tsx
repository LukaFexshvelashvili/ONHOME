import { useEffect, useMemo, useState } from "react";
import { DropDownIcon } from "../../assets/icons/Icons";
import { deleteParams, updateParams } from "../../hooks/routerHooks";
import { useSearchParams } from "react-router-dom";
import { OutsideClickClose } from "./OutsideClickClose";
import { t } from "i18next";

export default function DropDownSelector(props: {
  name: string;
  itemsList: any[];
  setData?: Function;
  changeParams?: boolean;
  engName?: string;
}) {
  const [params, setParams] = useSearchParams();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const items = useMemo(() => {
    if (props.itemsList !== undefined) {
      if (search !== "") {
        return props.itemsList.filter((item) => item.includes(search));
      } else {
        return props.itemsList;
      }
    } else {
      return [];
    }
  }, [search, props.itemsList]);
  useEffect(() => {
    if (props.setData) {
      props.setData(activeItem);
    }
  }, [activeItem]);
  useEffect(() => {
    if (props.engName) {
      const searchType = params.get(props.engName);

      if (searchType && props.itemsList.includes(searchType)) {
        setActiveItem(searchType);
      }
      if (searchType && !props.itemsList.includes(searchType)) {
        deleteParams(params, setParams, props.engName);
      }
      if (!searchType) {
        setActiveItem(null);
      }
    }
  }, [params]);
  return (
    <div className="relative ">
      <OutsideClickClose activePop={openDialog} setActivePop={setOpenDialog}>
        <>
          <button
            onClick={() => setOpenDialog((state) => !state)}
            className="bg-main flex items-center px-6 py-[6px] min-w-[300px] justify-center rounded-lg text-buttonText tracking-widest mt-3 font-mainMedium text-Asmall"
          >
            {activeItem == null ? props.name : activeItem}
            <DropDownIcon className="h-[16px] aspect-square flex items-center justify-center ml-4 translate-y-[1px] [&>path]:fill-WhiteFade" />
          </button>
          <div
            className={` w-full z-10 absolute shadow-cardShadow bg-whiteMain rounded-lg top-[50px] overflow-hidden transition-all  ${
              openDialog ? "opacity-100 visible" : "invisible opacity-0"
            }`}
          >
            <input
              type="text"
              placeholder={t("filters.search")}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="w-full h-[35px] bg-LoginInputBg font-mainRegular text-blackMain text-[14px] px-2 tracking-wider outline-none caret-blackMain"
            />
            <div className="max-h-[250px] overflow-x-hidden overflow-auto">
              {items.length > 0 ? (
                items.map((e: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => {
                      setOpenDialog(false);
                      if (e == activeItem) {
                        deleteParams(params, setParams, props.engName);

                        setActiveItem(null);
                      } else {
                        if (props.engName) {
                          let newProp: any = {};
                          newProp[props.engName] = e;
                          updateParams(params, setParams, newProp);
                        }
                        setActiveItem(e);
                      }
                    }}
                    className={` w-full flex justify-center items-center font-mainRegular text-[14px] tracking-wider p-2 text-textHead transition-colors hover:bg-whiteHover ${
                      activeItem == e ? "bg-whiteHover" : ""
                    }`}
                  >
                    {e}
                  </button>
                ))
              ) : (
                <div className="text-center w-full flex justify-center items-center font-mainRegular text-[14px] tracking-wider p-2 text-textHead ">
                  {t("filters.no_result_found")}
                </div>
              )}
            </div>
          </div>
        </>
      </OutsideClickClose>
    </div>
  );
}
