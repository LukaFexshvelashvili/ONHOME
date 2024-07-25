import { t } from "i18next";
import {
  ApartmentIcon,
  CommercialIcon,
  HomeIcon,
  HotelIcon,
  PlotIcon,
} from "../../../assets/icons/Icons";

export type TRealEstateTypes = {
  icon: (props: any) => JSX.Element;
  name: string;
  link: string;
};
export const RealEstateTypes = (): TRealEstateTypes[] => [
  {
    icon: (props: any) => <HomeIcon {...props} />,
    name: t("filters.house"),
    link: "search?estate_type=0",
  },
  {
    icon: (props: any) => <ApartmentIcon {...props} />,
    name: t("filters.apartment"),
    link: "search?estate_type=1",
  },
  {
    icon: (props: any) => <CommercialIcon {...props} />,
    name: t("filters.commercial_space"),
    link: "search?estate_type=2",
  },
  {
    icon: (props: any) => <PlotIcon {...props} />,
    name: t("filters.land"),
    link: "search?estate_type=3",
  },
  {
    icon: (props: any) => <HotelIcon {...props} />,
    name: t("filters.hotel"),
    link: "search?estate_type=4",
  },
];
