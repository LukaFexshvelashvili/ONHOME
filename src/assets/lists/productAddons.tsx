import { t } from "i18next";
import {
  AcceptedIcon,
  BalconyIcon,
  BoxesIcon,
  ConditionerIcon,
  ElevatorIcon,
  FireIcon,
  FirewallIcon,
  FurnitureIcon,
  GarageIcon,
  HomeIcon,
  ParkingIcon,
  PoolIcon,
  RoadIcon,
  SplitIcon,
  TvIcon,
  WaterCelsiusIcon,
  WaterIcon,
  WifiIcon,
  ZapIcon,
} from "../icons/Icons";

export const projectDealTypes = () => [
  t("dealTypes.for_sell"),
  t("dealTypes.for_rent"),
  t("dealTypes.for_rent_daily"),
  t("dealTypes.for_pledge"),
];
export const projectTypes = () => [
  t("projectTypes.non_standard"),
  t("projectTypes.of_leningrad"),
  t("projectTypes.lviv"),
  t("projectTypes.kiev"),
  t("projectTypes.tbilisi"),
  t("projectTypes.moscow"),
  t("projectTypes.urban"),
  t("projectTypes.czech"),
  t("projectTypes.khrushchev"),
  t("projectTypes.of_tukhareli"),
  t("projectTypes.vedzis"),
  t("projectTypes.of_yugoslavia"),
  t("projectTypes.metro_construction"),
  t("projectTypes.kavlashvili"),
];

export const projectStatuses = () => [
  t("projectStatuses.newly_renovated"),
  t("projectStatuses.ongoing_refurnishment"),
  t("projectStatuses.repair"),
  t("projectStatuses.old_repaired"),
  t("projectStatuses.white_frame"),
  t("projectStatuses.black_frame"),
  t("projectStatuses.green_frame"),
];

export type TProductAddon = {
  icon: (props: string) => JSX.Element;
  name: string;
};

