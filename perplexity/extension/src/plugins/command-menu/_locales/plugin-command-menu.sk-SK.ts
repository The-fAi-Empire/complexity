import { type LanguageMessages } from "@complexity/i18n";

export default {
  sidecar: {
    showPreviews: "Zobraziť ukážky",
    hidePreviews: "Skryť ukážky",
  },
  input: {
    searchPlaceholder: "Hľadať...",
  },
  actions: {
    createNewThread: "Vytvoriť novú konverzáciu",
    toggleIncognitoEnable: "Povoliť režim inkognito",
    toggleIncognitoDisable: "Zakázať režim inkognito",
    toggleLightMode: "Prepnúť na svetlý režim",
    toggleDarkMode: "Prepnúť na tmavý režim",
  },
  navigation: {
    home: "Domov",
    library: "Knižnica",
    spaces: "Priestory",
    discover: "Objavovať",
    settings: "Nastavenia",
    labs: "Laboratóriá",
    current: "Aktuálne",
    openInNewTab: "Otvoriť na novej karte",
    goTo: "Prejsť na {destination}",
  },
  search: {
    threads: "Konverzácie",
    spaces: "Priestory",
    threadsPlaceholder: "Hľadať konverzácie...",
    spacesPlaceholder: "Hľadať priestory...",
  },
  groups: {
    actions: "Akcie",
    navigation: "Navigácia",
    search: "Hľadanie",
  },
  spaces: {
    footer: {
      openInNewTab: "Otvoriť na novej karte",
      searchInSpace: "Hľadať v priestore",
      goToSpace: "Prejsť do priestoru",
      searchSpacePlaceholder: "Hľadať {spaceName}...",
    },
    commandItems: {
      errorFetching: "Chyba pri načítaní priestorov",
      noSpacesFound: "Nenašli sa žiadne priestory",
    },
    preview: {
      description: "Popis",
      instructions: "Inštrukcie",
      files: "Súbory ({count:number})",
      webLinks: "Webové odkazy ({count:number})",
    },
  },
  threads: {
    commandItems: {
      errorFetching: "Chyba pri načítaní konverzácií",
      noThreadsFound: "Nenašli sa žiadne konverzácie",
    },
  },
  common: {
    noResults: "Nenašli sa žiadne výsledky",
    current: "Aktuálne",
  },
} as const satisfies LanguageMessages;
