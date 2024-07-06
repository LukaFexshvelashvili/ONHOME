/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainClear2: "var(--mainClear2)",
        main: "var(--main)",
        mainHover: "var(--mainHover)",
        mainClear: "var(--mainClear)",
        mainClearHover: "var(--mainClearHover)",

        mainClearActive: "var(--mainClearActive)",
        LoginInputBg: "var(--LoginInputBg)",
        navBg: "var(--navBg)",
        sectionBg: "var(--sectionBg)",
        bodyBg: "var(--bodyBg)",
        whiteMain: "var(--whiteMain)",
        navIcon: "var(--navIcon)",
        lineBg: "var(--lineBg)",
        blackMain: "var(--blackMain)",

        blackMainBlocked: "var(--blackMainBlocked)",
        blackMainHoverBlocked: "var(--blackMainHoverBlocked)",

        LoginInput: "var(--LoginInput)",
        LoginInputActive: "var(--LoginInputActive)",

        whiteLow: "var(--whiteLow)",
        whiteCont: "var(--whiteCont)",

        whiteLoad: "var(--whiteLoad)",
        whiteHover: "var(--whiteHover)",

        whiteHoverDark: "var(--whiteHoverDark)",

        whiteBgLow: "var(--whiteBgLow)",

        buttonBgFirst: "var(--buttonBgFirst)",
        buttonBgLast: "var(--buttonBgLast)",

        photoLabel: "var(--photoLabel)",
        photoLabelDesc: "var(--photoLabelDesc)",

        inputBorder: "var(--inputBorder)",

        sliderFadeStart: "var(--sliderFadeStart)",
        sliderFadeEnd: "var(--sliderFadeEnd)",
        sliderHead: "var(--sliderHead)",
        sliderDesc: "var(--sliderDesc)",

        blackFade: "var(--blackFade)",

        sectionFadeStart: "var(--sectionFadeStart)",
        sectionFadeEnd: "var(--sectionFadeEnd)",

        WhiteFade: "var(--WhiteFade)",
        WhiteFade2: "var(--WhiteFade2)",

        cardInfoBg: "var(--cardInfoBg)",

        textBlack: "var(--textBlack)",
        textHeadBlack: "var(--textHeadBlack)",
        textHead: "var(--textHead)",
        textDesc: "var(--textDesc)",
        textInfo: "var(--textInfo)",
        textPlaceholder: "var(--textPlaceholder)",

        borderCol1: "var(--borderCol1)",

        profileInfoBlock: "var(--profileInfoBlock)",
        profileInfoBlockHeader: "var(--profileInfoBlockHeader)",
        profileInfoBlockText: "var(--profileInfoBlockText)",

        userName: "var(--userName)",
        userLastName: "var(--userLastName)",

        userIconFilled: "var(--userIconFilled)",
        buttonText: "var(--buttonText)",
        textHeadCard: "var(--textHeadCard)",
        textDescCard: "var(--textDescCard)",
        cardBg: "var(--cardBg)",
        cardBorder: "var(--cardBorder)",
        cardInfo: "var(--cardInfo)",
        cardInfoBg: "var(--cardInfoBg)",
        cardButtonBg: "var(--cardButtonBg)",
        cardButtonIcon: "var(--cardButtonIcon)",

        footerBg: "var(--footerBg)",

        maclerMain: "var(--maclerMain)",
        maclerMainHover: "var(--maclerMainHover)",
        maclerMainClear: "var(--maclerMainClear)",

        orangeI: "var(--orangeI)",
        orangeClear: "var(--orangeClear)",
        orangeHover: "var(--orangeHover)",
        redI: "var(--redI)",
        redClear: "var(--redClear)",
        redHover: "var(--redHover)",
        redCloseI: "var(--redCloseI)",
        vipPlusI: "var(--vipPlusI)",
        vipPlusClear: "var(--vipPlusClear)",
        vipPlusHover: "var(--vipPlusHover)",
        vipPlusCloseI: "var(--vipPlusCloseI)",
        pinkI: "var(--pinkI)",
        pinkClear: "var(--pinkClear)",
        pinkHover: "var(--pinkHover)",
        purpleI: "var(--purpleI)",
        purpleClear: "var(--purpleClear)",
        purpleHover: "var(--purpleHover)",
        greenI: "var(--greenI)",
        greenClear: "var(--greenClear)",
        greenHover: "var(--greenHover)",
        yellowI: "var(--yellowI)",
        yellowClear: "var(--yellowClear)",
        yellowHover: "var(--yellowHover)",
        blueI: "var(--blueI)",
        blueClear: "var(--blueClear)",
        blueHover: "var(--blueHover)",
        blueLightI: "var(--blueLightI)",
        cyanI: "var(--cyanI)",
        cyanClear: "var(--cyanClear)",
        cyanHover: "var(--cyanHover)",

        reportIcon: "var(--reportIcon)",

        success: "var(--success)",
        info: "var(--info)",
        warning: "var(--warning)",

        buttonStroke: "var(--buttonStroke)",
      },
      boxShadow: {
        sectionShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        cardShadow: "0px 8px 30px rgba(0, 0, 0, 0.05)",
        navbarShadow: "0px 2px 40px rgba(0, 0, 0, 0.1)",
        footerShadow: "0px -4px 30px rgba(0, 0, 0, 0.05)",

        slideNavShadow: "0px 4px 15px rgba(58, 133, 255, 0.15)",
        buttonShadow: "0px 4px 15px rgba(58, 133, 255, 0.25)",
      },
      borderRadius: {
        circle: "50%",
        normal: "10px",
        section: "12px",
        block: "14px",
      },
      fontFamily: {
        mainSemiBold: "mainSemiBold",
        mainBold: "mainBold",
        mainMedium: "mainMedium",
        mainRegular: "mainRegular",
        logoBold: "logoBold",
      },
      fontSize: {
        Asmallest: "11px",
        Asmaller: "12px",
        Asmall: "14px",
        Anormal: "18px",
        Abig: "22px",
      },
    },
    screens: {
      large: { max: "1500px" },
      medium: { max: "1330px" },
      mediumSmall: { max: "1200px" },
      mediumSmallXl: { max: "1100px" },
      small: { max: "1000px" },
      smallXl: { max: "900px" },
      mobile: { max: "800px" },
      mobileTab: { max: "600px" },
      searchCardLow: { max: "500px" },
      mobileSmall: { max: "440px" },
    },
  },
  plugins: [],
};
