export function getDealType(dealID: number) {
  switch (dealID) {
    case 0:
      return "იყიდება";
      break;
    case 1:
      return "ქირავდება";
      break;
    case 2:
      return "ქირავდება დღიურად";
      break;
    case 3:
      return "გირავდება";
      break;
  }
}
export function getType(typeID: number) {
  switch (typeID) {
    case 0:
      return "კერძო სახლი";
      break;
    case 1:
      return "კორპუსის ბინა";
      break;
    case 2:
      return "კომერციული ფართი";
      break;
    case 3:
      return "მიწის ნაკვეთი";
      break;
    case 4:
      return "სასტუმრო";
      break;
  }
}

export function getProject(projectID: number) {
  const projectTypes: string[] = [
    "არასტანდარტული",
    "ლენინგრადის",
    "ლვოვის",
    "კიევი",
    "თბილისური ეზო",
    "მოსკოვის",
    "ქალაქური",
    "ჩეხური",
    "ხრუშოვის",
    "თუხარელის",
    "ვეძისი",
    "იუგოსლავიის",
    "მეტრომშენის",
    "ყავლაშვილის",
  ];

  return projectTypes[projectID];
}
