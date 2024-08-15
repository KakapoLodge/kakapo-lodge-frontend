import { AccommodationNameId, AllRates } from "./types";

export const ACCOMMODATION_NAME_IDS: AccommodationNameId[] = [
  "5-bed-dorm",
  "4-bed-dorm",
  "private-double",
  "private-twin",
  "family-room",
  "double-ensuite",
  "deluxe-double-ensuite",
  "motel-unit",
];

export const PRIVATE_ROOM_NAME_IDS: Set<AccommodationNameId> = new Set([
  "private-double",
  "private-twin",
  "family-room",
  "double-ensuite",
  "deluxe-double-ensuite",
  "motel-unit",
]);

export const PRIVATE_BATHROOM_NAME_IDS: Set<AccommodationNameId> = new Set([
  "double-ensuite",
  "deluxe-double-ensuite",
  "motel-unit",
]);

export const SEPARATE_BEDS_NAME_IDS: Set<AccommodationNameId> = new Set([
  "5-bed-dorm",
  "4-bed-dorm",
  "private-twin",
  "family-room",
  "motel-unit",
]);

export const ACCOMMODATION_NAMES = {
  "5-bed-dorm": "Bed in 5-Bed Dorm",
  "4-bed-dorm": "Bed in 4-Bed Female Dorm",
  "private-double": "Private Double",
  "private-twin": "Private Twin",
  "family-room": "Family Room",
  "double-ensuite": "Double Ensuite",
  "deluxe-double-ensuite": "Deluxe Double Ensuite",
  "motel-unit": "Motel Unit",
};

export const BASE_FEATURES = {
  "5-bed-dorm": {
    sleeps: 1,
    size: 21,
    roomConfiguration: "3 single beds and 2 bunk beds",
  },
  "4-bed-dorm": {
    sleeps: 1,
    size: 18,
    roomConfiguration: "4 single beds",
  },
  "private-double": {
    sleeps: 2,
    size: 10,
    roomConfiguration: "1 double bed",
  },
  "private-twin": {
    sleeps: 2,
    size: 12,
    roomConfiguration: "2 single beds",
  },
  "family-room": {
    sleeps: 5,
    size: 21,
    roomConfiguration: "1 double bed, 2 bunk beds and 1 sofa bed",
  },
  "double-ensuite": {
    sleeps: 2,
    size: 15,
    roomConfiguration: "1 queen bed",
  },
  "deluxe-double-ensuite": {
    sleeps: 2,
    size: 18,
    roomConfiguration: "1 queen bed",
  },
  "motel-unit": {
    sleeps: 3,
    size: 27,
    roomConfiguration: "1 queen bed and 1 single bed",
  },
};

export const ALL_ADDITIONAL_FEATURES = {
  "5-bed-dorm": [
    {
      icon: "fa-shower",
      description: "Shared bathroom",
    },
    {
      icon: "fa-venus-mars",
      description: "Mixed gender",
    },
  ],
  "4-bed-dorm": [
    {
      icon: "fa-shower",
      description: "Shared bathroom",
    },
    {
      icon: "fa-venus",
      description: "Female only",
    },
  ],
  "private-double": [
    {
      icon: "fa-shower",
      description: "Shared bathroom",
    },
  ],
  "private-twin": [
    {
      icon: "fa-shower",
      description: "Shared bathroom",
    },
  ],
  "family-room": [
    {
      icon: "fa-shower",
      description: "Shared bathroom",
    },
    {
      icon: "fa-tv",
      description: '32" television',
    },
  ],
  "double-ensuite": [
    {
      icon: "fa-bed-pulse",
      description: "Electric blanket",
    },
    {
      icon: "fa-bath",
      description: "Private bathroom",
    },
    {
      icon: "fa-rug",
      description: "Towels supplied",
    },
    {
      icon: "fa-tv",
      description: '32" television',
    },
    {
      icon: "fa-mug-hot",
      description: "Tea and coffee facilities",
    },
  ],
  "deluxe-double-ensuite": [
    {
      icon: "fa-bed-pulse",
      description: "Electric blanket",
    },
    {
      icon: "fa-bath",
      description: "Private bathroom",
    },
    {
      icon: "fa-rug",
      description: "Towels supplied",
    },
    {
      icon: "fa-tv",
      description: '32" television',
    },
    {
      icon: "fa-mug-hot",
      description: "Tea and coffee facilities",
    },
    {
      icon: "fa-bread-slice",
      description: "Microwave, toaster and mini-fridge",
    },
  ],
  "motel-unit": [
    {
      icon: "fa-bed-pulse",
      description: "Electric blanket",
    },
    {
      icon: "fa-bath",
      description: "Private bathroom",
    },
    {
      icon: "fa-rug",
      description: "Towels supplied",
    },
    {
      icon: "fa-tv",
      description: '32" television',
    },
    {
      icon: "fa-fire-burner",
      description: "Kitchenette (stove, microwave, toaster, mini-fridge)",
    },
    {
      icon: "fa-utensils",
      description: "Dining setting",
    },
  ],
};

