export type TOffer = {
  id: number;
  status: number;
  name: string;
  benefits: string[];
  mainColor: string;
  secondColor: string;
  lineColor: string;
  sale: number;
  price: number;
};

export const ActiveOffers = [
  {
    id: 0,
    status: 0,
    name: "უფასო",
    benefits: ["განთავსება საერთო სიაში"],
    mainColor: "var(--main)",

    secondColor: "var(--mainClear)",
    lineColor: "var(--mainClearActive)",
    sale: 0,
    price: 0,
  },
  {
    id: 3,
    status: 3,
    name: "AUTO",
    benefits: ["ავტომატური განახლება", "მოძებნისას მაღალი რანკი"],
    mainColor: "#0fb196",

    secondColor: "rgba(15, 177, 150, 0.15)",
    lineColor: "rgba(15, 177, 150, 0.3) ",
    sale: 0.1,
    price: 0.3,
  },
  {
    id: 1,
    status: 1,
    name: "VIP",
    benefits: [
      "მარკინგი",
      "სპეციალურ ადგილებზე გამოჩენა",
      "ძებნისას მაღალი რანკი",
    ],
    mainColor: "#FF9900",

    secondColor: "rgba(255, 153, 0, 0.15)",
    lineColor: "rgba(255, 153, 0, 0.3)",
    sale: 0.45,

    price: 1.5,
  },
  {
    id: 2,
    status: 2,
    name: "VIP+",
    benefits: [
      "მარკინგი",
      "სპეციალურ ადგილებზე გამოჩენა",
      "ძებნისას მაღალი რანკი",
      "ბარათის ფერის გამორჩევა",
      "განცხადებების დეტალურ გვერდებზე გამოჩენა",
    ],
    mainColor: "#ff005c",

    secondColor: "rgba(255, 0, 60, 0.15)",
    lineColor: "rgba(255, 0, 60, 0.3)",
    sale: 0.75,
    price: 3,
  },
];
