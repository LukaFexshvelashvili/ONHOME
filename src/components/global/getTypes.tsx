import { t } from "i18next";
import { projectTypes } from "../../assets/lists/productAddons";

export function getDealType(dealID: number) {
  switch (dealID) {
    case 0:
      return t("dealTypes.for_sell");
      break;
    case 1:
      return t("dealTypes.for_rent");
      break;
    case 2:
      return t("dealTypes.for_rent_daily");
      break;
    case 3:
      return t("dealTypes.for_pledge");
      break;
  }
}
export function getType(typeID: number) {
  switch (typeID) {
    case 0:
      return t("estateTypes.house");
      break;
    case 1:
      return t("estateTypes.apartment");
      break;
    case 2:
      return t("estateTypes.commercial_space");
      break;
    case 3:
      return t("estateTypes.land");
      break;
    case 4:
      return t("estateTypes.hotel");
      break;
  }
}

export function getProject(projectID: number) {
  return projectTypes()[projectID];
}
