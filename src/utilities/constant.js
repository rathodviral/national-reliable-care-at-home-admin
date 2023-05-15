export const ASSETS_URL =
  "https://viralrathod.in/national-reliable-care-at-home/server/images";
// export const ASSETS_URL = "http://localhost:3000";
// export const ASSETS_URL = "http://localhost/national-reliable-care-at-home-server/images";
export const APP_STORAGE = "ADMIN";
export const APP_LAYOUT_SERVICE = {
  list: "layout/read.php",
  add: "layout/create.php",
  edit: "layout/update.php",
  delete: "layout/delete.php",
  uploadImage: "upload_image.php",
  readImage: "read_image.php"
};
export const ICONS = [
  "home",
  "user",
  "comments",
  "envelope-alt",
  "eye-open",
  "table",
  "magic",
  "print",
  "phone",
  "map-marker"
];
export const SOCIAL_ICONS = [
  "facebook",
  "twitter",
  "dribbble",
  "pinterest",
  "github",
  "insta",
  "linkedin"
];
export const LINKS = ["/", "/blog", "/about", "/contact", "/service"];
export const STYELS = ["normal", "bold", "color", "point"];
const createClassNames = (label, key) => {
  return [0, 1, 2, 3, 4, 5].map((item) => ({
    name: `${label} ${item}`,
    value:
      typeof key === "string"
        ? `${key}-${item}`
        : key.map((k) => `${k}-${item}`).join(" ")
  }));
};
export const CLASSNAMES = [
  { name: "No Class Selected", value: "" },
  { name: "Theme Margin Top", value: "mt-3 mb-0" },
  ...createClassNames("Margin Top", "mt"),
  ...createClassNames("Margin Bottom", "mb"),
  ...createClassNames("Margin Y", "my")
  // ...createClassNames("Margin Y", ["mt", "mb"])
  // ...createClassNames("Margin Left", "ms"),
  // ...createClassNames("Margin Right", "me"),
  // ...createClassNames("Margin X", "mx")
];
export const SWITCH = [
  { name: "Yes", value: true },
  { name: "No", value: false }
];

const getServiceObj = (icon) => ({
  buttonLink: "",
  buttonText: "",
  description: "",
  icon,
  title: ""
});

const getWorkObj = (title) => ({
  image: "",
  link: "",
  description: "",
  title
});

export const SECTION_TYPES = [
  "slider",
  "presentation",
  "service",
  "work",
  "testimonial",
  "social",
  "about",
  "service-detail",
  "action",
  "page-title",
  "contact"
];
export const PAGE_TYPES = ["home", "blog", "service", "about", "contact"];
export const LAYOUT_TYPES = [
  { name: "Slider", content: [], type: "slider" },
  {
    name: "Presentation",
    type: "presentation",
    content: {
      description: "",
      heading: ["heading 1", "heading 2", "heading 3"]
    }
  },
  {
    name: "Service",
    type: "service",
    content: [
      getServiceObj("eye-open"),
      getServiceObj("table"),
      getServiceObj("magic"),
      getServiceObj("print")
    ]
  },
  {
    name: "Work",
    type: "work",
    content: {
      heading: "",
      list: [
        getWorkObj("Lorem Website"),
        getWorkObj("Ipsum Logo"),
        getWorkObj("Dolor Prints"),
        getWorkObj("Sit Amet Website")
      ]
    }
  },
  { name: "Testimonial", type: "testimonial", content: [] },
  {
    name: "Social",
    type: "social",
    content: { copyright: ["line 1", "line 2", "line 3"], list: [] }
  },
  {
    name: "About",
    type: "about",
    content: {
      heading: "",
      list: []
    }
  },
  {
    name: "Service Detail",
    type: "service-detail",
    content: {
      title: "",
      description: [],
      isTheme: false,
      isImageLeft: false,
      image: "img/6.jpg"
    }
  },
  {
    name: "Action",
    type: "action",
    content: {
      buttonLink: "",
      buttonText: "",
      description: [
        {
          info: "Action",
          style: "normal"
        }
      ]
    }
  },
  {
    name: "Page Title",
    type: "page-title",
    content: {
      icon: "user",
      title: "Title",
      description: "Description"
    }
  },
  {
    name: "Page",
    type: "page",
    content: {
      title: "",
      section: []
    }
  }
];