export const BOOKING_URLS = {
  "5-bed-dorm":
    "https://apac.littlehotelier.com/reservations/kakapolodgedirect/9239?promotion_code=5OFF",
  "4-bed-dorm":
    "https://apac.littlehotelier.com/reservations/kakapolodgedirect/9238?promotion_code=5OFF",
  "private-double":
    "https://apac.littlehotelier.com/reservations/kakapolodgedirect/9243?promotion_code=5OFF",
  "private-twin":
    "https://apac.littlehotelier.com/reservations/kakapolodgedirect/9244?promotion_code=5OFF",
  "family-room":
    "https://apac.littlehotelier.com/reservations/kakapolodgedirect/9245?promotion_code=5OFF",
  "double-ensuite":
    "https://apac.littlehotelier.com/reservations/kakapolodgedirect/9242?promotion_code=5OFF",
  "deluxe-double-ensuite":
    "https://apac.littlehotelier.com/reservations/kakapolodgedirect/73051?promotion_code=5OFF",
  "motel-unit":
    "https://apac.littlehotelier.com/reservations/kakapolodgedirect/9240?promotion_code=5OFF",
};

export const ACCOMMODATION_IMAGE_PATHS = {
  "5-bed-dorm": [
    "/sub_pages/accommodation/5_bed_dorm/5_bed_dorm_1.png",
    "/sub_pages/accommodation/5_bed_dorm/5_bed_dorm_2.png",
  ],
  "4-bed-dorm": ["/sub_pages/accommodation/4_bed_dorm/4_bed_dorm_1.png"],
  "private-double": [
    "/sub_pages/accommodation/private_double/private_double_1.png",
    "/sub_pages/accommodation/private_double/private_double_2.png",
    "/sub_pages/accommodation/private_double/private_double_3.png",
    "/sub_pages/accommodation/private_double/private_double_4.png",
  ],
  "private-twin": [
    "/sub_pages/accommodation/private_twin/private_twin_1.png",
    "/sub_pages/accommodation/private_twin/private_twin_2.png",
    "/sub_pages/accommodation/private_twin/private_twin_3.png",
    "/sub_pages/accommodation/private_twin/private_twin_4.png",
    "/sub_pages/accommodation/private_twin/private_twin_5.png",
  ],
  "family-room": [
    "/sub_pages/accommodation/family_room/family_room_1.png",
    "/sub_pages/accommodation/family_room/family_room_2.png",
  ],
  "double-ensuite": [
    "/sub_pages/accommodation/double_ensuite/double_ensuite_1.png",
    "/sub_pages/accommodation/double_ensuite/double_ensuite_2.png",
    "/sub_pages/accommodation/double_ensuite/double_ensuite_3.png",
    "/sub_pages/accommodation/double_ensuite/double_ensuite_4.png",
    "/sub_pages/accommodation/double_ensuite/double_ensuite_5.png",
    "/sub_pages/accommodation/double_ensuite/double_ensuite_6.png",
    "/sub_pages/accommodation/double_ensuite/double_ensuite_7.png",
  ],
  "deluxe-double-ensuite": [
    "/sub_pages/accommodation/deluxe_double_ensuite/deluxe_double_ensuite_1.png",
    "/sub_pages/accommodation/deluxe_double_ensuite/deluxe_double_ensuite_2.png",
    "/sub_pages/accommodation/deluxe_double_ensuite/deluxe_double_ensuite_3.png",
    "/sub_pages/accommodation/deluxe_double_ensuite/deluxe_double_ensuite_4.png",
  ],
  "motel-unit": [
    "/sub_pages/accommodation/motel_unit/motel_unit_1.png",
    "/sub_pages/accommodation/motel_unit/motel_unit_2.png",
    "/sub_pages/accommodation/motel_unit/motel_unit_3.png",
  ],
};

export const DEFAULT_RATES: AllRates = {
  "5-bed-dorm": {
    price: 45,
    overallAvailable: null,
    overallMinStay: null,
    isForSale: true,
  },
  "4-bed-dorm": {
    price: 50,
    overallAvailable: null,
    overallMinStay: null,
    isForSale: true,
  },
  "private-double": {
    price: 90,
    overallAvailable: null,
    overallMinStay: null,
    isForSale: true,
  },
  "private-twin": {
    price: 96,
    overallAvailable: null,
    overallMinStay: null,
    isForSale: true,
  },
  "family-room": {
    price: 120,
    overallAvailable: null,
    overallMinStay: null,
    isForSale: true,
  },
  "double-ensuite": {
    price: 110,
    overallAvailable: null,
    overallMinStay: null,
    isForSale: true,
  },
  "deluxe-double-ensuite": {
    price: 120,
    overallAvailable: null,
    overallMinStay: null,
    isForSale: true,
  },
  "motel-unit": {
    price: 140,
    overallAvailable: null,
    overallMinStay: null,
    isForSale: true,
  },
};
