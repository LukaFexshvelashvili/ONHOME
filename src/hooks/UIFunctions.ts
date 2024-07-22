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

// let darkColors: any = {
//   mainClear2: " rgba(58, 133, 255, 0.7)",
//   main: " #3a86ff",
//   mainHover: " #4f92fe",
//   mainClear: " rgba(58, 134, 255, 0.1)",
//   mainClearActive: " rgba(58, 134, 255, 0.15)",
//   LoginInputBg: " rgba(58, 134, 255, 0.05)",
//   navBg: " #212121",
//   sectionBg: " #ffffff",
//   bodyBg: " #1d1d1d",
//   whiteMain: " #212121",
//   maclerStart: " #202123",
//   maclerEnd: " #181f28",

//   skeleton1: " #292929",
//   skeleton2: " #3f3f3f",
//   skeleton3: " #3f3f3f",
//   skeleton4: " #676767",
//   skeleton5: " #212121",
//   skeleton6: " #585858",
//   skeleton7: " #2d2d2d",

//   buttonText: " rgb(255, 255, 255)",

//   navIcon: " #cccccc",
//   lineBg: " #333333",
//   blackMain: " rgba(255, 255, 255, 0.8)",
//   LoginInput: " rgba(69, 69, 69, 0.5)",
//   LoginInputActive: " rgba(62, 62, 62, 0.9)",
//   whiteLow: " rgba(44, 44, 44, 0.6)",
//   whiteCont: " rgb(60, 60, 60)",
//   whiteLoad: " #323232",
//   whiteHover: " #272727",
//   whiteHoverDark: " #272727",
//   whiteBgLow: " #272727",
//   buttonBgFirst: " #3a86ff",
//   buttonBgLast: " #6da5ff",
//   photoLabel: " rgba(255, 255, 255, 0.9)",
//   photoLabelDesc: " rgba(255, 255, 255, 0.8)",
//   inputBorder: " #424242",
//   sliderFadeStart: " rgba(0, 0, 0, 0.6)",
//   sliderFadeEnd: " rgba(0, 0, 0, 0)",
//   sliderHead: " rgba(255, 255, 255, 0.9)",
//   sliderDesc: " rgba(255, 255, 255, 0.8)",
//   blackFade: " rgba(0, 0, 0, 0.3)",
//   sectionFadeStart: " rgba(0, 0, 0, 0.75)",
//   sectionFadeEnd: " rgba(0, 0, 0, 0.1)",
//   WhiteFade: " rgba(255, 255, 255, 0.9)",
//   textBlack: " #000000",
//   textHeadBlack: " rgba(255, 255, 255, 1)",
//   textHead: " rgba(255, 255, 255, 0.8)",
//   textDesc: " rgba(255, 255, 255, 0.7)",
//   textInfo: " rgba(255, 255, 255, 0.6)",
//   textPlaceholder: " rgba(0, 0, 0, 0.4)",
//   borderCol1: " #2f2f2f",
//   profileInfoBlock: " #313131",
//   profileInfoBlockHeader: " rgba(255, 255, 255, 0.5)",
//   profileInfoBlockText: " rgba(255, 255, 255, 0.6)",
//   userName: " rgba(255, 255, 255, 0.8)",
//   userLastName: " rgba(255, 255, 255, 0.6)",
//   userIconFilled: " rgba(255, 255, 255, 0.3)",
//   textHeadCard: " rgba(255, 255, 255, 0.8)",
//   textDescCard: " rgba(255, 255, 255, 0.5)",
//   cardBorder: " #343434",
//   cardBg: " #ffffff",
//   cardInfo: " #ffffff",
//   cardInfoBg: " rgba(0, 0, 0, 0.6)",
//   cardButtonBg: " #f5f5f5",
//   cardButtonIcon: " rgba(255, 255, 255, 0.5)",
//   footerBg: " #ffffff",
//   maclerMain: " #3dbe00",
//   maclerMainHover: " #3fc700",
//   maclerMainClear: " rgba(60, 190, 0, 0.1)",
//   orangeI: " #ff9900",
//   orangeClear: " rgba(255, 153, 0, 0.1)",
//   orangeHover: " rgba(255, 153, 0, 0.15)",
//   redI: " #ff0000",
//   redClear: " rgba(255, 0, 0, 0.1)",
//   redHover: " rgba(255, 0, 0, 0.15)",
//   redCloseI: " #e20036",
//   pinkI: " #ff03a9",
//   pinkClear: " rgba(255, 3, 171, 0.1)",
//   pinkHover: " rgba(255, 3, 171, 0.15)",
//   purpleI: " #bd00ff",
//   purpleClear: " rgba(187, 0, 255, 0.1)",
//   purpleHover: " rgba(187, 0, 255, 0.15)",
//   greenI: " #00cd08",
//   greenClear: " rgba(0, 205, 7, 0.1)",
//   greenHover: " rgba(0, 205, 7, 0.15)",
//   yellowI: " #ffc700",
//   yellowClear: " rgba(255, 200, 0, 0.1)",
//   yellowHover: " rgba(255, 200, 0, 0.15)",
//   blueI: " #0075ff",
//   blueClear: " rgba(0, 119, 255, 0.1)",
//   blueHover: " rgba(0, 119, 255, 0.15)",
//   blueLightI: " #4e7fff",
//   cyanI: " #00c2ff",
//   cyanClear: " rgba(0, 195, 255, 0.1)",
//   cyanHover: " rgba(0, 195, 255, 0.15)",
//   reportIcon: " #ff005c",
//   success: " #00e75c",
//   info: " #ffb800",
//   warning: " #ff003d",
//   buttonStroke: " #5b5b5b",
// };