export const productAddonsList = () => [
  {
    icon: (props: string) => (
      <FurnitureIcon
        className={`${props} aspect-square [&>path]:stroke-main`}
      />
    ),
    name: t("addons.furniture"),
  },
  {
    icon: (props: string) => (
      <WaterIcon className={`${props} aspect-square [&>path]:stroke-main`} />
    ),
    name: t("addons.water"),
  },
  {
    icon: (props: string) => (
      <WaterIcon className={`${props} aspect-square [&>path]:stroke-main`} />
    ),
    name: t("addons.sewage"),
  },
  {
    icon: (props: string) => (
      <PoolIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.open_pool"),
  },
  {
    icon: (props: string) => (
      <PoolIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.indoor_pool"),
  },
  {
    icon: (props: string) => (
      <BalconyIcon className={`${props} aspect-square [&>path]:stroke-main`} />
    ),
    name: t("addons.balcony"),
  },
  {
    icon: (props: string) => (
      <ConditionerIcon
        className={`${props} aspect-square [&>path]:stroke-main`}
      />
    ),
    name: t("addons.air_conditioner"),
  },
  {
    icon: (props: string) => (
      <ParkingIcon className={`${props} aspect-square [&>path]:stroke-main`} />
    ),
    name: t("addons.parking"),
  },
  {
    icon: (props: string) => (
      <FirewallIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.heating"),
  },
  {
    icon: (props: string) => (
      <WifiIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.internet"),
  },
  {
    icon: (props: string) => (
      <ElevatorIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.freight_elevator"),
  },
  {
    icon: (props: string) => (
      <ElevatorIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.elevator"),
  },
  {
    icon: (props: string) => (
      <BoxesIcon className={`${props} aspect-square [&>path]:stroke-main`} />
    ),
    name: t("addons.basement"),
  },
  {
    icon: (props: string) => (
      <FireIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.natural_gas"),
  },
  {
    icon: (props: string) => (
      <GarageIcon className={`${props} aspect-square [&>path]:stroke-main`} />
    ),
    name: t("addons.garage"),
  },
  {
    icon: (props: string) => (
      <WaterCelsiusIcon className={` ${props} aspect-square `} />
    ),
    name: t("addons.hot_water"),
  },
  {
    icon: (props: string) => (
      <TvIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.TV"),
  },
];
export const productAddonsListForHotel = () => [
  {
    icon: (props: string) => (
      <PoolIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.open_pool"),
  },
  {
    icon: (props: string) => (
      <PoolIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.indoor_pool"),
  },
  {
    icon: (props: string) => (
      <BalconyIcon className={`${props} aspect-square [&>path]:stroke-main`} />
    ),
    name: t("addons.balcony"),
  },
  {
    icon: (props: string) => (
      <ConditionerIcon
        className={`${props} aspect-square [&>path]:stroke-main`}
      />
    ),
    name: t("addons.air_conditioner"),
  },
  {
    icon: (props: string) => (
      <ParkingIcon className={`${props} aspect-square [&>path]:stroke-main`} />
    ),
    name: t("addons.parking"),
  },
  {
    icon: (props: string) => (
      <FirewallIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.heating"),
  },
  {
    icon: (props: string) => (
      <WifiIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.internet"),
  },
  {
    icon: (props: string) => (
      <ElevatorIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.elevator"),
  },
  {
    icon: (props: string) => (
      <FireIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.natural_gas"),
  },
  {
    icon: (props: string) => (
      <WaterCelsiusIcon className={` ${props} aspect-square `} />
    ),
    name: t("addons.hot_water"),
  },
  {
    icon: (props: string) => (
      <TvIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.TV"),
  },
  {
    icon: () => <></>,
    name: t("addons.spa"),
  },
  {
    icon: () => <></>,
    name: t("addons.laundry"),
  },
  {
    icon: () => <></>,
    name: t("addons.Heating"),
  },
  {
    icon: () => <></>,
    name: t("addons.bar"),
  },
  {
    icon: () => <></>,
    name: t("addons.sports_hall"),
  },
  {
    icon: () => <></>,
    name: t("addons.cellar"),
  },
  {
    icon: () => <></>,
    name: t("addons.alarm"),
  },
];
export const productAddonsListForLand = () => [
  {
    icon: (props: string) => (
      <SplitIcon className={`${props} aspect-square [&>path]:stroke-main`} />
    ),
    name: t("addons.divide_possible"),
  },
  {
    icon: (props: string) => (
      <WaterIcon className={`${props} aspect-square [&>path]:stroke-main`} />
    ),
    name: t("addons.water"),
  },
  {
    icon: (props: string) => (
      <WaterIcon className={`${props} aspect-square [&>path]:stroke-main`} />
    ),
    name: t("addons.sewage"),
  },
  {
    icon: (props: string) => (
      <FireIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.natural_gas"),
  },

  {
    icon: (props: string) => (
      <ZapIcon className={`${props} aspect-square [&>path]:stroke-main`} />
    ),
    name: t("addons.electricity"),
  },
  {
    icon: (props: string) => (
      <HomeIcon className={`${props} aspect-square [&>path]:fill-main`} />
    ),
    name: t("addons.by_building"),
  },

  {
    icon: (props: string) => (
      <RoadIcon className={`${props} aspect-square [&>path]:stroke-main`} />
    ),
    name: t("addons.asphalt_road"),
  },
  {
    icon: (props: string) => (
      <AcceptedIcon className={`${props} aspect-square [&>path]:stroke-main`} />
    ),
    name: t("addons.approved_project"),
  },
];
// 0 Furniture
// 1 Water
// 2 Pool
// 3 Balcony
// 4 Conditioner
// 5 Parking
// 6 Firewall
// 7 Wifi
// 8 Bath
// 9 Elevator
// 10 Boxes
// 11 Fire
// 12 Garage
// 13 WaterCelsius
// 14 Tv
