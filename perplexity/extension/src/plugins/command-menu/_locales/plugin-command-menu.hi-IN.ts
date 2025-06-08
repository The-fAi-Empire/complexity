import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "पूर्वावलोकन दिखाएं",
    hidePreviews: "पूर्वावलोकन छिपाएं",
  },
  input: {
    searchPlaceholder: "खोजें...",
  },
  actions: {
    createNewThread: "नया थ्रेड बनाएं",
    toggleIncognitoEnable: "इनकॉग्निटो मोड सक्षम करें",
    toggleIncognitoDisable: "इनकॉग्निटो मोड अक्षम करें",
    toggleLightMode: "लाइट मोड में बदलें",
    toggleDarkMode: "डार्क मोड में बदलें",
  },
  navigation: {
    home: "होम",
    library: "लाइब्रेरी",
    spaces: "स्पेसेज",
    discover: "खोजें",
    settings: "सेटिंग्स",
    labs: "लैब्स",
    current: "वर्तमान",
    openInNewTab: "नए टैब में खोलें",
    goTo: "{destination} पर जाएं",
  },
  search: {
    threads: "थ्रेड्स",
    spaces: "स्पेसेज",
    threadsPlaceholder: "थ्रेड्स खोजें...",
    spacesPlaceholder: "स्पेसेज खोजें...",
  },
  groups: {
    actions: "कार्रवाइयां",
    navigation: "नेविगेशन",
    search: "खोज",
  },
  spaces: {
    footer: {
      openInNewTab: "नए टैब में खोलें",
      searchInSpace: "स्पेस में खोजें",
      goToSpace: "स्पेस पर जाएं",
      searchSpacePlaceholder: "{spaceName} खोजें...",
    },
    commandItems: {
      errorFetching: "स्पेसेज प्राप्त करने में त्रुटि",
      noSpacesFound: "कोई स्पेस नहीं मिला",
    },
    preview: {
      description: "विवरण",
      instructions: "निर्देश",
      files: "फ़ाइलें ({count:number})",
      webLinks: "वेब लिंक्स ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "थ्रेड्स प्राप्त करने में त्रुटि",
      noThreadsFound: "कोई थ्रेड नहीं मिला",
    },
  },
  common: {
    noResults: "कोई परिणाम नहीं मिला",
    current: "वर्तमान",
  },
} as const satisfies LanguageMessages;