// let defaultColors = {
//   mainClear2: " rgba(58, 133, 255, 0.7)",
//   main: " #3a86ff",
//   mainHover: " #4f92fe",
//   mainClear: " rgba(58, 134, 255, 0.1)",
//   mainClearActive: " rgba(58, 134, 255, 0.15)",
//   LoginInputBg: " rgba(58, 134, 255, 0.05)",
//   navBg: " #ffffff",
//   sectionBg: " #ffffff",
//   bodyBg: " #f9f9f9",
//   whiteMain: " #ffffff",
//   navIcon: " #4b4b4b",
//   lineBg: " #f4f4f4",
//   blackMain: " rgba(0, 0, 0, 0.8)",
//   LoginInput: " rgba(236, 236, 236, 0.5)",
//   LoginInputActive: " rgba(236, 236, 236, 0.9)",
//   whiteLow: " rgba(239, 239, 239, 0.6)",
//   whiteCont: " rgba(198, 198, 198, 1)",
//   whiteLoad: " #ececec",
//   whiteHover: " #f9f9f9",
//   whiteHoverDark: " #f5f5f5",
//   whiteBgLow: " #f7f7f7",
//   buttonBgFirst: " #3a86ff",
//   buttonBgLast: " #6da5ff",
//   photoLabel: " rgba(255, 255, 255, 0.9)",
//   photoLabelDesc: " rgba(255, 255, 255, 0.8)",
//   buttonText: "rgb(255, 255, 255)",

//   inputBorder: " #dfdfdf",
//   sliderFadeStart: " rgba(0, 0, 0, 0.6)",
//   sliderFadeEnd: " rgba(0, 0, 0, 0)",
//   sliderHead: " rgba(255, 255, 255, 0.9)",
//   sliderDesc: " rgba(255, 255, 255, 0.8)",
//   blackFade: " rgba(0, 0, 0, 0.3)",
//   sectionFadeStart: " rgba(0, 0, 0, 0.75)",
//   sectionFadeEnd: " rgba(0, 0, 0, 0.1)",
//   WhiteFade: " rgba(255, 255, 255, 0.9)",
//   textBlack: " #000000",
//   textHeadBlack: " rgba(0, 0, 0, 0.9)",
//   textHead: " rgba(0, 0, 0, 0.7)",
//   textDesc: " rgba(0, 0, 0, 0.6)",
//   textInfo: " rgba(0, 0, 0, 0.5)",
//   textPlaceholder: " rgba(0, 0, 0, 0.4)",
//   borderCol1: " #f2f2f2",
//   profileInfoBlock: " #f2f2f2",
//   profileInfoBlockHeader: " rgba(0, 0, 0, 0.5)",
//   profileInfoBlockText: " rgba(0, 0, 0, 0.6)",
//   userName: " rgba(0, 0, 0, 0.8)",
//   userLastName: " rgba(0, 0, 0, 0.6)",
//   userIconFilled: " rgba(0, 0, 0, 0.3)",
//   textHeadCard: " rgba(0, 0, 0, 0.8)",
//   textDescCard: " rgba(0, 0, 0, 0.5)",
//   maclerStart: "rgba(255, 255, 255, 1) 56%",
//   maclerEnd: "rgba(239, 245, 255, 1) 56%",

//   skeleton1: "#292929",
//   skeleton2: "#3f3f3f",
//   skeleton3: "#3f3f3f",
//   skeleton4: "#676767",
//   skeleton5: "#212121",
//   skeleton6: "#585858",
//   skeleton7: "#2d2d2d",
//   cardBg: " #ffffff",
//   cardBorder: "#f3f3f3",
//   cardInfo: " #ffffff",
//   cardInfoBg: " rgba(0, 0, 0, 0.6)",
//   cardButtonBg: " #f5f5f5",
//   cardButtonIcon: " rgba(0, 0, 0, 0.5)",
//   footerBg: " #ffffff",
//   maclerMain: " #3dbe00",
//   maclerMainHover: " #3fc700",
//   maclerMainClear: " rgba(60, 190, 0, 0.1)",
//   orangeI: " #ff9900",
//   orangeClear: " rgba(255, 153, 0, 0.1)",
//   orangeHover: " rgba(255, 153, 0, 0.15)",
//   redI: " #ff0000",
//   redClear: " rgba(255, 0, 0, 0.1)",
//   redHover: " rgba(255, 0, 0, 0.15)",
//   redCloseI: " #e20036",
//   pinkI: " #ff03a9",
//   pinkClear: " rgba(255, 3, 171, 0.1)",
//   pinkHover: " rgba(255, 3, 171, 0.15)",
//   purpleI: " #bd00ff",
//   purpleClear: " rgba(187, 0, 255, 0.1)",
//   purpleHover: " rgba(187, 0, 255, 0.15)",
//   greenI: " #00cd08",
//   greenClear: " rgba(0, 205, 7, 0.1)",
//   greenHover: " rgba(0, 205, 7, 0.15)",
//   yellowI: " #ffc700",
//   yellowClear: " rgba(255, 200, 0, 0.1)",
//   yellowHover: " rgba(255, 200, 0, 0.15)",
//   blueI: " #0075ff",
//   blueClear: " rgba(0, 119, 255, 0.1)",
//   blueHover: " rgba(0, 119, 255, 0.15)",
//   blueLightI: " #4e7fff",
//   cyanI: " #00c2ff",
//   cyanClear: " rgba(0, 195, 255, 0.1)",
//   cyanHover: " rgba(0, 195, 255, 0.15)",
//   reportIcon: " #ff005c",
//   success: " #00e75c",
//   info: " #ffb800",
//   warning: " #ff003d",
//   buttonStroke: " #f0f0f0",
// };
