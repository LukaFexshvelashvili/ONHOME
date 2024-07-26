import { updateLast_seen } from "../store/data/userSlice";
import { setDarkMode, setMainColor } from "../store/data/webUISlice";
import { Dispatch } from "redux";

export function addLastProduct(dispatch: Dispatch, product_id: number) {
  if (!localStorage.getItem("last_seen")) {
    localStorage.setItem("last_seen", "[]");
  }

  let getListStorage: string | null = localStorage.getItem("last_seen");
  if (getListStorage === null) {
    getListStorage = "[]";
  }

  let getList: number[] = JSON.parse(getListStorage);
  const existingIndex = getList.indexOf(product_id);
  if (existingIndex > -1) {
    getList.splice(existingIndex, 1);
  }
  getList.unshift(product_id);

  let getSort: number[] = Array.from(new Set(getList));

  if (getSort.length > 5) {
    getSort = getSort.slice(0, 5);
  }

  localStorage.setItem("last_seen", JSON.stringify(getSort));

  dispatch(updateLast_seen(getSort));
}

export function checkUIStorage(dispatch: any, UISettings: any) {
  if (!localStorage.getItem("last_seen")) {
    localStorage.setItem("last_seen", "[]");
  } else {
    let getListStorage: any = localStorage.getItem("last_seen");
    dispatch(updateLast_seen(JSON.parse(getListStorage)));
  }
  if (!localStorage.getItem("favorites")) {
    localStorage.setItem("favorites", "[]");
  }
  if (localStorage.getItem("darkmode")) {
    let darkmodeStorage: any = localStorage.getItem("darkmode");
    let darkmode: boolean = JSON.parse(darkmodeStorage);
    if (typeof darkmode == "boolean") {
      dispatch(setDarkMode(darkmode));
    }
  }
  if (localStorage.getItem("mainColor")) {
    let mainColor: any = localStorage.getItem("mainColor");
    if (UISettings.colors.includes(mainColor)) {
      if (typeof mainColor == "string") {
        dispatch(setMainColor(mainColor));
      }
    } else {
      localStorage.removeItem("mainColor");
      dispatch(setMainColor("#3a86ff"));
    }
  }
}
export function changeMainColor(newColor: string) {
  var b: any = document.querySelector("body");
  localStorage.setItem("mainColor", newColor);

  if (newColor) {
    switch (newColor) {
      case "#3A86FF":
        b.style.setProperty(`--main`, `${newColor}`);
        b.style.setProperty(`--mainClear`, `rgba(58, 134, 255, 0.1)`);
        b.style.setProperty(`--mainClearHover`, `rgba(58, 134, 255, 0.2)`);
        b.style.setProperty(`--mainClear2`, `rgba(58, 133, 255, 0.7)`);
        b.style.setProperty(`--mainClearActive`, `rgba(58, 134, 255, 0.15)`);
        b.style.setProperty(`--mainHover`, `#4f92fe`);

        break;
      case "#C727FF":
        b.style.setProperty(`--main`, `${newColor}`);
        b.style.setProperty(`--mainClear`, `rgba(198, 47, 253, 0.1)`);
        b.style.setProperty(`--mainClearHover`, `rgba(198, 47, 253, 0.2)`);
        b.style.setProperty(`--mainClear2`, `rgba(198, 47, 253, 0.7)`);
        b.style.setProperty(`--mainClearActive`, `rgba(198, 47, 253, 0.15)`);
        b.style.setProperty(`--mainHover`, `#cd44ff`);

        break;
      case "#95d609":
        b.style.setProperty(`--main`, `${newColor}`);
        b.style.setProperty(`--mainClear`, `rgba(149, 214, 9, 0.1)`);
        b.style.setProperty(`--mainClearHover`, `rgba(149, 214, 9, 0.2)`);
        b.style.setProperty(`--mainClear2`, `rgba(149, 214, 9, 0.7)`);
        b.style.setProperty(`--mainClearActive`, `rgba(149, 214, 9, 0.15)`);
        b.style.setProperty(`--mainHover`, `#a0dd1e`);

        break;
    }
  }
}
export function changeDarkThemeColors(makeDark: boolean) {
  var r: any = document.querySelector(":root");
  localStorage.setItem("darkmode", JSON.stringify(makeDark));

  if (makeDark) {
    r.classList.add("dark_mode");
  } else {
    r.classList.remove("dark_mode");
  }
}
