import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "Előnézetek megjelenítése",
    hidePreviews: "Előnézetek elrejtése",
  },
  input: {
    searchPlaceholder: "Keresés...",
  },
  actions: {
    createNewThread: "Új beszélgetés létrehozása",
    toggleIncognitoEnable: "Inkognitó mód bekapcsolása",
    toggleIncognitoDisable: "Inkognitó mód kikapcsolása",
    toggleLightMode: "Váltás világos módra",
    toggleDarkMode: "Váltás sötét módra",
  },
  navigation: {
    home: "Kezdőlap",
    library: "Könyvtár",
    spaces: "Terek",
    discover: "Felfedezés",
    settings: "Beállítások",
    labs: "Laboratóriumok",
    current: "Jelenlegi",
    openInNewTab: "Megnyitás új lapon",
    goTo: "Ugrás ide: {destination}",
  },
  search: {
    threads: "Beszélgetések",
    spaces: "Terek",
    threadsPlaceholder: "Beszélgetések keresése...",
    spacesPlaceholder: "Terek keresése...",
  },
  groups: {
    actions: "Műveletek",
    navigation: "Navigáció",
    search: "Keresés",
  },
  spaces: {
    footer: {
      openInNewTab: "Megnyitás új lapon",
      searchInSpace: "Keresés a térben",
      goToSpace: "Ugrás a térhez",
      searchSpacePlaceholder: "{spaceName} keresése...",
    },
    commandItems: {
      errorFetching: "Hiba a terek betöltésekor",
      noSpacesFound: "Nem találhatók terek",
    },
    preview: {
      description: "Leírás",
      instructions: "Utasítások",
      files: "Fájlok ({count:number})",
      webLinks: "Webes hivatkozások ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "Hiba a beszélgetések betöltésekor",
      noThreadsFound: "Nem találhatók beszélgetések",
    },
  },
  common: {
    noResults: "Nincs találat",
    current: "Jelenlegi",
  },
} as const satisfies LanguageMessages;
