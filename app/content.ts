import { Page } from "./lib/types";

export const GOOGLE_ANALYTICS_ID = "G-Q6FH3J5ZQM";

export const KAKAPO_LODGE_NAME = "Kakapo Lodge";
export const KAKAPO_LODGE_DESCRIPTION =
  "Hanmer Springs Backpacker Accommodation";

export const LOGO_PATH = "/kakapo_logo_with_text.png";
export const HOME_URL = "/";

const ACCOMMODATION_TEXT = "Accommodation";
export const ACCOMMODATION_URL = "/accommodation";

const FACILITIES_TEXT = "Facilities";
const FACILITIES_URL = "/facilities";

const ATTRACTIONS_TEXT = "Attractions";
const ATTRACTIONS_URL = "https://visithanmersprings.co.nz/things-to-do/";

const CONTACT_TEXT = "Contact";
const CONTACT_URL = "/contact";

const POLICIES_TEXT = "Policies";
const POLICIES_URL = "/policies";

const FAQ_TEXT = "FAQs";
const FAQ_URL = "/faq";

export const SUB_PAGES: Page[] = [
  { name: ACCOMMODATION_TEXT, path: ACCOMMODATION_URL },
  { name: FACILITIES_TEXT, path: FACILITIES_URL },
  { name: ATTRACTIONS_TEXT, path: ATTRACTIONS_URL, target: "_blank" },
  { name: CONTACT_TEXT, path: CONTACT_URL },
  { name: POLICIES_TEXT, path: POLICIES_URL },
  { name: FAQ_TEXT, path: FAQ_URL },
];

export const BANNER_IMAGE_PATHS = [
  "/landing_page/banner/banner_1.png",
  "/landing_page/banner/banner_2.png",
  "/landing_page/banner/banner_3.png",
  "/landing_page/banner/banner_4.png",
];

export const LANDING_PAGE_TITLE = "Welcome to Kakapo Lodge";

export const INTRODUCTION_PARAGRAPHS = [
  "The two-story purpose-built backpacker hostel features modern rooms, an open lounge with warm fireplace, and a relaxed, friendly atmosphere. Enjoy our spacious, well-appointed backpacker accommodation, Netflix, fast unlimited WiFi, large kitchen, outdoor courtyard with views of the Southern Alps.",

  "Just three minutes' walk from the town's main attraction, Hanmer Springs Thermal Pools and Spa, and a pleasant stroll to numerous restaurants and stores, our hostel is a great base to enjoy your relaxing Hanmer getaway.",

  "All ensuite accommodation have free towels as well as free soap and shampoo.",
];

export const ACCOMMODATION_SHORTCUTS_HEADER = "Our Accommodation";
export const SHORTCUT_LINK_TEXT = "Find out more";

export const REVIEWS_HEADER = "What our guests say";

export const FEATUREABLE_WIDGET_ID = "c2948fbe-ce17-425b-917a-1f0d787229df";
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/place/Hanmer+Springs+Kakapo+Lodge/@-42.5258994,172.8285116,17z/data=!4m11!3m10!1s0x6d306383a372bc73:0x7424d96525465fe0!5m2!4m1!1i2!8m2!3d-42.5258994!4d172.8285116!9m1!1b1!16s%2Fg%2F1td6b1h1?entry=ttu";

export const getViewAllReviewsText = (totalReviews: number) =>
  `View all ${totalReviews} reviews`;

export const MOBILE_GOOGLE_LOGO_PATH = "/landing_page/reviews/g_logo.png";
export const DESKTOP_GOOGLE_LOGO_PATH = "/landing_page/reviews/google_logo.png";
export const GOOGLE_LOGO_ALT_TEXT = "Google";

export const CALL_US_TEXT = "Call Us";

export const NOT_FOUND_PAGE_TITLE = "Page not found";
export const NOT_FOUND_ERROR_TEXT =
  "Error 404: We do not have the page you are looking for.";
export const RETURN_HOME_TEXT = "Back to home";
